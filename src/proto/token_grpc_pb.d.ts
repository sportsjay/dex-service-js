// package: tokens
// file: token.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as token_pb from "./token_pb";

interface ITokenService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getToken: ITokenService_IGetToken;
    dexTopupEther: ITokenService_IDexTopupEther;
}

interface ITokenService_IGetToken extends grpc.MethodDefinition<token_pb.TokenRequest, token_pb.TokenItem> {
    path: "/tokens.Token/GetToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<token_pb.TokenRequest>;
    requestDeserialize: grpc.deserialize<token_pb.TokenRequest>;
    responseSerialize: grpc.serialize<token_pb.TokenItem>;
    responseDeserialize: grpc.deserialize<token_pb.TokenItem>;
}
interface ITokenService_IDexTopupEther extends grpc.MethodDefinition<token_pb.DexTopupRequest, token_pb.DexTopupResponse> {
    path: "/tokens.Token/DexTopupEther";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<token_pb.DexTopupRequest>;
    requestDeserialize: grpc.deserialize<token_pb.DexTopupRequest>;
    responseSerialize: grpc.serialize<token_pb.DexTopupResponse>;
    responseDeserialize: grpc.deserialize<token_pb.DexTopupResponse>;
}

export const TokenService: ITokenService;

export interface ITokenServer extends grpc.UntypedServiceImplementation {
    getToken: grpc.handleUnaryCall<token_pb.TokenRequest, token_pb.TokenItem>;
    dexTopupEther: grpc.handleUnaryCall<token_pb.DexTopupRequest, token_pb.DexTopupResponse>;
}

export interface ITokenClient {
    getToken(request: token_pb.TokenRequest, callback: (error: grpc.ServiceError | null, response: token_pb.TokenItem) => void): grpc.ClientUnaryCall;
    getToken(request: token_pb.TokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: token_pb.TokenItem) => void): grpc.ClientUnaryCall;
    getToken(request: token_pb.TokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: token_pb.TokenItem) => void): grpc.ClientUnaryCall;
    dexTopupEther(request: token_pb.DexTopupRequest, callback: (error: grpc.ServiceError | null, response: token_pb.DexTopupResponse) => void): grpc.ClientUnaryCall;
    dexTopupEther(request: token_pb.DexTopupRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: token_pb.DexTopupResponse) => void): grpc.ClientUnaryCall;
    dexTopupEther(request: token_pb.DexTopupRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: token_pb.DexTopupResponse) => void): grpc.ClientUnaryCall;
}

export class TokenClient extends grpc.Client implements ITokenClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getToken(request: token_pb.TokenRequest, callback: (error: grpc.ServiceError | null, response: token_pb.TokenItem) => void): grpc.ClientUnaryCall;
    public getToken(request: token_pb.TokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: token_pb.TokenItem) => void): grpc.ClientUnaryCall;
    public getToken(request: token_pb.TokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: token_pb.TokenItem) => void): grpc.ClientUnaryCall;
    public dexTopupEther(request: token_pb.DexTopupRequest, callback: (error: grpc.ServiceError | null, response: token_pb.DexTopupResponse) => void): grpc.ClientUnaryCall;
    public dexTopupEther(request: token_pb.DexTopupRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: token_pb.DexTopupResponse) => void): grpc.ClientUnaryCall;
    public dexTopupEther(request: token_pb.DexTopupRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: token_pb.DexTopupResponse) => void): grpc.ClientUnaryCall;
}
