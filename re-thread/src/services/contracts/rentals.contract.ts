import type { RentalBooking, PriceBreakdown, QcCheck, Delivery } from '@/shared/types';

export interface RentalQuoteResult {
  pricing: PriceBreakdown;
  availableDates: string[];
}

export interface BookRentalPayload {
  listingId: string;
  startDate: string;
  tierDays: number;
  delivery: Delivery;
  address?: {
    name: string;
    phone: string;
    line1: string;
    locality: string;
    city: string;
    pincode: string;
  };
}

export interface QcSubmitData {
  photos: string[];
  checklist: {
    ironed: boolean;
    clean: boolean;
    noDamage: boolean;
    sizeMatches: boolean;
  };
  notes?: string;
}

export interface RentalsContract {
  getAvailability(listingId: string): Promise<string[]>;
  quote(listingId: string, start: string, tierDays: number, delivery: Delivery): Promise<RentalQuoteResult>;
  book(payload: BookRentalPayload): Promise<RentalBooking>;
  list(): Promise<RentalBooking[]>;
  get(id: string): Promise<RentalBooking>;
  submitQc(id: string, stage: QcCheck['stage'], data: QcSubmitData): Promise<RentalBooking>;
  payDues(id: string): Promise<RentalBooking>;
  closeBooking(id: string): Promise<RentalBooking>;
}
