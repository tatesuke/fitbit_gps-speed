import { defaultSetting, Setting } from "../common/setting";
import * as fs from "fs";
import { listDirSync } from "fs";

class SettingManager {
  private setting: Setting = defaultSetting;
  private changeListeners: ((setting: Setting) => void)[] = [];

  constructor() {
    const listDir = listDirSync("/private/data");
    let dirIter;
    while ((dirIter = listDir.next()) && !dirIter.done) {
      console.log(dirIter.value);
    }
    if (!fs.existsSync("/private/data/setting.json")) {
      fs.writeFileSync("/private/data/setting.json", this.setting, "json");
    } else {
      this.setting = fs.readFileSync("/private/data/setting.json", "json");
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
