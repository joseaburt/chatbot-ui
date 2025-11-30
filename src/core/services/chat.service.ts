import { IpService } from "./ip.service";
import { GeoService } from "./geo.service";
import { BaseService } from "./base.service";
import { MessageDTO } from "../dtos/message.dto";
import { StorageService } from "./storage.service";
import { CollectionRes, FilterDTO } from "../dtos/base";

export class ChatService extends BaseService {
  public async threadExists(): Promise<boolean> {
    const { headers, threadId } = this.getThreadAndHeader();

    const response = await fetch(this.url(`/chats/${threadId}/exists`), {
      headers,
    });

    return response.ok;
  }

  public async intChat() {
    try {
      StorageService.deleteThreadId();
      const ip = await IpService.getIp();
      const geo = await GeoService.findGeoMetaFromIp(ip);
      const browser = GeoService.getBrowserProvider();

      const payload = { ip, browser, ...geo };
      const response = await fetch(this.url(`/chats/threads`), {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize chat.");
      }

      const data = await response.json();
      StorageService.saveThreadId(data.threadId);
      return data.threadId;
    } catch (error) {
      throw new Error("Failed to initialize chat: " + (error as Error).message);
    }
  }

  public async sendMessage(message: string): Promise<void> {
    const { headers, threadId } = this.getThreadAndHeader();
    headers["Content-Type"] = "application/json";

    const response = await fetch(this.url(`/chats/text/${threadId}`), {
      method: "POST",
      body: JSON.stringify({ message, language: "es" }),
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to send text message");
    }
  }

  public async sendFileMessage(file: File): Promise<void> {
    const { headers, threadId } = this.getThreadAndHeader();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "es");

    const response = await fetch(this.url(`/chats/upload/${threadId}`), {
      method: "POST",
      body: formData,
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to send file message");
    }
  }

  public async getMessages(query: FilterDTO): Promise<CollectionRes<MessageDTO>> {
    const { headers, threadId } = this.getThreadAndHeader();
    headers["Content-Type"] = "application/json";

    const response = await fetch(this.queryUrl(`/chats/messages/${threadId}`, query), {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to get messages");
    }

    const data = await response.json();
    return data as CollectionRes<MessageDTO>;
  }
}
