import { db } from '../db';
import type { Listing } from '@/shared/types';
import { ALL_SALE_LISTINGS } from './listingsSale.seed';
import { ALL_RENT_LISTINGS } from './listingsRent.seed';

export const INITIAL_LISTINGS: Listing[] = [
  ...ALL_SALE_LISTINGS,
  ...ALL_RENT_LISTINGS,
];

export function seedListings(): void {
  const existing = db.get<Listing[]>('listings');
  if (existing && existing.length > 0) return;
  db.set<Listing[]>('listings', INITIAL_LISTINGS);
}
