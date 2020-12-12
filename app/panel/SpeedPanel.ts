import * as util from "common/utils";
import { Panel } from "app/component/Panel";
import { settingManager, Setting } from "app/SettingManager";
import { gpsManager } from "app/GpsManager";

export class SpeedPanel extends Panel {
  private gpsStatusLabel: Element;
  private speedLabel: Element;
  private speedUnitLabel: Element;
  private altLabel: Element;
  private headLabel: Element;
  private headArrow: Element;
  private gpsElements: Element[];

  private setting: Setting;

  private isGpsActive = false;
  private gpsStatusLabelText: string = "GPS: Connecting...";
  private speed: number = 0;
  private heading: number;
  private alt: number;

  constructor(elem: Element) {
    super(elem.getElementById("speed-panel__root"));

    this.initElements();
    this.initSetting();
    this.initGps();

    this.updateUi();
  }

  private initElements() {
    const elem = this.elem;
    this.gpsStatusLabel = elem.getElementById("speed-panel__status-label");
    this.speedLabel = elem.getElementById("speed-panel__speed-label");
    this.speedUnitLabel = elem.getElementById("speed-panel__speed-unit-label");
    this.altLabel = elem.getElementById("speed-panel__alt-label");
    this.headLabel = elem.getElementById("speed-panel__head-label");
    this.headArrow = elem.getElementById("speed-panel__head-arrow");
    this.gpsElements = elem.getElementsByClassName("gps-element");
  }

  private initSetting() {
    this.setting = settingManager.getSetting();
    settingManager.addChangeListener((s) => {
      this.setting = s;
      this.updateUi();
    });
  }

  private initGps() {
    gpsManager.addListener(
      (p) => {
        this.isGpsActive = true;
        this.gpsStatusLabelText = "GPS: " + p.source;
        this.speed = p.coords.speed;
        this.heading = p.coords.heading;
        this.alt = p.coords.altitude;
        this.updateUi();
      },
      (e) => {
        this.isGpsActive = false;
        this.gpsStatusLabelText = "GPS: Lost";
        this.updateUi();
      }
    );
  }

  private updateUi() {
    if (this.isGpsActive) {
      this.updateUiForActive();
    } else {
      this.updateUiForInactive();
    }
  }

  private updateUiForActive() {
    this.gpsStatusLabel.text = this.gpsStatusLabelText;
    this.speedUnitLabel.text = this.setting.unitOfSpeed;
    this.headLabel.text = this.heading
      ? this.heading.toString().slice(0, 7)
      : "-";

    if (this.alt) {
      const alt =
        this.setting.unitOfAltitude === "m" ? this.alt : this.alt * 3.28;
      this.altLabel.text = alt.toString().slice(0, 7);
    } else {
      this.altLabel.text = "-";
    }

    const displaySpeed =
      this.setting.unitOfSpeed == "mph"
        ? this.speed * 2.2369
        : this.setting.unitOfSpeed == "kt"
        ? this.speed * 1.9438
        : this.speed * 3.6;

    const tooSlow =
      typeof this.speed === "number" &&
      this.setting.minimumSpeed > displaySpeed;
    if (!tooSlow) {
      this.speedLabel.text = displaySpeed.toFixed(1);
      if (typeof this.heading === "number") {
        (this
          .headArrow as GroupElement).groupTransform.rotate.angle = this.heading;
        util.removeClassName(this.gpsElements, "--gps-too-slow");
      }
    } else {
      if (this.setting.showSpeedAsZeo) {
        this.speedLabel.text = "0";
      } else {
        this.speedLabel.text = displaySpeed.toFixed(1);
      }
      if (this.setting.showSpeedAsGray) {
        util.addClassName(this.speedLabel, "--gps-too-slow");
      }

      if (!this.setting.stopArrow) {
        (this
          .headArrow as GroupElement).groupTransform.rotate.angle = this.heading;
      }
      if (this.setting.showArrowAsGray) {
        util.addClassName(
          this.headArrow.getElementsByClassName("gps-element"),
          "--gps-too-slow"
        );
      }
    }
    util.addClassName(this.gpsElements, "--gps-active");
  }

  private updateUiForInactive() {
    this.gpsStatusLabel.text = this.gpsStatusLabelText;
    this.speedUnitLabel.text = this.setting.unitOfSpeed;

    util.removeClassName(this.gpsElements, "--gps-active");
    util.removeClassName(this.gpsElements, "--gps-too-slow");
  }
}
