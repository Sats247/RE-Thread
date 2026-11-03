import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface RatingProps {
  value: number; // 0 to 5
  count?: number;
  size?: 'sm' | 'md';
  interactive?: boolean;
  onChange?: (val: number) => void;
  className?: string;
  'data-testid'?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = 'sm',
  interactive = false,
  onChange,
  className,
  'data-testid': testId = 'star-rating',
}) => {
  const stars = [1, 2, 3, 4, 5];
  const starSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
  };

  return (
    <div
      className={cn('inline-flex items-center gap-1.5 select-none', className)}
      data-testid={testId}
      aria-label={`Rating: ${value} out of 5 stars`}
    >
      <div className="flex items-center gap-0.5">
        {stars.map((starIndex) => {
          const isFilled = starIndex <= Math.round(value);
          return (
            <button
              key={starIndex}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starIndex)}
              data-testid={`${testId}-star-${starIndex}`}
              className={cn(
                'transition-colors p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink',
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default pointer-events-none'
              )}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled ? 'fill-ink text-ink' : 'fill-none text-line stroke-line'
                )}
              />
            </button>
          );
        })}
      </div>
      {value > 0 && (
        <span className="text-xs font-medium text-ink ml-0.5">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-muted">
          ({count})
        </span>
      )}
    </div>
  );
};

