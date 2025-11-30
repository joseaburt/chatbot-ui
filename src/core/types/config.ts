export interface Locale {
  headTitle: string;
  headSubtitle: string;
  headeMessage: string;
  textboxPlaceholder: string;
  messageSentError: string;
  defaultMessage: string;
}

export type PaletteMode = "dark" | "light";

export interface Palette {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;

  textColor: string;
}

export interface Theme {
  radius: string;
  palette: Record<PaletteMode, Palette>;
}

export type Locales = Record<string, Locale>;

export interface Config {
  baseUrl: string;
  socketPath: string;
  threadIdKey: string;
  locales: Locales;
  assistantName: string;
  theme: Theme;
  defaultOpen?: boolean;
}
