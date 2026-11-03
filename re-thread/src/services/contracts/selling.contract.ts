import type { Listing, Bundle } from '@/shared/types';

export interface ListingDraftData {
  kind?: 'sale' | 'rent';
  title?: string;
  description?: string;
  category?: string;
  type?: string;
  brand?: string;
  size?: string;
  condition?: string;
  color?: string;
  price?: number;
  mrp?: number;
  images?: string[];
  tags?: string[];
  occasions?: string[];
  fabric?: string;
  measurements?: {
    chest?: number;
    waist?: number;
    length?: number;
    shoulder?: number;
    unit: 'in';
  };
  returnPolicyEnabled?: boolean;
  returnWindowDays?: number;
  rentalTiers?: { days: number; price: number }[];
  securityDeposit?: number;
  lateFeePerDay?: number;
  ironedConfirmed?: boolean;
  cleanedConfirmed?: boolean;
}

export interface SellingContract {
  saveDraft(data: ListingDraftData): Promise<Listing>;
  createListing(data: ListingDraftData): Promise<Listing>;
  updateListing(id: string, data: Partial<ListingDraftData>): Promise<Listing>;
  setStatus(id: string, status: Listing['status']): Promise<Listing>;
  createBundle(listingIds: string[], bundlePrice: number, title: string): Promise<Bundle>;
}
