import { create } from "zustand";
import {
  ROOMS_DATA,
  type RoomId,
  type RoomStatus,
} from "@/game/data/rooms";

export type { RoomId, RoomStatus };

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
  rooms: ROOMS_DATA.map(({ id, label, status }) => ({ id, label, status })),
  currentRoomId: "apex",
  setCurrentRoom: (id) => set({ currentRoomId: id }),
}));
