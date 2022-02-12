import {
  UntypedHandleCall,
  handleServerStreamingCall,
  handleUnaryCall,
  status,
} from "@grpc/grpc-js";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { IOrderServer } from "../proto/order_grpc_pb";
import { OrderItems, OrderItem, OrderResponse } from "../proto/order_pb";
import { ServiceError } from "../utils/error";
import { logger } from "../logger";
import { OrderModel } from "../schema/order.model";
import { ExchangeModel } from "../schema/exchange.model";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { dexService } from "./DexContract";
import {
  mtaService,
  mtbService,
  mtcService,
  mtdService,
} from "./TokenContract";

interface TokenServiceProperties {
  buy: any;
  sell: any;
  contract: Contract;
}

export class TokenLookUp {
  [name: string]: TokenServiceProperties;

  constructor() {
    this.MTA = {
      buy: dexService.contract.methods.buyMTA,
      sell: dexService.contract.methods.sellMTA,
      contract: mtaService.contract,
    };

    this.MTB = {
      buy: dexService.contract.methods.buyMTB,
      sell: dexService.contract.methods.sellMTB,
      contract: mtbService.contract,
    };

    this.MTC = {
      buy: dexService.contract.methods.buyMTC,
      sell: dexService.contract.methods.sellMTC,
      contract: mtcService.contract,
    };

    this.MTD = {
      buy: dexService.contract.methods.buyMTD,
      sell: dexService.contract.methods.sellMTD,
      contract: mtdService.contract,
    };
  }
}
export const tokenLookUp = new TokenLookUp();

export class OrderServer implements IOrderServer {
  [name: string]: UntypedHandleCall;

  getAll: handleServerStreamingCall<Empty, OrderItems> = async (call) => {
    const orders: OrderItems = new OrderItems();

    const orderList = await OrderModel.find();

    // Call database
    orders.setOrdersList(
      orderList.map((order) => {
        const orderItem = new OrderItem();
        orderItem.setSymbola(order.symbolA);
        orderItem.setSymbolb(order.symbolB);
        orderItem.setAmountb(order.amountB);
        orderItem.setCreatedat("unknown");
        return orderItem;
      })
    );

    call.write(orders);
    call.on("error", (error: Error) => {
      logger.error(error);
    });
    call.end();
  };

  createOne: handleUnaryCall<OrderItem, OrderResponse> = async (
    call,
    callback
  ) => {
    const newOrder = call.request;

    /**
     * Logic Flow
     *
     * x symbolA -> n amount of eth (sell operation)
     * n amount of eth -> y symbolB (buy operation)
     */
    const account = newOrder.getIssuer();
    const symbolA = newOrder.getSymbola();
    const symbolB = newOrder.getSymbolb();
    const amountB = newOrder.getAmountb();

    const web3Instance = new Web3("http://localhost:8545");

    // check if account exists
    const isAccountExist = (await web3Instance.eth.getAccounts()).findIndex(
      (value) => value === account
    );
    if (isAccountExist === -1)
      callback(
        new ServiceError(status.PERMISSION_DENIED, "Account does not exist!"),
        undefined
      );

    // do look up for token exchange contract
    if (!(symbolA in tokenLookUp && symbolB in tokenLookUp)) {
      callback(
        new ServiceError(status.NOT_FOUND, "Token not found!"),
        undefined
      );
    }

    // check if token A suffice
    const balance = await tokenLookUp[symbolA].contract.methods
      .balanceOf(account)
      .call();

    const exchange = await ExchangeModel.find({
      symbolA: symbolA,
      symbolB: symbolB,
    });

    const scale = exchange[0].scale;

    if (balance < amountB / scale)
      callback(
        new ServiceError(
          status.FAILED_PRECONDITION,
          "Insufficient amount to commit the trade"
        ),
        undefined
      );

    const tokenReserve = tokenLookUp[symbolB].contract.methods
      .balanceOf(dexService.address)
      .call();

    if (tokenReserve < amountB)
      callback(
        new ServiceError(
          status.OUT_OF_RANGE,
          "Sorry, but currently the reserve does not have that amount ready"
        ),
        undefined
      );

    // Trading event
    /**
     * Method 1
     *
     * Use dex contract
     */
    // const buyReceipt = await tokenLookUp[symbolB].buy().send(
    //   {
    //     from: account,
    //     gas: 300000,
    //     value: web3Instance.utils.toWei(amountB.toString(), "ether"),
    //   },
    //   (error: Error, hash: string) => {
    //     if (error) {
    //       logger.error(error.message);
    //       callback(new ServiceError(status.INTERNAL, error.message), undefined);
    //     } else logger.info(`New Hash [Buy]: ${hash}`);
    //   }
    // );

    // const sellReceipt = await tokenLookUp[symbolA].sell(amountB / scale).send(
    //   {
    //     from: account,
    //     gas: 300000,
    //   },
    //   (error: Error, hash: string) => {
    //     if (error) {
    //       logger.error(error.message);
    //       callback(new ServiceError(status.INTERNAL, error.message), undefined);
    //     } else logger.info(`New Hash [Sell]: ${hash}`);
    //   }
    // );
    /**
     * Method 2
     *
     * Use token contract
     */
    const sellReceipt = await tokenLookUp[symbolA].contract.methods
      .transfer(
        process.env.BROKER_ACCOUNT ||
          "0xc940848722a5FFdCA942FaD0935d88D7E11e6B54", // Broker
        web3Instance.utils.toWei((amountB / scale).toString(), "Gwei")
      )
      .send({ from: account }, (error, hash) => {
        if (error) {
          logger.error(`Sell Error: ${error.message}`);
          callback(new ServiceError(status.INTERNAL, error.message), undefined);
        } else logger.info(`${account} has sold ${symbolA} on hash: ${hash}`);
      });

    const buyReceipt = await tokenLookUp[symbolB].contract.methods
      .transfer(account, web3Instance.utils.toWei(amountB.toString(), "Gwei"))
      .send(
        {
          from:
            process.env.BROKER_ACCOUNT ||
            "0xc940848722a5FFdCA942FaD0935d88D7E11e6B54",
        }, // Broker
        (error, hash) => {
          if (error) {
            logger.error(`Buy Error: ${error}`);
            callback(
              new ServiceError(status.INTERNAL, error.message),
              undefined
            );
          } else logger.info(`${account} has sold ${symbolB} on hash: ${hash}`);
        }
      );

    // Create receipt
    const newOrderReceipt = new OrderResponse();
    newOrderReceipt.setReceipt(
      JSON.stringify({
        sell: sellReceipt,
        buy: buyReceipt,
      })
    );

    const currentTime = new Date();

    newOrderReceipt.setCreatedat(currentTime.toDateString());

    callback(null, newOrderReceipt);
  };
}
