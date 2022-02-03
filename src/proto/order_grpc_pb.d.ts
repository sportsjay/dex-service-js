// package: orders
// file: order.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as order_pb from "./order_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IOrderService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getAll: IOrderService_IGetAll;
    createOne: IOrderService_ICreateOne;
}

interface IOrderService_IGetAll extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, order_pb.OrderItems> {
    path: "/orders.Order/GetAll";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<order_pb.OrderItems>;
    responseDeserialize: grpc.deserialize<order_pb.OrderItems>;
}
interface IOrderService_ICreateOne extends grpc.MethodDefinition<order_pb.OrderItem, order_pb.OrderItem> {
    path: "/orders.Order/CreateOne";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<order_pb.OrderItem>;
    requestDeserialize: grpc.deserialize<order_pb.OrderItem>;
    responseSerialize: grpc.serialize<order_pb.OrderItem>;
    responseDeserialize: grpc.deserialize<order_pb.OrderItem>;
}

export const OrderService: IOrderService;

export interface IOrderServer extends grpc.UntypedServiceImplementation {
    getAll: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, order_pb.OrderItems>;
    createOne: grpc.handleUnaryCall<order_pb.OrderItem, order_pb.OrderItem>;
}

export interface IOrderClient {
    getAll(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<order_pb.OrderItems>;
    getAll(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<order_pb.OrderItems>;
    createOne(request: order_pb.OrderItem, callback: (error: grpc.ServiceError | null, response: order_pb.OrderItem) => void): grpc.ClientUnaryCall;
    createOne(request: order_pb.OrderItem, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: order_pb.OrderItem) => void): grpc.ClientUnaryCall;
    createOne(request: order_pb.OrderItem, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: order_pb.OrderItem) => void): grpc.ClientUnaryCall;
}

export class OrderClient extends grpc.Client implements IOrderClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getAll(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<order_pb.OrderItems>;
    public getAll(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<order_pb.OrderItems>;
    public createOne(request: order_pb.OrderItem, callback: (error: grpc.ServiceError | null, response: order_pb.OrderItem) => void): grpc.ClientUnaryCall;
    public createOne(request: order_pb.OrderItem, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: order_pb.OrderItem) => void): grpc.ClientUnaryCall;
    public createOne(request: order_pb.OrderItem, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: order_pb.OrderItem) => void): grpc.ClientUnaryCall;
}
