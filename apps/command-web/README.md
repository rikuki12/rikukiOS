# command-web

House of Mitchell — Apex Command Center (V1, visual shell).

Next.js 15 (App Router) + TypeScript + Tailwind 4 + Phaser 3.80 + Zustand.

## Scope

V1 is the visual shell only. No real backend, no real AI calls. All state is
hardcoded in TypeScript files under `src/game/data/` and `src/store/`. The
goal is to walk through the rooms, click hotspots, and see the screenshots
come alive.

## Layout

```
src/
  app/                Next.js App Router pages + layout
  components/
    game/             Phaser-React bridge + canvas hosts
    hud/              React HUD overlays (top bar, panels, bottom nav)
  game/
    scenes/           Phaser scenes (Boot, Preload, Apex, Mitchellen, ...)
    systems/          Phaser-side systems (EventBus, input, etc.)
    data/             Hardcoded room/portal/hotspot/agent data
    types/            Shared TypeScript types
  lib/                Pure utilities
  store/              Zustand stores (game, agent, room, UI)
  styles/             Global CSS
public/assets/
  rooms/              Room background art (placeholders for now)
  agents/             Agent sprite sheets
  ui/                 HUD icons + chrome
```

## Develop

```sh
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Notes

- Placeholder colored rectangles stand in for art until Higgsfield outputs land in
  `public/assets/`.
- Only the Mitchellen portal is wired to transition in V1.
- All numeric values in the HUD (XP, currencies, alerts) are hardcoded stubs.
