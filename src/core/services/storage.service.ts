export class StorageService {
  public static getBaseUrlOrThrow() {
    const url = localStorage.getItem("baseUrl");
    if (!url) {
      throw new Error("Base URL not found");
    }
    return url;
  }

  public static saveBaseUrl(baseUrl: string) {
    localStorage.setItem("baseUrl", baseUrl);
  }

  public static deleteBaseUrl() {
    localStorage.removeItem("baseUrl");
  }

  //

  public static setThreadIdKey(key: string) {
    localStorage.setItem("ThreadIdKey", key);
  }

  private static getThreadIdKey() {
    return localStorage.getItem("ThreadIdKey");
  }

  public static getThreadId() {
    const key = this.getThreadIdKey();
    if (!key) throw new Error("Thread ID is not set.");
    return localStorage.getItem(key);
  }

  public static saveThreadId(threadId: string) {
    const key = this.getThreadIdKey();
    if (!key) throw new Error("Thread ID is not set.");
    localStorage.setItem(key, threadId);
  }

  public static deleteThreadId() {
    const key = this.getThreadIdKey();
    if (!key) return;
    localStorage.removeItem(key);
  }
}
