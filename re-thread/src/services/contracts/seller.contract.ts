import type { SellerProfile, Listing, Order, RentalBooking } from '@/shared/types';

export interface SellerDashboard {
  totalSales: number;
  activeListings: number;
  activeRentals: number;
  totalEarnings: number;
  ratingAvg: number;
  recentOrders: Order[];
  attentionItems: {
    type: 'rental-qc-due' | 'return-request' | 'ai-flagged';
    refId: string;
    message: string;
  }[];
}

export interface EarningsSummary {
  totalPayout: number;
  pendingPayout: number;
  feeBreakdown: { label: string; amount: number }[];
  statement: { date: string; description: string; amount: number }[];
}

export interface ReturnDecision {
  approved: boolean;
  reason?: string;
}

export interface SellerContract {
  dashboard(): Promise<SellerDashboard>;
  listings(): Promise<Listing[]>;
  orders(): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: Order['status']): Promise<Order>;
  rentalsCalendar(): Promise<RentalBooking[]>;
  returnsQueue(): Promise<{ orderId: string; listingId: string; reason: string; requestedAt: string }[]>;
  decideReturn(orderId: string, decision: ReturnDecision): Promise<void>;
  earnings(): Promise<EarningsSummary>;
  getProfile(id: string): Promise<SellerProfile>;
  updateStore(data: Partial<SellerProfile['store']>): Promise<SellerProfile>;
  applyForVerification(): Promise<void>;
}
