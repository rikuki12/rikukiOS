import type PhaserNS from "phaser";
import { BootScene } from "@/game/scenes/BootScene";
import { PreloadScene } from "@/game/scenes/PreloadScene";
import { ApexCommandCenterScene } from "@/game/scenes/ApexCommandCenterScene";
import { MitchellenDigitalServicesScene } from "@/game/scenes/MitchellenDigitalServicesScene";

export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;

export const DEFAULT_SCENES: PhaserNS.Types.Scenes.SceneType[] = [
  BootScene,
  PreloadScene,
  ApexCommandCenterScene,
  MitchellenDigitalServicesScene,
];
