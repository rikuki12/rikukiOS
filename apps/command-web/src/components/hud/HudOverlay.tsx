"use client";

import { HudBridge } from "@/components/hud/HudBridge";
import { TopBar } from "@/components/hud/TopBar";

export function HudOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col">
      <HudBridge />
      <TopBar />
      <div className="flex-1" />
      {/* Left, right, and bottom HUD zones are added in subsequent commits. */}
    </div>
  );
}
