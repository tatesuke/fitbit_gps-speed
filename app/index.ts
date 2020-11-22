/*
 * Entry point for the watch app
 */

import document from 'document';
import { ClockPanel } from './ClockPanel';
import { DetailPanel } from './DetailPanel';
import { ContentPanel } from './ContentPanel';
import { SettingPanel } from './SettingPanel';
import { SpeedPanel } from './SpeedPanel';

const clockPanel = new ClockPanel(document.getElementById("clock-panel"));

const contentPanel = new ContentPanel(
  document.getElementById("content-panel"),
  new SpeedPanel(document.getElementById("speed-panel")),
  new DetailPanel(document.getElementById("detail-panel"))
);

// const settingPanel = new SettingPanel(document.getElementById("content-panel"));

// contentPanel.onTripreClick(()=>{
//   contentPanel.hide();
//   settingPanel.show();
// });

// settingPanel.onClose(()=> {
//   settingPanel.hide();
//   contentPanel.show();
// });
