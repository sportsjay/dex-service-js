import { UntypedHandleCall, handleUnaryCall, status } from "@grpc/grpc-js";
import { ServiceError } from "../utils/error";
import { logger } from "../logger";
import { ITokenServer } from "../proto/token_grpc_pb";
import {
  TokenRequest,
  TokenItem,
  DexTopupRequest,
  DexTopupResponse,
} from "../proto/token_pb";
import { mtaService } from "./TokenContract";
import Web3 from "web3";
import { dexService } from ".";
import { tokenLookUp } from "./order.service";

export class TokenServer implements ITokenServer {
  [name: string]: UntypedHandleCall;

  getToken: handleUnaryCall<TokenRequest, TokenItem> = async (
    call,
    callback
  ) => {
    const reqToken = call.request;
    const tokenType = reqToken.getSymbol();

    if (!tokenLookUp[tokenType])
      callback(
        new ServiceError(status.NOT_FOUND, "Token not found!"),
        undefined
      );

    const web3Instance = new Web3("http://localhost:8545");
    let accounts: string[];

    await web3Instance.eth.getAccounts((error, _accounts) => {
      if (error) console.log(error);
      else accounts = _accounts;
    });

    const availableReserve = await mtaService.contract.methods
      .totalSupply()
      .call();

    for (const account of accounts) {
      const balance = web3Instance.utils.fromWei(
        await tokenLookUp[tokenType].contract.methods.balanceOf(account).call(),
        "ether"
      );

      console.log(`${account} :${balance} ${tokenType}`);
    }

    const balance = web3Instance.utils.fromWei(
      await tokenLookUp[tokenType].contract.methods
        .balanceOf(dexService.address)
        .call(),
      "ether"
    );

    console.log(`${dexService.address} :${balance} ${tokenType}`);

    if (!reqToken)
      callback(
        new ServiceError(status.NOT_FOUND, "Token not found!"),
        undefined
      );

    const token = new TokenItem();
    token.setSymbol("MTA");
    token.setAvailableamount(availableReserve);

    callback(null, token);
  };

  dexTopupEther: handleUnaryCall<DexTopupRequest, DexTopupResponse> = async (
    call,
    callback
  ) => {
    const { amount } = call.request.toObject();

    if (amount <= 0)
      callback(
        new ServiceError(status.INVALID_ARGUMENT, "Amount must not be <= 0"),
        undefined
      );

    const web3Instance = new Web3("http://localhost:8545");

    const tx = await web3Instance.eth.accounts.signTransaction(
      {
        to: dexService.address,
        from: "0xc940848722a5FFdCA942FaD0935d88D7E11e6B54",
        value: web3Instance.utils.toWei(amount.toString(), "ether"),
        gas: 3000000,
      },
      "438b6ad465b200ec2a61b7ed6aaf2a7e98d5f407f6ad4e6ad153261fea9f6900",
      (error, signedTx) => {
        if (error) {
          console.log(error);
          callback(new ServiceError(status.INTERNAL, error.message), undefined);
        } else {
          logger.info(`Transaction signed! ${signedTx}`);
        }
      }
    );

    const response = new DexTopupResponse();

    const receipt = await web3Instance.eth.sendSignedTransaction(
      tx.rawTransaction,
      (error, hash) => {
        if (error)
          callback(new ServiceError(status.INTERNAL, error.message), undefined);
        else {
          logger.info(`Top up complete, hash can be found: ${hash}`);
          response.setMsg(`Top up complete, hash can be found: ${hash}`);
        }
      }
    );

    response.setReceipt(JSON.stringify(receipt));

    callback(undefined, response);
  };
}
