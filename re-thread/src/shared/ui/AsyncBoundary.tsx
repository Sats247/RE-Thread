import React from 'react';
import { Skeleton } from './Skeleton';
import { ErrorState } from './ErrorState';

export interface AsyncStateLike<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: T | null;
  error: Error | null;
  reload?: () => void;
}

export interface AsyncBoundaryProps<T> {
  state: AsyncStateLike<T>;
  skeleton?: React.ReactNode;
  empty?: React.ReactNode;
  isEmpty?: (data: T) => boolean;
  children: React.ReactNode | ((data: T) => React.ReactNode);
  'data-testid'?: string;
}

export function AsyncBoundary<T>({
  state,
  skeleton,
  empty,
  isEmpty,
  children,
  'data-testid': testId = 'async-boundary',
}: AsyncBoundaryProps<T>): React.ReactElement | null {
  const { status, data, error, reload } = state;

  if (status === 'loading' || status === 'idle') {
    return (
      <div data-testid={`${testId}-loading`}>
        {skeleton || (
          <div className="space-y-4 p-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div data-testid={`${testId}-error`}>
        <ErrorState
          title="Unable to load content"
          message={error?.message || 'Something went wrong fetching data.'}
          onRetry={reload}
        />
      </div>
    );
  }

  if (status === 'success') {
    if (data === null || data === undefined) {
      return empty ? <div data-testid={`${testId}-empty`}>{empty}</div> : null;
    }

    if (isEmpty && isEmpty(data)) {
      return empty ? <div data-testid={`${testId}-empty`}>{empty}</div> : null;
    }

    return (
      <div data-testid={`${testId}-success`}>
        {typeof children === 'function' ? children(data) : children}
      </div>
    );
  }

  return null;
}

