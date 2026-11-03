import React, { useState } from 'react';
import type { CatalogFilterState } from '../hooks/useCatalogFilters';
import { BENGALURU_LOCALITIES } from '@/config/constants';
import { Checkbox, Input } from '@/shared/ui';
import type { Category } from '@/shared/types';
import { BrowseFacetFilters } from './BrowseFacetFilters';

interface BrowseFilterControlsProps {
  filters: CatalogFilterState;
  onSetFilter: (key: string, value: string | undefined) => void;
  onToggleArray: (key: string, value: string) => void;
  onSetPriceRange: (min?: number, max?: number) => void;
  onToggleBoolean: (key: 'verifiedOnly' | 'returnable') => void;
  onClearAll: () => void;
}

export const BrowseFilterControls: React.FC<BrowseFilterControlsProps> = ({
  filters,
  onSetFilter,
  onToggleArray,
  onSetPriceRange,
  onToggleBoolean,
  onClearAll,
}) => {
  const [minPriceInput, setMinPriceInput] = useState(filters.priceMin?.toString() ?? '');
  const [maxPriceInput, setMaxPriceInput] = useState(filters.priceMax?.toString() ?? '');

  const handlePriceApply = () => {
    const min = minPriceInput ? parseInt(minPriceInput, 10) : undefined;
    const max = maxPriceInput ? parseInt(maxPriceInput, 10) : undefined;
    onSetPriceRange(min, max);
  };

  return (
    <div className="space-y-6 text-xs text-ink select-none">
      <div className="flex items-center justify-between pb-3 border-b border-line">
        <span className="font-mono uppercase tracking-wider text-muted text-[11px]">Filters</span>
        <button
          type="button"
          onClick={onClearAll}
          data-testid="filters-sidebar-reset-btn"
          className="text-[11px] uppercase tracking-wider text-muted hover:text-danger underline font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Mode / Kind */}
      <div className="space-y-2 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Purchase Mode</div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { label: 'All', value: undefined },
            { label: 'Buy', value: 'sale' },
            { label: 'Rent', value: 'rent' },
          ].map((mode) => (
            <button
              key={mode.label}
              type="button"
              data-testid={`filter-mode-${mode.label.toLowerCase()}`}
              onClick={() => onSetFilter('kind', mode.value)}
              className={`py-1.5 px-2 text-center uppercase tracking-wider text-xs border transition-colors ${
                filters.kind === mode.value || (!filters.kind && mode.value === undefined)
                  ? 'bg-ink text-paper border-ink font-medium'
                  : 'bg-paper text-muted border-line hover:border-ink hover:text-ink'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Department / Category */}
      <div className="space-y-2 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Department</div>
        <div className="space-y-1.5">
          {[
            { label: 'All Garments', value: undefined },
            { label: "Women's Wardrobe", value: 'women' },
            { label: "Men's Wardrobe", value: 'men' },
            { label: 'Unisex', value: 'unisex' },
          ].map((cat) => (
            <label key={cat.label} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="radio"
                name="category_filter"
                data-testid={`filter-category-${cat.value ?? 'all'}`}
                checked={filters.category === cat.value || (!filters.category && !cat.value)}
                onChange={() => onSetFilter('category', cat.value as Category)}
                className="w-3.5 h-3.5 text-ink border-line focus:ring-0"
              />
              <span className="text-xs text-ink">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Trust & Policy */}
      <div className="space-y-2.5 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Trust & Policy</div>
        <Checkbox
          id="filter-verified-check"
          label="Verified Sellers Only (★ 4.0+ / Stores)"
          checked={filters.verifiedOnly}
          onChange={() => onToggleBoolean('verifiedOnly')}
          data-testid="filter-verified-checkbox"
        />
        <Checkbox
          id="filter-returnable-check"
          label="Returns Accepted (3-7 days window)"
          checked={filters.returnable}
          onChange={() => onToggleBoolean('returnable')}
          data-testid="filter-returnable-checkbox"
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Price Range (₹)</div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            data-testid="filter-price-min-input"
            className="text-xs py-1"
          />
          <span className="text-muted">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            data-testid="filter-price-max-input"
            className="text-xs py-1"
          />
          <button
            type="button"
            data-testid="filter-price-apply-btn"
            onClick={handlePriceApply}
            className="px-3 py-2 bg-ink text-paper text-xs uppercase tracking-wider font-medium hover:bg-muted"
          >
            Go
          </button>
        </div>
      </div>

      {/* Facet Filters: Sizes, Conditions, Brands */}
      <BrowseFacetFilters
        selectedSizes={filters.size}
        selectedConditions={filters.condition}
        selectedBrands={filters.brand}
        onToggleArray={onToggleArray}
      />

      {/* Locality */}
      <div className="space-y-2">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Bengaluru Locality</div>
        <select
          aria-label="Filter by Bengaluru locality"
          value={filters.locality ?? ''}
          onChange={(e) => onSetFilter('locality', e.target.value || undefined)}
          data-testid="filter-locality-select"
          className="w-full h-9 px-2 text-xs border border-line bg-paper text-ink focus:outline-none focus:border-ink"
        >
          <option value="">All Bengaluru Localities</option>
          {BENGALURU_LOCALITIES.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
