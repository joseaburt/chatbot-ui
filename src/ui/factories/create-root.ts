import { Palette, PaletteMode, Theme } from "../../core/types";

function insertThemeVariables(theme: Theme, root: HTMLElement) {
  root.style.setProperty(`--radius-chatbot-ui`, theme.radius);
  for (const [key, value] of Object.entries(theme.palette) as [PaletteMode, Palette][]) {
    for (const [colorKey, colorValue] of Object.entries(value) as [keyof Palette, string][]) {
      root.style.setProperty(`--${key}-chatbot-ui-${colorKey.replace("Color", "")}`, colorValue);
    }
  }
}

export function createRoot(theme: Theme): HTMLElement {
  const parent = document.createElement("div");
  parent.classList.add("chatbot-ui");
  insertThemeVariables(theme, parent);
  return parent;
}
