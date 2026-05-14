"use client";

import { useAgentStore, type AgentStatus } from "@/store/agentStore";

const STATUS_STYLES: Record<AgentStatus, string> = {
  online: "text-[var(--color-hom-accent-green)]",
  idle: "text-[var(--color-hom-accent-gold)]",
  offline: "text-[var(--color-hom-text-dim)]",
};

export function AgentCard({ agentId }: { agentId: string }) {
  const agents = useAgentStore((s) => s.agents);
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) {
    return (
      <div className="p-3 text-[11px] text-[var(--color-hom-text-dim)]">
        Unknown agent: {agentId}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 p-3 text-[11px]">
      <div>
        <h2 className="text-[14px] tracking-[0.25em] text-[var(--color-hom-accent-gold)]">
          {agent.name}
        </h2>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--color-hom-text-dim)]">
          {agent.role}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-y-2 text-[10px]">
        <dt className="text-[var(--color-hom-text-dim)]">ROOM</dt>
        <dd className="text-[var(--color-hom-accent-green)]">{agent.room}</dd>
        <dt className="text-[var(--color-hom-text-dim)]">STATUS</dt>
        <dd className={STATUS_STYLES[agent.status]}>
          {agent.status.toUpperCase()}
        </dd>
      </dl>
    </div>
  );
}
