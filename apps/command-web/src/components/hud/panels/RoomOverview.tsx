"use client";

import { StatusPill } from "@/components/hud/atoms/StatusPill";
import { findRoom, type RoomId } from "@/game/data/rooms";
import { useAgentStore } from "@/store/agentStore";

export function RoomOverview({ roomId }: { roomId: RoomId }) {
  const room = findRoom(roomId);
  const agents = useAgentStore((s) => s.agents);
  const agentsInRoom = agents.filter((a) => a.room === roomId);

  if (!room) return null;

  return (
    <div className="flex flex-col gap-4 p-3 text-[11px] tracking-wide">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] tracking-[0.25em] text-[var(--color-hom-accent-gold)]">
            {room.label}
          </h2>
          <StatusPill status={room.status} />
        </div>
        <p className="mt-2 text-[var(--color-hom-text-dim)]">
          {room.missionSummary}
        </p>
        {room.lockedReason ? (
          <p className="mt-2 text-[10px] tracking-widest text-[var(--color-hom-alert)]">
            // {room.lockedReason}
          </p>
        ) : null}
      </div>

      <div>
        <h3 className="text-[9px] tracking-[0.3em] text-[var(--color-hom-text-dim)]">
          AGENTS IN ROOM
        </h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {agentsInRoom.length === 0 ? (
            <li className="text-[var(--color-hom-text-dim)]">
              // none assigned
            </li>
          ) : (
            agentsInRoom.map((agent) => (
              <li
                key={agent.id}
                className="flex items-center justify-between"
              >
                <span className="text-[var(--color-hom-accent-green)]">
                  {agent.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[var(--color-hom-text-dim)]">
                  {agent.role}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
