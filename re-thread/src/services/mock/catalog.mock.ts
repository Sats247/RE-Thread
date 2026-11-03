import { AppError, type SellerProfile } from '@/shared/types';
import type {
  CatalogContract,
  SearchParams,
  SearchResult,
  ReviewListOptions,
  HomeFeeds,
  ActivitySignals,
} from '../contracts/catalog.contract';
import type { Listing, Bundle, Review } from '@/shared/types';
import { simulateLatency } from './latency';
import { db } from './db';
import { log } from '@/shared/lib/logger';
import { VERIFIED_SELLER_BOOST } from '@/config/constants';

const NS = 'catalog';

function countBy<T extends string>(arr: T[]): { value: T; count: number }[] {
  const counts = new Map<T, number>();
  for (const item of arr) counts.set(item, (counts.get(item) ?? 0) + 1);
  return Array.from(counts.entries()).map(([value, count]) => ({ value, count }));
}

export const catalogMock: CatalogContract = {
  async search(params: SearchParams): Promise<SearchResult> {
    await simulateLatency();
    log.info(NS, 'search', params);
    const listings = db.get<Listing[]>('listings') ?? [];
    const sellers = db.get<SellerProfile[]>('sellers') ?? [];
    const sellerMap = new Map(sellers.map((s) => [s.id, s]));

    let items = listings.filter((l) => l.status === 'live');

    // Keyword matching
    if (params.q) {
      const query = params.q.toLowerCase().trim();
      items = items.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.brand.toLowerCase().includes(query) ||
          l.code.toLowerCase().includes(query) ||
          l.locality.toLowerCase().includes(query) ||
          l.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (params.category) items = items.filter((l) => l.category === params.category);
    if (params.type && params.type.length > 0) items = items.filter((l) => params.type!.includes(l.type));
    if (params.brand && params.brand.length > 0) items = items.filter((l) => params.brand!.includes(l.brand));
    if (params.size && params.size.length > 0) items = items.filter((l) => params.size!.includes(l.size));
    if (params.condition && params.condition.length > 0) items = items.filter((l) => params.condition!.includes(l.condition));
    if (params.occasion && params.occasion.length > 0) {
      items = items.filter((l) => l.occasions.some((o) => params.occasion!.includes(o)));
    }
    if (params.priceMin !== undefined) items = items.filter((l) => l.price >= params.priceMin!);
    if (params.priceMax !== undefined) items = items.filter((l) => l.price <= params.priceMax!);
    if (params.locality) items = items.filter((l) => l.locality.toLowerCase() === params.locality!.toLowerCase());
    if (params.kind) items = items.filter((l) => l.kind === params.kind);
    if (params.returnable) items = items.filter((l) => l.returnPolicy.enabled);
    if (params.verifiedOnly) {
      items = items.filter((l) => {
        const seller = sellerMap.get(l.sellerId);
        return seller?.verification.status === 'auto' || seller?.verification.status === 'admin';
      });
    }

    // Sorting
    const sort = params.sort ?? 'recommended';
    items.sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'popularity') return b.popularity - a.popularity;
      // Recommended: popularity boosted by 1.3x if seller is verified
      const aBoost = (sellerMap.get(a.sellerId)?.boosted ? VERIFIED_SELLER_BOOST : 1) * a.popularity;
      const bBoost = (sellerMap.get(b.sellerId)?.boosted ? VERIFIED_SELLER_BOOST : 1) * b.popularity;
      return bBoost - aBoost;
    });

    const pageSize = params.pageSize ?? 20;
    const page = params.page ?? 1;
    const paginated = items.slice((page - 1) * pageSize, page * pageSize);

    return {
      items: paginated,
      total: items.length,
      facets: {
        brands: countBy(items.map((i) => i.brand)),
        sizes: countBy(items.map((i) => i.size)),
        localities: countBy(items.map((i) => i.locality)),
        conditions: countBy(items.map((i) => i.condition)),
      },
    };
  },

  async suggest(query: string): Promise<string[]> {
    await simulateLatency();
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const listings = db.get<Listing[]>('listings') ?? [];
    const suggestions = new Set<string>();

    for (const l of listings) {
      if (l.title.toLowerCase().includes(q)) suggestions.add(l.title);
      if (l.brand.toLowerCase().includes(q)) suggestions.add(l.brand);
      if (l.code.toLowerCase().includes(q)) suggestions.add(l.code);
      if (suggestions.size >= 8) break;
    }
    return Array.from(suggestions);
  },

  async getListing(id: string): Promise<Listing> {
    await simulateLatency();
    const listings = db.get<Listing[]>('listings') ?? [];
    const listing = listings.find((l) => l.id === id);
    if (!listing) throw new AppError('not-found', `Listing ${id} not found.`);
    return listing;
  },

  async getListingByCode(code: string): Promise<Listing> {
    await simulateLatency();
    const listings = db.get<Listing[]>('listings') ?? [];
    const listing = listings.find((l) => l.code === code);
    if (!listing) throw new AppError('not-found', `Listing code ${code} not found.`);
    return listing;
  },

  async homeFeeds(): Promise<HomeFeeds> {
    await simulateLatency();
    const listings = (db.get<Listing[]>('listings') ?? []).filter((l) => l.status === 'live');
    const bundles = db.get<Bundle[]>('bundles') ?? [];
    return {
      freshFromSellers: listings.slice(0, 8),
      forYou: listings.slice(0, 6),
      trending: [...listings].sort((a, b) => b.popularity - a.popularity).slice(0, 8),
      rentSpotlight: listings.filter((l) => l.kind === 'rent').slice(0, 6),
      bundles: bundles.slice(0, 6),
    };
  },

  async forYou(activity: ActivitySignals): Promise<Listing[]> {
    await simulateLatency();
    const listings = (db.get<Listing[]>('listings') ?? []).filter((l) => l.status === 'live');
    const hasCategory = activity.viewedCategories.length > 0;
    const hasBrand = activity.viewedBrands.length > 0;
    const hasOccasion = activity.viewedOccasions.length > 0;

    if (!hasCategory && !hasBrand && !hasOccasion) {
      return [...listings].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
    }

    const matched = listings.filter(
      (l) =>
        (hasCategory && activity.viewedCategories.includes(l.category)) ||
        (hasBrand && activity.viewedBrands.includes(l.brand)) ||
        (hasOccasion && l.occasions.some((o) => activity.viewedOccasions.includes(o)))
    );

    if (matched.length > 0) {
      const topCat = activity.viewedCategories[0];
      const topBrand = activity.viewedBrands[0];
      matched.sort((a, b) => {
        const aScore = (a.category === topCat ? 2 : 0) + (a.brand === topBrand ? 3 : 0);
        const bScore = (b.category === topCat ? 2 : 0) + (b.brand === topBrand ? 3 : 0);
        return bScore - aScore;
      });
      return matched.slice(0, 8);
    }

    return [...listings].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  },

  async similarByImage(file: File): Promise<Listing[]> {
    await simulateLatency();
    const listings = (db.get<Listing[]>('listings') ?? []).filter((l) => l.status === 'live');
    const name = file.name.toLowerCase();
    const matched = listings.filter(
      (l) =>
        name.includes(l.category) ||
        name.includes(l.type) ||
        name.includes(l.color.toLowerCase()) ||
        name.includes(l.brand.toLowerCase())
    );
    if (matched.length >= 2) {
      return matched.slice(0, 6);
    }
    return listings.slice(0, 6);
  },

  async relatedTo(id: string): Promise<Listing[]> {
    await simulateLatency();
    const listings = (db.get<Listing[]>('listings') ?? []).filter((l) => l.status === 'live');
    const current = listings.find((l) => l.id === id);
    if (!current) return listings.slice(0, 4);
    return listings
      .filter((l) => l.id !== id && (l.sellerId === current.sellerId || l.category === current.category))
      .slice(0, 6);
  },

  async getBundles(): Promise<Bundle[]> {
    await simulateLatency();
    return db.get<Bundle[]>('bundles') ?? [];
  },

  async getReviews(listingId: string, _opts?: ReviewListOptions): Promise<{ items: Review[]; total: number }> {
    await simulateLatency();
    const reviews = db.get<Review[]>('reviews') ?? [];
    const items = reviews.filter((r) => r.listingId === listingId);
    return { items, total: items.length };
  },
};
