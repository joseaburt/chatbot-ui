import { Locales } from "@core/types/config";
import { createHtmlContainer } from "@/test/test.utils";
import { LocalesService } from "./locales.service";

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

describe("LocalesService", () => {
  let localesService: LocalesService;

  beforeEach(() => {
    localesService = new LocalesService(locales);
  });

  describe("translateTemplate", () => {
    it("should return the translated template", () => {
      createHtmlContainer(() => document.createElement("div"), { lang: "es" });

      const template = "{{headTitle}}";
      const translated = localesService.translateTemplate(template);
      expect(translated).toBe("Título de la cabecera");
    });

    it("should use the selected language", () => {
      createHtmlContainer(() => document.createElement("div"), { lang: "en" });

      const template = "{{messageSentError}}";
      const translated = localesService.translateTemplate(template);
      expect(translated).toBe("Message Sent Error");
    });
  });
});
