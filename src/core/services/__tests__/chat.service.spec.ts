import { ChatService } from "@core/services/chat.service";
import { StorageService } from "@core/services/storage.service";

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

  describe("threadExists", () => {
    it("should call the fetch method with the correct parameters", async () => {
      mockFetch.mockResolvedValue({ ok: true } as unknown as Response);
      const exists = await chatService.threadExists();
      expect(exists).toBeTruthy();
    });

    it("should call the fetch method with the correct parameters", async () => {
      mockFetch.mockResolvedValue({ ok: false } as unknown as Response);
      const exists = await chatService.threadExists();
      expect(exists).toBeFalsy();
    });
  });

  describe("intChat", () => {
    const geo = { country_name: "United States", city: "New York", region: "NY", latitude: 40.7128, longitude: -74.006, languages: "en-US", country_calling_code: "+1" };
    const ip = "194.116.220.0";
    const browser = "unknown";

    it("should call the fetch method with the correct parameters", async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ ip }) } as unknown as Response)
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(geo) } as unknown as Response)
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ threadId: ThreadId }) } as unknown as Response);

      const threadId = await chatService.intChat();
      expect(threadId).toBe(ThreadId);

      const [url, options] = mockFetch.mock.calls[2];
      expect(url).toBe(`${BaseUrl}/chats/threads`);

      expect(options.method).toBe("POST");
      expect(options.body).toBe(
        JSON.stringify({
          ip,
          browser,
          ...{
            country: geo.country_name,
            city: geo.city,
            region: geo.region,
            latitude: geo.latitude,
            longitude: geo.longitude,
            language: "en-US",
            countryPhoneCode: geo.country_calling_code,
          },
        })
      );
    });

    it("should throw an error if the fetch method fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false } as unknown as Response);
      await expect(chatService.intChat()).rejects.toThrow("Failed to initialize chat");
    });
  });

  describe("getMessages", () => {
    it("should call the fetch method with the correct parameters", async () => {
      mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [], meta: { total: 0, page: 1, pageSize: 10 } }) } as unknown as Response);
      await chatService.getMessages({});
      const [url] = mockFetch.mock.calls[0];
      expect(url).toBe(`${BaseUrl}/chats/messages/${ThreadId}?`);
    });

    it("should call the fetch method with the correct query string", async () => {
      mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [], meta: { total: 0, page: 1, pageSize: 10 } }) } as unknown as Response);
      await chatService.getMessages({ page: 1, pageSize: 10, orderBy: "createdAt", order: "desc" });
      const [url] = mockFetch.mock.calls[0];
      expect(url).toBe(`${BaseUrl}/chats/messages/${ThreadId}?page=1&pageSize=10&orderBy=createdAt&order=desc`);
    });

    it("should return the same data as the fetch method", async () => {
      mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [], meta: { total: 0, page: 1, pageSize: 10 } }) } as unknown as Response);
      const messages = await chatService.getMessages({ page: 1, pageSize: 10, orderBy: "createdAt", order: "desc" });
      expect(messages).toEqual({ data: [], meta: { total: 0, page: 1, pageSize: 10 } });
    });
  });
});
