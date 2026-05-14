"use client";

import { useEffect } from "react";
import { EventBus } from "@/game/systems/EventBus";
import { useAgentStore } from "@/store/agentStore";
import { useRoomStore } from "@/store/roomStore";
import { useUIStore } from "@/store/uiStore";
import { sceneKeyToRoomId } from "@/lib/sceneRoomMap";

export function useEventBusBridge() {
  useEffect(() => {
    const offs: Array<() => void> = [];

    offs.push(
      EventBus.on("scene:transition", ({ to }) => {
        const roomId = sceneKeyToRoomId(to);
        if (roomId) useRoomStore.getState().setCurrentRoom(roomId);
      }),
      EventBus.on("portal:hover", ({ id }) => {
        useUIStore.getState().setHoveredPortal(id);
      }),
      EventBus.on("portal:leave", () => {
        useUIStore.getState().setHoveredPortal(null);
      }),
      EventBus.on("hotspot:hover", ({ id }) => {
        useUIStore.getState().setHoveredHotspot(id);
      }),
      EventBus.on("hotspot:leave", () => {
        useUIStore.getState().setHoveredHotspot(null);
      }),
      EventBus.on("agent:select", ({ agentId }) => {
        useAgentStore.getState().select(agentId);
      }),
    );

    return () => {
      for (const off of offs) off();
    };
  }, []);
}
