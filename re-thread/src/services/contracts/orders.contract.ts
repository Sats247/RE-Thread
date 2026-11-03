import type { Order, PriceBreakdown, Address, Delivery } from '@/shared/types';

export interface CartItemRef {
  listingId: string;
  sellerId: string;
}

export interface DeliveryChoice {
  sellerId: string;
  mode: Delivery;
  meetup?: { place: string; slot: string };
}

export interface PlaceOrderPayload {
  cart: CartItemRef[];
  delivery: DeliveryChoice[];
  address?: Address;
  payment: 'upi' | 'card' | 'cod';
  couponCode?: string;
}

export interface OrdersContract {
  quote(cart: CartItemRef[], delivery: DeliveryChoice[]): Promise<PriceBreakdown>;
  placeOrder(payload: PlaceOrderPayload): Promise<Order>;
  list(): Promise<Order[]>;
  get(id: string): Promise<Order>;
  cancel(id: string): Promise<Order>;
}
