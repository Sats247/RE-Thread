import { AppError } from '@/shared/types';
import type { SellerContract, SellerDashboard, EarningsSummary, ReturnDecision } from '../contracts/seller.contract';
import type { SellerProfile, Listing, Order, RentalBooking } from '@/shared/types';

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
  async getProfile(_id: string): Promise<SellerProfile> {
    throw new AppError('not-implemented', 'getProfile not implemented');
  },
  async updateStore(_data: Partial<SellerProfile['store']>): Promise<SellerProfile> {
    throw new AppError('not-implemented', 'updateStore not implemented');
  },
  async applyForVerification(): Promise<void> {
    throw new AppError('not-implemented', 'applyForVerification not implemented');
  },
};
