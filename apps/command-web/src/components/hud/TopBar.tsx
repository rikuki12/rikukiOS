"use client";

import { useGameStore } from "@/store/gameStore";

export function TopBar() {
  const houseName = useGameStore((s) => s.houseName);
  const houseLevel = useGameStore((s) => s.houseLevel);
  const houseXp = useGameStore((s) => s.houseXp);
  const houseXpToNext = useGameStore((s) => s.houseXpToNext);
  const currencies = useGameStore((s) => s.currencies);
  const trueObjective = useGameStore((s) => s.trueObjective);
  const weeklyProgress = useGameStore((s) => s.weeklyProgress);
  const alerts = useGameStore((s) => s.alerts);
  const cycle = useGameStore((s) => s.cycle);

  return (
    <header className="pointer-events-auto flex h-20 w-full items-center gap-6 border-b border-[var(--color-hom-panel-border)] bg-[var(--color-hom-panel)]/90 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center border border-[var(--color-hom-accent-gold)] font-bold text-[var(--color-hom-accent-gold)]">
          M
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-[0.4em] text-[var(--color-hom-accent-gold)]">
            {houseName}
          </h1>
          <p className="text-[10px] tracking-widest text-[var(--color-hom-text-dim)]">
            LVL {houseLevel} · {houseXp.toLocaleString()}/{houseXpToNext.toLocaleString()} XP
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Currency label="GOLD" value={currencies.gold} />
        <Currency label="SIGILS" value={currencies.sigils} />
        <Currency label="INFLUENCE" value={currencies.influence} />
      </div>

      <div className="flex max-w-2xl flex-1 flex-col gap-2">
        <ProgressRow
          label="TRUE OBJECTIVE"
          caption={trueObjective.label}
          value={trueObjective.progress}
          accent="gold"
        />
        <ProgressRow
          label="WEEKLY"
          caption={weeklyProgress.label}
          value={weeklyProgress.progress}
          accent="green"
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-[9px] tracking-widest text-[var(--color-hom-text-dim)]">
            ALERTS
          </p>
          <p
            className={
              alerts > 0
                ? "text-base text-[var(--color-hom-alert)]"
                : "text-base text-[var(--color-hom-text-dim)]"
            }
          >
            {alerts}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] tracking-widest text-[var(--color-hom-text-dim)]">
            {cycle.day}
          </p>
          <p className="text-base text-[var(--color-hom-accent-green)]">
            {cycle.time}
          </p>
        </div>
      </div>
    </header>
  );
}

function Currency({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col border border-[var(--color-hom-panel-border)] px-3 py-1">
      <span className="text-[9px] tracking-widest text-[var(--color-hom-text-dim)]">
        {label}
      </span>
      <span className="text-sm text-[var(--color-hom-accent-green)]">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function ProgressRow({
  label,
  caption,
  value,
  accent,
}: {
  label: string;
  caption: string;
  value: number;
  accent: "gold" | "green";
}) {
  const barColor =
    accent === "gold"
      ? "bg-[var(--color-hom-accent-gold)]"
      : "bg-[var(--color-hom-accent-green)]";
  return (
    <div>
      <div className="flex items-center justify-between text-[9px] tracking-widest text-[var(--color-hom-text-dim)]">
        <span>{label}</span>
        <span className="truncate px-3 text-[var(--color-hom-text)]">
          {caption}
        </span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full bg-[var(--color-hom-panel-border)]/40">
        <div
          className={`h-full ${barColor}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}
