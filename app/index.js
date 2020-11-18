/*
 * Entry point for the watch app
 */
import document from 'document';
import { geolocation  } from "geolocation";
import { display } from "display";
import clock from "clock";
import * as util from "../common/utils";
import { preferences } from "user-settings";

const MIN_SPEED = 5.0;

console.log("App code started");

// init display
// setInterval(()=>{
//   display.poke();
// }, 7000);

// init clock
const clockLabel = document.getElementById("clock-label");

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
}

// init gps
const gpsStatusLabel = document.getElementById("gps-status-label");
const gpsStatusSpentLabel = document.getElementById("gps-status-spent-label");
const speedLabel =  document.getElementById("speed-label");
const latLabel =  document.getElementById("lat-label");
const lonLabel =  document.getElementById("lon-label");
const altLabel =  document.getElementById("alt-label");
const headLabel =  document.getElementById("head-label");
const headArrow = document.getElementById("head-arrow");
const gpsElements = document.getElementsByClassName("gps-element");

let lastConnectionTime = null;
geolocation.watchPosition((p)=>{
  lastConnectionTime = new Date();
  gpsStatusLabel.text="GPS: Available";
  
  const speed = (p.coords.speed * 3.6).toFixed(1);
  headLabel.text = p.coords.heading;
  latLabel.text = p.coords.latitude;
  lonLabel.text = p.coords.longitude;
  altLabel.text = p.coords.altitude;
  
  if (speed < MIN_SPEED) {
    speedLabel.text = 0;
    util.addClassName(gpsElements, "__gps-too-slow");
  } else {
    speedLabel.text = speed;
    headArrow.groupTransform.rotate.angle = p.coords.heading;
    util.removeClassName(gpsElements, "__gps-too-slow");
  }
  util.addClassName(gpsElements, "__gps-active");
}, (e)=>{
  gpsStatusLabel.text="GPS: Conecting...";
  const spent = (lastConnectionTime) ? util.getSpentString(lastConnectionTime) : "never";
  gpsStatusSpentLabel.text = `(Last connection: ${spent})`;
  
  util.removeClassName(gpsElements, "__gps-active");
  util.removeClassName(gpsElements, "__gps-too-slow");
}, {timeout:5000});
