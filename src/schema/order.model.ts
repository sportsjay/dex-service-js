import { Schema, model } from "mongoose";

export interface OrderInterface {
  issuer: string;
  symbolA: string;
  symbolB: string;
  amountB: number;
}

interface OrderDocument extends OrderInterface, Document {}

export const OrderSchema = new Schema<OrderDocument>(
  {
    issuer: {
      type: String,
      required: true,
    },
    symbolA: {
      type: String,
      required: true,
    }, // exchange from
    symbolB: {
      type: String,
      required: true,
    }, // exchange to
    amountB: {
      type: Number,
      required: true,
      min: 0,
    }, // amount of token B
  },
  {
    _id: false,
    id: true,
    timestamps: true,
  }
);

export const OrderModel = model("Order", OrderSchema);
