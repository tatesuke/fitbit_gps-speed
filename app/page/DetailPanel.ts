/*
 * Entry point for the watch app
 */
import document from "document";
import { geolocation } from "geolocation";
import clock from "clock";
import * as util from "../../common/utils";
import { preferences } from "user-settings";
import { Panel } from "../component/Panel";
const MIN_SPEED = 5.0;

export class DetailPanel extends Panel {
  private clockLabel: Element;
  private gpsStatusLabel: Element;
  private gpsStatusSpentLabel: Element;
  private speedLabel: Element;
  private latLabel: Element;
  private lonLabel: Element;
  private altLabel: Element;
  private headLabel: Element;
  private headArrow: Element;
  private gpsElements: Element[];

  constructor(elem: Element) {
    super(elem);
    this.initElements();
    this.initClock();
    // this.initGps();
  }

  private initElements() {
    const elem = this.elem;
    this.clockLabel = document.getElementById("clock-label");
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

  private initClock() {
    clock.granularity = "minutes";
    clock.ontick = (evt) => {
      let today = evt.date;
      let hours = today.getHours();
      if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
      } else {
        // 24h format
        hours = util.zeroPad(hours);
      }
      let mins = util.zeroPad(today.getMinutes());
      this.clockLabel.text = `${hours}:${mins}`;
    };
  }

  private initGps() {
    let lastConnectionTime = null;
    geolocation.watchPosition(
      (p) => {
        lastConnectionTime = new Date();
        this.gpsStatusLabel.text = "GPS: Available";

        const speed = (p.coords.speed * 3.6).toFixed(1);
        this.headLabel.text = p.coords.heading.toString();
        this.latLabel.text = p.coords.latitude.toString().slice(0, 10);
        this.lonLabel.text = p.coords.longitude.toString().slice(0, 10);
        this.altLabel.text = p.coords.altitude.toString().slice(0, 10);

        if (parseInt(speed) < MIN_SPEED) {
          this.speedLabel.text = "0";
          util.addClassName(this.gpsElements, "__gps-too-slow");
        } else {
          this.speedLabel.text = speed;
          (this.headArrow as any).groupTransform.rotate.angle =
            p.coords.heading;
          util.removeClassName(this.gpsElements, "__gps-too-slow");
        }
        util.addClassName(this.gpsElements, "__gps-active");
      },
      (e) => {
        this.gpsStatusLabel.text = "GPS: Conecting...";
        const spent = lastConnectionTime
          ? util.getSpentString(lastConnectionTime)
          : "never";
        this.gpsStatusSpentLabel.text = `(Last connection: ${spent})`;

        util.removeClassName(this.gpsElements, "__gps-active");
        util.removeClassName(this.gpsElements, "__gps-too-slow");
      },
      { timeout: 5000 }
    );
  }
}
