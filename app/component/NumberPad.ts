import document from "document";
import * as util from "../../common/utils";
import { vibration } from "haptics";

const MAX_CHARACTERS = 9;

export class NumberPad {
  private elem: GraphicsElement;
  private display: Element;

  private natural: string = "0";
  private decimal: string | null = null;

  private closeCallback: (value: number) => any;

  private listeners: [Element, string, any][] = [];

  constructor() {
    this.elem = document.getElementById("number-pad") as GraphicsElement;
    this.display = this.elem.getElementById("number-pad__display");

    this.registerListener(
      this.elem.getElementById("number-pad__button-0"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("0");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-1"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("1");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-2"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("2");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-3"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("3");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-4"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("4");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-5"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("5");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-6"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("6");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-7"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("7");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-8"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("8");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-9"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append("9");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__button-dot"),
      "click",
      () => {
        vibration.start("confirmation");
        this.append(".");
      }
    );
    this.registerListener(
      this.elem.getElementById("number-pad__back"),
      "click",
      () => {
        vibration.start("confirmation");
        this.unregisterListeners();
        util.removeClassName(this.elem, "--visible");
      }
    );

    this.registerListener(
      this.elem.getElementById("number-pad__button-ok"),
      "click",
      () => {
        vibration.start("confirmation");
        this.unregisterListeners();
        util.removeClassName(this.elem, "--visible");
        const displayString = this.toDisplayString(this.natural, this.decimal);
        this.closeCallback(parseFloat(displayString));
      }
    );

    this.updateUi();
  }

  private registerListener(elem: Element, eventName: string, listener: any) {
    elem.addEventListener(eventName as any, listener);
    this.listeners.push([elem, eventName, listener]);
    return listener;
  }

  private unregisterListeners() {
    this.listeners.forEach((l) => {
      const elem = l[0];
      const eventName = l[1];
      const listener = l[2];
      elem.removeEventListener(eventName as any, listener);
    });
    this.listeners = [];
  }

  show(callback: (value: number) => any) {
    this.closeCallback = callback;
    util.addClassName(this.elem, "--visible");
  }

  private append(value: string) {
    let natural = this.natural;
    let decimal = this.decimal;

    if (decimal !== null) {
      if (value !== ".") {
        decimal += value;
      }
    } else {
      if (value === ".") {
        decimal = "";
      } else if (natural === "0") {
        natural = value;
      } else {
        natural += value;
      }
    }

    const displayString = this.toDisplayString(natural, decimal);
    if (MAX_CHARACTERS < displayString.length) {
      return;
    }
    this.natural = natural;
    this.decimal = decimal;

    this.updateUi();
  }

  private toDisplayString(natural: string, decimal: string) {
    let text = natural.toString();
    if (decimal !== null) {
      text += "." + decimal;
    }
    return text;
  }

  private updateUi() {
    this.display.text = this.toDisplayString(this.natural, this.decimal);
  }
}
