import { getByRole } from "@testing-library/dom";
import { resolveDependency } from "../../../../di";
import { userEvent } from "@testing-library/user-event";
import { floatButtonFloatButton } from "./float-button.component";

const stateController = resolveDependency("StateController");

function createContainer(children: HTMLElement) {
  const div = document.createElement("div");
  div.appendChild(children);
  return div;
}

describe("FloatButton", () => {
  beforeEach(() => {
    stateController.setState({ isOpen: true });
  });

  it("should render with close icon on init", async () => {
    const container = createContainer(floatButtonFloatButton.getElement());
    const button = getByRole(container, "button");
    expect(button.innerHTML).toContain("close-icon");
    expect(button.innerHTML).not.toContain("chat-icon");
  });

  it("should render with chat icon on click", async () => {
    const container = createContainer(floatButtonFloatButton.getElement());
    const button = getByRole(container, "button");
    await userEvent.click(button);
    expect(button.innerHTML).toContain("chat-icon");
    expect(button.innerHTML).not.toContain("close-icon");
  });

  it("should call setState on click", async () => {
    const container = createContainer(floatButtonFloatButton.getElement());
    expect(stateController.getState().isOpen).toBe(true);

    const button = getByRole(container, "button");
    await userEvent.click(button);
    expect(stateController.getState().isOpen).toBe(false);
  });

  it("should should change icon on setState", async () => {
    const container = createContainer(floatButtonFloatButton.getElement());
    let button = getByRole(container, "button");
    expect(button.innerHTML).toContain("close-icon");
    expect(button.innerHTML).not.toContain("chat-icon");

    stateController.setState({ isOpen: false });

    button = getByRole(container, "button");
    expect(button.innerHTML).toContain("chat-icon");
    expect(button.innerHTML).not.toContain("close-icon");
  });
});
