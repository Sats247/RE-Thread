import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { catalog } from '@/services';
import type { Listing } from '@/shared/types';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { useActivityStore } from '@/stores/activity.store';
import { BrowseFiltersSidebar } from '../components/BrowseFiltersSidebar';
import { BrowseFiltersSheet } from '../components/BrowseFiltersSheet';
import { ActiveFilterChips } from '../components/ActiveFilterChips';
import { SortSelect } from '../components/SortSelect';
import { ProductCard } from '../components/ProductCard';
import { Button, EmptyState, Skeleton } from '@/shared/ui';
import { Filter } from 'lucide-react';

export const BrowsePage: React.FC = () => {
  const { category: pathCategory } = useParams<{ category?: string }>();
  const {
    filters,
    searchParamsPayload,
    activeCount,
    setFilter,
    toggleArrayFilter,
    setPriceRange,
    toggleBoolean,
    setSort,
    removeFilter,
    clearAllFilters,
  } = useCatalogFilters();

  const { track } = useActivityStore();
  const [items, setItems] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Sync route param category with query param if present
  useEffect(() => {
    if (pathCategory && pathCategory !== filters.category) {
      setFilter('category', pathCategory);
      track({ type: 'view_category', value: pathCategory });
    }
  }, [pathCategory, filters.category, setFilter, track]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setPage(1);

    catalog.search({ ...searchParamsPayload, page: 1, pageSize: 12 })
      .then((res) => {
        if (active) {
          setItems(res.items);
          setTotal(res.total);
        }
      })
      .catch(() => {
        // silent
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [searchParamsPayload]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await catalog.search({ ...searchParamsPayload, page: nextPage, pageSize: 12 });
      setItems((prev) => [...prev, ...res.items]);
      setPage(nextPage);
    } catch {
      // silent
    } finally {
      setLoadingMore(false);
    }
  };

  const getPageTitle = () => {
    if (filters.category) return `${filters.category}'s Collection`;
    if (filters.kind === 'rent') return 'Occasion Rentals';
    return 'Browse Catalog';
  };

  return (
    <div data-testid="catalog-browse-page" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-line gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted">Pre-Loved Apparel</span>
          <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-wide text-ink capitalize mt-0.5">
            {getPageTitle()}
          </h1>
          <p className="text-xs text-muted mt-1">Showing {items.length} of {total} verified garments</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-testid="mobile-filter-btn"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden h-9 px-3 bg-paper border border-line text-xs uppercase tracking-wider font-medium text-ink flex items-center gap-2 hover:border-ink"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {activeCount > 0 ? `(${activeCount})` : ''}</span>
          </button>
          <SortSelect value={filters.sort} onChange={setSort} />
        </div>
      </div>

      {/* Active Filter Badges */}
      <ActiveFilterChips
        filters={filters}
        activeCount={activeCount}
        onRemove={removeFilter}
        onClearAll={clearAllFilters}
      />

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex gap-8 pt-6">
        <BrowseFiltersSidebar
          filters={filters}
          onSetFilter={setFilter}
          onToggleArray={toggleArrayFilter}
          onSetPriceRange={setPriceRange}
          onToggleBoolean={toggleBoolean}
          onClearAll={clearAllFilters}
        />

        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Skeleton key={n} className="aspect-[3/4] w-full" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="No matching garments found"
              description="Try adjusting your filters, price range, or clearing size selections to view more Bengaluru drops."
              actionLabel="Clear All Filters"
              onAction={clearAllFilters}
            />
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {items.map((listing) => (
                  <ProductCard
                    key={listing.id}
                    listing={listing}
                    data-testid={`browse-product-${listing.id}`}
                  />
                ))}
              </div>

              {items.length < total && (
                <div className="text-center pt-4 border-t border-line">
                  <Button
                    variant="outline"
                    data-testid="browse-load-more-btn"
                    isLoading={loadingMore}
                    onClick={handleLoadMore}
                    className="px-8"
                  >
                    Load More Garments ({total - items.length} remaining)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BrowseFiltersSheet
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        totalResults={total}
        onSetFilter={setFilter}
        onToggleArray={toggleArrayFilter}
        onSetPriceRange={setPriceRange}
        onToggleBoolean={toggleBoolean}
        onClearAll={clearAllFilters}
      />
    </div>
  );
};

export default BrowsePage;

