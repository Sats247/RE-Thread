import { AppError } from '@/shared/types';
import type { SellingContract, ListingDraftData } from '../contracts/selling.contract';
import type { Listing, Bundle } from '@/shared/types';

export const sellingMock: SellingContract = {
  async saveDraft(_data: ListingDraftData): Promise<Listing> {
    throw new AppError('not-implemented', 'saveDraft not implemented');
  },
  async createListing(_data: ListingDraftData): Promise<Listing> {
    throw new AppError('not-implemented', 'createListing not implemented');
  },
  async updateListing(_id: string, _data: Partial<ListingDraftData>): Promise<Listing> {
    throw new AppError('not-implemented', 'updateListing not implemented');
  },
  async setStatus(_id: string, _status: Listing['status']): Promise<Listing> {
    throw new AppError('not-implemented', 'setStatus not implemented');
  },
  async createBundle(_listingIds: string[], _bundlePrice: number, _title: string): Promise<Bundle> {
    throw new AppError('not-implemented', 'createBundle not implemented');
  },
};
