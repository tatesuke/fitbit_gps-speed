import { Panel } from "../component/Panel";
import { OnOff } from "../component/input/OnOff";
import { Radio } from "../component/input/Radio";
import { settingManager } from "../settingManager";
import { Setting } from "../../common/setting";
import { NumberPad } from "../component/NumberPad";
import { Label } from "../component/input/Label";

export class SettingPanel extends Panel {
  private alwaysScreenOn: OnOff;
  private unitOfSpeed: Radio;
  private eablePhonesAssist: OnOff;
  private minimumSpeed: Label;
  private showAsSpeed0: OnOff;
  private grayoutASpeed: OnOff;
  private stopUpdateAnArrow: OnOff;
  private grayoutAnArrow: OnOff;

  constructor(elem: Element) {
    super(elem.getElementsByClassName("id_scrollview")[0]);

    const setting = settingManager.getSetting();
    settingManager.addChangeListener((s) => {
      this.onSettingChange(s);
    });

    this.alwaysScreenOn = new OnOff(
      elem.getElementById("setting-panel__always-screen-on"),
      setting.alwaysScreenOn
    );
    this.alwaysScreenOn.onClick(() => {
      settingManager.update({
        alwaysScreenOn: !settingManager.getSetting().alwaysScreenOn,
      });
    });

    this.eablePhonesAssist = new OnOff(
      elem.getElementById("setting-panel__enable-phones-assist"),
      setting.enablePhonesAssist
    );
    this.eablePhonesAssist.onClick(() => {
      settingManager.update({
        enablePhonesAssist: !settingManager.getSetting().enablePhonesAssist,
      });
    });

    this.unitOfSpeed = new Radio(
      [
        ["km/h", elem.getElementById("setting-panel__kmph-radio")],
        ["mph", elem.getElementById("setting-panel__mph-radio")],
        ["kt", elem.getElementById("setting-panel__kt-radio")],
      ],
      setting.unitOfSpeed
    );
    this.unitOfSpeed.onClick((value: string) => {
      settingManager.update({
        unitOfSpeed: value,
      });
    });

    this.minimumSpeed = new Label(
      elem.getElementById("setting-panel__minimum-speed"),
      settingManager.getSetting().minimumSpeed
    );
    this.minimumSpeed.onClick(() => {
      new NumberPad().show((value) => {
        settingManager.update({
          minimumSpeed: value,
        });
      });
    });

    this.showAsSpeed0 = new OnOff(
      elem.getElementById("setting-panel__show-as-speed-0"),
      setting.showSpeedAsZeo
    );
    this.showAsSpeed0.onClick(() => {
      settingManager.update({
        showSpeedAsZeo: !settingManager.getSetting().showSpeedAsZeo,
      });
    });

    this.grayoutASpeed = new OnOff(
      elem.getElementById("setting-panel__grayout-a-speed"),
      setting.showSpeedAsGray
    );
    this.grayoutASpeed.onClick(() => {
      settingManager.update({
        showSpeedAsGray: !settingManager.getSetting().showSpeedAsGray,
      });
    });

    this.stopUpdateAnArrow = new OnOff(
      elem.getElementById("setting-panel__stop-update-an-arrow"),
      setting.stopArrow
    );
    this.stopUpdateAnArrow.onClick(() => {
      settingManager.update({
        stopArrow: !settingManager.getSetting().stopArrow,
      });
    });

    this.grayoutAnArrow = new OnOff(
      elem.getElementById("setting-panel__grayout-an-arrow"),
      setting.showArrowAsGray
    );
    this.grayoutAnArrow.onClick(() => {
      settingManager.update({
        showArrowAsGray: !settingManager.getSetting().showArrowAsGray,
      });
    });
  }

  private onSettingChange(setting: Setting) {
    this.alwaysScreenOn.setValue(setting.alwaysScreenOn);
    this.unitOfSpeed.setValue(setting.unitOfSpeed);
    this.eablePhonesAssist.setValue(setting.enablePhonesAssist);
    this.minimumSpeed.setValue(setting.minimumSpeed);
    this.showAsSpeed0.setValue(setting.showSpeedAsZeo);
    this.grayoutASpeed.setValue(setting.showSpeedAsGray);
    this.stopUpdateAnArrow.setValue(setting.stopArrow);
    this.grayoutAnArrow.setValue(setting.showArrowAsGray);
  }
}
