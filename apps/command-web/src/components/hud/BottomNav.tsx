"use client";

import { useUIStore, type BottomNavTab } from "@/store/uiStore";

const TABS: { id: BottomNavTab; label: string }[] = [
  { id: "quests", label: "QUESTS" },
  { id: "agents", label: "AGENTS" },
  { id: "rooms", label: "ROOMS" },
  { id: "treasury", label: "TREASURY" },
  { id: "vault", label: "VAULT" },
  { id: "codex", label: "CODEX" },
  { id: "messages", label: "MESSAGES" },
  { id: "command", label: "COMMAND" },
];

export function BottomNav() {
  const active = useUIStore((s) => s.activeBottomTab);
  const setActive = useUIStore((s) => s.setActiveBottomTab);
  return (
    <nav className="pointer-events-auto flex h-full w-full items-center justify-center gap-2 border-t border-[var(--color-hom-panel-border)] bg-[var(--color-hom-panel)]/90 px-6 backdrop-blur-sm">
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const base =
          "border px-4 py-1.5 text-[10px] tracking-[0.25em] transition-colors";
        const state = isActive
          ? "border-[var(--color-hom-accent-gold)] text-[var(--color-hom-accent-gold)]"
          : "border-[var(--color-hom-panel-border)] text-[var(--color-hom-text-dim)] hover:border-[var(--color-hom-accent-green-dim)] hover:text-[var(--color-hom-accent-green)]";
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`${base} ${state}`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
