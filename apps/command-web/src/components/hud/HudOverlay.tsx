"use client";

import { HudBridge } from "@/components/hud/HudBridge";
import { LeftPanel } from "@/components/hud/LeftPanel";
import { RightPanel } from "@/components/hud/RightPanel";
import { TopBar } from "@/components/hud/TopBar";

export function HudOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid"
      style={{
        gridTemplateRows: "80px 1fr",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateAreas: `
          "top top top"
          "left center right"
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
      <div style={{ gridArea: "right" }}>
        <RightPanel />
      </div>
      {/* center cell stays empty so the Phaser canvas behind it remains clickable */}
    </div>
  );
}
