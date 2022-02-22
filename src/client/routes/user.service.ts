import { Router, Request, Response } from "express";
import Web3 from "web3";

const router = Router();
const web3Instance = new Web3("http://localhost:8545");

router.route("/").get(async (req: Request, res: Response) => {
  try {
    const accounts = await web3Instance.eth.getAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/:id").get(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const account = (await web3Instance.eth.getAccounts()).find(
      (_acc) => id === _acc
    );

    if (!account) throw new Error("Account ID not found!");

    res.json(account);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
