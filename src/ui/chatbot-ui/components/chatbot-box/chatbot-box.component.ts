import { ElementComponent } from "@ui/factories/component";
import { DIContainer } from "@infra/di";
import { StateController } from "@core/state/state.controller";
import { createHeader } from "../header/header.component";

const stateController = DIContainer.resolve<StateController>(StateController.name);

export const chatbotBox = ElementComponent.create({
  template: "",
  className: "chatbot-box",
  classes: "w-chatbot h-chatbot border border-color rounded-base box-shadow bg-card overflow-hidden",
  onInit: ({ element }) => {
    stateController.onStateChange((state) => {
      element.classList.toggle("hidden", !state.isOpen);
    });
  },
  as: "div",
  childs: [createHeader()],
});
