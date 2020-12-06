import { defaultSetting, Setting } from "../common/setting";

import { geolocation, PositionOptions, PositionError } from "geolocation";
import { settingManager } from "./SettingManager";
import * as messaging from "messaging";

interface Coordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}
interface Position {
  readonly coords: Coordinates;
  readonly source: "phone" | "device";
  readonly timestamp: number;
}

type PositionErrorCallback = (error: PositionError) => void;
type PositionCallback = (position: Position) => void;

class GpsManager {
  private state:
    | "initialized"
    | "phone"
    | "lost-phone"
    | "device"
    | "lost-device" = "initialized";

  private listeners: {
    successCallback: PositionCallback;
    errorCallback?: PositionErrorCallback;
  }[] = [];

  private sendQueue: any[] = [];
  constructor() {
    messaging.peerSocket.addEventListener("open", () => {
      let data;
      while ((data = this.sendQueue.shift())) {
        messaging.peerSocket.send(data);
      }
    });
    messaging.peerSocket.addEventListener("message", (e)     =>     {
      if (e.data.key !== "gps") {
        return;
      }
      if (!e.data || !e.data.action) {
        return;
      }
      if (e.data.action.type === "success") {
        this.watchSuccessPhone(e.data.action.payload);
      }
      if (e.data.action.type === "fail") {
        this.watchFailPhone(e.data.action.payload);
      }
    });
  }

  public addListener(
    successCallback: PositionCallback,
    errorCallback?: PositionErrorCallback
  ) {
    this.listeners.push({
      successCallback,
      errorCallback,
    });
    if (this.listeners.length === 1) {
      this.startDeviceGps();
      this.startPhoneGps();
    }
  }

  startDeviceGps() {
    geolocation.watchPosition(
      (p) => this.watchSuccessDevice(p),
      (e) => this.watchFailDevice(e),
      {
        timeout: 5000,
      }
    );
  }

  private watchSuccessDevice(p: globalThis.Position): void {
    if (this.state !== "device" && this.state !== "lost-device") {
      this.stopPhoneGps();
    }
    this.state = "device";

    const position = { ...p, source: "device" as "device" };
    this.listeners.forEach((l) => {
      l.successCallback(position);
    });
  }

  private watchFailDevice(e: PositionError): void {
    if (this.state === "device" || this.state === "lost-device") {
      this.state = "lost-device";
      this.listeners.forEach((l) => {
        l.errorCallback(e);
      });
    }
  }

  private send(type: string) {
    const date = { key: "GPS", action: { type } };
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(date);
    } else {
      this.sendQueue.push(date);
    }
  }

  private startPhoneGps() {
    this.send("startGps");
  }

  private stopPhoneGps() {
    this.send("stopGps");
  }

  watchSuccessPhone(p: globalThis.Position): void {
    if (this.state !== "initialized" && this.state !== "phone" && this.state !== "lost-phone") {
      return;
    }
    console.log(p.coords);
    this.state = "phone";
    const position = { ...p, source: "phone" as "phone"};
    this.listeners.forEach((l) => {
      l.successCallback(position);
    });
  }

  private watchFailPhone(e): void {
    if (this.state === "initialized" || this.state === "phone" || this.state === "lost-phone") {
      this.state = "lost-device";
      this.listeners.forEach((l) => {
        l.errorCallback(e);
      });
    }
  }
}
export const gpsManager = new GpsManager();
