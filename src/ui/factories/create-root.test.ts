import { Theme } from "../../core/types";
import { createRoot } from "./create-root";

describe("createRoot", () => {
  it("should create a root element", () => {
    const theme: Theme = {
      radius: "0.65rem",
      palette: {
        light: {
          primaryColor: "#0082FA",
          secondaryColor: "#0064E0",
          backgroundColor: "#fff",
          textColor: "#000",
        },
        dark: {
          primaryColor: "#0082FA",
          secondaryColor: "#0064E0",
          backgroundColor: "#12161A",
          textColor: "#fff",
        },
      },
    };

    const root = createRoot(theme);

    expect(root.classList.contains("chatbot-ui")).toBe(true);
    expect(root.style.getPropertyValue("--radius-chatbot-ui")).toBe(theme.radius);

    for (const [key, value] of Object.entries(theme.palette.dark)) {
      const property = `--dark-chatbot-ui-${key.replace("Color", "")}`;
      expect(root.style.getPropertyValue(property)).toBe(value);
    }
    for (const [key, value] of Object.entries(theme.palette.light)) {
      const property = `--light-chatbot-ui-${key.replace("Color", "")}`;
      expect(root.style.getPropertyValue(property)).toBe(value);
    }
  });
});
