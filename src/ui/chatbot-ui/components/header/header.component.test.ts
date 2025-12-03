import { locales } from "@/configs";
import { createHeader } from "./header.component";
import { resolveDependency } from "@/di";
import userEvent from "@testing-library/user-event";
import { getByRole, getByText } from "@testing-library/dom";
import { createHtmlContainer } from "@/test/test.utils";

const stateController = resolveDependency("StateController");

describe("HeaderComponent", () => {
  it("should create a header component", () => {
    let container = createHtmlContainer(() => createHeader().getElement(), { lang: "es" });

    expect(getByText(container, locales.es.headTitle)).toBeDefined();
    expect(getByText(container, locales.es.headSubtitle)).toBeDefined();
    expect(getByText(container, locales.es.headMessage)).toBeDefined();

    container = createHtmlContainer(() => createHeader().getElement(), { lang: "en" });
    expect(getByText(container, locales.en.headTitle)).toBeDefined();
    expect(getByText(container, locales.en.headSubtitle)).toBeDefined();
    expect(getByText(container, locales.en.headMessage)).toBeDefined();
  });

  it("should toggle isOpen state when close button is clicked", async () => {
    let container = createHtmlContainer(() => createHeader().getElement(), { lang: "es" });
    const closeButton = getByRole(container, "button");
    expect(stateController.getState().isOpen).toBe(true);
    await userEvent.click(closeButton);
    expect(stateController.getState().isOpen).toBe(false);
  });
});
