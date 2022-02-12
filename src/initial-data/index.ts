import { logger } from "../logger";
import { ExchangeModel } from "../schema/exchange.model";
import data from "./exchange.json";

export async function addInitialData() {
  try {
    const exchangeList = await ExchangeModel.find();
    if (exchangeList.length > 0) return;

    const response = await ExchangeModel.collection.insertMany(data);
    logger.info(`Successfully inserted: ${response.insertedCount}`);
  } catch (error) {
    logger.error(error);
  }
}
