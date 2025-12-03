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
    headTitle: "Chat Soporte",
    headSubtitle: "¿Tienes alguna pregunta?",
    headMessage: "Saca el maximo a tu aprendizaje con nuestro asistente AI!",
    textboxPlaceholder: "Placeholder del textbox",
    messageSentError: "Error al enviar el mensaje",
    defaultMessage: "Mensaje por defecto",
  },
  en: {
    headTitle: "Support Chat",
    headSubtitle: "Have any questions?",
    headMessage: "Get the most out of your learning with our AI assistant!",
    textboxPlaceholder: "Textbox Placeholder",
    messageSentError: "Message Sent Error",
    defaultMessage: "Default Message",
  },
};
