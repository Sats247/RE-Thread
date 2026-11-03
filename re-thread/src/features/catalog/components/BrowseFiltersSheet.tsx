import React from 'react';
import type { CatalogFilterState } from '../hooks/useCatalogFilters';
import { BottomSheet, Button } from '@/shared/ui';
import { BrowseFilterControls } from './BrowseFilterControls';

interface BrowseFiltersSheetProps {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilterState;
  totalResults: number;
  onSetFilter: (key: string, value: string | undefined) => void;
  onToggleArray: (key: string, value: string) => void;
  onSetPriceRange: (min?: number, max?: number) => void;
  onToggleBoolean: (key: 'verifiedOnly' | 'returnable') => void;
  onClearAll: () => void;
}

export const BrowseFiltersSheet: React.FC<BrowseFiltersSheetProps> = ({
  open,
  onClose,
  filters,
  totalResults,
  onSetFilter,
  onToggleArray,
  onSetPriceRange,
  onToggleBoolean,
  onClearAll,
}) => {
  return (
    <BottomSheet
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title="FILTER CATALOG"
    >
      <div data-testid="browse-filters-sheet" className="p-4 space-y-6 pb-24">
        <BrowseFilterControls
          filters={filters}
          onSetFilter={onSetFilter}
          onToggleArray={onToggleArray}
          onSetPriceRange={onSetPriceRange}
          onToggleBoolean={onToggleBoolean}
          onClearAll={onClearAll}
        />

        <div className="sticky bottom-0 left-0 right-0 pt-4 bg-paper border-t border-line">
          <Button
            variant="primary"
            onClick={onClose}
            data-testid="filter-sheet-apply-btn"
            className="w-full"
          >
            {`Show ${totalResults} Results`}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

