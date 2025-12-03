require("@testing-library/jest-dom");

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

beforeEach(() => {
  localStorage.clear();
});

// Setup DI container for tests
const { DIContainer } = require("./src/infra/di");
const { LocalesService } = require("./src/infra/locales/locales.service");
const { EventBus } = require("./src/infra/events/event-bus");

const locales = {
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

DIContainer.register(LocalesService.name, new LocalesService(locales));
DIContainer.register(EventBus.name, new EventBus());
