interface ContainerConfig {
  lang?: string;
  theme?: string;
}

export const createHtmlContainer = (children: () => HTMLElement, config: ContainerConfig = {}) => {
  const html = document.createElement("html");
  html.setAttribute("lang", config.lang || "es");
  html.setAttribute("class", config.theme || "dark");
  jest.spyOn(document, "querySelector").mockReturnValue(html);
  html.appendChild(children());
  return html;
};
