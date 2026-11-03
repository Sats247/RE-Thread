import { describe, it, expect } from 'vitest';
import { VERIFIED_SELLER_BOOST } from '@/config/constants';

interface MockItem {
  id: string;
  title: string;
  price: number;
  popularity: number;
  locality: string;
  returnsEnabled: boolean;
  sellerBoosted: boolean;
}

function filterAndSort(
  items: MockItem[],
  filters: { locality?: string; maxPrice?: number; returnable?: boolean; sort?: 'recommended' | 'price-asc' }
): MockItem[] {
  let res = [...items];

  if (filters.locality) {
    res = res.filter((i) => i.locality.toLowerCase() === filters.locality!.toLowerCase());
  }
  if (filters.maxPrice !== undefined) {
    res = res.filter((i) => i.price <= filters.maxPrice!);
  }
  if (filters.returnable) {
    res = res.filter((i) => i.returnsEnabled);
  }

  if (filters.sort === 'price-asc') {
    res.sort((a, b) => a.price - b.price);
  } else {
    // Recommended: popularity * (sellerBoosted ? 1.3 : 1.0)
    res.sort((a, b) => {
      const scoreA = a.popularity * (a.sellerBoosted ? VERIFIED_SELLER_BOOST : 1.0);
      const scoreB = b.popularity * (b.sellerBoosted ? VERIFIED_SELLER_BOOST : 1.0);
      return scoreB - scoreA;
    });
  }

  return res;
}

describe('Catalog Search, Filter & Recommended Sort Boost', () => {
  const sampleItems: MockItem[] = [
    { id: '1', title: 'Zara Jacket', price: 1899, popularity: 80, locality: 'Indiranagar', returnsEnabled: true, sellerBoosted: false },
    { id: '2', title: 'H&M Skirt', price: 899, popularity: 75, locality: 'HSR Layout', returnsEnabled: true, sellerBoosted: true },
    { id: '3', title: 'Levis Jeans', price: 1499, popularity: 90, locality: 'Indiranagar', returnsEnabled: false, sellerBoosted: false },
  ];

  it('boosts verified seller items in Recommended sort (80 vs 75*1.3=97.5)', () => {
    const sorted = filterAndSort(sampleItems, { sort: 'recommended' });
    // Item 2 has popularity 75 * 1.3 = 97.5, which beats Item 3 (90) and Item 1 (80)
    expect(sorted[0]?.id).toBe('2');
    expect(sorted[1]?.id).toBe('3');
    expect(sorted[2]?.id).toBe('1');
  });

  it('filters by locality and price ceiling', () => {
    const filtered = filterAndSort(sampleItems, { locality: 'Indiranagar', maxPrice: 1500 });
    expect(filtered.length).toBe(1);
    expect(filtered[0]?.id).toBe('3');
  });

  it('filters by returns availability', () => {
    const returnable = filterAndSort(sampleItems, { returnable: true });
    expect(returnable.map((i) => i.id)).toEqual(['2', '1']);
  });
});

