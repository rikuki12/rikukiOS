import type { SceneKey } from "@/game/scenes/keys";

export type Portal = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetSceneKey: SceneKey | null;
  status: "active" | "locked";
};

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
