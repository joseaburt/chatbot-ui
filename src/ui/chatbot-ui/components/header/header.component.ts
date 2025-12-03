import { Close, Sparkles } from "@ui/icons";
import { resolveDependency } from "@/di";
import { ElementComponent } from "@ui/factories/component";

const stateController = resolveDependency("StateController");

export const createHeader = () => {
  return ElementComponent.create({
    as: "header",
    template: "",
    className: "header",
    classes: "bg-primary p-3",
    childs: [
      ElementComponent.create({
        template: `<div><span></span></div>`,
        className: "header-header",
        classes: "flex items-center justify-between color-white",
        as: "div",
        childs: [
          ElementComponent.create<"div">({
            template: `${Sparkles} <h2 class="text-16 text-semibold">{{headTitle}}</h2>`,
            className: "heading-title",
            classes: "text-16 text-bold flex items-center gap-2",
            as: "div",
          }),
          ElementComponent.create<"button">({
            as: "button",
            template: Close,
            className: "close-button",
            classes: "size-8 color-white",
            disabled: false,
            onclick: () => {
              stateController.setState((pre) => ({ ...pre, isOpen: !pre.isOpen }));
            },
          }),
        ],
      }),
      ElementComponent.create({
        template: `<div class="flex flex-col gap-1 color-white w-full text-center mt-1">
        <p class="text-14 text-semibold">{{headSubtitle}}</p>
        <p class="text-12 text-normal">{{headMessage}}</p>
      </div>
      `,
        className: "header-subtitle",
        as: "div",
      }),
    ],
  });
};
