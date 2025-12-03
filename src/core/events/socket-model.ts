import { Socket } from "socket.io-client";
import { WritingUserWsEvent } from "./types";
import { StorageService } from "@core/services/storage.service";

export class SocketModel {
  constructor(private readonly socket: Socket, private readonly storageService: StorageService) {}

  private addListener<T = unknown>(event: string, handler: (data: T) => void) {
    this.socket.on(event, handler);
    return () => {
      this.socket.off(event, handler);
    };
  }

  public emitUserIsOnline() {
    this.socket.emit("user.online", this.storageService.getThreadId());
  }

  public onMessageSent(handler: (data: { user: { threadId: string } }) => void) {
    return this.addListener("message.sent", handler);
  }

  public onUserWriting(handler: (data: WritingUserWsEvent) => void) {
    return this.addListener<WritingUserWsEvent>("user.writing", handler);
  }

  public onUserConnect<T = unknown>(handler: (data: T) => void) {
    return this.addListener("USER_SUPPORT_CONNECTED", handler);
  }

  public onUserDisconnect<T = unknown>(handler: (data: T) => void) {
    return this.addListener("USER_SUPPORT_DISCONNECTED", handler);
  }
}
