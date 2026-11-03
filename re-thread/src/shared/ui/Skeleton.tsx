import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
  'data-testid'?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className,
  style,
  'data-testid': testId = 'loading-skeleton',
  ...props
}) => {
  return (
    <div
      data-testid={testId}
      className={cn(
        'animate-pulse bg-mist',
        variant === 'circle' ? 'rounded-full' : 'rounded-none',
        variant === 'text' ? 'h-4 w-full rounded-none my-1' : '',
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};

