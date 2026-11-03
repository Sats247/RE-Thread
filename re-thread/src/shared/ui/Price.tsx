import React from 'react';
import { formatINR } from '@/shared/lib/format';
import { cn } from '@/shared/lib/cn';

export interface PriceProps {
  amount: number;
  mrp?: number;
  rentalPeriod?: string; // e.g. "/ 3 days"
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  mrp,
  rentalPeriod,
  size = 'md',
  className,
  'data-testid': testId = 'price-display',
}) => {
  const hasDiscount = mrp !== undefined && mrp > amount;
  const discountPct = hasDiscount ? Math.round(((mrp - amount) / mrp) * 100) : 0;

  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm font-medium',
    lg: 'text-lg font-semibold',
  };

  return (
    <div
      className={cn('inline-flex items-baseline flex-wrap gap-1.5', className)}
      data-testid={testId}
    >
      <span className={cn('text-ink font-mono', fontSizes[size])}>
        {formatINR(amount)}
      </span>
      {rentalPeriod && (
        <span className="text-xs text-muted font-normal">
          {rentalPeriod}
        </span>
      )}
      {hasDiscount && (
        <>
          <span className="text-xs text-muted line-through font-mono">
            {formatINR(mrp)}
          </span>
          {discountPct > 0 && (
            <span className="text-xs text-sale font-medium">
              ({discountPct}% off)
            </span>
          )}
        </>
      )}
    </div>
  );
};

