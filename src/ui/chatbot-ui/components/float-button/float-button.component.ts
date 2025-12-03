import "./float-button.style.scss";
import { Chat, Close } from "@ui/icons";
import { DIContainer } from "@infra/di";
import { ElementComponent } from "@ui/factories/component";
import { StateController } from "@core/state/state.controller";

const stateController = DIContainer.resolve<StateController>(StateController.name);

export const floatButtonFloatButton = ElementComponent.create({
  template: Chat,
  className: "float-button",
  classes: "float-button bg-primary rounded-full size-14 color-white box-shadow",
  as: "button",
  onInit: ({ element }) => {
    stateController.onStateChange((state) => {
      if (state.isOpen) element.innerHTML = Close;
      else element.innerHTML = Chat;

      if (state.hideFloatButton) element.classList.add("hidden");
      else element.classList.remove("visible");
    });
  },
  onclick: () => {
    stateController.setState((pre) => ({ ...pre, isOpen: !pre.isOpen }));
  },
});
