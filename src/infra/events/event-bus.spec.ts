import { EventBus } from "./event-bus";

describe("EventBus", () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  afterEach(() => {
    eventBus.clear();
  });

  describe("on", () => {
    it("should register a handler for an event", () => {
      const handler = jest.fn();
      eventBus.on("test", handler);
      eventBus.emit("test", "test");
      expect(handler).toHaveBeenCalledWith("test");
    });

    it("should unregister a handler for an event", () => {
      const handler = jest.fn();
      const off = eventBus.on("test", handler);
      off();
      eventBus.emit("test", "test");
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("emit", () => {
    it("should emit an event and call all the subscribed handlers", () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      eventBus.on("test", handler1);
      eventBus.on("test", handler2);
      eventBus.emit("test", "test");
      expect(handler1).toHaveBeenCalledWith("test");
      expect(handler2).toHaveBeenCalledWith("test");
    });

    it("should not call handlers if no handlers are subscribed", () => {
      const handler = jest.fn();
      eventBus.emit("test", "test");
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("clear", () => {
    it("should clear all the handlers", () => {
      const handler = jest.fn();
      eventBus.on("test", handler);
      eventBus.clear();
      eventBus.emit("test", "test");
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
