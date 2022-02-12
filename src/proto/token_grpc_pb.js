// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var token_pb = require('./token_pb.js');

function serialize_tokens_DexTopupRequest(arg) {
  if (!(arg instanceof token_pb.DexTopupRequest)) {
    throw new Error('Expected argument of type tokens.DexTopupRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tokens_DexTopupRequest(buffer_arg) {
  return token_pb.DexTopupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tokens_DexTopupResponse(arg) {
  if (!(arg instanceof token_pb.DexTopupResponse)) {
    throw new Error('Expected argument of type tokens.DexTopupResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tokens_DexTopupResponse(buffer_arg) {
  return token_pb.DexTopupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tokens_TokenItem(arg) {
  if (!(arg instanceof token_pb.TokenItem)) {
    throw new Error('Expected argument of type tokens.TokenItem');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tokens_TokenItem(buffer_arg) {
  return token_pb.TokenItem.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tokens_TokenRequest(arg) {
  if (!(arg instanceof token_pb.TokenRequest)) {
    throw new Error('Expected argument of type tokens.TokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tokens_TokenRequest(buffer_arg) {
  return token_pb.TokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TokenService = exports.TokenService = {
  getToken: {
    path: '/tokens.Token/GetToken',
    requestStream: false,
    responseStream: false,
    requestType: token_pb.TokenRequest,
    responseType: token_pb.TokenItem,
    requestSerialize: serialize_tokens_TokenRequest,
    requestDeserialize: deserialize_tokens_TokenRequest,
    responseSerialize: serialize_tokens_TokenItem,
    responseDeserialize: deserialize_tokens_TokenItem,
  },
  dexTopupEther: {
    path: '/tokens.Token/DexTopupEther',
    requestStream: false,
    responseStream: false,
    requestType: token_pb.DexTopupRequest,
    responseType: token_pb.DexTopupResponse,
    requestSerialize: serialize_tokens_DexTopupRequest,
    requestDeserialize: deserialize_tokens_DexTopupRequest,
    responseSerialize: serialize_tokens_DexTopupResponse,
    responseDeserialize: deserialize_tokens_DexTopupResponse,
  },
};

exports.TokenClient = grpc.makeGenericClientConstructor(TokenService);
