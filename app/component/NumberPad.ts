import document from "document";
import * as util from "../../common/utils";

const MAX_CHARACTERS = 9;

export class NumberPad {
  private elem: GraphicsElement;
  private display: Element;

  private natural: string = "0";
  private decimal: string | null = null;

  private closeCallback: (value: number) => any;

  constructor() {
    this.elem = document.getElementById("number-pad") as GraphicsElement;
    this.display = this.elem.getElementById("number-pad__display");

    this.elem
      .getElementById("number-pad__button-0")
      .addEventListener("click", () => {
        this.append("0");
      });
    this.elem
      .getElementById("number-pad__button-1")
      .addEventListener("click", () => {
        this.append("1");
      });
    this.elem
      .getElementById("number-pad__button-2")
      .addEventListener("click", () => {
        this.append("2");
      });
    this.elem
      .getElementById("number-pad__button-3")
      .addEventListener("click", () => {
        this.append("3");
      });
    this.elem
      .getElementById("number-pad__button-4")
      .addEventListener("click", () => {
        this.append("4");
      });
    this.elem
      .getElementById("number-pad__button-5")
      .addEventListener("click", () => {
        this.append("5");
      });
    this.elem
      .getElementById("number-pad__button-6")
      .addEventListener("click", () => {
        this.append("6");
      });
    this.elem
      .getElementById("number-pad__button-7")
      .addEventListener("click", () => {
        this.append("7");
      });
    this.elem
      .getElementById("number-pad__button-8")
      .addEventListener("click", () => {
        this.append("8");
      });
    this.elem
      .getElementById("number-pad__button-9")
      .addEventListener("click", () => {
        this.append("9");
      });
    this.elem
      .getElementById("number-pad__button-dot")
      .addEventListener("click", () => {
        this.append(".");
      });

    this.elem
      .getElementById("number-pad__back")
      .addEventListener("click", () => {
        util.removeClassName(this.elem, "--visible");
      });

    this.elem
      .getElementById("number-pad__button-ok")
      .addEventListener("click", () => {
        util.removeClassName(this.elem, "--visible");
        const displayString = this.toDisplayString(this.natural, this.decimal);
        this.closeCallback(parseFloat(displayString));
      });

    this.updateUi();
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
