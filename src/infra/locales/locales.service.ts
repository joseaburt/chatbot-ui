import { Locales } from "../../core/types/config";

export class LocalesService {
  private readonly indexes: string[] = [];

  constructor(private readonly locales: Locales) {
    this.indexes = Object.keys(this.locales);
  }

  public translateTemplate(template: string): string {
    const lang = localStorage.getItem("lang") || "es";

    if (!this.indexes.includes(lang)) {
      return template;
    }

    for (const [key, value] of Object.entries(this.locales[lang])) {
      template = template.replace(`{{${key}}}`, value);
    }

    return template;
  }
}
