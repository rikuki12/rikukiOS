"use client";

import { APEX_HOTSPOTS, MITCHELLEN_HOTSPOTS } from "@/game/data/hotspots";

const ALL_HOTSPOTS = [...APEX_HOTSPOTS, ...MITCHELLEN_HOTSPOTS];

const HOTSPOT_BLURBS: Record<string, string> = {
  "sovereign-console":
    "Issue directives across all rooms from the Sovereign chair.",
  "mission-board":
    "Active missions, due dates, and ledger of completed runs.",
  "treasury-vault":
    "Gold reserves, sigil stocks, and influence allocations.",
  "terminal-desk": "Live terminal for direct command execution.",
  "higgsfield-station": "Generate room art and agent portraits.",
  "outfit-locker": "Wardrobe and presence styling for live appearances.",
  "mitchellen-mission-board":
    "Mitchellen-scoped missions and active threads.",
  "blueprint-table": "Architecture diagrams and system designs.",
  "message-console": "Inbox, outbox, and broadcast to House channels.",
};

export function HotspotPreview({ hotspotId }: { hotspotId: string }) {
  const spot = ALL_HOTSPOTS.find((h) => h.id === hotspotId);
  if (!spot) {
    return (
      <div className="p-3 text-[11px] text-[var(--color-hom-text-dim)]">
        Unknown hotspot: {hotspotId}
      </div>
    );
  }
  const blurb = HOTSPOT_BLURBS[hotspotId] ?? "// no summary yet";
  return (
    <div className="flex flex-col gap-3 p-3 text-[11px]">
      <h2 className="text-[14px] tracking-[0.25em] text-[var(--color-hom-accent-gold)]">
        {spot.label}
      </h2>
      <p className="text-[var(--color-hom-text-dim)]">{blurb}</p>
      <p className="text-[10px] tracking-widest text-[var(--color-hom-accent-green)]">
        // Click to interact.
      </p>
    </div>
  );
}
