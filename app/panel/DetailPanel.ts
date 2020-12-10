import { Panel } from "app/component/Panel";
import { gpsManager, Position } from "app/GpsManager";

export class DetailPanel extends Panel {
  private source: Element;
  private lastUpdateTime: Element;
  private latitude: Element;
  private longitude: Element;
  private accuracy: Element;
  private altitude: Element;
  private altitudeAccuracy: Element;
  private heading: Element;
  private speed: Element;

  private position: Position;

  constructor(elem: Element) {
    super(elem.getElementsByClassName("id_scrollview")[0]);

    this.source = elem.getElementById("detail-panel__source");
    this.lastUpdateTime = elem.getElementById("detail-panel__last-update-time");
    this.latitude = elem.getElementById("detail-panel__latitude");
    this.longitude = elem.getElementById("detail-panel__longitude");
    this.accuracy = elem.getElementById("detail-panel__accuracy");
    this.altitude = elem.getElementById("detail-panel__altitude");
    this.altitudeAccuracy = elem.getElementById(
      "detail-panel__altitude-accuracy"
    );
    this.heading = elem.getElementById("detail-panel__heading");
    this.speed = elem.getElementById("detail-panel__speed");

    gpsManager.addListener((p) => {
      this.position = p;
      this.updateUi();
    });

    this.updateUi();
  }

  private updateUi() {
    if (!this.position) {
      return;
    }
    this.source.text = this.position.source;
    this.lastUpdateTime.text = new Date(this.position.timestamp).toString();
    this.latitude.text = this.position.coords.latitude.toFixed(9);
    this.longitude.text = this.position.coords.longitude.toFixed(9);
    this.accuracy.text = this.position.coords.accuracy.toFixed(9);
    if (this.position.coords.altitude !== null) {
      this.altitude.text = this.position.coords.altitude.toFixed(9);
    }
    if (this.position.coords.altitudeAccuracy !== null) {
      this.altitudeAccuracy.text = this.position.coords.altitudeAccuracy.toFixed(
        9
      );
    }
    if (this.position.coords.heading !== null) {
      this.heading.text = this.position.coords.heading.toFixed(9);
    }
    if (this.position.coords.speed !== null) {
      this.speed.text = this.position.coords.speed.toFixed(9);
    }
  }
}
