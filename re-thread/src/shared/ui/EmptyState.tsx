import React from 'react';
import { Button } from './Button';
import { PackageOpen } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  'data-testid'?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  'data-testid': testId = 'empty-state-view',
}) => {
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-mist border border-line rounded-none',
        className
      )}
    >
      <div className="text-muted mb-4">
        {icon || <PackageOpen className="h-10 w-10 stroke-[1.25]" />}
      </div>
      <h3 className="text-base font-normal tracking-wide text-ink mb-1.5 uppercase">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-muted max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="sm"
          onClick={onAction}
          data-testid={`${testId}-cta`}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

