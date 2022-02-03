// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var order_pb = require('./order_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orders_OrderItem(arg) {
  if (!(arg instanceof order_pb.OrderItem)) {
    throw new Error('Expected argument of type orders.OrderItem');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orders_OrderItem(buffer_arg) {
  return order_pb.OrderItem.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orders_OrderItems(arg) {
  if (!(arg instanceof order_pb.OrderItems)) {
    throw new Error('Expected argument of type orders.OrderItems');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orders_OrderItems(buffer_arg) {
  return order_pb.OrderItems.deserializeBinary(new Uint8Array(buffer_arg));
}


var OrderService = exports.OrderService = {
  getAll: {
    path: '/orders.Order/GetAll',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: order_pb.OrderItems,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_orders_OrderItems,
    responseDeserialize: deserialize_orders_OrderItems,
  },
  createOne: {
    path: '/orders.Order/CreateOne',
    requestStream: false,
    responseStream: false,
    requestType: order_pb.OrderItem,
    responseType: order_pb.OrderItem,
    requestSerialize: serialize_orders_OrderItem,
    requestDeserialize: deserialize_orders_OrderItem,
    responseSerialize: serialize_orders_OrderItem,
    responseDeserialize: deserialize_orders_OrderItem,
  },
};

exports.OrderClient = grpc.makeGenericClientConstructor(OrderService);
