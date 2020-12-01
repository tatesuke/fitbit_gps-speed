export interface Setting {
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
  alwaysScreenOn: false,
  unitOfSpeed: "km/h",
  enablePhonesAssist: true,
  showSpeedAsZeo: true,
  showSpeedAsGray: true,
  stopArrow: true,
  showArrowAsGray: true,
  minimumSpeed: 5,
};
