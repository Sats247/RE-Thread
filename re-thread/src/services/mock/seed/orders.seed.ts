import { db } from '../db';
import type { Order } from '@/shared/types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    buyerId: 'user-aarav',
    groups: [
      {
        sellerId: 'seller-kavya',
        listingIds: ['listing-s-1'],
        delivery: 'courier',
      },
    ],
    address: {
      name: 'Aarav Patel',
      phone: '+91 98450 12345',
      line1: 'Flat 402, Green Glen Layout, Bellandur',
      locality: 'Koramangala',
      city: 'Bengaluru',
      pincode: '560103',
    },
    pricing: {
      items: 1899,
      courier: 70,
      discount: 0,
      total: 1969,
      platformFeeNote: 'Includes 8% seller platform fee (returns enabled)',
    },
    payment: 'upi',
    status: 'delivered',
    timeline: [
      { status: 'placed', at: '2026-02-10T11:00:00.000Z', note: 'Order placed via UPI' },
      { status: 'packed', at: '2026-02-10T14:30:00.000Z', note: 'Packed with security seal' },
      { status: 'shipped', at: '2026-02-11T09:00:00.000Z', note: 'Dispatched via Dunzo Courier' },
      { status: 'delivered', at: '2026-02-11T16:00:00.000Z', note: 'Handed to Aarav' },
    ],
    createdAt: '2026-02-10T11:00:00.000Z',
  },
  {
    id: 'ord-1002',
    buyerId: 'user-aarav',
    groups: [
      {
        sellerId: 'seller-thread-co',
        listingIds: ['listing-s-6'],
        delivery: 'meetup',
        meetup: { place: 'Thread & Co. Store, 100ft Road', slot: 'Evening 5-6 PM' },
      },
    ],
    pricing: {
      items: 799,
      courier: 0,
      discount: 0,
      total: 799,
    },
    payment: 'card',
    status: 'returned',
    timeline: [
      { status: 'placed', at: '2026-01-15T12:00:00.000Z' },
      { status: 'delivered', at: '2026-01-16T17:00:00.000Z', note: 'In-store pickup' },
      { status: 'return-requested', at: '2026-01-17T10:00:00.000Z', note: 'Fit issue (too loose)' },
      { status: 'returned', at: '2026-01-18T14:00:00.000Z', note: 'Refund issued to original card' },
    ],
    createdAt: '2026-01-15T12:00:00.000Z',
  },
  {
    id: 'ord-1003',
    buyerId: 'user-aarav',
    groups: [
      {
        sellerId: 'seller-heritage-silk',
        listingIds: ['listing-s-5'],
        delivery: 'courier',
      },
    ],
    pricing: {
      items: 1299,
      courier: 70,
      discount: 100,
      total: 1269,
    },
    payment: 'upi',
    status: 'returned',
    timeline: [
      { status: 'placed', at: '2025-12-05T10:00:00.000Z' },
      { status: 'delivered', at: '2025-12-06T15:00:00.000Z' },
      { status: 'return-requested', at: '2025-12-07T11:00:00.000Z', note: 'Color slightly different from display' },
      { status: 'returned', at: '2025-12-08T16:00:00.000Z', note: 'Return accepted by seller' },
    ],
    createdAt: '2025-12-05T10:00:00.000Z',
  },
];

export function seedOrders(): void {
  const existing = db.get<Order[]>('orders');
  if (existing && existing.length > 0) return;
  db.set<Order[]>('orders', INITIAL_ORDERS);
}
