import { ChatService } from "./chat.service";
import { StorageService } from "./storage.service";

const ThreadId = "123";
const BaseUrl = "https://example.com";

describe("ChatService", () => {
  let chatService: ChatService;

  beforeEach(() => {
    global.fetch = jest.fn();
    StorageService.setThreadIdKey("ThreadId");
    StorageService.saveThreadId(ThreadId);
    StorageService.saveBaseUrl(BaseUrl);
    chatService = new ChatService();
  });

  describe("sendMessage", () => {
    it("should call the fetch method with the correct parameters", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: true } as unknown as Response);

      const message = "Hello, world!";
      await chatService.sendMessage(message);
      expect(global.fetch).toHaveBeenCalledWith(`${BaseUrl}/chats/text/${ThreadId}`, {
        method: "POST",
        body: JSON.stringify({ message, language: "es" }),
        headers: expect.objectContaining({
          "Thread-Id": ThreadId,
          "Content-Type": "application/json",
        }),
      });
    });

    it("should throw an error if the fetch method fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({ ok: false } as unknown as Response);
      const message = "Hello, world!";
      await expect(chatService.sendMessage(message)).rejects.toThrow("Failed to send text message");
    });
  });
});
