import { SCENES, type SceneKey } from "@/game/scenes/keys";
import type { RoomId } from "@/store/roomStore";

export const SCENE_TO_ROOM: Partial<Record<SceneKey, RoomId>> = {
  [SCENES.APEX]: "apex",
  [SCENES.MITCHELLEN]: "mitchellen",
};

export const ROOM_TO_SCENE: Partial<Record<RoomId, SceneKey>> = {
  apex: SCENES.APEX,
  mitchellen: SCENES.MITCHELLEN,
};

export function sceneKeyToRoomId(key: string): RoomId | null {
  return (SCENE_TO_ROOM as Record<string, RoomId | undefined>)[key] ?? null;
}

export function roomIdToSceneKey(id: RoomId): SceneKey | null {
  return ROOM_TO_SCENE[id] ?? null;
}
