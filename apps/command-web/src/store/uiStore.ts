import { create } from "zustand";

export type BottomNavTab =
  | "quests"
  | "agents"
  | "rooms"
  | "treasury"
  | "vault"
  | "codex"
  | "messages"
  | "command";

type UIState = {
  hoveredHotspotId: string | null;
  hoveredPortalId: string | null;
  activeBottomTab: BottomNavTab;
  setHoveredHotspot: (id: string | null) => void;
  setHoveredPortal: (id: string | null) => void;
  setActiveBottomTab: (tab: BottomNavTab) => void;
};

export const useUIStore = create<UIState>((set) => ({
  hoveredHotspotId: null,
  hoveredPortalId: null,
  activeBottomTab: "quests",
  setHoveredHotspot: (id) => set({ hoveredHotspotId: id }),
  setHoveredPortal: (id) => set({ hoveredPortalId: id }),
  setActiveBottomTab: (tab) => set({ activeBottomTab: tab }),
}));
