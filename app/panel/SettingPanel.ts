import document from "document";
import clock from "clock";
import * as util from "../../common/utils";
import { preferences } from "user-settings";
import { Panel } from "../component/Panel";
import { OnOff } from "../component/input/OnOff";
import { Radio } from "../component/input/Radio";


export class SettingPanel extends Panel {
  constructor(elem: Element) {
    super(elem.getElementsByClassName("id_scrollview")[0]);

    const alwaysScreenOn = new OnOff(
      elem.getElementById("setting-panel__always-screen-on"),
      false
    );
    alwaysScreenOn.onClick(() => {
      const value = alwaysScreenOn.getValue();
      alwaysScreenOn.setValue(!value);
    });

    const eablePhonesAssist = new OnOff(
      elem.getElementById("setting-panel__enable-phones-assist"),
      false
    );
    eablePhonesAssist.onClick(() => {
      const value = eablePhonesAssist.getValue();
      eablePhonesAssist.setValue(!value);
    });

    const unitOfSpeed = new Radio([
      ["km/h", elem.getElementById("setting-panel__kmph-radio")],
      ["mph", elem.getElementById("setting-panel__mph-radio")],
      ["kt", elem.getElementById("setting-panel__kt-radio")],
    ]);
    unitOfSpeed.onClick((value: string) => {
      unitOfSpeed.setValue(value);
    });

    const showAsSpeed0 = new OnOff(
      elem.getElementById("setting-panel__show-as-speed-0"),
      false
    );
    showAsSpeed0.onClick(() => {
      const value = showAsSpeed0.getValue();
      showAsSpeed0.setValue(!value);
    });

    const grayoutASpeed = new OnOff(
      elem.getElementById("setting-panel__grayout-a-speed"),
      false
    );
    grayoutASpeed.onClick(() => {
      const value = grayoutASpeed.getValue();
      grayoutASpeed.setValue(!value);
    });

    const stopUpdateAnArrow = new OnOff(
      elem.getElementById("setting-panel__stop-update-an-arrow"),
      false
    );
    stopUpdateAnArrow.onClick(() => {
      const value = stopUpdateAnArrow.getValue();
      stopUpdateAnArrow.setValue(!value);
    });

    const grayoutAnArrow = new OnOff(
      elem.getElementById("setting-panel__grayout-an-arrow"),
      false
    );
    grayoutAnArrow.onClick(() => {
      const value = grayoutAnArrow.getValue();
      grayoutAnArrow.setValue(!value);
    });
  }
}
