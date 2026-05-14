import type { RoomStatus } from "@/game/data/rooms";

const STYLES: Record<RoomStatus, string> = {
  online:
    "border-[var(--color-hom-accent-green)] text-[var(--color-hom-accent-green)]",
  locked:
    "border-[var(--color-hom-panel-border)] text-[var(--color-hom-text-dim)]",
  incoming:
    "border-[var(--color-hom-accent-gold)] text-[var(--color-hom-accent-gold)]",
};

const LABELS: Record<RoomStatus, string> = {
  online: "● LIVE",
  locked: "□ LOCKED",
  incoming: "▲ INCOMING",
};

export function StatusPill({ status }: { status: RoomStatus }) {
  return (
    <span
      className={`border px-2 py-0.5 text-[8px] tracking-widest ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
