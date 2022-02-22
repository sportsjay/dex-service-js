import { Router, Request, Response } from "express";
import MTAContractABI from "../../abi/MTA.json";
import MTBContractABI from "../../abi/MTB.json";
import MTCContractABI from "../../abi/MTC.json";
import MTDContractABI from "../../abi/MTD.json";
import Web3 from "web3";
import { logger } from "../../logger";

const router = Router();

const web3Instance = new Web3("http://localhost:8545");

// Token Contracts
const MTAContract = new web3Instance.eth.Contract(
  MTAContractABI.abi as any as AbiItem,
  MTAContractABI.networks[5777].address
);
const MTBContract = new web3Instance.eth.Contract(
  MTBContractABI.abi as any as AbiItem,
  MTBContractABI.networks[5777].address
);
const MTCContract = new web3Instance.eth.Contract(
  MTCContractABI.abi as any as AbiItem,
  MTCContractABI.networks[5777].address
);
const MTDContract = new web3Instance.eth.Contract(
  MTDContractABI.abi as any as AbiItem,
  MTDContractABI.networks[5777].address
);

router.route("/").get((req: Request, res: Response) => {});

router.route("/:symbol").get(async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const user = req.headers["user"];

  switch (symbol) {
    case "MTA": {
      MTAContract.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: "latest",
        filter: {
          _from: user ?? null,
        },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          logger.error(error);
          res.status(400).json(error);
        });
      break;
    }
    case "MTB": {
      MTBContract.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: "latest",
        filter: {
          _from: user ?? null,
        },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          logger.error(error);
          res.status(400).json(error);
        });
      break;
    }
    case "MTC": {
      MTCContract.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: "latest",
        filter: {
          _from: user ?? null,
        },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          logger.error(error);
          res.status(400).json(error);
        });
      break;
    }
    case "MTD": {
      MTDContract.getPastEvents("Transfer", {
        fromBlock: 0,
        toBlock: "latest",
        filter: {
          _from: user ?? null,
        },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          logger.error(error);
          res.status(400).json(error);
        });
      break;
    }
    default: {
      res.status(400).json({
        message: "Symbol does not exist!",
      });
    }
  }
});

router.route("/balance/:user").get(async (req: Request, res: Response) => {
  try {
    const { user } = req.params;

    if (!user) throw new Error("Account not found!");

    const balances = {};

    const MTA = await MTAContract.methods.balanceOf(user).call();
    const MTB = await MTBContract.methods.balanceOf(user).call();
    const MTC = await MTCContract.methods.balanceOf(user).call();
    const MTD = await MTDContract.methods.balanceOf(user).call();

    balances["MTA"] = MTA;
    balances["MTB"] = MTB;
    balances["MTC"] = MTC;
    balances["MTD"] = MTD;

    res.json(balances);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
