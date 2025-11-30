import { StorageService } from "./storage.service";

export abstract class BaseService {
  protected url(endpoint: string) {
    return `${StorageService.getBaseUrlOrThrow()}${endpoint}`;
  }

  protected getThreadAndHeader() {
    const threadId = StorageService.getThreadId();
    if (!threadId) {
      throw new Error("Thread ID is required");
    }
    const headers: Record<string, string> = {
      "Thread-Id": threadId,
    };
    return { headers, threadId };
  }
}
