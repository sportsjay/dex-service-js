import {
  UntypedHandleCall,
  handleServerStreamingCall,
  handleUnaryCall,
  status,
} from "@grpc/grpc-js";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { IOrderServer } from "../proto/order_grpc_pb";
import { OrderItems, OrderItem } from "../proto/order_pb";
import { ServiceError } from "../utils/error";
import { logger } from "../logger";
import { OrderModel } from "src/schema/order.model";

interface OrderProperties {
  id: number;
  symbola: string; // exchange from
  symbolb: string; // exchange to
  amountb: number; // amount of token B
  createdat: string;
}

// const orderList: OrderProperties[] = [
//   {
//     id: 1,
//     symbola: "A",
//     symbolb: "B",
//     amountb: 100,
//     createdat: `${new Date().toISOString()}`,
//   },
//   {
//     id: 2,
//     symbola: "A",
//     symbolb: "B",
//     amountb: 100,
//     createdat: `${new Date().toISOString()}`,
//   },
// ];

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

  createOne: handleUnaryCall<OrderItem, OrderItem> = (call, callback) => {
    const newOrder = call.request;
    // check if account exists

    // do look up for token exchange contract

    // check if token A suffice
    if (!newOrder.getSymbola() || !newOrder.getSymbolb())
      callback(
        new ServiceError(status.NOT_FOUND, "Token not found!"),
        undefined
      );
    // check if token B is in "vault"

    // if amount B available in "vault", assign token B ordered by time and amount
    // note: amount must be equal

    // if n > 0 after transaction, save to order table

    // orderList.push(OrderItem.toObject(true, newOrder));

    callback(null, newOrder);
  };
}
