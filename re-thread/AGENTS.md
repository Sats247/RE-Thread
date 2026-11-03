# Agent rules for RE-thread

1. **Frontend only.** Never add a server, API keys, env secrets or webhooks. All data goes through `src/services/` (mock implementation).
2. **One phase at a time.** Read `05-BUILD-PLAN.md`, do the current phase, verify its acceptance criteria, update `PROGRESS.md`, then stop and report. Do not start the next phase unprompted.
3. **Read only the docs the phase needs** (doc map in README). Do not re-read everything each session. `PROGRESS.md` is your memory between sessions.
4. **Layering is law** (see `01-ARCHITECTURE.md`): `pages -> feature components -> hooks -> services`. Components never import from `services/mock/`, never read `localStorage` directly, never `fetch`.
5. **Dependency allowlist** (see `01-ARCHITECTURE.md`). Do not add libraries without asking.
6. **No file over ~200 lines, one component per file, no `any`.** Split instead.
7. **Every async view has loading, empty and error states** using the shared components. No blank screens.
8. **Everlane is a layout reference only.** Do not copy its name, logo, photos or copy. Brand is RE-thread; use placeholder imagery via the single `getImageUrl()` helper.
9. **Money is INR**, formatted only through `formatINR()`. **Dates** only through `shared/lib/format.ts`.
10. **Every interactive element gets a `data-testid`** (`kebab-case`, `feature-element-action`).
11. **When a requirement is ambiguous, pick the default written in the docs, note it in `PROGRESS.md` under "Assumptions", and continue.** Do not stall.
12. **Never "fix" by suppressing.** No `@ts-ignore`, no empty `catch`, no disabling lint rules.

