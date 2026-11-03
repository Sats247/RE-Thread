import { AppError } from '@/shared/types';
import type { OffersContract } from '../contracts/offers.contract';
import type { Offer } from '@/shared/types';
import { simulateLatency } from './latency';
import { db } from './db';
import { log } from '@/shared/lib/logger';

const NS = 'offers';

export const offersMock: OffersContract = {
  async list(): Promise<Offer[]> {
    await simulateLatency();
    log.info(NS, 'list');
    return db.get<Offer[]>('offers') ?? [];
  },

  async validateCoupon(code: string, _cart: Parameters<OffersContract['validateCoupon']>[1]) {
    await simulateLatency();
    log.info(NS, 'validateCoupon', { code });
    const offers = db.get<Offer[]>('offers') ?? [];
    const offer = offers.find((o) => o.code === code);
    if (!offer) {
      throw new AppError('invalid-coupon', 'Coupon code not found.');
    }
    if (new Date(offer.validTill) < new Date()) {
      throw new AppError('expired-coupon', 'This coupon has expired.');
    }
    return { valid: true, discount: offer.value };
  },
};
