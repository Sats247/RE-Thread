import { db } from '../db';
import type { RentalBooking } from '@/shared/types';

export const INITIAL_RENTALS: RentalBooking[] = [
  {
    id: 'rent-booking-1',
    listingId: 'listing-r-1',
    renterId: 'user-aarav',
    sellerId: 'seller-tuxedo-house',
    startDate: '2026-02-15T10:00:00.000Z',
    endDate: '2026-02-18T10:00:00.000Z', // Past end date -> triggers overdue & late fee via getNow()
    tierDays: 3,
    delivery: 'courier',
    rent: 1299,
    deposit: 2500,
    courier: 70,
    status: 'overdue',
    qc: [
      {
        stage: 'pre-delivery',
        doneBy: 'seller',
        photos: ['/img/qc-pre-1.jpg'],
        checklist: { ironed: true, clean: true, noDamage: true, sizeMatches: true },
        ai: { status: 'pass', score: 94, issues: [], checkedAt: '2026-02-14T14:00:00.000Z' },
        at: '2026-02-14T14:00:00.000Z',
      },
      {
        stage: 'post-delivery',
        doneBy: 'renter',
        photos: ['/img/qc-post-del.jpg'],
        checklist: { ironed: true, clean: true, noDamage: true, sizeMatches: true },
        ai: { status: 'pass', score: 92, issues: [], checkedAt: '2026-02-15T12:00:00.000Z' },
        at: '2026-02-15T12:00:00.000Z',
      },
      {
        stage: 'pre-pickup',
        doneBy: 'renter',
        photos: [],
        checklist: { ironed: false, clean: false, noDamage: false, sizeMatches: false },
        ai: { status: 'pass', score: 0, issues: [], checkedAt: '' },
      },
      {
        stage: 'post-pickup',
        doneBy: 'seller',
        photos: [],
        checklist: { ironed: false, clean: false, noDamage: false, sizeMatches: false },
        ai: { status: 'pass', score: 0, issues: [], checkedAt: '' },
      },
    ],
    dues: [
      {
        kind: 'late-fee',
        amount: 800, // 2 days x ₹400
        paid: false,
        accruedAt: '2026-02-19T10:00:00.000Z',
      },
    ],
  },
  {
    id: 'rent-booking-2',
    listingId: 'listing-r-3',
    renterId: 'user-rohan',
    sellerId: 'seller-thread-co',
    startDate: '2026-02-28T10:00:00.000Z',
    endDate: '2026-03-05T10:00:00.000Z',
    tierDays: 5,
    delivery: 'meetup',
    rent: 2499,
    deposit: 4000,
    courier: 0,
    status: 'confirmed',
    qc: [
      {
        stage: 'pre-delivery',
        doneBy: 'seller',
        photos: [],
        checklist: { ironed: true, clean: true, noDamage: true, sizeMatches: true },
        ai: { status: 'pass', score: 91, issues: [], checkedAt: '' },
      },
    ],
    dues: [],
  },
];

export function seedRentals(): void {
  const existing = db.get<RentalBooking[]>('rentals');
  if (existing && existing.length > 0) return;
  db.set<RentalBooking[]>('rentals', INITIAL_RENTALS);
}
