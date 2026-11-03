import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Category, Condition, Occasion, ClothingType } from '@/shared/types';
import type { SearchParams } from '@/services/contracts/catalog.contract';
import { useSearchParamUpdater } from './useSearchParamUpdater';

export interface CatalogFilterState {
  q: string;
  category?: Category;
  type: ClothingType[];
  brand: string[];
  size: string[];
  condition: Condition[];
  occasion: Occasion[];
  priceMin?: number;
  priceMax?: number;
  locality?: string;
  verifiedOnly: boolean;
  returnable: boolean;
  kind?: 'sale' | 'rent';
  sort: 'newest' | 'price-asc' | 'price-desc' | 'popularity' | 'rating' | 'recommended';
  page: number;
}

export function useCatalogFilters() {
  const [searchParams] = useSearchParams();
  const { updateParams, setParam, toggleArrayParam, removeArrayOrScalar } =
    useSearchParamUpdater();

  const filters = useMemo<CatalogFilterState>(() => {
    const q = searchParams.get('q') ?? '';
    const category = (searchParams.get('category') as Category) || undefined;
    const type = (searchParams.getAll('type') as ClothingType[]) ?? [];
    const brand = searchParams.getAll('brand') ?? [];
    const size = searchParams.getAll('size') ?? [];
    const condition = (searchParams.getAll('condition') as Condition[]) ?? [];
    const occasion = (searchParams.getAll('occasion') as Occasion[]) ?? [];
    const priceMinStr = searchParams.get('priceMin');
    const priceMaxStr = searchParams.get('priceMax');
    const priceMin = priceMinStr ? parseInt(priceMinStr, 10) : undefined;
    const priceMax = priceMaxStr ? parseInt(priceMaxStr, 10) : undefined;
    const locality = searchParams.get('locality') || undefined;
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const returnable = searchParams.get('returnable') === 'true';
    const kind = (searchParams.get('kind') as 'sale' | 'rent') || undefined;
    const sort = (searchParams.get('sort') as CatalogFilterState['sort']) || 'recommended';
    const pageStr = searchParams.get('page');
    const page = pageStr ? Math.max(1, parseInt(pageStr, 10)) : 1;
    return {
      q, category, type, brand, size, condition, occasion,
      priceMin, priceMax, locality, verifiedOnly, returnable, kind, sort, page,
    };
  }, [searchParams]);

  const setPriceRange = useCallback(
    (min?: number, max?: number) => {
      updateParams((p) => {
        if (min !== undefined && min > 0) p.set('priceMin', String(min));
        else p.delete('priceMin');
        if (max !== undefined && max > 0) p.set('priceMax', String(max));
        else p.delete('priceMax');
        p.delete('page');
      });
    },
    [updateParams]
  );

  const toggleBoolean = useCallback(
    (key: 'verifiedOnly' | 'returnable') => {
      updateParams((p) => {
        const curr = p.get(key) === 'true';
        if (curr) p.delete(key);
        else p.set(key, 'true');
        p.delete('page');
      });
    },
    [updateParams]
  );

  const setSort = useCallback(
    (sort: CatalogFilterState['sort']) => {
      updateParams((p) => {
        if (sort === 'recommended') p.delete('sort');
        else p.set('sort', sort);
        p.delete('page');
      });
    },
    [updateParams]
  );

  const clearAllFilters = useCallback(() => {
    updateParams((p) => {
      const q = p.get('q');
      const sort = p.get('sort');
      const keys = Array.from(p.keys());
      for (const k of keys) p.delete(k);
      if (q) p.set('q', q);
      if (sort) p.set('sort', sort);
    });
  }, [updateParams]);

  const searchParamsPayload = useMemo<SearchParams>(() => ({
    q: filters.q || undefined,
    category: filters.category,
    type: filters.type.length ? filters.type : undefined,
    brand: filters.brand.length ? filters.brand : undefined,
    size: filters.size.length ? filters.size : undefined,
    condition: filters.condition.length ? filters.condition : undefined,
    occasion: filters.occasion.length ? filters.occasion : undefined,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    locality: filters.locality,
    verifiedOnly: filters.verifiedOnly ? true : undefined,
    returnable: filters.returnable ? true : undefined,
    kind: filters.kind,
    sort: filters.sort,
    page: filters.page,
    pageSize: 12,
  }), [filters]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.kind) count++;
    if (filters.locality) count++;
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) count++;
    if (filters.verifiedOnly) count++;
    if (filters.returnable) count++;
    count += filters.type.length + filters.brand.length + filters.size.length;
    count += filters.condition.length + filters.occasion.length;
    return count;
  }, [filters]);

  return {
    filters,
    searchParamsPayload,
    activeCount,
    setFilter: setParam,
    toggleArrayFilter: toggleArrayParam,
    setPriceRange,
    toggleBoolean,
    setSort,
    removeFilter: removeArrayOrScalar,
    clearAllFilters,
  };
}
