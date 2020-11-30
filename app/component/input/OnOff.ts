import * as util from "../../../common/utils";

export class OnOff {
  private elem: Element;
  private value: boolean;

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

    this.updateUi();
  }

  onClick(callback: () => void) {
    this.elem.addEventListener("click", () => {
      callback();
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
