import { BaseService } from "./base.service";

export class ChatService extends BaseService {
  public async threadExists(): Promise<boolean> {
    const { headers, threadId } = this.getThreadAndHeader();

    const response = await fetch(this.url(`/chats/${threadId}/exists`), {
      headers,
    });

    return response.ok;
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
}
