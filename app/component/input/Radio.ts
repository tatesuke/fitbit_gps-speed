import * as util from "common/utils";
import { vibration } from "haptics";

export class Radio {
  private params: { value: string; elem: Element }[];
  private value: string;
  private clickCallback?: (value: string) => void;

  private mouseDownX: number;
  private mouseDownY: number;

  constructor(params: [string, Element][], value?: string) {
    this.params = params.map((p) => {
      return {
        value: p[0],
        elem: p[1],
      };
    });

    this.params.forEach((p) => {
      p.elem.addEventListener("mousedown", (e) => {
        this.mouseDownX = e.screenX;
        this.mouseDownY = e.screenY;
      });
      p.elem.addEventListener("click", (e) => {
        if (this.clickCallback) {
          const dx = e.screenX - this.mouseDownX;
          const dy = e.screenY - this.mouseDownY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= 15) {
            vibration.start("confirmation");
            this.clickCallback(p.value);
          }
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
