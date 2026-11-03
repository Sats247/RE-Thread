# 05. Build Plan

Work **one phase per session**. At the end of each phase: run `typecheck`, `lint`, `build`; verify the acceptance criteria in the browser at 360 / 768 / 1280px; update `PROGRESS.md`; stop and report. Docs to read are listed per phase.

| # | Phase | Read | Deliverable and acceptance criteria |
|---|---|---|---|
| 0 | **Scaffold and rules** | README, 01 | Vite + React + TS strict + Tailwind (tokens placeholder), ESLint with import-boundary rules, Prettier, Vitest, folder skeleton from 01, `AGENTS.md`, `PROGRESS.md`, `public/_redirects`. *Done when:* app boots to a placeholder page, all scripts pass, an illegal import (component -> `services/mock`) fails lint. |
| 1 | **Design system and shell** | 02 | Tailwind tokens from Figma styles, fonts, all `shared/ui` primitives, AnnouncementBar, Header, MegaMenu, MobileMenu, BottomTabBar, Footer, PublicLayout, a hidden `/_kitchen-sink` route showing every component and state. *Done when:* shell matches the Figma at 1280px and works as mobile layout at 360px (hamburger, bottom tab bar). |
| 2 | **Data layer and Demo Panel** | 01, 04 | Types, contracts, mock db (localStorage), latency, seed data, services, stores, logger, `useAsync`, `AsyncBoundary`, error boundaries, personas, Demo Panel, Phone Frame toggle. *Done when:* persona switch works, reset restores seed, forced error shows ErrorState, a Vitest suite covers pricing, fees, late-fee and filter logic. |
| 3 | **Landing and auth** | 03 (Landing, Auth) | Landing page, guest gate (8 items, 3 product views), AuthModal + `/auth` with Google mock, email, OTP, 2FA setup, onboarding, consent banner, route guards. *Done when:* full signup -> OTP -> 2FA -> onboarding -> `/home` works; wrong OTP errors; gate triggers on 4th product view. |
| 4 | **Home, browse, search** | 03 (Home, Browse), 04 | Home sections, ProductCard, ProductCarousel, For You (activity-driven), search suggestions, `/browse` + `/search` with URL-synced filters and sorts, image search modal, occasion chips. *Done when:* every filter and sort works and survives reload/back; For You changes after viewing 3 items of a category; image search returns results. |
| 5 | **Product, cart, wishlist** | 03 (Product, Cart, Wishlist) | Product detail (Gallery, BuyBox, seller card, reviews, breakdown), cart drawer grouped by seller, wishlist, offers page and coupon. *Done when:* add/remove persists across reload; a sold item cannot be added; mobile sticky bar works. |
| 6 | **Checkout and orders** | 03 (Checkout, Orders) | Checkout with courier/meetup per seller, mock payment, order success, orders list/detail with timeline. *Done when:* ₹ totals match `quote()` and the breakdown; order appears in seller's orders (Phase 8 will use it). |
| 7 | **Rentals** | 03 (Rent, My Rentals), 04 | Rent tab, rental detail with date picker and tiers, booking, My Rentals with 4-stage QC timeline, dues (late fee via `getNow()`), pay dues. *Done when:* booking blocks taken dates; advancing the clock past end date creates a late fee; unpaid rental shows on profile; QC stages can be completed in order. |
| 8 | **Selling and seller dashboard** | 03 (Sell, Seller dashboard) | `/sell`, listing wizard with AI check (demo triggers), combos, dashboard overview/listings/orders/rentals/returns/earnings/store, **locked state for users who never sold**. *Done when:* Meera sees the lock; publishing her first listing unlocks it; flagged photos block publish with reasons. |
| 9 | **Profile and grievances** | 03 (Profile, Support) | Customer profile (returns count, unpaid rentals, 2FA settings), tickets list/new/detail, return request logic tied to seller policy, seller-side return decisions. *Done when:* a size complaint on a returns-enabled order offers "Request a return"; on a no-return order it does not. |
| 10 | **Seller profiles, verification, admin** | 03 (Seller profile, Verification, Admin) | Public seller/store profile, verification badge logic (auto + admin), boost in sort, apply for verification, admin queue/listings/complaints. *Done when:* Kavya's badge is auto; a store applying shows in the admin queue; approval changes the badge and ranking. |
| 11 | **Stories and polish** | 03 (Stories), 02 | Stories pages, empty/error states audit, a11y pass, performance pass (lazy routes, image sizes), 404, README run instructions, deploy config. *Done when:* Lighthouse mobile performance and accessibility ≥ 90 on `/`, `/home`, `/product/:id`; no console errors on any route. |

## Per-phase working loop (token-efficient)

1. Read `AGENTS.md`, `PROGRESS.md`, and only the docs listed for the phase.
2. Write a 5-10 line plan (files to create) in `PROGRESS.md`.
3. Build bottom-up: types/service -> hook -> component -> page.
4. Run `typecheck`, `lint`, `test`, `build`; fix root causes.
5. Click through the acceptance criteria once per persona involved.
6. Tick the checklist in `PROGRESS.md`, list assumptions and known issues, stop.

## Open decisions (defaults already chosen; change only if you disagree)

- 2FA is prompted once and skippable.
- Fee percentages, courier charge, late-fee rule and verification thresholds are placeholders.
- Images use seeded placeholder photos until real ones are supplied.
- Rentals use a separate "Book now" flow, not the cart.
