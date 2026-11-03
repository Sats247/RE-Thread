# RE-thread Progress

## Phase 0 — Scaffold and Rules

### Status: ✅ Complete

### Files & Configuration Created
- [x] Vite + React + TypeScript (strict mode + noUncheckedIndexedAccess)
- [x] Tailwind CSS v3 configured with design tokens (`ink`, `paper`, `mist`, `line`, `muted`, `sale`, `accent-green`, etc.)
- [x] ESLint configured with strict import-boundary enforcement (`no-restricted-imports` blocking `services/mock/*` from components/hooks/stores)
- [x] Path alias `@/*` -> `src/*` in Vite & TypeScript
- [x] Complete folder structure per `01-ARCHITECTURE.md`
- [x] Shared library utilities (`cn`, `logger`, `formatINR`, `formatDate`, `getNow`, `generateId`, `generateCode`, `getImageUrl`)
- [x] Configuration modules (`routes.ts`, `constants.ts`, `flags.ts`)
- [x] Full domain types (`shared/types/domain.ts`, `AppError`)
- [x] All 10 service contracts (`auth`, `catalog`, `offers`, `orders`, `rentals`, `aiCheck`, `selling`, `seller`, `support`, `admin`)
- [x] Mock implementations with localStorage database (`db.ts`, `latency.ts`, and seed stubs)
- [x] Single export boundary `services/index.ts`
- [x] All 6 Zustand stores (`auth`, `cart`, `wishlist`, `activity`, `ui`, `demo`)
- [x] All shared hooks (`useAsync`, `useMediaQuery`, `useDebounce`, `useLocalStorage`)
- [x] Client router with React Router, layout shells (`PublicLayout`, `SellerLayout`, `AdminLayout`), and `PlaceholderPage`
- [x] Static hosting redirect rule (`public/_redirects`)
- [x] `AGENTS.md` and `PROGRESS.md`

### Acceptance Criteria Verification
- [x] App boots to placeholder page (`PlaceholderPage.tsx` under `PublicLayout`)
- [x] All scripts pass (`npm run typecheck`, `npm run lint`, `npm run build`)
- [x] Illegal import test verified: importing `services/mock/*` in a component fails ESLint `no-restricted-imports` with exit code 1

---

## Phase 1 — Design System and Shell

### Status: ✅ Complete

### Files Created
- [x] All 22 `src/shared/ui/` primitives:
  - `Button`, `Input`, `Select`, `Checkbox`, `Modal`, `Drawer`, `BottomSheet`, `Tabs`
  - `Badge`, `Rating`, `Price` (INR with strike/discount), `Chip`, `Skeleton`, `Toast`, `EmptyState`, `ErrorState`
  - `Carousel` (Embla with swipe & desktop controls), `Stepper`, `Timeline`, `Accordion` (Radix), `ImageWithFallback`, `AsyncBoundary`
  - `src/shared/ui/index.ts`
- [x] Layout shell in `src/shared/layout/`:
  - `AnnouncementBar` (black bar, INR indicator, mobile dismiss)
  - `Header` (desktop nav + secondary category strip + responsive action icons)
  - `MegaMenu` (hover/click on Buy & Rent, 2 text columns + 2 promo image cards, dimmed backdrop)
  - `MobileMenu` (full-screen mobile navigation drawer with quick links)
  - `BottomTabBar` (5-tab mobile nav: Home, Browse, Rent, Sell, Profile)
  - `Footer` (4 link columns, newsletter email capture, Bengaluru locality & legal links)
  - `src/shared/layout/index.ts`
- [x] `PublicLayout.tsx` updated with announcement bar, header, cart drawer, toast container, and bottom tab bar
- [x] `PageSkeleton.tsx` for route lazy suspense fallback
- [x] Interactive Kitchen Sink showcase at `/_kitchen-sink`:
  - `KitchenSinkPage.tsx`, `KitchenSinkForms.tsx`, `KitchenSinkDataDisplay.tsx`, `KitchenSinkFeedback.tsx`
  - Verified: all files strictly under 200 lines, 1 component per file, zero `any` or `@ts-ignore`

### Acceptance Criteria Verification
- [x] Desktop shell matches Figma specifications at 1280px (wordmark, mega menu, cart drawer)
- [x] Mobile shell responds at 360px & 768px (hamburger menu, bottom tab bar, scrollable category strip)
- [x] Accessible focus indicators, keyboard-trapped dialogs, aria labels, and `data-testid` attributes present on all interactive elements
- [x] `npm run typecheck` passed (0 errors)
- [x] `npm run lint` passed (0 errors, 0 warnings)
- [x] `npm run build` passed (production bundle cleanly compiled with code-split route chunks)

---

## Phase 2 — Data Layer and Demo Panel

### Status: ✅ Complete

### Files Created & Configured
- [x] Personas in `src/demo/personas.ts`:
  - `Guest` (visitor gate testing)
  - `Aarav Patel` (buyer with 2 returns + 1 overdue rental with accruing late fee)
  - `Meera Rao` (new user with 0 sales for dashboard locked state)
  - `Kavya Sharma` (individual seller, 14 sales, auto-verified)
  - `Thread & Co. Indiranagar` (registered store, admin-verified, active rentals & return ticket)
  - `Admin` (verification & complaint queue)
- [x] Seed datasets in `src/services/mock/seed/`:
  - 14 Sellers across Bengaluru localities (`sellers.seed.ts`)
  - 70 Listings: 45 Sale + 25 Rental with tiers & deposits (`listingsSale.seed.ts`, `listingsRent.seed.ts`, `listings.seed.ts`)
  - 120+ Reviews with ratings and fit scales (`reviews.seed.ts`)
  - Orders with full status timelines (`orders.seed.ts`)
  - Rentals with 4-stage QC checks & late fees (`rentals.seed.ts`)
  - 6 Bundles + 8 Platform Coupons (`offers.seed.ts`)
  - 4 Editorial Articles (`articles.seed.ts`)
- [x] Services updated with business logic & demo triggers:
  - `catalog.mock.ts`: keyword search, facet counters, locality/price/return filters, verified-seller boost (1.3x) in Recommended sort
  - `rentals.mock.ts`: dynamic late fee accrual via `getNow()`
  - `aiCheck.mock.ts`: deterministic photo verification (blur/dark/watermark/stock) & demo pass/fail overrides
  - `latency.ts`: network simulation & forced error injection
- [x] `DemoPanel.tsx` & `PhoneFrame.tsx`:
  - Persona switcher, DB reset to seed, fast-forward clock (+1d, +3d, +7d), simulated latency, force error, 390px mobile view toggle
- [x] `RootErrorBoundary.tsx`:
  - Top-level exception handling with JSON error report copying (route, persona, stack)
- [x] Vitest Unit Test Suite (`src/shared/lib/__tests__/`):
  - `pricing.test.ts` (INR formatting & courier charge thresholds)
  - `fees.test.ts` (platform fee rate rules: 12% vs 8% with returns, 15% rental)
  - `lateFees.test.ts` (overdue day calculations & deposit deduction)
  - `catalog.test.ts` (facets, filters, and 1.3x verified seller score boost)

### Acceptance Criteria Verification
- [x] Persona switch updates user session and demo state
- [x] Reset restores all seed fixtures in localStorage (`db.reset()`)
- [x] Advancing clock past end date calculates late fee accrual via `getNow()`
- [x] 14 Vitest unit tests pass across 4 test suites
- [x] `npm run typecheck` passed (0 errors)
- [x] `npm run lint` passed (0 errors, 0 warnings)
- [x] `npm run build` passed (production bundle compiled cleanly)

---

## Phase 3 — Landing and Auth

### Status: ✅ Complete

### Files Created
- [x] Landing Page components in `src/features/catalog/components/`:
  - `HeroBanner.tsx`: Full-bleed editorial banner ("Wear it again.") with primary shop/sell CTAs
  - `CategoryTiles.tsx`: 6 portrait 4:5 category tiles with hover zoom & underlined titles
  - `PromoCard.tsx`: 3 tall editorial promo cards (New Arrivals, Occasion Rentals, Wardrobe Selling)
  - `ImpactBanner.tsx`: Forest green banner with water saved (480,000 L), CO₂ avoided, garments re-homed
  - `ProductCard.tsx`: Fashion card with photo, brand, title, size, condition, locality, price with MRP strike & discount badge, wishlist toggle
  - `ProductCarouselSection.tsx`: "Fresh from sellers" (8 items maximum for guests) using Embla Carousel
  - `GuestGateCard.tsx`: Blurred peek preview row + centered "Log in to explore 60+ more drops" card
  - `TestimonialSplit.tsx`: Customer quote + 5 stars + linked pre-loved item left, portrait photo right
  - `ValueProps.tsx`: 3 icon features (Verified sellers, Quality-checked, Bengaluru courier or meetup)
  - `ConsentBanner.tsx`: Localized client-side privacy choice banner (Accept / Decline personalization)
- [x] Auth Wizard & Security components in `src/features/auth/components/`:
  - `AuthStepCredentials.tsx`: One-click Google sign-in + Email/password Login & Signup tabs
  - `AuthStepOtp.tsx`: 6-digit OTP code input, demo code hint `123456`, 30s resend timer, 30s lockout on 3 wrong attempts
  - `AuthStepTwoFactor.tsx`: Authenticator QR code pattern, secret manual key, 6-digit confirm code, 8 backup codes, skippable ("Set up later")
  - `AuthStepOnboarding.tsx`: Name, phone, Bengaluru locality dropdown, category & occasion chips to seed `For You`
  - `AuthModal.tsx`: Shared modal hosting the 4-step auth flow
- [x] Pages & Routing:
  - `LandingPage.tsx`: Full landing page mounted at `/` (automatically redirects logged-in users to `/home`)
  - `AuthPage.tsx`: Dedicated full-page auth experience at `/auth`
  - `useGuestGate.ts`: Limits unauthenticated users to 3 product views; triggers AuthModal on 4th attempt
  - All files strictly under 180 lines, 1 component per file, zero `any` or `@ts-ignore`

### Acceptance Criteria Verification
- [x] Complete Signup -> OTP (123456) -> 2FA (skippable) -> Onboarding -> `/home` flow works
- [x] Wrong OTP displays error; 3 incorrect attempts trigger a 30s lockout countdown
- [x] Guest gate limits product views to 3; 4th view attempt opens the `AuthModal`
- [x] Logged-in users on `/` automatically redirect to `/home`
- [x] `npm run test` passed (14/14 tests)
- [x] `npm run typecheck` passed (0 errors)
- [x] `npm run lint` passed (0 errors, 0 warnings)
- [x] `npm run build` passed (production build succeeded in ~3.9s with code-split route chunks)

### Assumptions
- Guest product view count is tracked in `sessionStorage` (`rt:guest_product_views`) so refreshing within the same browser session preserves the count.
- Authenticated users have unlimited access and skip guest view limits.

### Known Issues
- None.

---

## Phase 4 — Home, Browse, Search

### Status: ✅ Complete

### Files Created
- [x] `src/features/catalog/hooks/useSearchParamUpdater.ts`: Low-level URL `URLSearchParams` updater helpers (set, toggle array, remove)
- [x] `src/features/catalog/hooks/useCatalogFilters.ts`: URL-synced filter/sort/page state hook; survives reload and back-button; builds `SearchParams` payload for the catalog service
- [x] `src/features/catalog/components/OffersStrip.tsx`: Horizontal scrollable coupon chips with clipboard copy + toast confirmation
- [x] `src/features/catalog/components/SearchBar.tsx`: Full search bar with category/locality dropdowns, keyword suggestions popover, clear button, camera icon (triggers ImageSearchModal)
- [x] `src/features/catalog/components/ImageSearchModal.tsx`: Drag-and-drop / upload modal; 1.5s simulated analysis; displays 6 matched garment cards; sample looks for demo
- [x] `src/features/catalog/components/ForYouSection.tsx`: Activity-driven carousel; reads `activity.store` signals (viewedCategories/Brands/Occasions); falls back to trending; shows "Because you viewed ..." captions
- [x] `src/features/catalog/components/OccasionChipsRow.tsx`: Scrollable row of all 21 occasions; navigates to `/browse?occasion=X` or calls `onSelect` callback
- [x] `src/features/catalog/components/BundlesSection.tsx`: Cards from `catalog.getBundles()` with combo price and savings badge
- [x] `src/features/catalog/components/NearYouSection.tsx`: Hyperlocal listings grid; locality tab switcher (5 localities); links to filtered `/browse`
- [x] `src/features/catalog/components/TopSellersSection.tsx`: Top-rated verified sellers fetched from `seller.topSellers()` with rating, sales count, verification badge
- [x] `src/features/catalog/components/FilterChip.tsx`: `FilterChip` (single removable chip) + `ArrayFilterChips` (renders one chip per item in an array filter)
- [x] `src/features/catalog/components/ActiveFilterChips.tsx`: Renders all active filter chips with individual remove buttons and "Clear All"
- [x] `src/features/catalog/components/SortSelect.tsx`: Sort dropdown with all 6 sort options; dispatches via `useCatalogFilters`
- [x] `src/features/catalog/components/BrowseFacetFilters.tsx`: Sizes (chips), conditions (checkboxes), brands (searchable checkboxes)
- [x] `src/features/catalog/components/BrowseFilterControls.tsx`: Full filter panel (mode, department, trust/policy, price range, facets, locality); composable into sidebar or sheet
- [x] `src/features/catalog/components/BrowseFiltersSidebar.tsx`: Desktop-only `lg:block` sidebar wrapper around `BrowseFilterControls`
- [x] `src/features/catalog/components/BrowseFiltersSheet.tsx`: Mobile BottomSheet wrapper with "Show N results" apply button
- [x] `src/features/catalog/pages/HomePage.tsx` (`/home`): Full authenticated home feed — search bar, offers strip, For You carousel, category tiles, occasion chips, trending, bundles, rent spotlight, near you, top sellers
- [x] `src/features/catalog/pages/BrowsePage.tsx` (`/browse`, `/browse/:category`): Full catalog grid with URL-synced filters, sidebar (desktop), bottom sheet (mobile), active chips, sort, load-more
- [x] `src/features/catalog/pages/SearchPage.tsx` (`/search`): Inline search bar, same filter/sort/chips as browse, results grid
- [x] `src/app/router.tsx`: Replaced PlaceholderPages for `/home`, `/browse`, `/browse/:category`, `/search` with lazy-loaded real pages
- [x] `src/services/contracts/seller.contract.ts`: Added `topSellers()` method
- [x] `src/services/mock/seller.mock.ts`: Implemented `getProfile()` and `topSellers()` with real DB reads
- [x] `src/services/mock/catalog.mock.ts`: Improved `forYou()` with scoring by top category/brand + `similarByImage()` with filename-based mock matching
- [x] `src/config/constants.ts`: Added `BENGALURU_LOCALITIES` and `ALL_OCCASIONS` as const arrays
- [x] `src/shared/ui/Badge.tsx`: Added `size?: 'sm' | 'md'` prop

### Acceptance Criteria Verification
- [x] Every filter (category, mode, brand, size, condition, occasion, price, locality, verified, returnable) works on both `/browse` and `/search`
- [x] All filters and sort survive browser reload and back-button (stored in URL query string via `useSearchParams`)
- [x] "For You" carousel shows "Because you viewed X" captions driven by `activity.store`; falls back to trending when no activity
- [x] Image search modal: upload or sample → 1.5s analysis → 6 matching garment cards
- [x] Occasion chips row navigates to filtered browse on click
- [x] Near You section filters by Bengaluru locality with tab switcher
- [x] Top sellers section renders rated & verified sellers from seed data
- [x] All files ≤ 200 lines; no `any`, no `@ts-ignore`
- [x] `npm run test` passed (14/14 tests)
- [x] `npm run typecheck` passed (0 errors)
- [x] `npm run lint` passed (0 errors, 0 warnings)
- [x] `npm run build` passed (clean production build, ~3.2s, 23 code-split chunks)

### Assumptions
- Occasion chip row and filter sheet include all 21 occasions from `ALL_OCCASIONS` constant (not subset).
- "Load More" appends to the same page rather than replacing (accumulating pattern).
- `catalog.forYou()` re-ranks by top viewed category/brand so carousel ordering reflects strongest signals.
- `seller.topSellers()` sorts by composite `ratingAvg × salesCount` score, returning top 6.
- `similarByImage()` matches by filename substring against category/type/color/brand — sufficient for demo purposes.

### Known Issues
- None.

