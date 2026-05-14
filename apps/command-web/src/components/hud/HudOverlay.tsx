"use client";

import { TopBar } from "@/components/hud/TopBar";

export function HudOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col">
      <TopBar />
      <div className="flex-1" />
      {/*
        Left navigation panel, right agent card, and bottom nav row are
        deferred past the V1 first-session goals. The Zustand stores in
        src/store already model the data they will read from.
      */}
    </div>
  );
}
