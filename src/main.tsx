import "./di";
import "./styles/index.scss";
import { theme } from "./configs";
import { insertThemeVariables } from "./ui/factories/theme-variable";
import { chatbotComponent } from "./ui/chatbot-ui/index.component";

document.body.appendChild(insertThemeVariables(theme, chatbotComponent.getElement()));
