import { db } from '../db';
import type { Bundle, Offer } from '@/shared/types';

export const INITIAL_OFFERS: Offer[] = [
  { id: 'off-1', title: 'Welcome to RE-thread', code: 'WELCOME10', kind: 'percent', value: 10, minOrder: 999, validTill: '2026-12-31' },
  { id: 'off-2', title: 'Bengaluru Express Courier Free', code: 'BLRFREE', kind: 'flat', value: 70, minOrder: 499, validTill: '2026-12-31' },
  { id: 'off-3', title: 'Festive Season Drop', code: 'FESTIVE15', kind: 'percent', value: 15, minOrder: 1999, validTill: '2026-12-31' },
  { id: 'off-4', sellerId: 'seller-kavya', title: 'Kavya Wardrobe Special', code: 'KAVYA200', kind: 'flat', value: 200, minOrder: 1500, validTill: '2026-12-31' },
  { id: 'off-5', title: 'Indiranagar Boutique Drop', sellerId: 'seller-thread-co', code: 'INDIRA50', kind: 'flat', value: 50, minOrder: 799, validTill: '2026-12-31' },
  { id: 'off-6', title: 'Rental Deposit Waiver (5%)', code: 'RENT5', kind: 'percent', value: 5, validTill: '2026-12-31' },
  { id: 'off-7', title: 'Weekend Thrift Mania', code: 'THRIFT100', kind: 'flat', value: 100, minOrder: 1200, validTill: '2026-12-31' },
  { id: 'off-8', title: 'Super Saver Thrift', code: 'SAVE20', kind: 'percent', value: 20, minOrder: 2999, validTill: '2026-12-31' },
];

export const INITIAL_BUNDLES: Bundle[] = [
  { id: 'bun-1', sellerId: 'seller-kavya', title: 'Kavya Brunch Edit: Linen Blazer + Pleated Skirt', listingIds: ['listing-s-1', 'listing-s-2'], bundlePrice: 2499, savingsPct: 15 },
  { id: 'bun-2', sellerId: 'seller-rohan', title: 'Weekend Casual: Selvedge Denim + Cotton Shirt', listingIds: ['listing-s-3', 'listing-s-6'], bundlePrice: 1999, savingsPct: 13 },
  { id: 'bun-3', sellerId: 'seller-heritage-silk', title: 'Traditional Festive Duo', listingIds: ['listing-s-5', 'listing-s-8'], bundlePrice: 2999, savingsPct: 14 },
  { id: 'bun-4', sellerId: 'seller-vintage-vault', title: 'Daily Minimalist Essentials Bundle', listingIds: ['listing-s-4', 'listing-s-7'], bundlePrice: 1499, savingsPct: 12 },
  { id: 'bun-5', sellerId: 'seller-thread-co', title: 'Executive Suit & Oxford Shirt Combo', listingIds: ['listing-s-6', 'listing-r-1'], bundlePrice: 1799, savingsPct: 14 },
  { id: 'bun-6', sellerId: 'seller-urban-thrift', title: 'Active Lifestyle Athletic Set', listingIds: ['listing-s-7', 'listing-s-4'], bundlePrice: 1499, savingsPct: 12 },
];

export function seedOffers(): void {
  const existingOffers = db.get<Offer[]>('offers');
  if (!existingOffers || existingOffers.length === 0) {
    db.set<Offer[]>('offers', INITIAL_OFFERS);
  }
  const existingBundles = db.get<Bundle[]>('bundles');
  if (!existingBundles || existingBundles.length === 0) {
    db.set<Bundle[]>('bundles', INITIAL_BUNDLES);
  }
}
