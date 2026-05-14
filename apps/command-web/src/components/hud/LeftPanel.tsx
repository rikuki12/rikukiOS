"use client";

import { Panel } from "@/components/hud/atoms/Panel";

import { StatusPill } from "@/components/hud/atoms/StatusPill";
import { ROOMS_DATA } from "@/game/data/rooms";
import { EventBus } from "@/game/systems/EventBus";
import { roomIdToSceneKey } from "@/lib/sceneRoomMap";
import { useRoomStore, type RoomId, type RoomStatus } from "@/store/roomStore";

const ORDERED = [...ROOMS_DATA].sort((a, b) => a.order - b.order);

export function LeftPanel() {
  const currentRoomId = useRoomStore((s) => s.currentRoomId);

  const handleClick = (id: RoomId, status: RoomStatus) => {
    if (status !== "online") return;
    const targetSceneKey = roomIdToSceneKey(id);
    if (!targetSceneKey) return;
    EventBus.emit("portal:activate", { id, targetSceneKey });
  };

  return (
    <aside className="pointer-events-auto h-full w-64">
      <Panel title="ROOMS">
        <ul className="flex flex-col">
          {ORDERED.map((room) => {
            const active = room.id === currentRoomId;
            const clickable = room.status === "online";
            const base =
              "flex w-full items-center justify-between border-l-2 px-3 py-2 text-left text-[11px] tracking-widest transition-colors";
            const state = active
              ? "border-[var(--color-hom-accent-gold)] bg-[var(--color-hom-accent-gold)]/5 text-[var(--color-hom-accent-gold)]"
              : clickable
                ? "border-transparent text-[var(--color-hom-accent-green)] hover:border-[var(--color-hom-accent-green-dim)] hover:bg-[var(--color-hom-accent-green-dim)]/10"
                : "cursor-not-allowed border-transparent text-[var(--color-hom-text-dim)]";
            return (
              <li key={room.id}>
                <button
                  type="button"
                  onClick={() => handleClick(room.id, room.status)}
                  disabled={!clickable}
                  className={`${base} ${state}`}
                >
                  <span>{room.label}</span>
                  <StatusPill status={room.status} />
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>
    </aside>
  );
}
