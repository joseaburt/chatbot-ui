import { Locales, Theme } from "./core/types/config";

export const theme: Theme = {
  radius: "0.65rem",
  height: "80vh",
  width: "450px",
  bottom: "1rem",
  right: "1rem",
  palette: {
    light: {
      primaryColor: "#0082FA",
      secondaryColor: "#0064E0",
      backgroundColor: "#fff",
      cardColor: "#fff",
      textColor: "#000",
      borderColor: "rgb(229 231 235)",
    },
    dark: {
      primaryColor: "#0082FA",
      secondaryColor: "#0064E0",
      backgroundColor: "#12161A",
      cardColor: "#0f1417",
      textColor: "#fff",
      borderColor: "#2b313c",
    },
  },
};

export const locales: Locales = {
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
