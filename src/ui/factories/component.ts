import { DIContainer } from "../../infra/di";
import { LocalesService } from "../../infra/locales/locales.service";

interface ComponentOnInit<K extends keyof HTMLElementTagNameMap, T extends HTMLElementTagNameMap[K] = HTMLElementTagNameMap[K]> {
  element: T;
  component: ElementComponent<K>;
}

export type BaseElementProps<K extends keyof HTMLElementTagNameMap> = {
  template: string;
  className: string;
  as: K;
  childs?: Array<ElementComponent<any>>;
  classes?: string;
  onInit?: (props: ComponentOnInit<K>) => void;
} & Partial<HTMLElementTagNameMap[K]>;

export class ElementComponent<K extends keyof HTMLElementTagNameMap, T extends HTMLElementTagNameMap[K] = HTMLElementTagNameMap[K]> {
  private template: string = "";
  private state: Record<string, unknown> = {};

  constructor(private element: T, private readonly props: Omit<BaseElementProps<K>, "as">) {
    this.element = this.createHelper(this.element, this.props) as T;
    this.template = this.props.template;
  }

  private createHelper(element: T, { className, template, childs, classes, onInit, ...rest }: Omit<BaseElementProps<K>, "as">) {
    element.id = this.generateUniqueId();
    if (className.includes(" ")) throw new Error("Root className cannot contain spaces");
    element.classList.add(className);
    Object.assign(element, rest);
    const localesService = DIContainer.resolve<LocalesService>(LocalesService.name);
    element.innerHTML = localesService.translateTemplate(template);
    if (classes) classes.split(" ").forEach((className) => element.classList.add(className.trim()));
    if (childs) childs.forEach((child) => this.addChild(child));
    if (onInit) onInit({ element, component: this });
    return element;
  }

  public addClasses(classes: string): void {
    classes.split(" ").forEach((className) => this.element.classList.add(className.trim()));
  }

  private addChild(child: ElementComponent<K>) {
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

  public setTemplate(template: string): void {
    this.template = template;
    this.element.innerHTML = this.template;
  }

  public getState(): Record<string, unknown> {
    return this.state;
  }

  public setState(state: Record<string, unknown>): void {
    this.state = { ...this.state, ...state };
  }

  public static create<K extends keyof HTMLElementTagNameMap>(props: BaseElementProps<K>) {
    const { as, ...rest } = props;
    const element = document.createElement(as) as HTMLElementTagNameMap[K];
    const elementComponent = new ElementComponent<K, HTMLElementTagNameMap[K]>(element, rest as any);

    return elementComponent;
  }
}
