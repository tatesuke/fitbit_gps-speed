/*
 * Entry point for the watch app
 */

import document from 'document';
import { ClockPanel } from "./component/ClockPanel";
import { HorizontalScrollPanel } from "./component/HorizontalScrollPanel";
import { Panel } from "./component/Panel";
import { SpeedPanel } from "./panel/SpeedPanel";
import { SettingPanel } from "./panel/SettingPanel";
import { DetailPanel } from "./panel/DetailPanel";

const clockPanel = new ClockPanel(document.getElementById("clock-panel"));

const horizontalScrollPanel = new HorizontalScrollPanel(
  document.getElementById("horizontal-scroll-panel"),
  [
    new SpeedPanel(document.getElementById("speed-panel")),
    new DetailPanel(document.getElementById("detail-panel")),
    new SettingPanel(document.getElementById("setting-panel1")),
  ]
);

// const contentPanel = new ContentPanel(
//   document.getElementById("content-panel"),
//   
//   new DetailPanel(document.getElementById("detail-panel"))
// );

// const settingPanel = new SettingPanel(document.getElementById("content-panel"));

// contentPanel.onTripreClick(()=>{
//   contentPanel.hide();
//   settingPanel.show();
// });

// settingPanel.onClose(()=> {
//   settingPanel.hide();
//   contentPanel.show();
// });



