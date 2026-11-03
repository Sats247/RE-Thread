import { describe, it, expect } from 'vitest';
import { formatINR } from '../format';
import { COURIER_CHARGE, COURIER_FREE_THRESHOLD } from '@/config/constants';

function calculateCourierCharge(subtotal: number, mode: 'courier' | 'meetup'): number {
  if (mode === 'meetup') return 0;
  return subtotal >= COURIER_FREE_THRESHOLD ? 0 : COURIER_CHARGE;
}

describe('Pricing & Currency Formatter (INR)', () => {
  it('correctly formats Indian Rupee amounts using en-IN grouping', () => {
    expect(formatINR(0)).toMatch(/₹\s?0/);
    expect(formatINR(999)).toMatch(/₹\s?999/);
    expect(formatINR(1499)).toMatch(/₹\s?1,499/);
    expect(formatINR(100000)).toMatch(/₹\s?1,00,000/);
  });

  it('calculates flat ₹70 courier below ₹999 threshold', () => {
    expect(calculateCourierCharge(499, 'courier')).toBe(70);
    expect(calculateCourierCharge(998, 'courier')).toBe(70);
  });

  it('calculates free courier at or above ₹999 threshold', () => {
    expect(calculateCourierCharge(999, 'courier')).toBe(0);
    expect(calculateCourierCharge(1899, 'courier')).toBe(0);
  });

  it('calculates ₹0 for direct in-person meetup delivery', () => {
    expect(calculateCourierCharge(299, 'meetup')).toBe(0);
    expect(calculateCourierCharge(1500, 'meetup')).toBe(0);
  });
});

