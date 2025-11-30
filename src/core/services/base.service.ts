import { FilterDTO } from "../dtos/base";
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

  protected queryToString<T extends FilterDTO>(filters: T): string {
    const q = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (value instanceof Date) {
          q.set(key, value.toISOString());
        } else {
          q.set(key, value.toString());
        }
      }
    });
    return q.toString();
  }

  protected queryUrl(endpoint: string, filters: FilterDTO) {
    return `${this.url(endpoint)}?${this.queryToString(filters)}`;
  }
}
