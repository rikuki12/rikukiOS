import type PhaserNS from "phaser";
import { BootScene } from "@/game/scenes/BootScene";
import { PreloadScene } from "@/game/scenes/PreloadScene";

export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;

export const DEFAULT_SCENES: PhaserNS.Types.Scenes.SceneType[] = [
  BootScene,
  PreloadScene,
];
