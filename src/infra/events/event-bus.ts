export type Handler<T> = (payload: T) => void | Promise<void>;
type AnyHandler = (payload: unknown) => void | Promise<void>;
type EventMap = Record<string, unknown>;

export class EventBus<E extends EventMap = Record<string, unknown>> {
  private readonly listeners = new Map<keyof E, Set<AnyHandler>>();

  public on<K extends keyof E>(event: K, handler: Handler<E[K]>): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(handler as AnyHandler);
    return () => this.off(event, handler);
  }

  public emit<K extends keyof E>(event: K, payload: E[K]): void {
    console.log("emit", event, payload);
    const set = this.listeners.get(event);
    if (!set || set.size === 0) return;
    for (const fn of Array.from(set)) {
      try {
        (fn as Handler<E[K]>)(payload);
      } catch (err) {
        queueMicrotask(() => {
          throw err;
        });
      }
    }
  }

  private off<K extends keyof E>(event: K, handler?: Handler<E[K]>): void {
    const set = this.listeners.get(event);
    if (!set) return;
    if (!handler) {
      this.listeners.delete(event);
      return;
    }
    set.delete(handler as AnyHandler);
    if (set.size === 0) this.listeners.delete(event);
  }

  public clear(): void {
    this.listeners.clear();
  }
}
