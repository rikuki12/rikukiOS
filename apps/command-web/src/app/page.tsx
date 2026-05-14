"use client";

import dynamic from "next/dynamic";

const CommandCenter = dynamic(
  () =>
    import("@/components/game/CommandCenter").then((m) => ({
      default: m.CommandCenter,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="text-sm tracking-[0.4em] text-[var(--color-hom-accent-green)]">
          BOOTING APEX...
        </span>
      </div>
    ),
  },
);

export default function Page() {
  return <CommandCenter />;
}
