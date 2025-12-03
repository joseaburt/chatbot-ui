import { Locales } from "@core/types/config";

export class LocalesService {
  private readonly indexes: string[] = [];

  constructor(private readonly locales: Locales) {
    this.indexes = Object.keys(this.locales);
  }

  private getLangFromHtmlTag(): string {
    const htmlTag = document.querySelector("html");

    if (!htmlTag) return "es";
    return htmlTag.getAttribute("lang") || "es";
  }

  public translateTemplate(template: string): string {
    const lang = this.getLangFromHtmlTag();

    if (!this.indexes.includes(lang)) {
      return template;
    }

    for (const [key, value] of Object.entries(this.locales[lang])) {
      template = template.replace(`{{${key}}}`, value);
    }

    return template;
  }
}
