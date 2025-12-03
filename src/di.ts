import { locales } from "./configs";
import { DIContainer } from "./infra/di";
import { MainState } from "./core/state/state";
import { EventBus } from "./infra/events/event-bus";
import { LocalesService } from "./infra/locales/locales.service";
import { StateController } from "./core/state/state.controller";

DIContainer.register(LocalesService.name, new LocalesService(locales));
const bus = new EventBus<{ stateChange: MainState }>();
DIContainer.register(EventBus.name, bus);
DIContainer.register("StateController", new StateController(bus));

// ==========================================================
// Resolvers
// ==========================================================

type Dependencies = {
  LocalesService: LocalesService;
  EventBus: EventBus<{ stateChange: MainState }>;
  StateController: StateController;
};

export function resolveDependency<K extends keyof Dependencies>(dependency: K) {
  return DIContainer.resolve<Dependencies[K]>(dependency) as Dependencies[K];
}
