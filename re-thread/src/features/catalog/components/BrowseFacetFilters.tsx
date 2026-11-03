import React, { useState } from 'react';
import { Checkbox, Chip } from '@/shared/ui';
import type { Condition } from '@/shared/types';
import { Search } from 'lucide-react';

interface BrowseFacetFiltersProps {
  selectedSizes: string[];
  selectedConditions: Condition[];
  selectedBrands: string[];
  onToggleArray: (key: string, value: string) => void;
}

const COMMON_BRANDS = [
  'Zara', 'H&M', 'Levi\'s', 'Fabindia', 'Biba', 'W', 'Manyavar',
  'Nike', 'Adidas', 'Uniqlo', 'Raymond', 'Allen Solly', 'Van Heusen'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const CONDITIONS: { value: Condition; label: string }[] = [
  { value: 'like-new', label: 'Like New (Pristine)' },
  { value: 'good', label: 'Good (Gently Used)' },
  { value: 'fair', label: 'Fair (Noticeable Wear)' },
];

export const BrowseFacetFilters: React.FC<BrowseFacetFiltersProps> = ({
  selectedSizes,
  selectedConditions,
  selectedBrands,
  onToggleArray,
}) => {
  const [brandSearch, setBrandSearch] = useState('');

  const filteredBrands = COMMON_BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase().trim())
  );

  return (
    <div className="space-y-6 text-xs text-ink select-none">
      {/* Sizes */}
      <div className="space-y-2 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Size</div>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => (
            <Chip
              key={size}
              label={size}
              active={selectedSizes.includes(size)}
              data-testid={`filter-size-${size.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onToggleArray('size', size)}
            />
          ))}
        </div>
      </div>

      {/* Conditions */}
      <div className="space-y-2 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Condition</div>
        <div className="space-y-1.5">
          {CONDITIONS.map((cond) => (
            <Checkbox
              key={cond.value}
              id={`cond-${cond.value}`}
              label={cond.label}
              checked={selectedConditions.includes(cond.value)}
              onChange={() => onToggleArray('condition', cond.value)}
              data-testid={`filter-condition-${cond.value}`}
            />
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2 pb-4 border-b border-line">
        <div className="font-mono uppercase tracking-wider text-muted text-[11px]">Brands</div>
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted" />
          <input
            type="text"
            placeholder="Search brand..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            data-testid="filter-brand-search-input"
            className="w-full pl-8 pr-2 py-1.5 border border-line text-xs bg-paper focus:outline-none focus:border-ink"
          />
        </div>
        <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
          {filteredBrands.map((brand) => (
            <Checkbox
              key={brand}
              id={`brand-${brand}`}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggleArray('brand', brand)}
              data-testid={`filter-brand-${brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

