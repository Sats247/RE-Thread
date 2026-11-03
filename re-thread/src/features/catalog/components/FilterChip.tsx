import React from 'react';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  testId: string;
  onRemove: () => void;
}

/** Single removable filter chip pill */
export const FilterChip: React.FC<FilterChipProps> = ({ label, testId, onRemove }) => (
  <span
    data-testid={testId}
    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-mist text-ink text-xs font-medium border border-line"
  >
    <span>{label}</span>
    <button
      type="button"
      onClick={onRemove}
      className="hover:text-danger p-0.5"
      aria-label={`Remove ${label} filter`}
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);

interface ArrayFilterChipsProps {
  items: string[];
  keyPrefix: string;
  labelFn?: (v: string) => string;
  onRemove: (key: string, value: string) => void;
  filterKey: string;
}

/** Renders a removable chip for each item in an array filter (brands, sizes, etc.) */
export const ArrayFilterChips: React.FC<ArrayFilterChipsProps> = ({
  items,
  keyPrefix,
  filterKey,
  labelFn = (v) => v,
  onRemove,
}) => (
  <>
    {items.map((v) => (
      <FilterChip
        key={`${keyPrefix}-${v}`}
        label={labelFn(v)}
        testId={`filter-chip-${keyPrefix}-${v.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        onRemove={() => onRemove(filterKey, v)}
      />
    ))}
  </>
);

