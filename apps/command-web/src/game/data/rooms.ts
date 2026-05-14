export type RoomId =
  | "apex"
  | "rex-unicus"
  | "rikuki-inc"
  | "mitchellen"
  | "estrella"
  | "moneta"
  | "lustrare"
  | "notary";

export type RoomStatus = "online" | "locked" | "incoming";

export type RoomDisplay = {
  id: RoomId;
  label: string;
  status: RoomStatus;
  missionSummary: string;
  lockedReason: string | null;
  order: number;
};

export const ROOMS_DATA: RoomDisplay[] = [
  {
    id: "apex",
    label: "APEX COMMAND",
    status: "online",
    missionSummary: "Sovereign oversight of all House operations.",
    lockedReason: null,
    order: 0,
  },
  {
    id: "mitchellen",
    label: "MITCHELLEN",
    status: "online",
    missionSummary: "Digital services arm. ARCHITECT runs ops here.",
    lockedReason: null,
    order: 1,
  },
  {
    id: "rex-unicus",
    label: "REX UNICUS",
    status: "locked",
    missionSummary: "Sovereign counsel chamber.",
    lockedReason: "Requires Sovereign seat.",
    order: 2,
  },
  {
    id: "rikuki-inc",
    label: "RIKUKI INC",
    status: "locked",
    missionSummary: "Frontline operator bay.",
    lockedReason: "Awaiting operator briefing.",
    order: 3,
  },
  {
    id: "estrella",
    label: "ESTRELLA",
    status: "locked",
    missionSummary: "Brand stewardship and narrative direction.",
    lockedReason: "Steward not yet appointed.",
    order: 4,
  },
  {
    id: "moneta",
    label: "MONETA",
    status: "locked",
    missionSummary: "Treasury keeping. Ledger sealed.",
    lockedReason: "Ledger sealed pending audit.",
    order: 5,
  },
  {
    id: "lustrare",
    label: "LUSTRARE",
    status: "locked",
    missionSummary: "Reputation wardenship.",
    lockedReason: "Warden roster incomplete.",
    order: 6,
  },
  {
    id: "notary",
    label: "NOTARY",
    status: "locked",
    missionSummary: "Records custody and charter signing.",
    lockedReason: "Custodian dormant.",
    order: 7,
  },
];

export function findRoom(id: RoomId): RoomDisplay | undefined {
  return ROOMS_DATA.find((r) => r.id === id);
}
