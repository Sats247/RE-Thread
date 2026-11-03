import { AppError } from '@/shared/types';
import type { SellerContract, SellerDashboard, EarningsSummary, ReturnDecision } from '../contracts/seller.contract';
import type { SellerProfile, Listing, Order, RentalBooking } from '@/shared/types';
import { simulateLatency } from './latency';
import { db } from './db';

export const sellerMock: SellerContract = {
  async dashboard(): Promise<SellerDashboard> {
    throw new AppError('not-implemented', 'dashboard not implemented');
  },
  async listings(): Promise<Listing[]> {
    throw new AppError('not-implemented', 'listings not implemented');
  },
  async orders(): Promise<Order[]> {
    throw new AppError('not-implemented', 'orders not implemented');
  },
  async updateOrderStatus(_orderId: string, _status: Order['status']): Promise<Order> {
    throw new AppError('not-implemented', 'updateOrderStatus not implemented');
  },
  async rentalsCalendar(): Promise<RentalBooking[]> {
    throw new AppError('not-implemented', 'rentalsCalendar not implemented');
  },
  async returnsQueue(): Promise<{ orderId: string; listingId: string; reason: string; requestedAt: string }[]> {
    throw new AppError('not-implemented', 'returnsQueue not implemented');
  },
  async decideReturn(_orderId: string, _decision: ReturnDecision): Promise<void> {
    throw new AppError('not-implemented', 'decideReturn not implemented');
  },
  async earnings(): Promise<EarningsSummary> {
    throw new AppError('not-implemented', 'earnings not implemented');
  },
  async getProfile(id: string): Promise<SellerProfile> {
    await simulateLatency();
    const sellers = db.get<SellerProfile[]>('sellers') ?? [];
    const seller = sellers.find((s) => s.id === id || s.userId === id);
    if (!seller) throw new AppError('not-found', `Seller ${id} not found.`);
    return seller;
  },
  async updateStore(_data: Partial<SellerProfile['store']>): Promise<SellerProfile> {
    throw new AppError('not-implemented', 'updateStore not implemented');
  },
  async applyForVerification(): Promise<void> {
    throw new AppError('not-implemented', 'applyForVerification not implemented');
  },
  async topSellers(): Promise<SellerProfile[]> {
    await simulateLatency();
    const sellers = db.get<SellerProfile[]>('sellers') ?? [];
    return [...sellers]
      .sort((a, b) => b.ratingAvg * b.salesCount - a.ratingAvg * a.salesCount)
      .slice(0, 6);
  },
};

