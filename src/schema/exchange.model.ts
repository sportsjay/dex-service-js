import { Schema, model } from "mongoose";

export interface ExchangeInterface {
  symbolA: string;
  symbolB: string;
  scale: number;
}

interface ExchangeDocument extends ExchangeInterface, Document {}

export const ExchangeSchema = new Schema<ExchangeDocument>(
  {
    symbolA: {
      type: String,
      required: true,
    }, // exchange from
    symbolB: {
      type: String,
      required: true,
    }, // exchange to
    scale: {
      type: Number,
      required: true,
    }, // 1 symbol A : scale symbol B
  },
  {
    _id: false,
    id: true,
    timestamps: true,
  }
);

export const ExchangeModel = model("Exchange", ExchangeSchema);
