import { Router, Request, Response } from "express";
import { OrderClient } from "../../proto/order_grpc_pb";
import { credentials } from "@grpc/grpc-js";
import { OrderItem } from "../../proto/order_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { ExchangeModel } from "../../schema/exchange.model";
const router = Router();

router
  .route("/")
  .get((req: Request, res: Response) => {
    let orderList = [];
    const client = new OrderClient(
      `localhost:${process.env.PORT || 4000}`,
      credentials.createInsecure()
    );
    const stream = client.getAll(new Empty());
    stream.on("data", (data) => {
      orderList = data.toObject().ordersList;
      console.log(orderList);
    });
    stream.on("close", () => {
      res.json({
        orderList,
      });
    });
    stream.on("error", (error) => {
      return res.status(400).json(error);
    });
  })
  .post((req: Request, res: Response) => {
    const { symbolA, symbolB, amountB, issuer } = req.body;
    const client = new OrderClient(
      `localhost:${process.env.PORT || 4000}`,
      credentials.createInsecure()
    );
    const newOrder = new OrderItem();

    if (symbolA === symbolB)
      throw new Error("Exchange cannot be of the same token!");
    if (!issuer) throw new Error("issuer required!");
    if (amountB < 0) throw new Error("amount cannot be negative!");

    newOrder.setSymbola(symbolA);
    newOrder.setSymbolb(symbolB);
    newOrder.setAmountb(amountB);
    newOrder.setIssuer(issuer);
    newOrder.setCreatedat(`${new Date().toISOString()}`);

    client.createOne(newOrder, (error, data) => {
      if (error) res.status(400).json(error);
      else if (data) res.json(data.toObject());
    });
  });

router
  .route("/rate/from=:from/to=:to")
  .get(async (req: Request, res: Response) => {
    const { from, to } = req.params;
    try {
      let exchange = await ExchangeModel.findOne({
        symbolA: from,
        symbolB: to,
      });
      if (exchange)
        return res.json({
          symbolA: from,
          symbolB: to,
          scale: exchange.scale,
        });

      exchange = await ExchangeModel.findOne({
        symbolA: to,
        symbolB: from,
      });
      if (exchange)
        return res.json({
          symbolA: from,
          symbolB: to,
          scale: 1 / exchange.scale,
        });

      throw new Error("not found!");
    } catch (error) {
      res.status(400).json(error);
    }
  });

export default router;
