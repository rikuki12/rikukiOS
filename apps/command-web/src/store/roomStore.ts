import { create } from "zustand";

export type RoomId =
  | "apex"
  | "rex-unicus"
  | "rikuki-inc"
  | "mitchellen"
  | "estrella"
  | "moneta"
  | "lustrare"
  | "notary";

export type RoomStatus = "online" | "locked" | "incoming";

export type Room = {
  id: RoomId;
  label: string;
  status: RoomStatus;
};

type RoomState = {
  rooms: Room[];
  currentRoomId: RoomId;
  setCurrentRoom: (id: RoomId) => void;
};

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [
    { id: "apex", label: "APEX COMMAND", status: "online" },
    { id: "mitchellen", label: "MITCHELLEN", status: "online" },
    { id: "rex-unicus", label: "REX UNICUS", status: "locked" },
    { id: "rikuki-inc", label: "RIKUKI INC", status: "locked" },
    { id: "estrella", label: "ESTRELLA", status: "locked" },
    { id: "moneta", label: "MONETA", status: "locked" },
    { id: "lustrare", label: "LUSTRARE", status: "locked" },
    { id: "notary", label: "NOTARY", status: "locked" },
  ],
  currentRoomId: "apex",
  setCurrentRoom: (id) => set({ currentRoomId: id }),
}));
