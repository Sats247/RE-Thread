import React from 'react';
import { Button } from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  'data-testid'?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this content. Please try again.',
  onRetry,
  className,
  'data-testid': testId = 'error-state-view',
}) => {
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-mist border border-danger/30 rounded-none',
        className
      )}
    >
      <div className="text-danger mb-4">
        <AlertCircle className="h-10 w-10 stroke-[1.25]" />
      </div>
      <h3 className="text-base font-normal tracking-wide text-ink mb-1.5 uppercase">
        {title}
      </h3>
      <p className="text-xs text-muted max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          data-testid={`${testId}-retry`}
        >
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
};

