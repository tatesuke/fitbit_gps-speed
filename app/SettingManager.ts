import { defaultSetting, Setting } from "../common/setting";

class SettingManager {
  private setting: Setting = defaultSetting;
  private changeListeners: ((setting: Setting) => void)[] = [];

  public addChangeListener(listener: (setting: Setting) => void) {
    this.changeListeners.push(listener);
  }
  public update(obj: any) {
    this.setting = { ...this.setting, ...obj };
    this.changeListeners.forEach((listener) => {
      listener({ ...this.setting });
    });
  }

  public getSetting(): Setting {
    return { ...this.setting };
  }
}

export const settingManager = new SettingManager();
