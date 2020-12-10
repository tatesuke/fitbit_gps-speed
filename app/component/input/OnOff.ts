import * as util from "common/utils";
import { vibration } from "haptics";

export class OnOff {
  private elem: Element;
  private value: boolean;

  private mouseDownX: number;
  private mouseDownY: number;

  constructor(
    elem: Element,
    initialValue: boolean,
    onLabel: string = "ON",
    offLable: string = "OFF"
  ) {
    this.elem = elem;
    this.value = initialValue;

    elem.getElementsByClassName("on-off__label_off")[0].text = offLable;
    elem.getElementsByClassName("on-off__label_on")[0].text = onLabel;

    this.elem.addEventListener("mousedown", (e) => {
      this.mouseDownX = e.screenX;
      this.mouseDownY = e.screenY;
    });

    this.updateUi();
  }

  onClick(callback: () => void) {
    this.elem.addEventListener("click", (e) => {
        const dx = e.screenX - this.mouseDownX;
        const dy = e.screenY - this.mouseDownY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 15) {
          vibration.start("confirmation");
          callback();
        }
    });
  }

  getValue() {
    return this.value;
  }

  setValue(value: boolean) {
    this.value = value;
    this.updateUi();
  }

  private updateUi() {
    if (this.value === true) {
      util.addClassName(this.elem.getElementsByClassName("indicator"), "is-on");
    } else {
      util.removeClassName(
        this.elem.getElementsByClassName("indicator"),
        "is-on"
      );
    }
  }
}
