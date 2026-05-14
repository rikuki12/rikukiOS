import type { ReactNode } from "react";

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "flex h-full flex-col border border-[var(--color-hom-panel-border)] bg-[var(--color-hom-panel)]/90",
        className ?? "",
      ].join(" ")}
    >
      {title ? (
        <header className="border-b border-[var(--color-hom-panel-border)] px-3 py-2 text-[10px] tracking-[0.3em] text-[var(--color-hom-accent-gold)]">
          {title}
        </header>
      ) : null}
      <div className="flex-1 overflow-auto">{children}</div>
    </section>
  );
}
