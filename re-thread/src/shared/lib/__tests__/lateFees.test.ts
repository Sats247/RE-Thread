import { describe, it, expect } from 'vitest';

function calculateLateFee(
  endDateIso: string,
  currentDate: Date,
  lateFeePerDay: number
): { overdueDays: number; lateFee: number } {
  const endDate = new Date(endDateIso);
  if (currentDate <= endDate) {
    return { overdueDays: 0, lateFee: 0 };
  }

  const diffMs = currentDate.getTime() - endDate.getTime();
  const overdueDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return {
    overdueDays,
    lateFee: overdueDays * lateFeePerDay,
  };
}

function calculateDepositRefund(
  initialDeposit: number,
  damageDeduction: number,
  unpaidLateFees: number
): number {
  const remaining = initialDeposit - damageDeduction - unpaidLateFees;
  return Math.max(0, remaining);
}

describe('Rental Late Fee & Deposit Rules', () => {
  const endDate = '2026-03-10T12:00:00.000Z';
  const dailyFee = 400;

  it('accrues ₹0 late fee if returned on or before end date', () => {
    const onTime = new Date('2026-03-10T10:00:00.000Z');
    const { overdueDays, lateFee } = calculateLateFee(endDate, onTime, dailyFee);
    expect(overdueDays).toBe(0);
    expect(lateFee).toBe(0);
  });

  it('accrues exact daysOverdue * lateFeePerDay when past end date', () => {
    // 3 days overdue
    const threeDaysLate = new Date('2026-03-13T14:00:00.000Z');
    const { overdueDays, lateFee } = calculateLateFee(endDate, threeDaysLate, dailyFee);
    expect(overdueDays).toBe(3);
    expect(lateFee).toBe(1200);
  });

  it('computes deposit refund subtracting damages and unpaid dues', () => {
    const deposit = 2500;
    const damage = 500;
    const unpaidDues = 800; // 2 days late
    expect(calculateDepositRefund(deposit, damage, unpaidDues)).toBe(1200);
  });

  it('never yields a negative deposit refund', () => {
    const deposit = 1500;
    const damage = 1000;
    const unpaidDues = 1200;
    expect(calculateDepositRefund(deposit, damage, unpaidDues)).toBe(0);
  });
});

