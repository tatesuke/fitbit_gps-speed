import { defaultSetting, Setting } from "../common/setting";

import { geolocation, PositionOptions, PositionError } from "geolocation";

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
  private listeners: {
    successCallback: PositionCallback;
    errorCallback?: PositionErrorCallback;
  }[] = [];

  public addListener(
    successCallback: PositionCallback,
    errorCallback?: PositionErrorCallback
  ) {
    this.listeners.push({
      successCallback,
      errorCallback,
    });
    if (this.listeners.length === 1) {
      // TODO 本当はclear watchが必要。
      geolocation.watchPosition(
        (p) => this.watchSuccess(p),
        (e) => this.watchFail(e),
        {
          timeout: 5000,
        }
      );
    }
  }

  watchSuccess(p: globalThis.Position): void {
    const position = { ...p, source: "device" as "device" };
    this.listeners.forEach((l) => {
      l.successCallback(position);
    });
  }

  watchFail(e: PositionError): void {
    this.listeners.forEach((l) => {
      l.errorCallback(e);
    });
  }
}
export const gpsManager = new GpsManager();
