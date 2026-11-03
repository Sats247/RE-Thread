import type { Listing, RentalTerms, ClothingType } from '@/shared/types';
import { getImageUrl } from '@/shared/lib/image';

interface RentTemplate {
  type: ClothingType;
  title: string;
  brand: string;
  category: 'men' | 'women';
  fabric: string;
  baseRent: number;
  deposit: number;
  lateFee: number;
}

const RENT_TEMPLATES: RentTemplate[] = [
  { type: 'tuxedo', title: 'Classic Peak Lapel Italian Wool Tuxedo', brand: 'Raymond', category: 'men', fabric: 'Italian Merino Wool', baseRent: 1299, deposit: 2500, lateFee: 400 },
  { type: 'sherwani', title: 'Hand-Embroidered Raw Silk Wedding Sherwani', brand: 'Manyavar', category: 'men', fabric: 'Raw Silk with Zari', baseRent: 1899, deposit: 3500, lateFee: 500 },
  { type: 'lehenga', title: 'Velvet Heavily Flared Bridal & Festive Lehenga', brand: 'The Festive Closet', category: 'women', fabric: 'Micro Velvet', baseRent: 2499, deposit: 4000, lateFee: 600 },
  { type: 'saree', title: 'Pure Kanjivaram Golden Zari Silk Saree', brand: 'Heritage Weaves', category: 'women', fabric: 'Pure Mulberry Silk', baseRent: 1199, deposit: 2000, lateFee: 350 },
  { type: 'gown', title: 'Embellished Emerald Green Mermaid Evening Gown', brand: 'Thread & Co.', category: 'women', fabric: 'Satin & Organza', baseRent: 1499, deposit: 2800, lateFee: 450 },
  { type: 'suit', title: 'Two-Piece British Charcoal Slim Fit Suit', brand: 'Van Heusen', category: 'men', fabric: 'Poly-Wool Blend', baseRent: 899, deposit: 1800, lateFee: 300 },
];

const RENT_LOCALITIES = ['Indiranagar', 'Koramangala', 'Jayanagar', 'HSR Layout', 'Basavanagudi'];
const RENT_SELLERS = ['seller-thread-co', 'seller-heritage-silk', 'seller-tuxedo-house', 'seller-festive-closet'];

function generateRentalListings(): Listing[] {
  const listings: Listing[] = [];

  for (let i = 1; i <= 25; i++) {
    const tpl = RENT_TEMPLATES[(i - 1) % RENT_TEMPLATES.length]!;
    const locality = RENT_LOCALITIES[(i * 3) % RENT_LOCALITIES.length]!;
    const sellerId = RENT_SELLERS[(i * 2) % RENT_SELLERS.length]!;
    const code = `RT-${10045 + i}`;
    const baseRent = tpl.baseRent + (i % 4) * 100;

    const rentalTerms: RentalTerms = {
      tiers: [
        { days: 3, price: baseRent },
        { days: 5, price: Math.round(baseRent * 1.5) },
        { days: 7, price: Math.round(baseRent * 1.9) },
      ],
      securityDeposit: tpl.deposit,
      lateFeePerDay: tpl.lateFee,
      ironedConfirmed: true,
      cleanedConfirmed: true,
      deliveryModes: ['courier', 'meetup'],
      sizeChart: [
        { label: 'S', chest: 36, waist: 30, length: 40 },
        { label: 'M', chest: 38, waist: 32, length: 42 },
        { label: 'L', chest: 40, waist: 34, length: 44 },
      ],
    };

    listings.push({
      id: `listing-r-${i}`,
      code,
      kind: 'rent',
      sellerId,
      title: `${tpl.brand} ${tpl.title}`,
      description: `Premium dry-cleaned occasion wear. Professionally steam sanitized before dispatch. Verified fit.`,
      category: tpl.category,
      type: tpl.type,
      brand: tpl.brand,
      tags: [tpl.type, 'rental', 'wedding', 'festive', 'designer'],
      occasions: ['wedding', 'festive', 'party', 'formal'],
      size: ['S', 'M', 'L', 'XL'][i % 4]!,
      condition: 'like-new',
      fabric: tpl.fabric,
      color: ['Midnight Black', 'Deep Navy', 'Crimson Red', 'Royal Emerald', 'Ivory Cream'][i % 5]!,
      images: [getImageUrl(`rent-${i}-1`, 600, 800), getImageUrl(`rent-${i}-2`, 600, 800)],
      price: baseRent, // Base tier price
      returnPolicy: { enabled: false, windowDays: 0 },
      locality,
      createdAt: new Date(Date.now() - (25 - i) * 86400000).toISOString(),
      popularity: 80 + (i % 20),
      status: 'live',
      rental: rentalTerms,
    });
  }

  return listings;
}

export const ALL_RENT_LISTINGS: Listing[] = generateRentalListings();

