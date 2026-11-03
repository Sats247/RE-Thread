import type { Listing, Category, ClothingType, Condition, Occasion } from '@/shared/types';
import { getImageUrl } from '@/shared/lib/image';
import { SALE_LISTINGS_PART_1 } from './listingsSale.data';

const BRANDS = ['Zara', 'H&M', 'Levi\'s', 'Allen Solly', 'Fabindia', 'Biba', 'Nike', 'Adidas', 'Uniqlo', 'Puma', 'W', 'Van Heusen'];
const LOCALITIES = ['Indiranagar', 'Koramangala', 'HSR Layout', 'Jayanagar', 'Malleshwaram', 'Whitefield', 'JP Nagar', 'Basavanagudi'];
const SELLER_IDS = ['seller-kavya', 'seller-thread-co', 'seller-heritage-silk', 'seller-rohan', 'seller-vintage-vault', 'seller-urban-thrift'];

const TYPES_DATA: { type: ClothingType; category: Category; title: string; occasions: Occasion[]; basePrice: number; mrp: number }[] = [
  { type: 'tshirt', category: 'men', title: 'Graphic Cotton Oversized Tee', occasions: ['daily', 'college', 'lounge'], basePrice: 499, mrp: 1299 },
  { type: 'shirt', category: 'men', title: 'Linen Cuban Collar Summer Shirt', occasions: ['brunch', 'resort', 'vacation'], basePrice: 999, mrp: 2799 },
  { type: 'jeans', category: 'unisex', title: 'Vintage Straight Leg Distressed Denim', occasions: ['daily', 'club', 'weekend-getaway'], basePrice: 1399, mrp: 3999 },
  { type: 'dress', category: 'women', title: 'Floral Tiered Summer Maxi Dress', occasions: ['brunch', 'vacation', 'date'], basePrice: 1599, mrp: 4499 },
  { type: 'jacket', category: 'unisex', title: 'Trucker Denim Oversized Jacket', occasions: ['college', 'winter', 'travel'], basePrice: 1899, mrp: 4999 },
  { type: 'sweater', category: 'women', title: 'Ribbed Knit Wool Blend Cardigan', occasions: ['winter', 'brunch', 'travel'], basePrice: 1199, mrp: 2999 },
  { type: 'kurta', category: 'women', title: 'Handspun Cotton Straight Cut Kurta', occasions: ['festive', 'daily', 'college'], basePrice: 799, mrp: 1999 },
  { type: 'trousers', category: 'men', title: 'Pleated Chino Pants in Olive', occasions: ['formal', 'daily', 'brunch'], basePrice: 1099, mrp: 2899 },
  { type: 'shorts', category: 'men', title: 'Cargo Lounge Utility Shorts', occasions: ['gym', 'weekend-getaway', 'lounge'], basePrice: 699, mrp: 1799 },
  { type: 'activewear', category: 'women', title: 'Seamless High-Waist Yoga Leggings', occasions: ['yoga', 'gym'], basePrice: 899, mrp: 2499 },
  { type: 'accessory', category: 'unisex', title: 'Structured Canvas Crossbody Tote', occasions: ['travel', 'college', 'daily'], basePrice: 749, mrp: 1899 },
  { type: 'top', category: 'women', title: 'Satin Cowl Neck Evening Camisole', occasions: ['party', 'club', 'date'], basePrice: 649, mrp: 1699 },
];

function generateRemainingSaleListings(): Listing[] {
  const result: Listing[] = [...SALE_LISTINGS_PART_1];
  const conditions: Condition[] = ['like-new', 'good', 'fair'];

  for (let i = 9; i <= 45; i++) {
    const typeObj = TYPES_DATA[(i - 9) % TYPES_DATA.length]!;
    const brand = BRANDS[(i * 3) % BRANDS.length]!;
    const locality = LOCALITIES[(i * 2) % LOCALITIES.length]!;
    const sellerId = SELLER_IDS[(i * 5) % SELLER_IDS.length]!;
    const condition = conditions[i % 3]!;
    const code = `RT-${10000 + i}`;
    const returnEnabled = i % 2 === 0;

    result.push({
      id: `listing-s-${i}`,
      code,
      kind: 'sale',
      sellerId,
      title: `${brand} ${typeObj.title}`,
      description: `Authentic pre-owned piece verified in ${locality}. Carefully steam sanitized.`,
      category: typeObj.category,
      type: typeObj.type,
      brand,
      tags: [typeObj.type, brand.toLowerCase(), 'pre-loved', locality.toLowerCase()],
      occasions: typeObj.occasions,
      size: ['S', 'M', 'L', 'XL', '32', '34'][(i * 2) % 6]!,
      condition,
      color: ['Black', 'White', 'Navy Blue', 'Olive Green', 'Earthy Brown', 'Maroon'][i % 6]!,
      images: [getImageUrl(`sale-${i}-a`, 600, 800), getImageUrl(`sale-${i}-b`, 600, 800)],
      price: typeObj.basePrice + (i % 5) * 50,
      mrp: typeObj.mrp,
      returnPolicy: { enabled: returnEnabled, windowDays: returnEnabled ? 3 : 0 },
      locality,
      createdAt: new Date(Date.now() - (45 - i) * 86400000).toISOString(),
      popularity: 60 + (i % 40),
      status: 'live',
    });
  }

  return result;
}

export const ALL_SALE_LISTINGS: Listing[] = generateRemainingSaleListings();

