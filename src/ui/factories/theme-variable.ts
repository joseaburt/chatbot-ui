import { Palette, PaletteMode, Theme } from "@core/types/config";

export function insertThemeVariables(theme: Theme, root: HTMLElement) {
  root.classList.add("chatbot-ui");

  root.style.position = "fixed";
  root.style.bottom = theme.bottom;
  root.style.right = theme.right;
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.alignItems = "flex-end";
  root.style.gap = "0.5rem";

  root.style.setProperty(`--radius-chatbot-ui`, theme.radius);
  root.style.setProperty(`--height-chatbot-ui`, theme.height);
  root.style.setProperty(`--width-chatbot-ui`, theme.width);

  for (const [key, value] of Object.entries(theme.palette) as [PaletteMode, Palette][]) {
    for (const [colorKey, colorValue] of Object.entries(value) as [keyof Palette, string][]) {
      root.style.setProperty(`--${key}-chatbot-ui-${colorKey.replace("Color", "")}`, colorValue);
    }
  }

  return root;
}
