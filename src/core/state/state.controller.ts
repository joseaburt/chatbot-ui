import { MainState } from "./state";
import { Bus, Handler } from "@core/types/bus";

type SetState = ((state: MainState) => MainState) | Partial<MainState>;

export class StateController {
  private state: MainState = {
    isOpen: true,
    messages: "",
    isLoading: false,
    hideFloatButton: false,
  };

  constructor(private readonly bus: Bus<{ stateChange: MainState }>) {}

  public setState(state: SetState) {
    if (typeof state === "function") this.state = state(this.state) as MainState;
    else this.state = { ...this.state, ...state };
    this.bus.emit("stateChange", this.state);
  }

  public onStateChange(handler: Handler<MainState>) {
    handler(this.state);
    this.bus.on("stateChange", handler);
  }

  public getState() {
    return Object.freeze(this.state);
  }
}
