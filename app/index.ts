/*
 * Entry point for the watch app
 */

import document from 'document';
import { ClockPanel } from "./component/ClockPanel";
import { DetailPanel } from "./page/DetailPanel";
import { ContentPanel } from "./component/ContentPanel";
import { SettingPanel } from "./page/SettingPanel";
import { SpeedPanel } from "./page/SpeedPanel";

const clockPanel = new ClockPanel(document.getElementById("clock-panel"));

const settingPanel = document.getElementById("setting-panel") as GraphicsElement;
const settingPanelTransform = document.getElementById("setting-panel-transform") as GroupElement; 
let isMouseDown = false;
let previousY;
const contentPanel = document.getElementById("content-panel-rect") as GraphicsElement;
contentPanel.addEventListener("mousedown", (e)=>{
    isMouseDown = true;
    previousY = e.screenY;
    console.log("down " + previousY);
});
contentPanel.addEventListener("mouseup", ()=>{
    isMouseDown = false;
    console.log("up");
});
contentPanel.addEventListener("mousemove", (e)=>{
    if (!isMouseDown) {
      return;
    }
    const diff = e.screenY - previousY;
    let nextY = Math.min(settingPanelTransform.groupTransform.translate.y + diff, 0);
    nextY = Math.max(-settingPanel.height + contentPanel.height, nextY);
    settingPanelTransform.groupTransform.translate.y = nextY;
    previousY = e.screenY;
});

const hoge = document
  .getElementById("setting-panel__always-screen-on")
  .getElementsByClassName("on-off__button")[0] as GraphicsElement;
console.log(hoge);
hoge.addEventListener("click", () => {
  console.log("click");
});

// const contentPanel = new ContentPanel(
//   document.getElementById("content-panel"),
//   new SpeedPanel(document.getElementById("speed-panel")),
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



