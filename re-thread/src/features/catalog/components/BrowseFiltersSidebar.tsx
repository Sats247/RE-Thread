import React from 'react';
import type { CatalogFilterState } from '../hooks/useCatalogFilters';
import { BrowseFilterControls } from './BrowseFilterControls';

interface BrowseFiltersSidebarProps {
  filters: CatalogFilterState;
  onSetFilter: (key: string, value: string | undefined) => void;
  onToggleArray: (key: string, value: string) => void;
  onSetPriceRange: (min?: number, max?: number) => void;
  onToggleBoolean: (key: 'verifiedOnly' | 'returnable') => void;
  onClearAll: () => void;
  className?: string;
}

export const BrowseFiltersSidebar: React.FC<BrowseFiltersSidebarProps> = ({
  filters,
  onSetFilter,
  onToggleArray,
  onSetPriceRange,
  onToggleBoolean,
  onClearAll,
  className = '',
}) => {
  return (
    <aside
      data-testid="browse-filters-sidebar"
      aria-label="Catalog filters sidebar"
      className={`hidden lg:block w-64 shrink-0 pr-6 border-r border-line py-2 ${className}`}
    >
      <BrowseFilterControls
        filters={filters}
        onSetFilter={onSetFilter}
        onToggleArray={onToggleArray}
        onSetPriceRange={onSetPriceRange}
        onToggleBoolean={onToggleBoolean}
        onClearAll={onClearAll}
      />
    </aside>
  );
};

