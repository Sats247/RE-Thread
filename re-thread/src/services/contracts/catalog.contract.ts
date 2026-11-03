import type {
  Listing,
  Bundle,
  Review,
  Category,
  Occasion,
  ClothingType,
  Condition,
} from '@/shared/types';

export interface SearchParams {
  q?: string;
  category?: Category;
  type?: ClothingType[];
  tags?: string[];
  brand?: string[];
  size?: string[];
  condition?: Condition[];
  occasion?: Occasion[];
  priceMin?: number;
  priceMax?: number;
  locality?: string;
  verifiedOnly?: boolean;
  returnable?: boolean;
  kind?: 'sale' | 'rent';
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'popularity' | 'rating' | 'recommended';
  page?: number;
  pageSize?: number;
}

export interface SearchFacets {
  brands: { value: string; count: number }[];
  sizes: { value: string; count: number }[];
  localities: { value: string; count: number }[];
  conditions: { value: Condition; count: number }[];
}

export interface SearchResult {
  items: Listing[];
  total: number;
  facets: SearchFacets;
}

export interface ReviewListOptions {
  sort?: 'newest' | 'highest' | 'lowest';
  page?: number;
  pageSize?: number;
}

export interface HomeFeeds {
  freshFromSellers: Listing[];
  forYou: Listing[];
  trending: Listing[];
  rentSpotlight: Listing[];
  bundles: Bundle[];
}

export interface ActivitySignals {
  viewedCategories: string[];
  viewedBrands: string[];
  viewedOccasions: string[];
  searches: string[];
}

export interface CatalogContract {
  search(params: SearchParams): Promise<SearchResult>;
  suggest(query: string): Promise<string[]>;
  getListing(id: string): Promise<Listing>;
  getListingByCode(code: string): Promise<Listing>;
  homeFeeds(): Promise<HomeFeeds>;
  forYou(activity: ActivitySignals): Promise<Listing[]>;
  similarByImage(file: File): Promise<Listing[]>;
  relatedTo(id: string): Promise<Listing[]>;
  getBundles(): Promise<Bundle[]>;
  getReviews(listingId: string, opts?: ReviewListOptions): Promise<{ items: Review[]; total: number }>;
}
