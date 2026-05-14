// Typed event names + payloads for the Phaser <-> React bridge.
// Add events here as new HUD interactions are wired up.

export type EventMap = {
  "scene:ready": { sceneKey: string };
  "scene:transition": { from: string; to: string };
  "hotspot:hover": { id: string; label: string };
  "hotspot:leave": { id: string };
  "hotspot:activate": { id: string };
  "portal:hover": { id: string; label: string };
  "portal:leave": { id: string };
  "portal:activate": { id: string; targetSceneKey: string };
  "agent:select": { agentId: string };
  "boss:move": { x: number; y: number };
};

export type EventName = keyof EventMap;
