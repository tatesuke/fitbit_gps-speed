export interface Setting {
  version: number;
  alwaysScreenOn: boolean;
  unitOfSpeed: "km/h" | "mph" | "kt";
  enablePhonesAssist: boolean;
  showSpeedAsZeo: boolean;
  showSpeedAsGray: boolean;
  stopArrow: boolean;
  showArrowAsGray: boolean;
  minimumSpeed: number;
}

export const defaultSetting: Setting = {
  version: 1,
  alwaysScreenOn: false,
  unitOfSpeed: "km/h",
  enablePhonesAssist: true,
  showSpeedAsZeo: true,
  showSpeedAsGray: true,
  stopArrow: true,
  showArrowAsGray: true,
  minimumSpeed: 5,
};
