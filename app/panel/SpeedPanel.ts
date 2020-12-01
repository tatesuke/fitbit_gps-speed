/*
 * Entry point for the watch app
 */
import document from "document";
import { geolocation } from "geolocation";
import clock from "clock";
import * as util from "../../common/utils";
import { preferences } from "user-settings";
import { Panel } from "../component/Panel";
import { Setting } from "../../common/setting";
import { settingManager } from "../settingManager";
const MIN_SPEED = 5.0;

export class SpeedPanel extends Panel {
  private gpsStatusLabel: Element;
  private gpsStatusSpentLabel: Element;
  private speedLabel: Element;
  private latLabel: Element;
  private lonLabel: Element;
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
  private lat;
  private lon;
  private alt;

  constructor(elem: Element) {
    super(elem.getElementsByClassName("id__main-section")[0]);

    this.setting = settingManager.getSetting();
    settingManager.addChangeListener((s) => {
      this.setting = s;
      this.updateUi;
    });

    this.initElements();
    this.initGps();
    this.updateUi();
  }

  private initElements() {
    const elem = this.elem;
    this.gpsStatusLabel = elem.getElementById("gps-status-label");
    this.gpsStatusSpentLabel = elem.getElementById("gps-status-spent-label");
    this.speedLabel = elem.getElementById("speed-label");
    this.latLabel = elem.getElementById("lat-label");
    this.lonLabel = elem.getElementById("lon-label");
    this.altLabel = elem.getElementById("alt-label");
    this.headLabel = elem.getElementById("head-label");
    this.headArrow = elem.getElementById("head-arrow");
    this.gpsElements = elem.getElementsByClassName("gps-element");
  }

  private initGps() {
    geolocation.watchPosition(
      (p) => {
        this.isGpsActive = true;
        this.lastConnectionTime = new Date();
        this.gpsStatusLabelText = "GPS: Abiable";
        this.speed = p.coords.speed;
        this.heading = p.coords.heading;
        this.lat = p.coords.latitude;
        this.lon = p.coords.longitude;
        this.alt = p.coords.altitude;
        this.updateUi();
      },
      (e) => {
        this.isGpsActive = false;
        this.updateUi();
      },
      { timeout: 5000 }
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
    this.speedLabel.text = (this.speed * 3.6).toFixed(1);
    this.headLabel.text = this.heading.toString();
    this.latLabel.text = this.lat.toString().slice(0, 10);
    this.lonLabel.text = this.lon.toString().slice(0, 10);
    this.altLabel.text = this.alt.toString().slice(0, 10);

    if (this.speed < MIN_SPEED) {
      this.speedLabel.text = "0";
      util.addClassName(this.gpsElements, "__gps-too-slow");
    } else {
      (this
        .headArrow as GroupElement).groupTransform.rotate.angle = this.heading;
      util.removeClassName(this.gpsElements, "__gps-too-slow");
    }
    util.addClassName(this.gpsElements, "__gps-active");
  }

  private updateUiForInactive() {
    this.gpsStatusLabel.text = this.gpsStatusLabelText;
    const spent = this.lastConnectionTime
      ? util.getSpentString(this.lastConnectionTime)
      : "never";
    this.gpsStatusSpentLabel.text = `(Last connection: ${spent})`;

    util.removeClassName(this.gpsElements, "__gps-active");
    util.removeClassName(this.gpsElements, "__gps-too-slow");
  }
}
