import * as util from "../../../common/utils";

export class Radio {
  private params: { value: string; elem: Element }[];
  private value: string;
  private clickCallback?: (value: string) => void;

  constructor(params: [string, Element][], value?: string) {
    this.params = params.map((p) => {
      return {
        value: p[0],
        elem: p[1],
      };
    });

    this.params.forEach((p) => {
      p.elem.addEventListener("click", () => {
        if (this.clickCallback) {
          this.clickCallback(p.value);
        }
      });
    });

    if (typeof value === "string") {
      this.value = value;
    } else {
      this.value = this.params[0].value;
    }

    this.updateUi();
  }

  public onClick(callback: (value: string) => void) {
    this.clickCallback = callback;
  }

  public setValue(value: string) {
    this.value = value;
    this.updateUi();
  }

  private updateUi() {
    this.params.forEach((p) => {
      if (p.value === this.value) {
        util.addClassName(
          p.elem.getElementsByClassName("radio__indicator"),
          "is-selected"
        );
      } else {
        util.removeClassName(
          p.elem.getElementsByClassName("radio__indicator"),
          "is-selected"
        );
      }
    });
  }
}
