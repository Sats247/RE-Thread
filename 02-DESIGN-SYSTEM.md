# 02. Design System

Derived from the six supplied Figma exports (Landing, Navigation mega-menu, Blog, Blog Post, Product Detail, Cart drawer). The template is a **desktop-only (about 1400px) minimalist editorial fashion site**: monochrome, lots of white space, big photography, thin type. Keep that look. Colour values below are approximate; **eyedrop the exact values from Figma styles and put them in `tailwind.config.ts` as tokens**; never hard-code hex in components.

## Tokens

| Token | Value (approx.) | Use |
|---|---|---|
| `ink` | `#000` | announcement bar, headings, dark sections |
| `ink-soft` | `#1f1f1f` | primary buttons (the black "ADD TO BAG" / "CONTINUE TO CHECKOUT" style) |
| `paper` | `#fff` | page background |
| `mist` | `#f4f4f4` | panels (review summary, image backdrops, footer) |
| `line` | `#e5e5e5` | dividers, input borders |
| `muted` | `#6b6b6b` | secondary text (colour/size line, captions, breadcrumbs) |
| `sale` | `#d0021b` | discounts, "Sale" nav item, "30% off" |
| `accent-green` | `#2f5d3a` | sustainability / impact banner (the green forest banner) |
| `ok / warn / danger` | green / amber / red | statuses (verified, due, overdue) |

- **Type:** one clean geometric sans (use Inter or DM Sans from Google Fonts with system fallback). Sizes: H1 40-56 (hero/blog titles, large and light), H2 28-32 (section titles, centered), H3 18-20, body 14-16, caption 12. Buttons and nav use **uppercase with letter-spacing 0.08em** at 13px; product names use wide letter-spacing.
- **Radius:** 0 for buttons/cards/inputs (square look); pills (`rounded-full`) only for tag chips (e.g. "Style", "Transparency").
- **Spacing:** 4px base; section vertical rhythm 64-96px desktop, 40-56px mobile. Content max width 1280 with 24px side padding (16px mobile).
- **Shadows:** almost none. Drawers/modals use a dim overlay (`bg-black/50`) only.
- **Motion:** 150-250ms ease for hover, drawers slide from right (desktop) / bottom sheet (mobile). Respect `prefers-reduced-motion`.
- **Imagery:** portrait 3:4 for products, 4:5 for category tiles, 16:9 hero. Always `aspect-ratio` boxes, lazy-loaded, with `ImageWithFallback` (neutral `mist` block with a hanger icon).

## Shared layout (from Landing + Navigation exports)

1. **AnnouncementBar:** black, centered 12px white text with underlined link + arrow (e.g. "Free courier over ₹999 · Sign up for early drops →"); right side shows `INR ₹`. Dismissible on mobile.
2. **Header:** left primary nav (Buy, Rent, Sell, Stories), centered wordmark **RE-thread**, right icons: search, account, wishlist (heart), cart (with count badge). Active nav item has a 1px underline.
3. **Secondary category row** (small text): Holiday/Occasions, New Arrivals, Best-Sellers, Tops, Bottoms, Ethnic, Outerwear, Shoes & Bags, **Sale (red)**.
4. **MegaMenu** (hover/click on Buy or Rent): two text columns ("HIGHLIGHTS", "FEATURED SHOPS", small uppercase labels, 16px links) + two image promo cards with overlaid white title and arrow. Page content dims beneath.
5. **Footer:** 4 link columns (Account, Company, Get Help, Connect), email-capture input with square black arrow button, legal row. Adapt links: Help Center, Return Policy, Rental Terms, Seller Guide, Verification, Grievances.
6. **Cart drawer:** right-side panel with "Your Cart", line items (thumb, name, meta line, struck price + price + red "(x% off)", delete icon), upsell strip, subtotal, full-width black CTA.

## Component catalogue (from the exports)

| Component | Seen in | Notes |
|---|---|---|
| `HeroBanner` | Landing | full-bleed image, centered white heading + sub + white square button |
| `CategoryTiles` | Landing "Shop by Category" | 6 tiles (3 on mobile, scroll), underlined label below |
| `PromoCard` (x3) | Landing | tall image, centered title, white button ("Shop the latest") |
| `ImpactBanner` | Landing green banner | rename "Our Impact": water/CO₂ saved by buying second-hand (mock numbers) |
| `ProductCarousel` | Landing "Favorites", blog "Edit", product "Recommended" | cards with image, name, price (strike + sale), meta; arrows on desktop, swipe on mobile, dots |
| `ProductCard` | everywhere | see adaptation below |
| `TestimonialSplit` | Landing "People are talking" | quote + 5 stars + linked product, big image right |
| `EditorialPair` | Landing | two image blocks with caption + underlined link |
| `UgcStrip` | "Everlane On You" | rename "RE-thread On You": customer photos with cart icon overlay |
| `ValueProps` | Landing bottom | 3 line-icon items (Verified sellers, Quality-checked, Courier or meetup) |
| `ArticleCard`, `ArticleHero`, `ArticleBody` | Blog / Blog Post | tag pill, big title, narrow 680px reading column, inline product links, "Load more" black button |
| `Marquee` | Blog | big looping text ("Wear it again · Rent it · Re-love it") |
| `Gallery` | Product Detail | 2x3 grid on desktop, swipe carousel with dots on mobile |
| `BuyBox` | Product Detail | sticky right column: breadcrumb, title, price, rating, chips, black CTA, info rows with line icons, accordion details |
| `RatingSummary`, `FitScale`, `ReviewList` | Product Detail | grey panel with bar distribution + "Runs small/large" scale; reviews show height, weight, body type, size purchased |
| `PriceBreakdown` | "Transparent Pricing" | 5 icon columns; **repurpose** as buyer's cost breakdown (Item, Platform fee, Courier, Deposit, Total) |
| `Drawer`, `QtyStepper` | Cart | stepper only for multi-quantity items (rare) |

## Adaptations for second-hand (important)

- **Items are usually unique (qty 1).** No colour swatches or stock quantity; show a fixed **Size**, **Condition** (Like new / Good / Fair), **Brand**, **Locality**. Cart rows have **no stepper**, only remove.
- **ProductCard** shows: photo, title, brand, size, price (with MRP strike + red % off), locality, **Verified** tick if seller verified, **Return eligible** or **Rental** tag, wishlist heart. Rent cards show `₹X / 3 days`.
- **Fit section** replaces "Model is 6'2"": seller-provided **measurements** (chest, waist, length) plus a size-chart accordion.
- **Sustainability section** becomes **Impact**: mock "saves ~X litres of water" line.
- **Cart upsell "Before you go"** becomes **"More from this seller"** (combine courier).
- Show a **Seller card** in BuyBox: avatar, name, rating, sales count, locality, verified badge, "View store".

## Responsive rules (mobile-first, Tailwind default breakpoints)

The Figma is desktop-only; derive mobile as follows. Write base styles for ≤639px and enhance at `md` (768) and `lg` (1024).

| Desktop pattern | Mobile pattern |
|---|---|
| Header with inline nav + mega menu | Hamburger opens full-height `MobileMenu`; search icon opens full-screen search; wishlist + cart icons stay |
| (none) | **BottomTabBar** (Home, Browse, Rent, Sell, Profile) fixed, 56px, safe-area padding |
| Filters sidebar / dropdown bar | **BottomSheet** filters ("Filter" and "Sort" buttons sticky under header) |
| Cart right drawer (about 420px) | Full-width drawer |
| 2x3 gallery | Swipe carousel + dots + thumbnail count |
| Sticky BuyBox on right | Sticky bottom bar with price + primary CTA |
| 4-6 column grids | 2-column product grids, horizontal scroll rows for tiles |
| Tables (dashboard) | Stacked cards with label/value rows |
| Mega menu image cards | Hidden; text links only |

Touch targets ≥44px. Never horizontal page scroll. Test at 360, 390, 768, 1024, 1280.

## Accessibility baseline

Visible focus ring (2px ink), 4.5:1 contrast (check `muted` on `mist`), carousels pausable and keyboard operable, drawers trap focus and close on `Esc`, status never conveyed by colour alone (icon + text).
