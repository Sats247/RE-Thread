import type { Offer } from '@/shared/types';

export interface CartItem {
  listingId: string;
  sellerId: string;
  price: number;
}

export interface CouponValidationResult {
  valid: boolean;
  discount: number;
  message?: string;
}

export interface OffersContract {
  list(): Promise<Offer[]>;
  validateCoupon(code: string, cart: CartItem[]): Promise<CouponValidationResult>;
}
