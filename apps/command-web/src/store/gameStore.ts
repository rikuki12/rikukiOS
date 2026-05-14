import { create } from "zustand";

export type Currencies = {
  gold: number;
  sigils: number;
  influence: number;
};

export type ProgressBar = {
  label: string;
  progress: number;
};

export type CycleClock = {
  day: string;
  time: string;
};

type GameState = {
  houseName: string;
  houseLevel: number;
  houseXp: number;
  houseXpToNext: number;
  currencies: Currencies;
  trueObjective: ProgressBar;
  weeklyProgress: ProgressBar;
  alerts: number;
  cycle: CycleClock;
};

export const useGameStore = create<GameState>(() => ({
  houseName: "HOUSE OF MITCHELL",
  houseLevel: 7,
  houseXp: 4280,
  houseXpToNext: 6000,
  currencies: { gold: 12450, sigils: 88, influence: 320 },
  trueObjective: {
    label: "Establish Sovereign Infrastructure",
    progress: 0.42,
  },
  weeklyProgress: { label: "Week 14", progress: 0.61 },
  alerts: 3,
  cycle: { day: "MON", time: "14:32" },
}));
