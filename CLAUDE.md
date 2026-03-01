# CLAUDE.md — ryOS Codebase Guide

## Project Overview

**ryOS** is a web-based desktop OS simulation built with React and TypeScript. It emulates classic Mac and Windows desktop environments in the browser, featuring a multi-window manager, 14+ built-in applications, AI integration, and four switchable retro OS themes (System 7, Mac OS X Aqua, Windows XP, Windows 98). Deployed at [os.ryo.lu](https://os.ryo.lu) via Vercel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18, TypeScript 5.6 |
| Build Tool | Vite 6 + `@vitejs/plugin-react` |
| Package Manager | Bun |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI primitives) |
| State Management | Zustand 5 with `persist` middleware |
| AI | Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/google`) |
| Real-time | Pusher (chat rooms) |
| Backend | Vercel serverless functions (`api/`) |
| Data Store (backend) | Upstash Redis (rate limiting, auth) |
| Rich Text | Tiptap |
| Audio | Tone.js, wavesurfer.js |
| 3D/Shaders | Three.js |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Development Commands

```bash
bun dev              # Start dev server (uses $PORT or 5173)
bun run build        # TypeScript check + Vite production build
bun run lint         # Run ESLint
bun run preview      # Preview production build locally

# Asset manifest generators (run after adding icons/wallpapers)
bun run generate:icons       # Regenerate public/icons/manifest.json
bun run generate:wallpapers  # Regenerate public/wallpapers/manifest.json
```

There is no test suite in this project. Verification is done by running the dev server and testing manually.

---

## Repository Structure

```
rikukiOS/
├── api/                        # Vercel serverless API functions
│   ├── chat.ts                 # AI chat endpoint (streaming, tool calling)
│   ├── speech.ts               # Text-to-speech
│   ├── audio-transcribe.ts     # Speech-to-text (Whisper)
│   ├── lyrics.ts               # Lyrics fetching
│   ├── translate-lyrics.ts     # Lyrics translation
│   ├── ie-generate.ts          # AI-generated browser content
│   ├── link-preview.ts         # URL preview metadata
│   ├── parse-title.ts          # YouTube title parsing
│   ├── chat-rooms.js           # Pusher-based chat rooms
│   ├── iframe-check.ts         # iframe embedding check
│   └── utils/                  # Shared API utilities
│       ├── aiModels.ts         # AI model registry
│       ├── aiPrompts.ts        # System prompts for Ryo AI
│       ├── rate-limit.js       # Redis-based rate limiting
│       └── cors.js             # CORS helper
│
├── public/                     # Static assets (all served at root)
│   ├── assets/                 # Videos, sounds, other media
│   ├── css/                    # Custom Windows XP/98 CSS overrides
│   ├── fonts/                  # Theme-specific fonts
│   ├── icons/                  # Icons per theme (default, macosx, system7, win98, xp)
│   │   └── manifest.json       # Auto-generated icon manifest
│   ├── patterns/               # Tile patterns for wallpapers
│   ├── sounds/                 # System sound effects
│   └── wallpapers/             # Photos, tiles, and video wallpapers
│       └── manifest.json       # Auto-generated wallpaper manifest
│
├── scripts/                    # Bun scripts
│   ├── generate-icon-manifest.ts
│   └── generate-wallpaper-manifest.ts
│
├── src/
│   ├── main.tsx                # Entry point — hydrates theme, mounts App
│   ├── App.tsx                 # Root component — BootScreen + AppManager
│   ├── index.css               # Global CSS and CSS variable theme definitions
│   │
│   ├── apps/                   # All built-in applications
│   │   ├── base/               # App framework
│   │   │   ├── AppManager.tsx  # Renders all app windows, manages z-index
│   │   │   └── types.ts        # AppProps, BaseApp, AppState interfaces
│   │   ├── chats/              # AI chat + push-to-talk
│   │   ├── control-panels/     # System preferences
│   │   ├── finder/             # File manager
│   │   ├── internet-explorer/  # AI time-machine browser
│   │   ├── ipod/               # Music player (YouTube import)
│   │   ├── minesweeper/        # Classic game
│   │   ├── paint/              # Bitmap graphics editor
│   │   ├── pc/                 # DOS emulator (Virtual PC)
│   │   ├── photo-booth/        # Camera with effects
│   │   ├── soundboard/         # Custom soundboard recorder
│   │   ├── synth/              # Virtual synthesizer
│   │   ├── terminal/           # CLI with AI commands
│   │   ├── textedit/           # Rich text editor (Tiptap, multi-window)
│   │   └── videos/             # YouTube playlist player
│   │
│   ├── components/
│   │   ├── dialogs/            # Modal dialogs (BootScreen, About, etc.)
│   │   ├── layout/             # Core UI chrome
│   │   │   ├── AppManager.tsx  # (delegated from apps/base)
│   │   │   ├── Desktop.tsx     # Wallpaper + desktop icons
│   │   │   ├── MenuBar.tsx     # macOS-style top menu bar
│   │   │   ├── StartMenu.tsx   # Windows-style Start menu
│   │   │   └── WindowFrame.tsx # Draggable/resizable window shell
│   │   ├── shared/             # Cross-app shared components
│   │   │   ├── ThemedIcon.tsx  # Theme-aware icon renderer
│   │   │   ├── GalaxyBackground.tsx  # Shader effects (Three.js)
│   │   │   ├── HtmlPreview.tsx
│   │   │   └── ToolInvocationMessage.tsx
│   │   └── ui/                 # shadcn/ui components
│   │
│   ├── config/
│   │   ├── appIds.ts           # Canonical list of all app ID strings
│   │   └── appRegistry.ts      # Maps app IDs → components + window configs
│   │
│   ├── contexts/
│   │   └── AppContext.tsx      # Legacy app state context (for backward compat)
│   │
│   ├── hooks/                  # Shared custom React hooks
│   │   ├── useSound.ts         # System sound playback
│   │   ├── useWindowManager.ts # Drag/resize logic for WindowFrame
│   │   ├── useLaunchApp.ts     # Convenience hook to open apps
│   │   ├── useIsMobile.ts      # Viewport breakpoint detection
│   │   ├── useIsPhone.ts
│   │   ├── useAudioRecorder.ts
│   │   ├── useAudioTranscription.ts
│   │   ├── useTtsQueue.ts      # Text-to-speech queue
│   │   └── ...
│   │
│   ├── stores/                 # Zustand stores (one per domain)
│   │   ├── useAppStore.ts      # Core: window manager, settings, wallpaper
│   │   ├── useThemeStore.ts    # Active OS theme
│   │   ├── useFilesStore.ts    # Virtual file system
│   │   ├── useChatsStore.ts    # Chat history
│   │   ├── useIpodStore.ts     # iPod music library
│   │   ├── useVideoStore.ts    # Videos playlist
│   │   ├── useSynthStore.ts    # Synth presets
│   │   └── ...                 # One store per app
│   │
│   ├── themes/                 # OS theme definitions
│   │   ├── types.ts            # OsTheme, OsThemeId interfaces
│   │   ├── system7.ts          # Classic Mac System 7 theme
│   │   ├── macosx.ts           # Mac OS X Aqua theme
│   │   ├── xp.ts               # Windows XP theme
│   │   ├── win98.ts            # Windows 98 theme
│   │   └── index.ts            # getTheme() lookup
│   │
│   ├── types/                  # Shared TypeScript type definitions
│   ├── lib/                    # Low-level utilities (cn, etc.)
│   ├── styles/                 # Additional CSS utilities
│   └── utils/                  # General utility functions
│
├── vercel.json                 # Vercel deployment config (headers, rewrites)
├── vite.config.ts              # Vite config with path alias @/ → src/
├── tailwind.config.js          # Tailwind config with OS theme CSS variables
├── tsconfig.app.json           # TypeScript config for src/
├── eslint.config.js            # ESLint (typescript-eslint, react-hooks)
└── package.json                # Dependencies and scripts (name: "soundboard")
```

---

## Core Architecture

### Window & App Management

Windows are managed via a **Zustand instance model** in `useAppStore`:

- Every open window is an **`AppInstance`** (`instanceId`, `appId`, `position`, `size`, `isForeground`)
- `instanceOrder` array tracks z-order (last element = foreground)
- Most apps are **single-instance** — launching an existing app focuses it
- **`textedit`** and **`finder`** support **multi-window** via `multiWindow: true`
- `AppManager` (`src/apps/base/AppManager.tsx`) renders all instances and computes z-indices
- `WindowFrame` (`src/components/layout/WindowFrame.tsx`) provides dragging, resizing, title bar, and traffic-light/close controls per-theme

**Key store methods:**
```ts
launchApp(appId, initialData?, title?, multiWindow?)  // Open or focus an app
closeAppInstance(instanceId)                           // Close a specific window
bringInstanceToForeground(instanceId)                  // Focus a window
```

### App Module Pattern

Every app lives in `src/apps/<app-name>/` and follows this structure:

```
src/apps/my-app/
├── index.tsx           # Exports the BaseApp config object
├── components/
│   └── MyAppComponent.tsx   # Main React component (named [AppName]AppComponent.tsx)
├── hooks/              # App-specific hooks
└── utils/              # App-specific utilities
```

**`index.tsx` exports a `BaseApp` object:**
```ts
export const MyApp: BaseApp = {
  id: "my-app",          // Must match an entry in src/config/appIds.ts
  name: "My App",
  icon: { type: "image", src: "/icons/default/my-app.png" },
  description: "...",
  component: MyAppComponent,
  helpItems: [...],
  metadata: { name, version, creator, github, icon },
};
```

**App component receives `AppProps`:**
```ts
interface AppProps<TInitialData = unknown> {
  isWindowOpen: boolean;
  onClose: () => void;
  isForeground?: boolean;
  instanceId?: string;
  title?: string;
  initialData?: TInitialData;
  helpItems?: HelpItem[];
  onNavigateNext?: () => void;
  onNavigatePrevious?: () => void;
  menuBar?: React.ReactNode;   // For XP/98 themes (menu bar inside window)
}
```

**To register a new app:**
1. Add the ID to `src/config/appIds.ts`
2. Create the app module in `src/apps/<app-name>/`
3. Add the app to `appRegistry` in `src/config/appRegistry.ts` with its `windowConfig`
4. Import and register the `BaseApp` export in `AppManager`

### Theme System

Four OS themes are defined in `src/themes/`: `system7`, `macosx`, `xp`, `win98`.

Themes inject **CSS variables** onto `<html>` (via `useThemeStore`):
- `--os-color-window-bg`, `--os-color-menubar-bg`, `--os-color-titlebar-active-bg`, etc.
- `--os-font-ui`, `--os-font-mono`
- `--os-metrics-borderWidth`, `--os-metrics-titlebar-height`, etc.

Tailwind is configured with `os-*` color tokens (`bg-os-window-bg`, `text-os-text-primary`) and `h-os-titlebar`, `h-os-menubar` height utilities that consume these variables.

**Theme-aware menu bar pattern** (required for XP/98):
```tsx
const currentTheme = useThemeStore((state) => state.current);
const isXpTheme = currentTheme === "xp" || currentTheme === "win98";
const menuBar = <MyAppMenuBar ... />;
return (
  <>
    {!isXpTheme && menuBar}
    <WindowFrame menuBar={isXpTheme ? menuBar : undefined} ...>
      ...
    </WindowFrame>
  </>
);
```

Windows themes (`xp`, `win98`) load `xp-custom.css` / `98-custom.css` dynamically. macOS themes use traffic-light buttons; Windows themes use classic square close/min/max buttons.

### State Management (Zustand)

- All stores use `zustand/middleware/persist` with localStorage key `ryos:<store-name>`
- `useAppStore` is the central store: app instances, window order, global settings (AI model, sounds, wallpaper, TTS, volumes)
- App-specific stores (`useChatsStore`, `useIpodStore`, etc.) hold domain state
- Use `useAppStoreShallow` (from `src/stores/helpers.ts`) for shallow-equality subscriptions to avoid unnecessary re-renders
- Store versions use integer `version` field; migrations are in `migrate()` callbacks

### AI Integration

**Backend (`api/chat.ts`):**
- Streaming chat via Vercel AI SDK `streamText`
- Multi-provider support: Anthropic Claude, OpenAI GPT, Google Gemini
- Tool calling: apps register their current state in a `systemState` payload; Ryo AI can call tools to open apps, navigate browser, control iPod, edit documents, etc.
- Rate limiting via Upstash Redis

**Frontend:**
- `src/types/aiModels.ts` defines `AIModel` union type and `SUPPORTED_AI_MODELS`
- Model selection persisted in `useAppStore.aiModel`
- TTS queue via `useTtsQueue` hook; speech output from `api/speech.ts`

### Virtual File System

- Files are stored in the browser via **localStorage** (small text files) and **IndexedDB** (binary/large files like wallpapers)
- `useFilesStore` manages the virtual FS (files, directories, CRUD)
- Custom wallpapers use an `indexeddb://` URL prefix resolved by `useAppStore.getWallpaperData()`

### API Routes

All `api/*.ts` files are Vercel serverless functions:

| Route | Purpose |
|---|---|
| `POST /api/chat` | Streaming AI chat with tool calling |
| `POST /api/speech` | Text-to-speech synthesis |
| `POST /api/audio-transcribe` | Speech-to-text (Whisper) |
| `GET /api/lyrics` | Fetch lyrics for a track |
| `POST /api/translate-lyrics` | Translate lyrics |
| `POST /api/ie-generate` | AI-generated page for Internet Explorer |
| `GET /api/link-preview` | URL metadata scraping |
| `GET /api/parse-title` | YouTube title parsing |
| `GET /api/iframe-check` | Check if a URL allows embedding |
| Various | `chat-rooms.js` — Pusher channel management |

---

## Key Conventions

### TypeScript

- Strict TypeScript throughout; avoid `any` — use `unknown` with type guards
- Path alias `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`)
- App IDs are string literals derived from `appIds` array — use `AppId` type (not raw strings)

### Naming

- App main component: `[AppName]AppComponent.tsx` (e.g. `TextEditAppComponent.tsx`)
- Stores: `use[Domain]Store.ts` (e.g. `useChatsStore.ts`)
- Hooks: `use[Name].ts` (e.g. `useWindowManager.ts`)
- App directories: kebab-case matching the app ID (e.g. `internet-explorer/`)

### Styling

- **Tailwind utility-first** — use Tailwind classes everywhere
- **shadcn/ui components** live in `src/components/ui/`. To add a new one: `bunx --bun shadcn@latest add <component>`
- Custom (non-shadcn) UI components: `audio-input-button`, `audio-bars`, `volume-bar`
- Use **CSS variable tokens** (`var(--os-color-*)`, `bg-os-window-bg`) for any theme-sensitive colors — never hardcode colors for themed UI
- `cn()` utility from `@/lib/utils` for conditional class merging (clsx + tailwind-merge)
- Images use `image-rendering: pixelated` globally for crisp pixel art rendering

### Component Patterns

- Prefer **functional components** with hooks
- Use `useAppStoreShallow` instead of `useAppStore` with a selector when subscribing to multiple fields
- Window-level state (position, size) is owned by `useAppStore` — apps do not manage it themselves
- Apps receive `instanceId` — use it to scope instance-specific state or data
- Custom events `appStateChange` and `instanceStateChange` are dispatched on `window` for cross-component communication

### Mobile / Responsive

- `useIsMobile()` (breakpoint < 768px) and `useIsPhone()` for responsive logic
- Mobile windows: full width, positioned from y=28px
- `useSwipeNavigation` hook provides gesture-based window switching on touch devices

### Sound

- `useSound(Sounds.xxx)` hook for playing system sounds
- Sound categories: UI sounds, terminal sounds, typing synth, chat synth
- All sound toggles are in `useAppStore` (`uiSoundsEnabled`, `terminalSoundsEnabled`, `typingSynthEnabled`)

---

## Deployment

- **Platform**: Vercel (configured via `vercel.json`)
- `vercel.json` sets:
  - Static asset cache headers (1-year immutable for fonts, icons, sounds, wallpapers)
  - SPA rewrites: all app routes (`/textedit`, `/chats`, `/ipod/:track`, etc.) rewrite to `/`
  - CORS headers for `/api/*` (allowed origin: `https://os.ryo.lu`)
- `vite-plugin-vercel` bridges Vite + Vercel serverless functions
- PWA support via `vite-plugin-pwa`
- Vercel Analytics included (`@vercel/analytics`)

---

## Environment Variables

Required for full functionality (set in Vercel project or `.env.local`):

```bash
# AI Providers
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=

# Real-time chat (Pusher)
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=
VITE_PUSHER_KEY=        # Public (exposed to browser)
VITE_PUSHER_CLUSTER=    # Public (exposed to browser)

# Rate limiting / auth bypass
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# ElevenLabs (optional TTS)
ELEVENLABS_API_KEY=

# Auth
RYO_PASSWORD_HASH=      # bcrypt hash for ryo user bypass
```

---

## Common Tasks

### Adding a New App

1. Add the string ID to `src/config/appIds.ts`
2. Create `src/apps/<app-id>/index.tsx` exporting a `BaseApp` object
3. Create `src/apps/<app-id>/components/<AppName>AppComponent.tsx`
4. Add entry to `appRegistry` in `src/config/appRegistry.ts` with `windowConfig`
5. Add app icon at `public/icons/default/<app-id>.png`
6. Run `bun run generate:icons` to update the manifest

### Adding a New Zustand Store

1. Create `src/stores/use[Name]Store.ts`
2. Use `create<State>()(persist((...) => ({ ... }), { name: "ryos:<name>" }))`
3. Export the store hook and any derived selectors

### Adding a New API Endpoint

1. Create `api/<endpoint>.ts`
2. Export a default handler function compatible with Vercel Functions
3. Add CORS headers via `api/utils/cors.js` if browser-accessible

### Adding shadcn Components

```bash
bunx --bun shadcn@latest add <component-name>
```

### Theme-Sensitive Styling

Always use CSS variable tokens for chrome/UI elements:
```tsx
// ✅ Correct — adapts to all themes
<div className="bg-os-window-bg border-os-window text-os-text-primary">

// ❌ Avoid — breaks on non-matching themes
<div className="bg-white border-gray-300 text-black">
```

### Running Locally with Vercel Functions

The API functions require Vercel CLI or direct local mocking. For dev without backend:
```bash
bun dev   # Frontend only; API calls will fail without env vars
```

---

## Git Workflow

- **Main branch**: `main` (production)
- **Active development**: feature branches, typically prefixed `cursor/` for Cursor-generated branches
- PRs merge into `main` via GitHub
- Commit style: imperative, present tense ("Add feature X", "Fix Y bug")
