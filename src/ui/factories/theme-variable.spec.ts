import { Theme } from "../../core/types/config";
import { insertThemeVariables } from "./theme-variable";

describe("createRoot", () => {
  it("should create a root element", () => {
    const theme: Theme = {
      radius: "0.65rem",
      height: "80vh",
      width: "450px",
      bottom: "1rem",
      right: "1rem",
      palette: {
        light: {
          borderColor: "rgb(229 231 235)",
          cardColor: "#fff",
          primaryColor: "#0082FA",
          secondaryColor: "#0064E0",
          backgroundColor: "#fff",
          textColor: "#000",
        },
        dark: {
          borderColor: "#2b313c",
          cardColor: "#0f1417",
          primaryColor: "#0082FA",
          secondaryColor: "#0064E0",
          backgroundColor: "#12161A",
          textColor: "#fff",
        },
      },
    };

    const root = document.createElement("div");
    insertThemeVariables(theme, root);

    expect(root.classList.contains("chatbot-ui")).toBe(true);
    expect(root.style.getPropertyValue("--radius-chatbot-ui")).toBe(theme.radius);
    expect(root.style.getPropertyValue("--height-chatbot-ui")).toBe(theme.height);
    expect(root.style.getPropertyValue("--width-chatbot-ui")).toBe(theme.width);

    for (const [key, value] of Object.entries(theme.palette.dark)) {
      const property = `--dark-chatbot-ui-${key.replace("Color", "")}`;
      expect(root.style.getPropertyValue(property)).toBe(value);
    }

    for (const [key, value] of Object.entries(theme.palette.light)) {
      const property = `--light-chatbot-ui-${key.replace("Color", "")}`;
      expect(root.style.getPropertyValue(property)).toBe(value);
    }

    expect(root.style.display).toBe("flex");
    expect(root.style.flexDirection).toBe("column");
    expect(root.style.alignItems).toBe("flex-end");
    expect(root.style.gap).toBe("0.5rem");
    expect(root.style.position).toBe("fixed");
    expect(root.style.bottom).toBe(theme.bottom);
    expect(root.style.right).toBe(theme.right);
  });
});
