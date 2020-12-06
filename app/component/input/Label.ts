import * as util from "../../../common/utils";

export class Label {
  private elem: Element;
  private label: Element;

  private value: any;

  private mouseDownX: number;
  private mouseDownY: number;

  constructor(elem: Element, initialValue: any) {
    this.elem = elem;
    this.value = initialValue;

    this.label = elem.getElementById("label__label");

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
        callback();
      }
    });
  }

  getValue() {
    return this.value;
  }

  setValue(value: any) {
    this.value = value;
    this.updateUi();
  }

  private updateUi() {
    this.label.text = this.value.toString();
  }
}
