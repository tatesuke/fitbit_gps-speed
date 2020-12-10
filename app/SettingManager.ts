import * as fs from "fs";
import { units } from "user-settings";

export interface Setting {
  version: number;
  alwaysScreenOn: boolean;
  unitOfSpeed: "km/h" | "mph" | "kt";
  unitOfAltitude: "m" | "feet";
  enablePhonesAssist: boolean;
  showSpeedAsZeo: boolean;
  showSpeedAsGray: boolean;
  stopArrow: boolean;
  showArrowAsGray: boolean;
  minimumSpeed: number;
}

export const defaultSetting: Setting = {
  version: 2,
  alwaysScreenOn: false,
  unitOfSpeed: units.speed === "us" ? "mph" : "km/h",
  unitOfAltitude: units.speed === "us" ? "feet" : "m",
  enablePhonesAssist: true,
  showSpeedAsZeo: false,
  showSpeedAsGray: true,
  stopArrow: true,
  showArrowAsGray: true,
  minimumSpeed: 5,
};

class SettingManager {
  private setting: Setting;
  private changeListeners: ((setting: Setting) => void)[] = [];

  public constructor() {
    if (!fs.existsSync("/private/data/setting.json")) {
      this.setting = defaultSetting;
      fs.writeFileSync("/private/data/setting.json", this.setting, "json");
    } else {
      this.setting = fs.readFileSync("/private/data/setting.json", "json");
      if (this.setting.version !== defaultSetting.version) {
        this.setting = defaultSetting;
        fs.writeFileSync("/private/data/setting.json", this.setting, "json");
      }
    }
  }

  public addChangeListener(listener: (setting: Setting) => void) {
    this.changeListeners.push(listener);
  }
  public update(obj: any) {
    this.setting = { ...this.setting, ...obj };
    fs.writeFileSync("/private/data/setting.json", this.setting, "json");
    this.changeListeners.forEach((listener) => {
      listener({ ...this.setting });
    });
  }

  public getSetting(): Setting {
    return { ...this.setting };
  }
}

export const settingManager = new SettingManager();

