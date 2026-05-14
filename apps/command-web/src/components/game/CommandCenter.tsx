"use client";

import { PhaserGame } from "@/components/game/PhaserGame";
import { HudOverlay } from "@/components/hud/HudOverlay";
import { DEFAULT_SCENES, GAME_HEIGHT, GAME_WIDTH } from "@/game/config";

export function CommandCenter() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--color-hom-bg)]">
      <PhaserGame
        scenes={DEFAULT_SCENES}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="absolute inset-0"
      />
      <HudOverlay />
    </div>
  );
}
