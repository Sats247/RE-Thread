import React from 'react';
import { cn } from '@/shared/lib/cn';
import { X } from 'lucide-react';

export interface ChipProps {
  label: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  'data-testid'?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  onClick,
  onRemove,
  className,
  'data-testid': testId = 'tag-chip',
}) => {
  const isClickable = Boolean(onClick);

  return (
    <span
      data-testid={testId}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs uppercase tracking-wider rounded-full border transition-colors select-none',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink',
        active
          ? 'bg-ink text-paper border-ink'
          : 'bg-paper text-ink border-line hover:border-ink/60',
        isClickable && 'cursor-pointer',
        className
      )}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          data-testid={`${testId}-remove`}
          className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 focus-visible:outline-none"
          aria-label="Remove chip"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

