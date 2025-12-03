export type EventMap = Record<string, unknown>;
export type Handler<T> = (payload: T) => void | Promise<void>;

export interface Bus<E extends EventMap = Record<string, unknown>> {
  on<K extends keyof E>(event: K, handler: Handler<E[K]>): () => void;
  emit<K extends keyof E>(event: K, payload: E[K]): void;
}
