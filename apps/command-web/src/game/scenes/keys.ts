export const SCENES = {
  BOOT: "BootScene",
  PRELOAD: "PreloadScene",
  APEX: "ApexCommandCenterScene",
  MITCHELLEN: "MitchellenDigitalServicesScene",
} as const;

export type SceneKey = (typeof SCENES)[keyof typeof SCENES];
