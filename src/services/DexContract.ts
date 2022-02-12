import Web3 from "web3";
import { Contract } from "web3-eth-contract";

// import ABI
import DEXContractABI from "../abi/DEXContract.json";

export class DexService {
  public contract: Contract;
  public address: string = DEXContractABI.networks[5777].address;

  constructor() {
    const web3Instance = new Web3("http://localhost:8545");

    this.contract = new web3Instance.eth.Contract(
      DEXContractABI.abi as any as AbiItem,
      DEXContractABI.networks[5777].address
    );
  }
}

export const dexService = new DexService();
