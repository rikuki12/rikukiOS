import { create } from "zustand";

export type AgentStatus = "online" | "idle" | "offline";

export type Agent = {
  id: string;
  name: string;
  role: string;
  room: string;
  status: AgentStatus;
};

type AgentState = {
  agents: Agent[];
  selectedAgentId: string | null;
  select: (id: string | null) => void;
};

export const useAgentStore = create<AgentState>((set) => ({
  agents: [
    {
      id: "architect",
      name: "ARCHITECT",
      role: "Operations Architect",
      room: "mitchellen",
      status: "online",
    },
    {
      id: "rex",
      name: "REX",
      role: "Sovereign Counsel",
      room: "rex-unicus",
      status: "offline",
    },
    {
      id: "rikuki",
      name: "RIKUKI",
      role: "Frontline Operator",
      room: "rikuki-inc",
      status: "offline",
    },
    {
      id: "estrella",
      name: "ESTRELLA",
      role: "Brand Steward",
      room: "estrella",
      status: "offline",
    },
    {
      id: "moneta",
      name: "MONETA",
      role: "Treasury Keeper",
      room: "moneta",
      status: "offline",
    },
    {
      id: "lustrare",
      name: "LUSTRARE",
      role: "Reputation Warden",
      room: "lustrare",
      status: "offline",
    },
    {
      id: "notary",
      name: "NOTARY",
      role: "Records Custodian",
      room: "notary",
      status: "offline",
    },
  ],
  selectedAgentId: null,
  select: (id) => set({ selectedAgentId: id }),
}));
