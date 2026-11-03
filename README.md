# RE-thread: Frontend Blueprint (v1)

A second-hand clothing marketplace (Bengaluru, INR) where individuals, vendors and offline stores can **sell**, **rent** and **buy** pre-owned clothing.

**Scope of this build: FRONTEND ONLY.** Interactive and semi-functional, running entirely on a mock service layer (fixtures + localStorage). No real backend, payments, OAuth, OTP, AI or webhooks. Every one of those is a typed, swappable service.

## Doc map (read ONLY what the current phase needs)

| File | Contains | Needed in phases |
|---|---|---|
| `AGENTS.md` (root, copy of the rules below) | Non-negotiable rules | always |
| `01-ARCHITECTURE.md` | Stack, folders, layering, state, logging, debug tools | 0, 1, 2 then as reference |
| `02-DESIGN-SYSTEM.md` | Tokens, components, layout patterns, responsive rules | 1, and any UI work |
| `03-SCREENS.md` | Every route: sections, interactions, states | the phase's screens only |
| `04-DATA-AND-MOCK-API.md` | Types, service contracts, seed data, business rules | 2, and any data work |
| `05-BUILD-PLAN.md` | Phases with acceptance criteria | always (current phase only) |
| `PROGRESS.md` (agent creates) | Checklist of phases/screens done, known issues | always |

## Agent rules (copy into AGENTS.md at the repo root)

1. **Frontend only.** Never add a server, API keys, env secrets or webhooks. All data goes through `src/services/` (mock implementation).
2. **One phase at a time.** Read `05-BUILD-PLAN.md`, do the current phase, verify its acceptance criteria, update `PROGRESS.md`, then stop and report. Do not start the next phase unprompted.
3. **Read only the docs the phase needs** (map above). Do not re-read everything each session. `PROGRESS.md` is your memory between sessions.
4. **Layering is law** (see `01-ARCHITECTURE.md`): `pages -> feature components -> hooks -> services`. Components never import from `services/mock/`, never read `localStorage` directly, never `fetch`.
5. **Dependency allowlist** (see `01`). Do not add libraries without asking.
6. **No file over ~200 lines, one component per file, no `any`.** Split instead.
7. **Every async view has loading, empty and error states** using the shared components. No blank screens.
8. **Everlane is a layout reference only.** Do not copy its name, logo, photos or copy. Brand is RE-thread; use placeholder imagery via the single `getImageUrl()` helper.
9. **Money is INR**, formatted only through `formatINR()`. **Dates** only through `shared/lib/format.ts`.
10. **Every interactive element gets a `data-testid`** (`kebab-case`, `feature-element-action`).
11. **When a requirement is ambiguous, pick the default written in the docs, note it in `PROGRESS.md` under "Assumptions", and continue.** Do not stall.
12. **Never "fix" by suppressing.** No `@ts-ignore`, no empty `catch`, no disabling lint rules.

## Definition of done (per screen)

- Matches the design system and works at **360px, 768px and 1280px** widths.
- Loading, empty and error states exist and were triggered once via the Demo Panel.
- Keyboard reachable, visible focus, images have `alt`, buttons have accessible names.
- No console errors or warnings; `npm run typecheck`, `npm run lint` and `npm run build` pass.
- Logged in `PROGRESS.md`.

## Demo guide (for showing it off)

- **Laptop:** open the site normally (desktop layout). Press the **"Phone view"** toggle in the Demo Panel (or add `?frame=phone`) to render the app inside a 390px phone frame on desktop.
- **Her phone:** deploy to Netlify or Vercel (free). `public/_redirects` is already in the plan so deep links work. Share the URL or a QR code.
- **Same Wi-Fi, no deploy:** `npm run dev -- --host`, then open the printed network URL on the phone.
- **Demo Panel** (`?demo=1` or `Ctrl+Shift+D`): switch persona (Guest / Buyer / New user / Seller / Store / Admin), reset data, fast-forward the clock (to trigger rental late fees), force the next API call to fail, force the AI image check to pass or fail.
