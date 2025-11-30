import { BaseService } from "./base.service";

export class ChatService extends BaseService {
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
}
