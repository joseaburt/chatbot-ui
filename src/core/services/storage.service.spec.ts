import { StorageService } from "./storage.service";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("threadId", () => {
    it("should set the thread id key", () => {
      const spy = jest.spyOn(localStorage, "setItem");
      StorageService.setThreadIdKey("ThreadId");
      expect(spy).toHaveBeenCalledWith("ThreadIdKey", "ThreadId");
    });

    it("should get the thread id key", () => {
      StorageService.setThreadIdKey("ThreadId");
      StorageService.saveThreadId("123");
      expect(StorageService.getThreadId()).toBe("123");
      expect(localStorage.getItem("ThreadId")).toBe("123");
    });

    it("should delete the thread id", () => {
      StorageService.setThreadIdKey("ThreadId");
      StorageService.saveThreadId("123");
      StorageService.deleteThreadId();
      expect(StorageService.getThreadId()).toBeNull();
      expect(localStorage.getItem("ThreadId")).toBeNull();
    });
  });

  describe("baseUrl", () => {
    it("should set the base url in local storage", () => {
      StorageService.saveBaseUrl("https://example.com");
      expect(localStorage.getItem("baseUrl")).toBe("https://example.com");
    });

    it("should set the base url", () => {
      StorageService.saveBaseUrl("https://example.com");
      expect(StorageService.getBaseUrlOrThrow()).toBe("https://example.com");
    });

    it("should delete the base url", () => {
      StorageService.saveBaseUrl("https://example.com");
      StorageService.deleteBaseUrl();
      expect(() => StorageService.getBaseUrlOrThrow()).toThrow("Base URL not found");
      expect(localStorage.getItem("baseUrl")).toBeNull();
    });
  });
});
