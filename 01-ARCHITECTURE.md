# 01. Architecture

## Stack (final)

| Concern | Choice | Why |
|---|---|---|
| Framework | **React + TypeScript (strict) + Vite** | AI agents write and fix React/TS most reliably (largest training coverage); the type checker catches most bugs before the browser does; Vite has near-zero config. |
| Styling | **Tailwind CSS (v3.4 line)** | Utility classes keep styling next to markup, so an agent edits one file per change. Use v3 syntax only; do not mix in v4 syntax. |
| Routing | **React Router (data-less, `createBrowserRouter`)** | Plain client routing. No loaders or actions; data comes from hooks. |
| State | **Zustand** (+ `persist` middleware) | Tiny, no boilerplate. Used only for cross-screen client state. |
| Data access | Plain async **service functions** + small `useAsync` hook | No MSW, no service workers, no query library. Fewer moving parts means fewer silent failures. |
| Forms | **react-hook-form + zod** | Auth, listing wizard, grievances, rental booking all share one validation pattern. |
| Icons | **lucide-react** (stroke 1.5) | Matches the thin line icons in the design. |
| Tests | **Vitest + Testing Library** (smoke only) | Pure functions (pricing, fees, late dues) and a few critical flows. |
| Hosting | Netlify / Vercel static | `public/_redirects`: `/* /index.html 200` |

**Not used on purpose:** Next.js (server/client boundary adds debugging surface with no benefit now), Redux, MSW, GraphQL, CSS-in-JS, component libraries with heavy theming.
**Version rule:** at scaffold time pin exact current stable versions, commit the lockfile, and do not upgrade mid-project.
**Allowlist:** the above plus `clsx` + `tailwind-merge` (as `cn()`), `date-fns`, `embla-carousel-react` (carousels), `@radix-ui/react-dialog` / `react-tabs` / `react-accordion` / `react-popover` (a11y primitives for Modal, Drawer, Tabs, etc.). Anything else: ask.

## Folder structure

```
re-thread/
├─ AGENTS.md  PROGRESS.md  docs/            (this spec set)
├─ public/    _redirects  img/              (local placeholder assets)
└─ src/
   ├─ main.tsx
   ├─ app/                 App.tsx, router.tsx, providers.tsx,
   │                       layouts/ PublicLayout, SellerLayout, AdminLayout
   ├─ config/              routes.ts (path constants), constants.ts (fees, limits), flags.ts
   ├─ shared/
   │  ├─ ui/               Button, Input, Select, Checkbox, Modal, Drawer, BottomSheet, Tabs,
   │  │                    Badge, Rating, Price, Chip, Skeleton, Toast, EmptyState, ErrorState,
   │  │                    Carousel, Stepper, Timeline, Accordion, ImageWithFallback
   │  ├─ layout/           AnnouncementBar, Header, MegaMenu, MobileMenu, BottomTabBar, Footer
   │  ├─ hooks/            useMediaQuery, useDebounce, useAsync, useLocalStorage
   │  ├─ lib/              format.ts (formatINR, dates), logger.ts, cn.ts, id.ts, image.ts (getImageUrl)
   │  └─ types/            domain types (see 04)
   ├─ services/
   │  ├─ contracts/        *.contract.ts   (interfaces only: the future backend must match these)
   │  ├─ mock/             *.mock.ts, db.ts (localStorage-backed), latency.ts, seed/*.ts
   │  └─ index.ts          exports the active implementation (the ONLY place that knows "mock")
   ├─ stores/              auth.store, cart.store, wishlist.store, activity.store, ui.store, demo.store
   ├─ features/
   │  ├─ auth/  catalog/  product/  cart/  checkout/  rentals/  selling/
   │  ├─ seller-dashboard/  orders/  support/  profile/  sellers/  admin/  stories/
   │  └─ each feature = components/  hooks/  pages/  schemas.ts  index.ts
   └─ demo/                DemoPanel, PhoneFrame, personas.ts
```

## Layering rules (enforce with ESLint `no-restricted-imports`)

- `pages/` are thin: compose feature components, no logic.
- `components/` render and call **hooks** only.
- `hooks/` call **services** and **stores** only.
- `services/mock/` is imported **only** by `services/index.ts`.
- `shared/` imports nothing from `features/`. A feature imports another feature **only via its `index.ts`**.
- Route paths come from `config/routes.ts`. Never hard-code `"/product/..."` strings.

## Data flow

`Component -> useXxx hook -> services.xxx.method() -> mock db (localStorage) -> typed result`

- Services return typed data or throw `AppError { code, message }`.
- `useAsync(fn, deps)` returns `{ data, status: 'idle'|'loading'|'success'|'error', error, reload }`.
- Wrap async sections in `<AsyncBoundary state={...} skeleton={...} empty={...}>` so loading/empty/error are never forgotten.
- `mock/latency.ts` adds 250-700ms random delay (Demo Panel can set 0 or "slow").
- Swapping to a real backend later means writing `services/http/*.ts` that satisfy the same contracts and changing one line in `services/index.ts`.

## State rules

- **Zustand stores only for:** auth session, cart, wishlist, activity (For You tracking), UI (drawers, toasts), demo settings.
- Everything else is fetched through services (not copied into stores).
- Persist keys are prefixed `rt:` (e.g. `rt:cart`). Bump `version` and provide `migrate` when a persisted shape changes.

## Debuggability

- **Logger** (`shared/lib/logger.ts`): `log.debug(ns, msg, data)` with namespaces (`svc`, `cart`, `auth`, `ui`). Silent by default; enabled by `?debug=1` or `localStorage rt:debug`. Every service call logs name, args, result, duration.
- **Error boundaries:** one at app root, one per route. Fallback shows a friendly message plus a "Copy error report" button (route, persona, last 20 log lines, error stack).
- **Demo Panel** doubles as a debug tool (force error, force latency, reset DB, switch persona, advance clock).
- **Deterministic mock data:** seeded fixtures with stable IDs (`RT-10001`...); `Math.random` is forbidden in services (use the seeded helper) so bugs are reproducible.
- **Strict TS** (`strict`, `noUncheckedIndexedAccess`), ESLint (react-hooks, import, jsx-a11y), Prettier.
- **Scripts:** `dev`, `build`, `preview`, `typecheck`, `lint`, `test`. All must pass before a phase is "done".

## Naming and conventions

- Files: components `PascalCase.tsx`; hooks `useThing.ts`; services `thing.mock.ts` / `thing.contract.ts`; everything else `camelCase.ts`.
- One component per file; props typed as `ThingProps` interface above the component; named exports (default only for route pages if lazy-loaded).
- Route pages are lazy-loaded (`React.lazy`) with a skeleton fallback.
- Strings shown to users live next to the component (no i18n for now; English only, but avoid concatenating sentences).
- Currency: integers in whole rupees; `formatINR(1499)` -> `₹1,499` using `Intl.NumberFormat('en-IN')`.
- Dates: `date-fns`; all "now" calls go through `getNow()` so the Demo Panel clock can shift time.

## Privacy and tracking (For You)

Cookie-style tracking is **client-side only** (`activity.store`: viewed categories/brands/occasions, wishlist adds, searches). Show a cookie/consent banner on first visit; if declined, For You falls back to trending. No third-party scripts.
