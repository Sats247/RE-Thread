import { AppError } from '@/shared/types';
import type {
  AdminContract,
  AdminStats,
  VerificationDecision,
  ListingDecision,
  ComplaintResolution,
} from '../contracts/admin.contract';
import type { SellerProfile, Listing, Ticket } from '@/shared/types';

export const adminMock: AdminContract = {
  async stats(): Promise<AdminStats> {
    throw new AppError('not-implemented', 'stats not implemented');
  },
  async verificationQueue(): Promise<SellerProfile[]> {
    throw new AppError('not-implemented', 'verificationQueue not implemented');
  },
  async decideVerification(_sellerId: string, _decision: VerificationDecision): Promise<SellerProfile> {
    throw new AppError('not-implemented', 'decideVerification not implemented');
  },
  async flaggedListings(): Promise<Listing[]> {
    throw new AppError('not-implemented', 'flaggedListings not implemented');
  },
  async decideListing(_listingId: string, _decision: ListingDecision): Promise<Listing> {
    throw new AppError('not-implemented', 'decideListing not implemented');
  },
  async complaints(): Promise<Ticket[]> {
    throw new AppError('not-implemented', 'complaints not implemented');
  },
  async resolveComplaint(_ticketId: string, _resolution: ComplaintResolution): Promise<Ticket> {
    throw new AppError('not-implemented', 'resolveComplaint not implemented');
  },
};
