import type { SellerProfile, Listing, Ticket } from '@/shared/types';

export interface VerificationDecision {
  approved: boolean;
  note?: string;
}

export interface ListingDecision {
  approved: boolean;
  reason?: string;
}

export interface ComplaintResolution {
  decision: string;
  note?: string;
}

export interface AdminStats {
  pendingVerifications: number;
  flaggedListings: number;
  openComplaints: number;
}

export interface AdminContract {
  stats(): Promise<AdminStats>;
  verificationQueue(): Promise<SellerProfile[]>;
  decideVerification(sellerId: string, decision: VerificationDecision): Promise<SellerProfile>;
  flaggedListings(): Promise<Listing[]>;
  decideListing(listingId: string, decision: ListingDecision): Promise<Listing>;
  complaints(): Promise<Ticket[]>;
  resolveComplaint(ticketId: string, resolution: ComplaintResolution): Promise<Ticket>;
}
