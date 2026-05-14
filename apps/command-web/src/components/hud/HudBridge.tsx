"use client";

import { useEventBusBridge } from "@/hooks/useEventBusBridge";

export function HudBridge() {
  useEventBusBridge();
  return null;
}
