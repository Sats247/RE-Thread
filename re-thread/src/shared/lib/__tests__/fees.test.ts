import { describe, it, expect } from 'vitest';
import {
  PLATFORM_FEE_SALE_NO_RETURN,
  PLATFORM_FEE_SALE_WITH_RETURN,
  PLATFORM_FEE_RENTAL,
} from '@/config/constants';

function computeSellerPayout(
  amount: number,
  kind: 'sale' | 'rental',
  returnsEnabled = false
): { platformFee: number; payout: number; feeRate: number } {
  const feeRate =
    kind === 'rental'
      ? PLATFORM_FEE_RENTAL
      : returnsEnabled
      ? PLATFORM_FEE_SALE_WITH_RETURN
      : PLATFORM_FEE_SALE_NO_RETURN;

  const platformFee = Math.round(amount * feeRate);
  const payout = amount - platformFee;
  return { platformFee, payout, feeRate };
}

describe('Platform Fee & Payout Business Rules', () => {
  it('applies 12% standard platform fee when seller disables returns', () => {
    const { platformFee, payout, feeRate } = computeSellerPayout(2000, 'sale', false);
    expect(feeRate).toBe(0.12);
    expect(platformFee).toBe(240);
    expect(payout).toBe(1760);
  });

  it('applies discounted 8% platform fee when seller enables returns', () => {
    const { platformFee, payout, feeRate } = computeSellerPayout(2000, 'sale', true);
    expect(feeRate).toBe(0.08);
    expect(platformFee).toBe(160);
    expect(payout).toBe(1840);
  });

  it('applies 15% platform fee on rental bookings', () => {
    const { platformFee, payout, feeRate } = computeSellerPayout(3000, 'rental');
    expect(feeRate).toBe(0.15);
    expect(platformFee).toBe(450);
    expect(payout).toBe(2550);
  });
});

