export class DIContainer {
  private static readonly container = new Map<string, unknown>();

  public static register<T>(token: string, implementation: T): void {
    this.container.set(token, implementation);
  }

  public static resolve<T>(token: string): T {
    const implementation = this.container.get(token);
    if (!implementation) {
      throw new Error(`Implementation for token ${token} not found`);
    }
    return implementation as T;
  }
}
