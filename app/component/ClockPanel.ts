import document from "document";
import clock from "clock";
import * as util from "common/utils";
import { preferences } from "user-settings";
import { Panel } from "./Panel";

export class ClockPanel extends Panel {
  constructor(elem: Element) {
    super(elem);

    const clockLabel = document.getElementById("clock-panel__clock-label");
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
      clockLabel.text = `${hours}:${mins}`;
    };
  }
}
