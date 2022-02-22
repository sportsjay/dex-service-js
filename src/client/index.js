const grpc = require("@grpc/grpc-js");
const { Empty } = require("google-protobuf/google/protobuf/empty_pb");
const { OrderItem } = require("../proto/order_pb");
const { OrderClient } = require("../proto/order_grpc_pb");
const { TokenClient } = require("../proto/token_grpc_pb");
const { TokenRequest, DexTopupRequest } = require("../proto/token_pb");

const client = new OrderClient(
  `localhost:${process.env.PORT || 4000}`,
  grpc.credentials.createInsecure()
);

let orderList = [];

function getItems() {
  try {
    const stream = client.getAll(new Empty());
    stream.on("data", (data) => {
      orderList = data.toObject().ordersList;
      console.log(orderList);
    });
    stream.on("close", () => {
      return orderList;
    });
    stream.on("error", (error) => {
      throw error;
    });
  } catch (error) {
    console.log(error);
  }
}

function createOrder() {
  const test = new OrderItem();

  test.setSymbola("MTA");
  test.setSymbolb("MTB");
  test.setAmountb(4);
  test.setIssuer("0xbAf22A5E23791e76199B118272E822f4A028F573");
  test.setCreatedat(`${new Date().toISOString()}`);

  client.createOne(test, (error, data) => {
    if (error) console.log(error);
    else if (data) console.log("data received", data.toObject());
  });
}

function getTokenBalance() {
  try {
    const test = new TokenClient(
      `localhost:${process.env.PORT || 4000}`,
      grpc.credentials.createInsecure()
    );
    const tokenReq = new TokenRequest();
    tokenReq.setSymbol("MTA");

    test.getToken(tokenReq, (error, data) => {
      if (error) console.log(error);
      else if (data) console.log("token balance:", data.toObject());
    });
  } catch (error) {
    console.error(error);
  }
}

function topUpDex() {
  try {
    const test = new TokenClient(
      `localhost:${process.env.PORT || 4000}`,
      grpc.credentials.createInsecure()
    );
    const dexTopUpRequest = new DexTopupRequest();
    dexTopUpRequest.setAmount(150);

    test.dexTopupEther(dexTopUpRequest, (error, response) => {
      if (error) throw error;
      else if (response) console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
}

async function run() {
  // getItems();
  // createOrder();
  // topUpDex();
  getTokenBalance();
}

run();
