// package: tokens
// file: token.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class DexTopupResponse extends jspb.Message { 
    getMsg(): string;
    setMsg(value: string): DexTopupResponse;
    getReceipt(): string;
    setReceipt(value: string): DexTopupResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DexTopupResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DexTopupResponse): DexTopupResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DexTopupResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DexTopupResponse;
    static deserializeBinaryFromReader(message: DexTopupResponse, reader: jspb.BinaryReader): DexTopupResponse;
}

export namespace DexTopupResponse {
    export type AsObject = {
        msg: string,
        receipt: string,
    }
}

export class DexTopupRequest extends jspb.Message { 
    getAmount(): number;
    setAmount(value: number): DexTopupRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DexTopupRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DexTopupRequest): DexTopupRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DexTopupRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DexTopupRequest;
    static deserializeBinaryFromReader(message: DexTopupRequest, reader: jspb.BinaryReader): DexTopupRequest;
}

export namespace DexTopupRequest {
    export type AsObject = {
        amount: number,
    }
}

export class TokenItem extends jspb.Message { 
    getSymbol(): string;
    setSymbol(value: string): TokenItem;
    getAvailableamount(): number;
    setAvailableamount(value: number): TokenItem;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenItem.AsObject;
    static toObject(includeInstance: boolean, msg: TokenItem): TokenItem.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenItem, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenItem;
    static deserializeBinaryFromReader(message: TokenItem, reader: jspb.BinaryReader): TokenItem;
}

export namespace TokenItem {
    export type AsObject = {
        symbol: string,
        availableamount: number,
    }
}

export class TokenRequest extends jspb.Message { 
    getSymbol(): string;
    setSymbol(value: string): TokenRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TokenRequest): TokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TokenRequest;
    static deserializeBinaryFromReader(message: TokenRequest, reader: jspb.BinaryReader): TokenRequest;
}

export namespace TokenRequest {
    export type AsObject = {
        symbol: string,
    }
}
