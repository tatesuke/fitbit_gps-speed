import * as messaging from "messaging";
import { geolocation } from "geolocation";

messaging.peerSocket.addEventListener("message", (e) => {
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
  if (!geolocation || gpsWatchId !== -1) {
    return;
  }
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
    { timeout: 5000, enableHighAccuracy: true }
  );
}

function stopGps() {
  geolocation.clearWatch(gpsWatchId);
  gpsWatchId = -1;
}

const sendQueue: any[] = [];
function send(data) {
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