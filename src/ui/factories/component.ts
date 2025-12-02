import { DIContainer } from "../../infra/di";
import { LocalesService } from "../../infra/locales/locales.service";

export type BaseElementProps<T extends HTMLElement = HTMLElement> = {
  template: string;
  className: string;
  as: keyof HTMLElementTagNameMap;
  childs?: Array<ElementComponent>;
  classes?: string;
  onInit?: (element: T) => void;
} & Partial<T>;

export class ElementComponent<T extends HTMLElement = HTMLElement> {
  private template: string = "";

  constructor(private element: T, private readonly props: Omit<BaseElementProps<T>, "as">) {
    this.element = this.createHelper(this.element, this.props) as T;
    this.template = this.props.template;
  }

  private createHelper(element: T, { className, template, childs, classes, onInit, ...rest }: Omit<BaseElementProps<T>, "as">) {
    element.id = this.generateUniqueId();
    if (className.includes(" ")) throw new Error("Root className cannot contain spaces");
    element.classList.add(className);
    Object.assign(element, rest);
    const localesService = DIContainer.resolve<LocalesService>(LocalesService.name);
    element.innerHTML = localesService.translateTemplate(template);
    if (classes) classes.split(" ").forEach((className) => element.classList.add(className.trim()));
    if (childs) childs.forEach((child) => this.addChild(child));
    if (onInit) onInit(element);
    return element;
  }

  private addChild(child: ElementComponent) {
    this.element.appendChild(child.getElement());
    return this;
  }

  public getElement(): T {
    return this.element;
  }

  private generateUniqueId() {
    return Math.random().toString(36).substring(2, 15);
  }

  public getTemplate(): string {
    return this.template;
  }

  public static create<T extends HTMLElement = HTMLElement>(props: BaseElementProps<T>): ElementComponent<T> {
    const { as, ...rest } = props;
    const element = document.createElement(as) as T;
    const elementComponent = new ElementComponent<T>(element, rest);

    return elementComponent;
  }
}
