import { ElementComponent } from "../factories/component";
import { chatbotBox } from "./components/chatbot-box/chatbot-box.component";
import { floatButtonFloatButton } from "./components/float-button/float-button.component";

export const chatbotComponent = ElementComponent.create({
  template: "",
  className: "chatbot-ui",
  as: "div",
  classes: "flex flex-col",
  childs: [chatbotBox, floatButtonFloatButton],
});
