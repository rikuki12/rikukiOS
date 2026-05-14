"use client";

import { Panel } from "@/components/hud/atoms/Panel";
import { AgentCard } from "@/components/hud/panels/AgentCard";
import { HotspotPreview } from "@/components/hud/panels/HotspotPreview";
import { PortalPreview } from "@/components/hud/panels/PortalPreview";
import { RoomOverview } from "@/components/hud/panels/RoomOverview";
import { useAgentStore } from "@/store/agentStore";
import { useRoomStore } from "@/store/roomStore";
import { useUIStore } from "@/store/uiStore";

export function RightPanel() {
  const hoveredPortalId = useUIStore((s) => s.hoveredPortalId);
  const hoveredHotspotId = useUIStore((s) => s.hoveredHotspotId);
  const selectedAgentId = useAgentStore((s) => s.selectedAgentId);
  const currentRoomId = useRoomStore((s) => s.currentRoomId);

  let title = "ROOM OVERVIEW";
  let body: React.ReactNode;
  if (hoveredPortalId) {
    title = "PORTAL";
    body = <PortalPreview portalId={hoveredPortalId} />;
  } else if (hoveredHotspotId) {
    title = "HOTSPOT";
    body = <HotspotPreview hotspotId={hoveredHotspotId} />;
  } else if (selectedAgentId) {
    title = "AGENT";
    body = <AgentCard agentId={selectedAgentId} />;
  } else {
    body = <RoomOverview roomId={currentRoomId} />;
  }

  return (
    <aside className="pointer-events-auto h-full w-80">
      <Panel title={title}>{body}</Panel>
    </aside>
  );
}
