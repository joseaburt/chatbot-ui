import { ChatService } from "./chat.service";
import { StorageService } from "./storage.service";

const ThreadId = "123";
const BaseUrl = "https://example.com";

describe("ChatService", () => {
  let chatService: ChatService;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    StorageService.setThreadIdKey("ThreadId");
    StorageService.saveThreadId(ThreadId);
    StorageService.saveBaseUrl(BaseUrl);
    chatService = new ChatService();
  });

  describe("sendMessage", () => {
    it("should call the fetch method with the correct parameters", async () => {
      mockFetch.mockResolvedValue({ ok: true } as unknown as Response);

      const message = "Hello, world!";
      await chatService.sendMessage(message);

      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe(`${BaseUrl}/chats/text/${ThreadId}`);
      expect(options.method).toBe("POST");
      expect(options.body).toBe(JSON.stringify({ message, language: "es" }));
      expect(options.headers).toEqual(expect.objectContaining({ "Thread-Id": ThreadId, "Content-Type": "application/json" }));
    });

    it("should throw an error if the fetch method fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false } as unknown as Response);
      const message = "Hello, world!";
      await expect(chatService.sendMessage(message)).rejects.toThrow("Failed to send text message");
    });
  });

  describe("sendFileMessage", () => {
    it("should call the fetch method with the correct parameters", async () => {
      mockFetch.mockResolvedValue({ ok: true } as unknown as Response);
      const mockFile = new File(["file content"], "test.txt", { type: "text/plain" });

      await chatService.sendFileMessage(mockFile);

      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe(`${BaseUrl}/chats/upload/${ThreadId}`);

      expect(options.method).toBe("POST");

      const formData = options.body as FormData;
      expect(formData.get("file")).toBe(mockFile);
      expect(formData.get("language")).toBe("es");

      expect(options.headers).toEqual(expect.objectContaining({ "Thread-Id": ThreadId }));
    });

    it("should throw an error if the fetch method fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false } as unknown as Response);
      const mockFile = new File(["file content"], "test.txt", { type: "text/plain" });
      await expect(chatService.sendFileMessage(mockFile)).rejects.toThrow("Failed to send file message");
    });
  });
});
