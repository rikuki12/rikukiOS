"use client";

import { StatusPill } from "@/components/hud/atoms/StatusPill";
import { APEX_PORTALS } from "@/game/data/portals";
import { findRoom } from "@/game/data/rooms";
import { sceneKeyToRoomId } from "@/lib/sceneRoomMap";

export function PortalPreview({ portalId }: { portalId: string }) {
  const portal = APEX_PORTALS.find((p) => p.id === portalId);
  if (!portal) {
    return (
      <div className="p-3 text-[11px] text-[var(--color-hom-text-dim)]">
        Unknown portal: {portalId}
      </div>
    );
  }

  const targetRoomId = portal.targetSceneKey
    ? sceneKeyToRoomId(portal.targetSceneKey)
    : null;
  const targetRoom = targetRoomId ? findRoom(targetRoomId) : null;

  return (
    <div className="flex flex-col gap-3 p-3 text-[11px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] tracking-[0.25em] text-[var(--color-hom-accent-gold)]">
          {portal.label}
        </h2>
        <StatusPill
          status={portal.status === "active" ? "online" : "locked"}
        />
      </div>
      {targetRoom ? (
        <p className="text-[var(--color-hom-text-dim)]">
          {targetRoom.missionSummary}
        </p>
      ) : (
        <p className="text-[var(--color-hom-text-dim)]">
          // No room behind this door yet.
        </p>
      )}
      {portal.status === "locked" ? (
        <p className="text-[10px] tracking-widest text-[var(--color-hom-alert)]">
          // LOCKED — entry not yet sanctioned.
        </p>
      ) : (
        <p className="text-[10px] tracking-widest text-[var(--color-hom-accent-green)]">
          // Click portal to enter.
        </p>
      )}
    </div>
  );
}
