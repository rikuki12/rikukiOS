"use client";

import { BottomNav } from "@/components/hud/BottomNav";
import { HudBridge } from "@/components/hud/HudBridge";
import { LeftPanel } from "@/components/hud/LeftPanel";
import { RightPanel } from "@/components/hud/RightPanel";
import { TopBar } from "@/components/hud/TopBar";

export function HudOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid"
      style={{
        gridTemplateRows: "80px 1fr 64px",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateAreas: `
          "top top top"
          "left center right"
          "bottom bottom bottom"
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
      <div style={{ gridArea: "bottom" }}>
        <BottomNav />
      </div>
    </div>
  );
}
