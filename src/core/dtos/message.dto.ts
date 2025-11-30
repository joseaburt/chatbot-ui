export type MessageRole = "customer" | "user_support" | "assistant";

export interface Writer {
  id: string;
  fullName: string;
  createdAt: string;
  role: MessageRole;
}

export interface BaseMessage {
  _id: string;
  writer: Writer;
  createdAt: string;
}

export interface TextMessage {
  type: "text";
  text: string;
}

export interface ImageMessage {
  type: "image";
  name: string;
  url: string;
}

export interface ErrorMessage {
  type: "error";
}

export interface UIComponentMessage {
  type: "ui-component";
  name: string;
  props: string;
}

export type FileMessage = {
  type: "file";
  name: string;
  url: string;
  text: string;
  thumbnail: string;
};

export type ResolutionMessage = {
  type: "resolution";
  text: string;
};

export type MessageDTO = BaseMessage & (TextMessage | ImageMessage | UIComponentMessage | FileMessage | ResolutionMessage | ErrorMessage);
export type MessageType = MessageDTO["type"];
