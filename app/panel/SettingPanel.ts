import { Panel } from "app/component/Panel";
import { OnOff } from "app/component/input/OnOff";
import { Radio } from "app/component/input/Radio";
import { settingManager, Setting } from "app/SettingManager";
import { NumberPad } from "app/component/NumberPad";
import { Label } from "app/component/input/Label";
import { display } from "display";

export class SettingPanel extends Panel {
  private alwaysScreenOn: OnOff;
  private unitOfSpeed: Radio;
  private unitOfAltitude: Radio;
  private eablePhonesAssist: OnOff;
  private minimumSpeed: Label;
  private showAsSpeed0: OnOff;
  private grayoutASpeed: OnOff;
  private stopUpdateAnArrow: OnOff;
  private grayoutAnArrow: OnOff;
  private displayOnIntervalId: number | null = null;

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

    this.unitOfAltitude = new Radio(
      [
        ["m", elem.getElementById("setting-panel__m-radio")],
        ["feet", elem.getElementById("setting-panel__feet-radio")],
      ],
      setting.unitOfAltitude
    );
    this.unitOfAltitude.onClick((value: string) => {
      settingManager.update({
        unitOfAltitude: value,
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

    this.onSettingChange(settingManager.getSetting());
  }

  private onSettingChange(setting: Setting) {
    this.alwaysScreenOn.setValue(setting.alwaysScreenOn);
    this.unitOfSpeed.setValue(setting.unitOfSpeed);
    this.unitOfAltitude.setValue(setting.unitOfAltitude);
    this.eablePhonesAssist.setValue(setting.enablePhonesAssist);
    this.minimumSpeed.setValue(setting.minimumSpeed);
    this.showAsSpeed0.setValue(setting.showSpeedAsZeo);
    this.grayoutASpeed.setValue(setting.showSpeedAsGray);
    this.stopUpdateAnArrow.setValue(setting.stopArrow);
    this.grayoutAnArrow.setValue(setting.showArrowAsGray);

    if (setting.alwaysScreenOn) {
      if (this.displayOnIntervalId === null) {
        display.poke();
        this.displayOnIntervalId = setInterval(() => {
          display.poke();
        }, 5000);
      }
    } else {
      if (this.displayOnIntervalId !== null) {
        clearInterval(this.displayOnIntervalId);
        this.displayOnIntervalId = null;
      }
    }
  }
}
