import React from 'react';
import type { CatalogFilterState } from '../hooks/useCatalogFilters';
import { FilterChip, ArrayFilterChips } from './FilterChip';

interface ActiveFilterChipsProps {
  filters: CatalogFilterState;
  activeCount: number;
  onRemove: (key: string, value?: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  activeCount,
  onRemove,
  onClearAll,
  className = '',
}) => {
  if (activeCount === 0) return null;

  return (
    <div
      data-testid="active-filter-chips"
      className={`flex flex-wrap items-center gap-2 py-3 border-b border-line ${className}`}
    >
      <span className="text-[11px] font-mono uppercase tracking-wider text-muted mr-1">
        Active Filters:
      </span>

      {filters.category && (
        <FilterChip
          label={filters.category}
          testId="filter-chip-category"
          onRemove={() => onRemove('category')}
        />
      )}

      {filters.kind && (
        <FilterChip
          label={filters.kind === 'rent' ? 'Rent Only' : 'Buy (Sale)'}
          testId="filter-chip-kind"
          onRemove={() => onRemove('kind')}
        />
      )}

      {filters.locality && (
        <FilterChip
          label={filters.locality}
          testId="filter-chip-locality"
          onRemove={() => onRemove('locality')}
        />
      )}

      {(filters.priceMin !== undefined || filters.priceMax !== undefined) && (
        <FilterChip
          label={`${filters.priceMin !== undefined ? `₹${filters.priceMin}` : '₹0'} – ${filters.priceMax !== undefined ? `₹${filters.priceMax}` : 'Any'}`}
          testId="filter-chip-price"
          onRemove={() => { onRemove('priceMin'); onRemove('priceMax'); }}
        />
      )}

      {filters.verifiedOnly && (
        <FilterChip
          label="Verified Sellers Only"
          testId="filter-chip-verified"
          onRemove={() => onRemove('verifiedOnly')}
        />
      )}

      {filters.returnable && (
        <FilterChip
          label="Returns Accepted"
          testId="filter-chip-returnable"
          onRemove={() => onRemove('returnable')}
        />
      )}

      <ArrayFilterChips
        items={filters.brand}
        keyPrefix="brand"
        filterKey="brand"
        onRemove={onRemove}
      />
      <ArrayFilterChips
        items={filters.size}
        keyPrefix="size"
        filterKey="size"
        labelFn={(v) => `Size: ${v}`}
        onRemove={onRemove}
      />
      <ArrayFilterChips
        items={filters.condition}
        keyPrefix="condition"
        filterKey="condition"
        labelFn={(v) => v.replace('-', ' ')}
        onRemove={onRemove}
      />
      <ArrayFilterChips
        items={filters.occasion}
        keyPrefix="occasion"
        filterKey="occasion"
        labelFn={(v) => v.replace('-', ' ')}
        onRemove={onRemove}
      />
      <ArrayFilterChips
        items={filters.type}
        keyPrefix="type"
        filterKey="type"
        onRemove={onRemove}
      />

      <button
        type="button"
        data-testid="filter-clear-all-btn"
        onClick={onClearAll}
        className="text-xs uppercase tracking-wider text-muted hover:text-danger underline ml-2 cursor-pointer font-medium"
      >
        Clear All
      </button>
    </div>
  );
};
