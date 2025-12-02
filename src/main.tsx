import { Locales } from "./core/types/config";
import { DIContainer } from "./infra/di";
import { LocalesService } from "./infra/locales/locales.service";
import { ElementComponent } from "./ui/factories/component";

const locales: Locales = {
  es: {
    headTitle: "Título de la cabecera",
    headSubtitle: "Subtítulo de la cabecera",
    headeMessage: "Mensaje de la cabecera",
    textboxPlaceholder: "Placeholder del textbox",
    messageSentError: "Error al enviar el mensaje",
    defaultMessage: "Mensaje por defecto",
  },
  en: {
    headTitle: "Head Title",
    headSubtitle: "Head Subtitle",
    headeMessage: "Head Message",
    textboxPlaceholder: "Textbox Placeholder",
    messageSentError: "Message Sent Error",
    defaultMessage: "Default Message",
  },
};

DIContainer.register(LocalesService.name, new LocalesService(locales));

const el = ElementComponent.create({
  template: "{{headTitle}}",
  className: "container",
  as: "h1",
});

document.body.appendChild(el.getElement());
console.log("xxxx");
