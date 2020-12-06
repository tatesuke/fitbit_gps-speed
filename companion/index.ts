import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { geolocation, PositionOptions, PositionError } from "geolocation";

// Settings have been changed
settingsStorage.addEventListener("change", (evt) => {
  sendValue(evt.key, evt.newValue);
});

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val),
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}

messaging.peerSocket.addEventListener("message", (e) => {
  console.log("受信!  " + e.data.key);
  if (!e.data || !e.data.action || !e.data.action.type) {
    return;
  }
  if (e.data.action.type === "startGps") {
    startGps();
  }
  if (e.data.action.type === "stopGps") {
    stopGps();
  }
});

let gpsWatchId: number = -1;
function startGps() {
  gpsWatchId = geolocation.watchPosition(
    (p) => {
      send({
        key: "gps",
        action: {
          type: "success",
          payload: {
            coords: {
              accuracy: p.coords.accuracy,
              altitude: p.coords.altitude,
              altitudeAccuracy: p.coords.altitudeAccuracy,
              heading: p.coords.heading,
              latitude: p.coords.latitude,
              longitude: p.coords.longitude,
              speed: p.coords.speed,
            },
            timestamp: p.timestamp,
          },
        },
      });
    },
    (e) => {
      send({
        key: "gps",
        action: {
          type: "Fail",
          payload: {
            code: e.code,
            message: e.message,
          },
        },
      });
    },
    { timeout: 5000 }
  );
}

function stopGps() {
  console.log("clearwatch");
  geolocation.clearWatch(gpsWatchId);
}

const sendQueue: any[] = [];
function send(data) {
  console.log("send");
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    sendQueue.push(data);
  }
}

messaging.peerSocket.addEventListener("open", () => {
  let data;
  while ((data = sendQueue.shift())) {
    messaging.peerSocket.send(data);
  }
});

messaging.peerSocket.addEventListener("error", () => {
  stopGps();
});