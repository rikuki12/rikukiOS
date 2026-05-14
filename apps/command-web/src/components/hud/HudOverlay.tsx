"use client";

import { HudBridge } from "@/components/hud/HudBridge";
import { LeftPanel } from "@/components/hud/LeftPanel";
import { TopBar } from "@/components/hud/TopBar";

export function HudOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid"
      style={{
        gridTemplateRows: "80px 1fr",
        gridTemplateColumns: "auto 1fr",
        gridTemplateAreas: `
          "top top"
          "left center"
        `,
      }}
    >
      <HudBridge />
      <div style={{ gridArea: "top" }}>
        <TopBar />
      </div>
      <div style={{ gridArea: "left" }}>
        <LeftPanel />
      </div>
      {/* center cell stays empty so the Phaser canvas behind it remains clickable */}
    </div>
  );
}
