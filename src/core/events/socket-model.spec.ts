import { Socket } from "socket.io-client";
import { SocketModel } from "./socket-model";
import { StorageService } from "@core/services/storage.service";

const mockSocket = {
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
};

describe("SocketModel", () => {
  let socketModel: SocketModel;
  beforeEach(() => {
    socketModel = new SocketModel(mockSocket as unknown as Socket);
  });

  describe("emitUserIsOnline", () => {
    it("should emit the customer is online event", () => {
      const threadId = "123";
      jest.spyOn(StorageService, "getThreadIdKey").mockReturnValue("ThreadId");
      jest.spyOn(StorageService, "getThreadId").mockReturnValue(threadId);

      socketModel.emitUserIsOnline();
      expect(mockSocket.emit).toHaveBeenCalledWith("user.online", threadId);
    });
  });

  describe("onMessageSent", () => {
    it("should add a listener for the message sent event", () => {
      const handler = jest.fn();
      socketModel.onMessageSent(handler);
      expect(mockSocket.on).toHaveBeenCalledWith("message.sent", handler);
    });
  });

  describe("onUserWriting", () => {
    it("should add a listener for the user writing event", () => {
      const handler = jest.fn();
      socketModel.onUserWriting(handler);
      expect(mockSocket.on).toHaveBeenCalledWith("user.writing", handler);
    });
  });

  describe("onUserConnect", () => {
    it("should add a listener for the user connect event", () => {
      const handler = jest.fn();
      socketModel.onUserConnect(handler);
      expect(mockSocket.on).toHaveBeenCalledWith("USER_SUPPORT_CONNECTED", handler);
    });
  });

  describe("onUserDisconnect", () => {
    it("should add a listener for the user disconnect event", () => {
      const handler = jest.fn();
      socketModel.onUserDisconnect(handler);
      expect(mockSocket.on).toHaveBeenCalledWith("USER_SUPPORT_DISCONNECTED", handler);
    });
  });
});
