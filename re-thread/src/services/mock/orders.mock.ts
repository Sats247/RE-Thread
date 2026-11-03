import { AppError } from '@/shared/types';
import type { OrdersContract, CartItemRef, DeliveryChoice, PlaceOrderPayload } from '../contracts/orders.contract';
import type { Order, PriceBreakdown, Listing } from '@/shared/types';
import { simulateLatency } from './latency';
import { db } from './db';
import { log } from '@/shared/lib/logger';
import { generateId, generateCode } from '@/shared/lib/id';
import { COURIER_CHARGE_FLAT, COURIER_FREE_THRESHOLD, COURIER_CHARGE_MEETUP } from '@/config/constants';

const NS = 'orders';

function calcCourier(items: number, mode: 'courier' | 'meetup'): number {
  if (mode === 'meetup') return COURIER_CHARGE_MEETUP;
  return items >= COURIER_FREE_THRESHOLD ? 0 : COURIER_CHARGE_FLAT;
}

export const ordersMock: OrdersContract = {
  async quote(cart: CartItemRef[], delivery: DeliveryChoice[]): Promise<PriceBreakdown> {
    await simulateLatency();
    log.info(NS, 'quote', { cart, delivery });
    const listings = db.get<Listing[]>('listings') ?? [];
    let items = 0;
    cart.forEach((c) => {
      const listing = listings.find((l) => l.id === c.listingId);
      if (listing) items += listing.price;
    });
    const courierTotal = delivery.reduce((sum, d) => {
      return sum + calcCourier(items, d.mode);
    }, 0);
    return {
      items,
      courier: courierTotal,
      discount: 0,
      total: items + courierTotal,
    };
  },

  async placeOrder(payload: PlaceOrderPayload): Promise<Order> {
    await simulateLatency();
    log.info(NS, 'placeOrder', payload);
    const session = db.get<string>('session');
    if (!session) throw new AppError('not-authenticated', 'Must be signed in to place an order.');
    const listings = db.get<Listing[]>('listings') ?? [];
    let items = 0;
    payload.cart.forEach((c) => {
      const listing = listings.find((l) => l.id === c.listingId);
      if (listing) items += listing.price;
    });
    const courierTotal = payload.delivery.reduce((sum, d) => {
      return sum + calcCourier(items, d.mode);
    }, 0);
    const now = new Date().toISOString();
    const order: Order = {
      id: generateId(),
      buyerId: session,
      groups: payload.delivery.map((d) => ({
        sellerId: d.sellerId,
        listingIds: payload.cart.filter((c) => c.sellerId === d.sellerId).map((c) => c.listingId),
        delivery: d.mode,
        meetup: d.meetup,
      })),
      address: payload.address,
      pricing: {
        items,
        courier: courierTotal,
        discount: 0,
        total: items + courierTotal,
      },
      payment: payload.payment,
      status: 'placed',
      timeline: [{ status: 'placed', at: now }],
      createdAt: now,
    };
    const orders = db.get<Order[]>('orders') ?? [];
    db.set('orders', [...orders, { ...order, code: generateCode() }]);
    // Mark listings as sold
    const updatedListings = listings.map((l) =>
      payload.cart.find((c) => c.listingId === l.id) ? { ...l, status: 'sold' as const } : l,
    );
    db.set('listings', updatedListings);
    return order;
  },

  async list(): Promise<Order[]> {
    await simulateLatency();
    const session = db.get<string>('session');
    if (!session) throw new AppError('not-authenticated', 'Must be signed in.');
    const orders = db.get<Order[]>('orders') ?? [];
    return orders.filter((o) => o.buyerId === session);
  },

  async get(id: string): Promise<Order> {
    await simulateLatency();
    log.info(NS, 'get', { id });
    const orders = db.get<Order[]>('orders') ?? [];
    const order = orders.find((o) => o.id === id);
    if (!order) throw new AppError('not-found', `Order ${id} not found.`);
    return order;
  },

  async cancel(id: string): Promise<Order> {
    await simulateLatency();
    log.info(NS, 'cancel', { id });
    const orders = db.get<Order[]>('orders') ?? [];
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new AppError('not-found', `Order ${id} not found.`);
    const order = orders[idx];
    if (!order) throw new AppError('not-found', `Order ${id} not found.`);
    const updated = { ...order, status: 'cancelled' as const };
    orders[idx] = updated;
    db.set('orders', orders);
    return updated;
  },
};
