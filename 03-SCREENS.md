# 03. Screens and Routes

Access key: **G** guest, **U** logged-in user, **S** seller (has at least one listing/sale), **A** admin. Every screen must implement loading / empty / error states.

## Route map

| Route | Screen | Access |
|---|---|---|
| `/` | Landing (guests) / redirects to `/home` when logged in | G, U |
| `/auth` (also as modal) | Login / signup / OTP / 2FA setup | G |
| `/home` | Home (user view) | U (G sees limited via landing) |
| `/browse` , `/browse/:category` | Listings with filters, sort | U (G: gated) |
| `/search?q=&category=&locality=&sort=` | Search results | U |
| `/product/:id` | Product detail (sale) | U (G: 3 views then gate) |
| `/rent` , `/rent/:id` | Rent tab and rental detail/booking | U |
| `/wishlist` | Wishlist | U |
| `/cart` | Cart page (drawer is primary) | U |
| `/checkout` | Checkout (sale items) | U |
| `/orders` , `/orders/:id` | Orders and tracking | U |
| `/rentals` , `/rentals/:id` | My rentals, QC timeline, dues | U |
| `/offers` | Offers, combos, discounts | U |
| `/sell` | "Sell on RE-thread" landing, benefits, fees | U |
| `/sell/new` | Listing wizard | U (becomes S on publish) |
| `/seller` | Dashboard overview (locked state if never sold) | U/S |
| `/seller/listings` `/seller/orders` `/seller/rentals` `/seller/returns` `/seller/earnings` `/seller/store` | Dashboard sections | S |
| `/seller/:id` | Public seller / store profile | U |
| `/support` , `/support/new` , `/support/:id` | Grievances / quality complaints | U |
| `/profile` | Customer profile | U |
| `/stories` , `/stories/:slug` | Editorial blog (low priority) | all |
| `/admin` , `/admin/verification` , `/admin/listings` , `/admin/complaints` | Admin lite | A |
| `*` | 404 | all |

## Landing `/` (guest)

- AnnouncementBar, Header, HeroBanner ("Wear it again." with Shop / Start selling buttons), CategoryTiles, three PromoCards (New Arrivals, Rent for the occasion, Sell your wardrobe), ImpactBanner, ProductCarousel **"Fresh from sellers" (only 8 items shown)**, TestimonialSplit, ValueProps, Footer.
- **Guest gate:** after the 8 listings, a blurred "peek" row and a `Log in to see more` card. Opening a product counts toward `GUEST_PRODUCT_VIEW_LIMIT` (default 3); the next attempt opens the AuthModal. Dismissing the modal returns to the page.

## Auth (modal or `/auth`)

Steps (stepper UI), all mocked:
1. **Choose:** Continue with Google (mock: instantly creates/loads a demo Google user) or email + password (Login / Sign up tabs).
2. **OTP:** 6-digit input, 30s resend timer, hint text "Demo code: 123456". Wrong code shows an error; 3 wrong attempts lock for 30s.
3. **2FA setup:** mock QR (static image) + manual key + 6-digit confirm (accepts 123456) + show 8 backup codes with copy/download. **Default: prompted once, skippable ("Set up later")**; afterwards a dismissible banner in Profile.
4. **Quick onboarding:** name, phone, locality (Bengaluru list), pick interest chips (occasions, categories) to seed For You.
- Returning login: credentials -> OTP -> (if 2FA on) authenticator code.
- Anyone can sell later: no separate account type at signup.

## Home `/home` (user view)

Top to bottom: Header + search bar with category/locality dropdown and camera icon (image search) · OffersStrip (coupon chips) · **For You carousel** · CategoryTiles · **Occasion chips row** (Daily, Brunch, Resort, Lounge, Weekend getaway, Travel, Gym/Sports, Vacation, Yoga, Birthday, Club, Date, Summer, Winter, Autumn, Monsoon, College, Party, Wedding, etc.) · Trending now · Combos and bundles · Rent spotlight · Near you (locality) · Top-rated sellers · Footer.

- **For You:** ranked by `activity.store` signals (viewed categories/brands/occasions, wishlist, searches); falls back to trending when consent declined or no activity. Show a small "Because you viewed ..." caption on each card when available.
- **Search bar:** typing shows suggestions (keywords, categories, clothing ID like `RT-10234`, localities, trending terms). Enter goes to `/search`.
- **Image search:** modal with upload/drag-drop/camera; shows the image, a fake "analysing..." 1.5s, then similar listings (mock: match by tags/colour of the seeded image).

## Browse / Search results

- Title + result count, active filter chips (removable), **Filter** and **Sort** controls (sidebar on desktop, BottomSheet on mobile).
- **Filters:** Category (Men/Women/Unisex), Type, **Genre/Style tags**, Brand (searchable), Size, Condition, Occasion, Price range slider (₹), Locality, "Verified sellers only", "Return available", "Rent only", "Combos".
- **Sort:** Newest (listing date), Price low-high, Price high-low, Popularity, Seller rating, Recommended (default; applies verified-seller boost).
- Grid of ProductCards (2 cols mobile, 3-4 desktop), "Load more" button (not infinite scroll). Filter state lives in the URL query string so links are shareable and back-button works.

## Product detail `/product/:id`

- Breadcrumb, Gallery, **BuyBox:** title, clothing ID, price + MRP + % off, **Condition**, **Size**, Brand, Locality, return-policy line (**"Returns accepted within N days"** or **"No returns"**, with the platform-fee note for sellers), **Add to cart** (black), **Wishlist** heart, "Make an offer" omitted (out of scope).
- Seller card (rating, sales, verified badge, view store), accordions: Description, Measurements/Size chart, Fabric and care, Impact, Delivery (courier or meetup).
- Occasions as chips (click goes to filtered browse). "Complete the look" (other items from same seller) + Recommended carousel. Reviews: RatingSummary, FitScale, filter/sort, review list (height, weight, body type, size purchased). PriceBreakdown (item, platform note, courier, total).
- Mobile: sticky bottom bar (price + Add to cart).

## Cart and Checkout

- **Cart drawer** (opens on add): items grouped **by seller**, remove icon (no stepper, unique items), "More from this seller" strip, subtotal, **Continue to checkout**. Coupon field. Rentals are **not** in the cart (they use "Book now").
- **Checkout** (single page, mocked): address (or meetup selection per seller: place + time slot), delivery mode per seller (courier ₹ or meetup free), payment (UPI / card / COD radio; fake success), PriceBreakdown, place order -> success screen -> `/orders/:id`.

## Wishlist

Grid with remove, "Move to cart", price-drop badge (mock), empty state with CTA.

## Rent `/rent`, `/rent/:id`

- **Rent tab:** hero, occasion chips, categories (Tuxedos & Suits, Sherwanis, Lehengas, Sarees, Gowns, Traditional), filters (size, occasion, price/day, locality, delivery mode, "ironed and cleaned" always true), ProductCards showing `₹X / 3 days`.
- **Rental detail:** Gallery + **RentBox:** tier selector (e.g. 3 / 5 / 7 days with price), **date picker** (blocked dates from existing bookings), **security deposit** (refundable) and **late fee per day** shown prominently, delivery mode (courier or meetup, per seller options), **size chart** modal, "Ironed and cleaned" badge (seller checklist), cost breakdown (rent + deposit + courier), terms checkbox ("Return on time and in same quality or deductions apply"), **Book now**.
- Booking confirmation shows the **4-stage Quality Check timeline** (see below).

## My Rentals `/rentals/:id`

- Status timeline: Requested -> Confirmed -> **QC: Pre-delivery** -> In transit / Meetup -> **QC: Post-delivery** -> Active -> **QC: Pre-pickup** -> Pickup -> **QC: Post-pickup** -> Deposit settled / Closed.
- Each QC stage card: who does it, photo upload (mock), checklist (ironed, clean, no damage, size matches), AI verdict (pass/flag, forced via Demo Panel), timestamp.
- **Dues panel:** deposit held, late fee accruing per day when past end date (computed from `getNow()`), damage deduction (set at post-pickup), **Pay dues** button (mock), "Report an issue" (opens grievance prefilled).

## Sell `/sell`, `/sell/new`

- `/sell`: benefits, fee table (**lower platform fee if the seller enables returns**), how it works (3 steps), CTA.
- **Listing wizard (stepper):** 1) Type: Sell or Rent (+ Combo option), 2) Photos (min 3, drag-drop, reorder) -> **AI Quality Check** (progress, checks: blur, lighting, watermark/stock photo, garment visible, duplicate), shows pass / "Fix these photos" with reasons, 3) Details (title, category, type, brand, size, measurements, condition, fabric, colour, tags, occasions), 4) Pricing (MRP, price; for rent: tiers, **deposit**, **late fee/day**, **ironed and cleaned checklist (required)**, delivery modes), 5) **Returns policy** toggle (on = platform-fee discount note + "Better engagement" hint) with window days, 6) Review and publish. Publishing creates the seller profile if needed. Bundles/combos: select multiple own listings, set bundle price.
- Draft autosave to localStorage.

## Seller dashboard `/seller/*`

- **Locked state:** if the user has never created a listing or made a sale, `/seller` shows a centered card: *"Create a sale or sell clothes to unlock your dashboard"* with a **Start selling** button, and a blurred preview of the layout. Other `/seller/*` routes redirect here.
- **Overview:** KPI cards (Sales, Active listings, Rentals out, Earnings, Rating), verification status card, recent orders, "needs attention" list (rental QC due, return requests, AI-flagged photos).
- **Listings:** table/cards with status (Live, Pending AI, Flagged, Sold, Rented, Paused), edit/pause/delete, create combo/offer.
- **Orders:** list + detail, mark packed/shipped/meetup done (mock status changes).
- **Rentals:** calendar of bookings, QC task queue (upload pre-delivery and post-pickup photos), set damage deduction.
- **Returns and Grievances:** requests from buyers (only for listings with returns on): approve/reject with reason.
- **Earnings:** payout summary, fee breakdown, mock statement.
- **Store profile (`/seller/store`):** name, location, bio; for offline stores: address + map placeholder, **GST number, licence number**, opening hours, **reach** (km radius + localities served); documents upload (mock); verification status and "Apply for verification".

## Public seller profile `/seller/:id`

Name, avatar, **verified badge**, location, number of sales, rating (+ breakdown), member since, reach; for stores: address, GST, licence (masked partially), hours; tabs: Listings, Rentals, Reviews, About.

## Customer profile `/profile`

Name, phone, email (editable), locality, **number of returns**, **list of unpaid rentals** (amount due, days overdue, Pay button), wishlist shortcut, security (2FA status, backup codes, change password), saved addresses, consent/cookie settings, "Become a seller" or "Go to dashboard".

## Support / Grievances `/support`

- List of tickets with status; **New ticket** form: choose order or rental, type (Size / Fit / Quality not as described / Late delivery / Damaged / Other), description, photos.
- **Return request logic:** for **Size** and **Fit** issues on orders whose listing has `returnPolicy.enabled` and within the window, the form shows **"Request a return"** and the ticket enters the seller's return queue; otherwise it shows "This seller does not accept returns. You can still escalate quality issues." Quality / not-as-described issues are always escalatable to admin.
- Ticket detail: thread of messages, status timeline (Open -> Seller responded -> Escalated -> Resolved), return request card.

## Offers `/offers`

Platform discounts, seller offers, combos/bundles; coupon chips with copy; applied at checkout (mock validation).

## Verification (UI states)

- **Verified badge** (blue-ish tick, tooltip with reason) shown on cards, product page, profile. **Boost:** verified sellers rank higher in "Recommended" and get a "Verified" filter.
- **Automatic:** offline store with GST and licence uploaded, OR ≥ `AUTO_VERIFY_MIN_SALES` successful sales with rating ≥ `AUTO_VERIFY_MIN_RATING`. Badge tooltip: "Verified: successful sales" / "Verified: registered store".
- **Admin-approved:** seller applies; request appears in `/admin/verification`; approve/reject with note; seller sees status.

## Admin lite

- **Verification queue:** documents preview, approve/reject.
- **Listings:** AI-flagged listings review (approve/remove).
- **Complaints:** escalated tickets, resolve with decision.
- Simple stats row. Visible only to the admin persona.

## Stories (lowest priority)

`/stories`: title block, "The Latest" grid of ArticleCards with tag pills, "Load more", marquee, "Our impact" row, social block. `/stories/:slug`: ArticleHero + ArticleBody with inline product links + "Shop the edit" carousel. 4-6 seeded articles (styling guides for occasions, thrift tips, rental how-to, sustainability).
