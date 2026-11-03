import React from 'react';
import type { CatalogFilterState } from '../hooks/useCatalogFilters';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
  value: CatalogFilterState['sort'];
  onChange: (sort: CatalogFilterState['sort']) => void;
  className?: string;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ArrowUpDown className="w-3.5 h-3.5 text-muted shrink-0" />
      <span className="text-xs uppercase font-mono tracking-wider text-muted hidden sm:inline">
        Sort:
      </span>
      <select
        aria-label="Sort catalog results"
        data-testid="catalog-sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as CatalogFilterState['sort'])}
        className="h-9 px-3 py-1 bg-paper border border-line text-xs uppercase tracking-wider text-ink font-medium focus:border-ink focus:outline-none cursor-pointer"
      >
        <option value="recommended">Recommended (Verified Boost)</option>
        <option value="newest">Newest Drops</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Most Popular</option>
        <option value="rating">Top Seller Rating</option>
      </select>
    </div>
  );
};

