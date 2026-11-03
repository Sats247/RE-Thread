// ---------------------------------------------------------------------------
// Primitive types
// ---------------------------------------------------------------------------

export type Id = string;

export type Condition = 'like-new' | 'good' | 'fair';

export type Delivery = 'courier' | 'meetup';

export type Category = 'men' | 'women' | 'unisex';

export type Occasion =
  | 'daily'
  | 'brunch'
  | 'resort'
  | 'lounge'
  | 'weekend-getaway'
  | 'travel'
  | 'gym'
  | 'vacation'
  | 'yoga'
  | 'birthday'
  | 'club'
  | 'date'
  | 'summer'
  | 'winter'
  | 'autumn'
  | 'monsoon'
  | 'college'
  | 'party'
  | 'wedding'
  | 'festive'
  | 'formal';

export type ClothingType =
  | 'tshirt'
  | 'shirt'
  | 'top'
  | 'dress'
  | 'jeans'
  | 'trousers'
  | 'shorts'
  | 'skirt'
  | 'jacket'
  | 'sweater'
  | 'kurta'
  | 'saree'
  | 'lehenga'
  | 'sherwani'
  | 'suit'
  | 'tuxedo'
  | 'gown'
  | 'activewear'
  | 'shoes'
  | 'bag'
  | 'accessory';

// ---------------------------------------------------------------------------
// Core entity interfaces
// ---------------------------------------------------------------------------

export interface User {
  id: Id;
  name: string;
  email: string;
  phone?: string;
  locality?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  twoFactorEnabled: boolean;
  sellerProfileId?: Id;
  interests: { occasions: Occasion[]; categories: Category[] };
  createdAt: string;
}

export interface SellerProfile {
  id: Id;
  userId: Id;
  displayName: string;
  type: 'individual' | 'vendor' | 'store';
  avatarUrl?: string;
  bio?: string;
  locality: string;
  city: 'Bengaluru';
  ratingAvg: number;
  ratingCount: number;
  salesCount: number;
  memberSince: string;
  verification: {
    status: 'none' | 'pending' | 'auto' | 'admin' | 'rejected';
    reason?: string;
    note?: string;
  };
  /** Derived from verification status */
  boosted: boolean;
  store?: {
    address: string;
    gstin: string;
    licenseNo: string;
    reachKm: number;
    reachLocalities: string[];
    hours: string;
    docs: { name: string; url: string }[];
  };
}

export interface AiCheckResult {
  status: 'pass' | 'flagged';
  /** Score 0–100 */
  score: number;
  issues: {
    code: 'blurry' | 'dark' | 'watermark' | 'stock-photo' | 'no-garment' | 'duplicate';
    imageIndex: number;
    message: string;
  }[];
  checkedAt: string;
}

export interface RentalTerms {
  /** e.g. [{ days: 3, price: 999 }, { days: 5, price: 1499 }, { days: 7, price: 1999 }] */
  tiers: { days: number; price: number }[];
  securityDeposit: number;
  lateFeePerDay: number;
  ironedConfirmed: true;
  cleanedConfirmed: true;
  deliveryModes: Delivery[];
  sizeChart?: { label: string; chest: number; waist: number; length: number }[];
}

export interface Listing {
  id: Id;
  /** Human-readable clothing ID, e.g. 'RT-10234' */
  code: string;
  kind: 'sale' | 'rent';
  sellerId: Id;
  title: string;
  description: string;
  category: Category;
  type: ClothingType;
  brand: string;
  tags: string[];
  occasions: Occasion[];
  size: string;
  measurements?: {
    chest?: number;
    waist?: number;
    length?: number;
    shoulder?: number;
    unit: 'in';
  };
  condition: Condition;
  fabric?: string;
  color: string;
  images: string[];
  /** For rent: price = lowest tier price */
  price: number;
  mrp?: number;
  returnPolicy: { enabled: boolean; windowDays: number };
  locality: string;
  createdAt: string;
  popularity: number;
  status:
    | 'pending-ai'
    | 'live'
    | 'flagged'
    | 'sold'
    | 'rented'
    | 'paused'
    | 'draft';
  aiCheck?: AiCheckResult;
  rental?: RentalTerms;
  bundleId?: Id;
}

export interface Bundle {
  id: Id;
  sellerId: Id;
  title: string;
  listingIds: Id[];
  bundlePrice: number;
  savingsPct: number;
}

export interface Offer {
  id: Id;
  sellerId?: Id;
  title: string;
  kind: 'percent' | 'flat' | 'combo';
  value: number;
  code?: string;
  minOrder?: number;
  validTill: string;
}

export interface PriceBreakdown {
  items: number;
  platformFeeNote?: string;
  courier: number;
  discount: number;
  deposit?: number;
  total: number;
}

export interface Address {
  name: string;
  phone: string;
  line1: string;
  locality: string;
  city: string;
  pincode: string;
}

export interface Order {
  id: Id;
  buyerId: Id;
  groups: {
    sellerId: Id;
    listingIds: Id[];
    delivery: Delivery;
    meetup?: { place: string; slot: string };
  }[];
  address?: Address;
  pricing: PriceBreakdown;
  payment: 'upi' | 'card' | 'cod';
  status:
    | 'placed'
    | 'packed'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'return-requested'
    | 'returned';
  timeline: { status: string; at: string; note?: string }[];
  createdAt: string;
}

export interface QcCheck {
  stage: 'pre-delivery' | 'post-delivery' | 'pre-pickup' | 'post-pickup';
  doneBy: 'seller' | 'renter' | 'courier';
  photos: string[];
  checklist: {
    ironed: boolean;
    clean: boolean;
    noDamage: boolean;
    sizeMatches: boolean;
  };
  ai: AiCheckResult;
  notes?: string;
  /** Undefined = pending */
  at?: string;
}

export interface RentalBooking {
  id: Id;
  listingId: Id;
  renterId: Id;
  sellerId: Id;
  startDate: string;
  endDate: string;
  tierDays: number;
  delivery: Delivery;
  rent: number;
  deposit: number;
  courier: number;
  status:
    | 'requested'
    | 'confirmed'
    | 'in-transit'
    | 'active'
    | 'return-due'
    | 'picked-up'
    | 'closed'
    | 'overdue'
    | 'disputed';
  qc: QcCheck[];
  dues: {
    kind: 'late-fee' | 'damage';
    amount: number;
    paid: boolean;
    accruedAt: string;
  }[];
  depositRefunded?: number;
}

export interface Ticket {
  id: Id;
  userId: Id;
  sellerId: Id;
  orderId?: Id;
  rentalId?: Id;
  type:
    | 'size'
    | 'fit'
    | 'quality'
    | 'not-as-described'
    | 'late-delivery'
    | 'damaged'
    | 'other';
  description: string;
  photos: string[];
  status: 'open' | 'seller-responded' | 'escalated' | 'resolved' | 'rejected';
  returnRequest?: {
    status: 'requested' | 'approved' | 'rejected' | 'completed';
    reason?: string;
  };
  messages: { from: 'user' | 'seller' | 'admin'; text: string; at: string }[];
}

export interface Review {
  id: Id;
  listingId: Id;
  sellerId: Id;
  userId: Id;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  fit: 1 | 2 | 3 | 4 | 5;
  height?: string;
  weight?: string;
  bodyType?: string;
  sizePurchased?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
