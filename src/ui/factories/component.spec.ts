import { DIContainer } from "@infra/di";
import { ElementComponent } from "./component";
import { Locales } from "@core/types/config";
import { LocalesService } from "@infra/locales/locales.service";

describe("ElementComponent", () => {
  const locales: Locales = {
    es: {
      headTitle: "Título de la cabecera",
      headSubtitle: "Subtítulo de la cabecera",
      headMessage: "Mensaje de la cabecera",
      textboxPlaceholder: "Placeholder del textbox",
      messageSentError: "Error al enviar el mensaje",
      defaultMessage: "Mensaje por defecto",
    },
    en: {
      headTitle: "Head Title",
      headSubtitle: "Head Subtitle",
      headMessage: "Head Message",
      textboxPlaceholder: "Textbox Placeholder",
      messageSentError: "Message Sent Error",
      defaultMessage: "Default Message",
    },
  };

  DIContainer.register(LocalesService.name, new LocalesService(locales));

  it("should create an element with the correct template", () => {
    const element = ElementComponent.create({
      template: "{{textboxPlaceholder}}",
      className: "header-title",
      classes: "text-center",
      as: "h1",
    });
    expect(element.getElement().nodeName).toBe("H1");
    expect(element.getElement().innerHTML).toBe("Placeholder del textbox");
    expect(element.getElement().classList.contains("header-title")).toBe(true);
    expect(element.getElement().classList.contains("text-center")).toBe(true);
  });

  it("should create an element with a child", () => {
    const element = ElementComponent.create({
      template: "",
      className: "header-container",
      classes: "container",
      as: "div",
      childs: [
        ElementComponent.create({
          template: "{{textboxPlaceholder}}",
          className: "header-title",
          classes: "text-center",
          as: "h1",
        }),
      ],
    });
    expect(element.getElement().nodeName).toBe("DIV");
    expect(element.getElement().classList.contains("header-container")).toBe(true);
    expect(element.getElement().classList.contains("container")).toBe(true);
    expect(element.getElement().querySelector("h1")?.innerHTML).toBe("Placeholder del textbox");
  });
});
