# 04. Data Models and Mock API

All types live in `src/shared/types/`. All money is **integer rupees**. IDs are strings. Dates are ISO strings.

## Core types

```ts
type Id = string;
type Condition = 'like-new' | 'good' | 'fair';
type Delivery = 'courier' | 'meetup';
type Category = 'men' | 'women' | 'unisex';
type Occasion = 'daily' | 'brunch' | 'resort' | 'lounge' | 'weekend-getaway' | 'travel'
  | 'gym' | 'vacation' | 'yoga' | 'birthday' | 'club' | 'date' | 'summer' | 'winter'
  | 'autumn' | 'monsoon' | 'college' | 'party' | 'wedding' | 'festive' | 'formal';

interface User {
  id: Id; name: string; email: string; phone?: string; locality?: string; avatarUrl?: string;
  role: 'user' | 'admin'; twoFactorEnabled: boolean; sellerProfileId?: Id;
  interests: { occasions: Occasion[]; categories: Category[] }; createdAt: string;
}
// Derived (never stored): returnsCount, unpaidRentals[], hasEverSold (listingsCount>0 || salesCount>0)

interface SellerProfile {
  id: Id; userId: Id; displayName: string; type: 'individual' | 'vendor' | 'store';
  avatarUrl?: string; bio?: string; locality: string; city: 'Bengaluru';
  ratingAvg: number; ratingCount: number; salesCount: number; memberSince: string;
  verification: { status: 'none' | 'pending' | 'auto' | 'admin' | 'rejected'; reason?: string; note?: string };
  boosted: boolean;                       // derived from verification
  store?: { address: string; gstin: string; licenseNo: string; reachKm: number;
            reachLocalities: string[]; hours: string; docs: { name: string; url: string }[] };
}

interface Listing {
  id: Id; code: string;                   // human clothing ID 'RT-10234' (searchable)
  kind: 'sale' | 'rent'; sellerId: Id; title: string; description: string;
  category: Category; type: ClothingType; brand: string; tags: string[]; occasions: Occasion[];
  size: string; measurements?: { chest?: number; waist?: number; length?: number; shoulder?: number; unit: 'in' };
  condition: Condition; fabric?: string; color: string; images: string[];
  price: number; mrp?: number;            // for rent: price = lowest tier
  returnPolicy: { enabled: boolean; windowDays: number };
  locality: string; createdAt: string; popularity: number;
  status: 'pending-ai' | 'live' | 'flagged' | 'sold' | 'rented' | 'paused' | 'draft';
  aiCheck?: AiCheckResult; rental?: RentalTerms; bundleId?: Id;
}
type ClothingType = 'tshirt' | 'shirt' | 'top' | 'dress' | 'jeans' | 'trousers' | 'shorts' | 'skirt'
  | 'jacket' | 'sweater' | 'kurta' | 'saree' | 'lehenga' | 'sherwani' | 'suit' | 'tuxedo' | 'gown'
  | 'activewear' | 'shoes' | 'bag' | 'accessory';

interface RentalTerms {
  tiers: { days: number; price: number }[];       // e.g. 3/5/7 days
  securityDeposit: number; lateFeePerDay: number;
  ironedConfirmed: true; cleanedConfirmed: true;  // required by wizard
  deliveryModes: Delivery[]; sizeChart?: { label: string; chest: number; waist: number; length: number }[];
}

interface AiCheckResult {
  status: 'pass' | 'flagged'; score: number;      // 0-100
  issues: { code: 'blurry' | 'dark' | 'watermark' | 'stock-photo' | 'no-garment' | 'duplicate'; imageIndex: number; message: string }[];
  checkedAt: string;
}

interface Bundle { id: Id; sellerId: Id; title: string; listingIds: Id[]; bundlePrice: number; savingsPct: number }
interface Offer { id: Id; sellerId?: Id; title: string; kind: 'percent' | 'flat' | 'combo'; value: number;
                  code?: string; minOrder?: number; validTill: string }

interface PriceBreakdown { items: number; platformFeeNote?: string; courier: number; discount: number; deposit?: number; total: number }

interface Order {
  id: Id; buyerId: Id; groups: { sellerId: Id; listingIds: Id[]; delivery: Delivery; meetup?: { place: string; slot: string } }[];
  address?: Address; pricing: PriceBreakdown; payment: 'upi' | 'card' | 'cod';
  status: 'placed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'return-requested' | 'returned';
  timeline: { status: string; at: string; note?: string }[]; createdAt: string;
}

interface RentalBooking {
  id: Id; listingId: Id; renterId: Id; sellerId: Id; startDate: string; endDate: string; tierDays: number;
  delivery: Delivery; rent: number; deposit: number; courier: number;
  status: 'requested' | 'confirmed' | 'in-transit' | 'active' | 'return-due' | 'picked-up' | 'closed' | 'overdue' | 'disputed';
  qc: QcCheck[]; dues: { kind: 'late-fee' | 'damage' ; amount: number; paid: boolean; accruedAt: string }[]; depositRefunded?: number;
}
interface QcCheck {
  stage: 'pre-delivery' | 'post-delivery' | 'pre-pickup' | 'post-pickup'; doneBy: 'seller' | 'renter' | 'courier';
  photos: string[]; checklist: { ironed: boolean; clean: boolean; noDamage: boolean; sizeMatches: boolean };
  ai: AiCheckResult; notes?: string; at?: string;     // at undefined = pending
}

interface Ticket {
  id: Id; userId: Id; sellerId: Id; orderId?: Id; rentalId?: Id;
  type: 'size' | 'fit' | 'quality' | 'not-as-described' | 'late-delivery' | 'damaged' | 'other';
  description: string; photos: string[]; status: 'open' | 'seller-responded' | 'escalated' | 'resolved' | 'rejected';
  returnRequest?: { status: 'requested' | 'approved' | 'rejected' | 'completed'; reason?: string };
  messages: { from: 'user' | 'seller' | 'admin'; text: string; at: string }[];
}
interface Review { id: Id; listingId: Id; sellerId: Id; userId: Id; rating: 1|2|3|4|5; title: string; body: string;
                   fit: 1|2|3|4|5; height?: string; weight?: string; bodyType?: string; sizePurchased?: string; createdAt: string }
interface Address { name: string; phone: string; line1: string; locality: string; city: string; pincode: string }
```

## Service contracts (`services/contracts/`)

Every method is `async`, returns typed data, throws `AppError{code,message}`.

| Service | Methods |
|---|---|
| `auth` | `signInWithGoogle()`, `signUp(email,pw)`, `signIn(email,pw)`, `verifyOtp(code)`, `resendOtp()`, `setup2fa()`, `confirm2fa(code)`, `verify2fa(code)`, `completeOnboarding(data)`, `signOut()`, `getSession()` |
| `catalog` | `search(params)`, `suggest(query)`, `getListing(id)`, `getListingByCode(code)`, `homeFeeds()`, `forYou(activity)`, `similarByImage(file)`, `relatedTo(id)`, `getBundles()`, `getReviews(listingId, opts)` |
| `offers` | `list()`, `validateCoupon(code, cart)` |
| `orders` | `quote(cart, delivery)`, `placeOrder(payload)`, `list()`, `get(id)`, `cancel(id)` |
| `rentals` | `getAvailability(listingId)`, `quote(listingId, start, tier, delivery)`, `book(payload)`, `list()`, `get(id)`, `submitQc(id, stage, data)`, `payDues(id)`, `closeBooking(id)` |
| `aiCheck` | `checkImages(files)` (deterministic; see demo triggers) |
| `selling` | `saveDraft()`, `createListing()`, `updateListing()`, `setStatus()`, `createBundle()` |
| `seller` | `dashboard()`, `listings()`, `orders()`, `updateOrderStatus()`, `rentalsCalendar()`, `returnsQueue()`, `decideReturn()`, `earnings()`, `getProfile(id)`, `updateStore()`, `applyForVerification()` |
| `support` | `listTickets()`, `getTicket(id)`, `createTicket()`, `postMessage()`, `escalate()`, `requestReturn()` |
| `admin` | `verificationQueue()`, `decideVerification()`, `flaggedListings()`, `decideListing()`, `complaints()`, `resolveComplaint()` |
| `activity` | (client store, not a service) `track(event)` |

`search(params)` accepts: `q`, `category`, `type[]`, `tags[]`, `brand[]`, `size[]`, `condition[]`, `occasion[]`, `priceMin/Max`, `locality`, `verifiedOnly`, `returnable`, `kind`, `sort`, `page`, `pageSize`. Keyword search matches title, brand, tags, clothing code, locality. Returns `{ items, total, facets }`.

## Business rules (all constants in `config/constants.ts`; placeholders to be confirmed)

| Rule | Default |
|---|---|
| Platform fee, sale (no returns) | 12% |
| Platform fee, sale (returns enabled) | 8% (the "discount on platform fees") |
| Platform fee, rental | 15% |
| Return window options | 3 / 7 days (default 3) |
| Courier charge | ₹70 flat per seller group, free over ₹999; meetup ₹0 |
| Rental tiers | 3 / 5 / 7 days |
| Late fee per day | seller-set; wizard suggests 1.5x daily rate |
| Damage deduction | 0-100% of deposit, chosen at post-pickup QC |
| Deposit refund | deposit minus unpaid dues/deductions, after post-pickup QC passes |
| `GUEST_PRODUCT_VIEW_LIMIT` | 3 |
| `AUTO_VERIFY_MIN_SALES` / `AUTO_VERIFY_MIN_RATING` | 10 / 4.0 |
| Verified-seller ranking boost | x1.3 in "Recommended" |
| OTP / 2FA demo code | `123456` |

## Seed data (deterministic, `services/mock/seed/`)

- **~14 sellers** (Bengaluru localities: Indiranagar, Koramangala, HSR Layout, Jayanagar, Malleshwaram, Whitefield, JP Nagar, Basavanagudi, Electronic City, Rajajinagar): mix of individuals, vendors, and 2 offline stores (with GST/licence), mixed verification states.
- **~70 listings:** ~45 sale, ~25 rent (suits, tuxedos, sherwanis, lehengas, sarees, gowns). Brands: Zara, H&M, Levi's, Allen Solly, Van Heusen, Fabindia, Biba, W, Manyavar, Nike, Adidas, Puma, Uniqlo, Raymond, plus unbranded. Mixed returns on/off, conditions, localities, occasions, prices ₹199-₹4,999 (rent ₹499-₹3,999 per tier).
- 6 bundles, 8 offers, ~120 reviews, 4-6 articles.
- **Personas** (`demo/personas.ts`): Guest · **Aarav** (buyer: 2 returns, 1 overdue rental with accruing late fee) · **Meera** (new user, no sales: dashboard locked) · **Kavya** (individual seller, 14 sales, auto-verified) · **Thread & Co. Indiranagar** (offline store, admin-verified, listings + rentals + a return request) · **Admin**.
- Images: `getImageUrl(seed, w, h)` in `shared/lib/image.ts` is the **only** place image URLs are produced (default: `picsum.photos/seed/...`; swap to `/public/img/...` local files if the owner supplies photos).

## Demo triggers (so the AI check and failures are demonstrable)

- AI image check: filename containing `blur`, `dark`, `watermark` or `stock` produces the matching `flagged` issue; otherwise pass (score 82-97, seeded). Demo Panel can force pass/flag.
- Demo Panel can: force next service call to fail (`AppError`), set latency (0 / normal / slow), reset DB to seed, switch persona, **advance clock +N days**.
