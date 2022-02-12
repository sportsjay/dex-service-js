import { Server, ServerCredentials } from "@grpc/grpc-js";
import mongoose from "mongoose";
import { OrderService } from "./proto/order_grpc_pb";
import { OrderServer, TokenServer } from "./services";
import { logger } from "./logger";
import { TokenService } from "./proto/token_grpc_pb";
import { addInitialData } from "./initial-data";
import dotenv from "dotenv";

/**
 * Starts an RPC server that receives requests for the Order service at the
 * sample server port
 */
export async function main() {
  const server = new Server();

  dotenv.config();

  const port = process.env.PORT || 4000;
  // Map Services
  server.addService(OrderService, new OrderServer());
  server.addService(TokenService, new TokenServer());

  mongoose.connect(
    process.env.DB_URL || "mongodb://localhost:27017/dex-database"
  );
  const connection = mongoose.connection;
  connection.once("open", () => {
    logger.info("Connect to db successful!");
  });

  // Add initial data to the database
  addInitialData();

  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        throw err;
      }
      logger.info(`Listening on ${port}`);
      server.start();
    }
  );
}
