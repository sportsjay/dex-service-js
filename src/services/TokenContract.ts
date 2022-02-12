import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import MTA from "../abi/MTA.json";
import MTB from "../abi/MTB.json";
import MTC from "../abi/MTC.json";
import MTD from "../abi/MTD.json";

export class MTAService {
  public contract: Contract;

  constructor() {
    const web3Instance = new Web3("http://localhost:8545");
    this.contract = new web3Instance.eth.Contract(
      MTA.abi as any as AbiItem,
      MTA.networks[5777].address
    );
  }
}
export const mtaService = new MTAService();

export class MTBService {
  public contract: Contract;

  constructor() {
    const web3Instance = new Web3("http://localhost:8545");
    this.contract = new web3Instance.eth.Contract(
      MTB.abi as any as AbiItem,
      MTB.networks[5777].address
    );
  }
}
export const mtbService = new MTBService();

export class MTCService {
  public contract: Contract;

  constructor() {
    const web3Instance = new Web3("http://localhost:8545");
    this.contract = new web3Instance.eth.Contract(
      MTC.abi as any as AbiItem,
      MTC.networks[5777].address
    );
  }
}
export const mtcService = new MTCService();

export class MTDService {
  public contract: Contract;

  constructor() {
    const web3Instance = new Web3("http://localhost:8545");
    this.contract = new web3Instance.eth.Contract(
      MTD.abi as any as AbiItem,
      MTD.networks[5777].address
    );
  }
}
export const mtdService = new MTDService();
