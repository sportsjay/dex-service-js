// package: orders
// file: order.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class OrderItem extends jspb.Message { 
    getId(): number;
    setId(value: number): OrderItem;
    getIssuer(): string;
    setIssuer(value: string): OrderItem;
    getSymbola(): string;
    setSymbola(value: string): OrderItem;
    getSymbolb(): string;
    setSymbolb(value: string): OrderItem;
    getAmountb(): number;
    setAmountb(value: number): OrderItem;
    getCreatedat(): string;
    setCreatedat(value: string): OrderItem;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OrderItem.AsObject;
    static toObject(includeInstance: boolean, msg: OrderItem): OrderItem.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OrderItem, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OrderItem;
    static deserializeBinaryFromReader(message: OrderItem, reader: jspb.BinaryReader): OrderItem;
}

export namespace OrderItem {
    export type AsObject = {
        id: number,
        issuer: string,
        symbola: string,
        symbolb: string,
        amountb: number,
        createdat: string,
    }
}

export class OrderItems extends jspb.Message { 
    clearOrdersList(): void;
    getOrdersList(): Array<OrderItem>;
    setOrdersList(value: Array<OrderItem>): OrderItems;
    addOrders(value?: OrderItem, index?: number): OrderItem;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OrderItems.AsObject;
    static toObject(includeInstance: boolean, msg: OrderItems): OrderItems.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OrderItems, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OrderItems;
    static deserializeBinaryFromReader(message: OrderItems, reader: jspb.BinaryReader): OrderItems;
}

export namespace OrderItems {
    export type AsObject = {
        ordersList: Array<OrderItem.AsObject>,
    }
}

export class OrderResponse extends jspb.Message { 
    getReceipt(): string;
    setReceipt(value: string): OrderResponse;
    getCreatedat(): string;
    setCreatedat(value: string): OrderResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OrderResponse.AsObject;
    static toObject(includeInstance: boolean, msg: OrderResponse): OrderResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OrderResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OrderResponse;
    static deserializeBinaryFromReader(message: OrderResponse, reader: jspb.BinaryReader): OrderResponse;
}

export namespace OrderResponse {
    export type AsObject = {
        receipt: string,
        createdat: string,
    }
}
