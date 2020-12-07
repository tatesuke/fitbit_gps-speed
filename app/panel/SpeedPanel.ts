import * as util from "../../common/utils";
import { Panel } from "../component/Panel";
import { Setting } from "../../common/setting";
import { settingManager } from "../settingManager";
import { gpsManager } from "../gpsManager";

const MIN_SPEED = 0.0;

export class SpeedPanel extends Panel {
  private gpsStatusLabel: Element;
  private gpsStatusSpentLabel: Element;
  private speedLabel: Element;
  private speedUnitLabel: Element;
  private altLabel: Element;
  private headLabel: Element;
  private headArrow: Element;
  private gpsElements: Element[];

  private setting: Setting;

  private isGpsActive = false;
  private lastConnectionTime?: Date = undefined;
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
    this.gpsStatusSpentLabel = elem.getElementById("speed-panel__spent-label");
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
        this.lastConnectionTime = new Date();
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
    this.headLabel.text = this.heading ? this.heading.toString() : "-";
    this.altLabel.text = this.alt ? this.alt.toString().slice(0, 10) : "-";

    if (typeof this.speed === "number" && MIN_SPEED <= this.speed) {
      this.speedLabel.text = (this.setting.unitOfSpeed == "mph"
        ? this.speed * 2.2369
        : this.speed * 3.6
      ).toFixed(1);
      (this
        .headArrow as GroupElement).groupTransform.rotate.angle = this.heading;
      util.removeClassName(this.gpsElements, "--gps-too-slow");
    } else {
      this.speedLabel.text = "0";
      util.addClassName(this.gpsElements, "--gps-too-slow");
    }
    util.addClassName(this.gpsElements, "--gps-active");
  }

  private updateUiForInactive() {
    this.gpsStatusLabel.text = this.gpsStatusLabelText;
    const spent = this.lastConnectionTime
      ? util.getSpentString(this.lastConnectionTime)
      : "never";
    this.gpsStatusSpentLabel.text = `(Last connection: ${spent})`;
    this.speedUnitLabel.text = this.setting.unitOfSpeed;

    util.removeClassName(this.gpsElements, "--gps-active");
    util.removeClassName(this.gpsElements, "--gps-too-slow");
  }
}
