import { AppError } from '@/shared/types';
import type { RentalsContract, BookRentalPayload, QcSubmitData, RentalQuoteResult } from '../contracts/rentals.contract';
import type { RentalBooking, Listing, QcCheck } from '@/shared/types';
import { simulateLatency } from './latency';
import { db } from './db';
import { generateId } from '@/shared/lib/id';
import { COURIER_CHARGE_FLAT, COURIER_CHARGE_MEETUP } from '@/config/constants';
import { getNow } from '@/shared/lib/format';

function updateOverdueDues(rental: RentalBooking, listings: Listing[]): RentalBooking {
  if (rental.status === 'closed') return rental;
  const now = getNow();
  const endDate = new Date(rental.endDate);
  if (now <= endDate) return rental;

  const overdueDays = Math.floor((now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
  if (overdueDays <= 0) return rental;

  const listing = listings.find((l) => l.id === rental.listingId);
  const lateFeePerDay = listing?.rental?.lateFeePerDay ?? 400;
  const totalLateFee = overdueDays * lateFeePerDay;

  const existingLateFee = rental.dues.find((d) => d.kind === 'late-fee' && !d.paid);
  let updatedDues = [...rental.dues];

  if (existingLateFee) {
    updatedDues = updatedDues.map((d) =>
      d.kind === 'late-fee' && !d.paid ? { ...d, amount: Math.max(d.amount, totalLateFee) } : d
    );
  } else if (!rental.dues.some((d) => d.kind === 'late-fee' && d.paid)) {
    updatedDues.push({
      kind: 'late-fee',
      amount: totalLateFee,
      paid: false,
      accruedAt: now.toISOString(),
    });
  }

  return {
    ...rental,
    status: 'overdue',
    dues: updatedDues,
  };
}

export const rentalsMock: RentalsContract = {
  async getAvailability(listingId: string): Promise<string[]> {
    await simulateLatency();
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    const booked = rentals.filter((r) => r.listingId === listingId && r.status !== 'closed');
    const blocked: string[] = [];
    booked.forEach((r) => {
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        blocked.push(d.toISOString().slice(0, 10));
      }
    });
    return blocked;
  },

  async quote(listingId: string, _start: string, tierDays: number, delivery: 'courier' | 'meetup'): Promise<RentalQuoteResult> {
    await simulateLatency();
    const listings = db.get<Listing[]>('listings') ?? [];
    const listing = listings.find((l) => l.id === listingId);
    if (!listing || !listing.rental) throw new AppError('not-found', 'Listing not found or not a rental.');
    const tier = listing.rental.tiers.find((t) => t.days === tierDays);
    if (!tier) throw new AppError('invalid-tier', 'Invalid rental tier.');
    const courier = delivery === 'courier' ? COURIER_CHARGE_FLAT : COURIER_CHARGE_MEETUP;
    return {
      pricing: {
        items: tier.price,
        courier,
        discount: 0,
        deposit: listing.rental.securityDeposit,
        total: tier.price + courier + listing.rental.securityDeposit,
      },
      availableDates: [],
    };
  },

  async book(payload: BookRentalPayload): Promise<RentalBooking> {
    await simulateLatency();
    const session = db.get<string>('session');
    if (!session) throw new AppError('not-authenticated', 'Must be signed in.');
    const listings = db.get<Listing[]>('listings') ?? [];
    const listing = listings.find((l) => l.id === payload.listingId);
    if (!listing || !listing.rental) throw new AppError('not-found', 'Listing not found or not a rental.');
    const tier = listing.rental.tiers.find((t) => t.days === payload.tierDays);
    if (!tier) throw new AppError('invalid-tier', 'Invalid rental tier.');
    const startDate = new Date(payload.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + payload.tierDays - 1);
    const courier = payload.delivery === 'courier' ? COURIER_CHARGE_FLAT : COURIER_CHARGE_MEETUP;
    const booking: RentalBooking = {
      id: generateId(),
      listingId: payload.listingId,
      renterId: session,
      sellerId: listing.sellerId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tierDays: payload.tierDays,
      delivery: payload.delivery,
      rent: tier.price,
      deposit: listing.rental.securityDeposit,
      courier,
      status: 'requested',
      qc: [],
      dues: [],
    };
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    db.set('rentals', [...rentals, booking]);
    return booking;
  },

  async list(): Promise<RentalBooking[]> {
    await simulateLatency();
    const session = db.get<string>('session');
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    const listings = db.get<Listing[]>('listings') ?? [];
    const filtered = session ? rentals.filter((r) => r.renterId === session) : rentals;
    return filtered.map((r) => updateOverdueDues(r, listings));
  },

  async get(id: string): Promise<RentalBooking> {
    await simulateLatency();
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    const listings = db.get<Listing[]>('listings') ?? [];
    const rental = rentals.find((r) => r.id === id);
    if (!rental) throw new AppError('not-found', `Rental ${id} not found.`);
    return updateOverdueDues(rental, listings);
  },

  async submitQc(id: string, stage: QcCheck['stage'], data: QcSubmitData): Promise<RentalBooking> {
    await simulateLatency();
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    const idx = rentals.findIndex((r) => r.id === id);
    if (idx === -1) throw new AppError('not-found', `Rental ${id} not found.`);
    const rental = rentals[idx]!;
    const qcCheck: QcCheck = {
      stage,
      doneBy: 'seller',
      photos: data.photos,
      checklist: data.checklist,
      ai: { status: 'pass', score: 90, issues: [], checkedAt: new Date().toISOString() },
      notes: data.notes,
      at: new Date().toISOString(),
    };
    const updated = { ...rental, qc: [...rental.qc, qcCheck] };
    rentals[idx] = updated;
    db.set('rentals', rentals);
    return updated;
  },

  async payDues(id: string): Promise<RentalBooking> {
    await simulateLatency();
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    const idx = rentals.findIndex((r) => r.id === id);
    if (idx === -1) throw new AppError('not-found', `Rental ${id} not found.`);
    const rental = rentals[idx]!;
    const updated = {
      ...rental,
      dues: rental.dues.map((d) => ({ ...d, paid: true })),
    };
    rentals[idx] = updated;
    db.set('rentals', rentals);
    return updated;
  },

  async closeBooking(id: string): Promise<RentalBooking> {
    await simulateLatency();
    const rentals = db.get<RentalBooking[]>('rentals') ?? [];
    const idx = rentals.findIndex((r) => r.id === id);
    if (idx === -1) throw new AppError('not-found', `Rental ${id} not found.`);
    const rental = rentals[idx]!;
    const updated = { ...rental, status: 'closed' as const };
    rentals[idx] = updated;
    db.set('rentals', rentals);
    return updated;
  },
};
