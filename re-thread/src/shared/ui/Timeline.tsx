import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Check, Circle } from 'lucide-react';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'pending' | 'failed';
  note?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  'data-testid'?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className,
  'data-testid': testId = 'status-timeline',
}) => {
  return (
    <div className={cn('relative pl-6 sm:pl-8', className)} data-testid={testId}>
      {/* Vertical bar */}
      <div
        className="absolute top-2 bottom-2 left-2.5 sm:left-3.5 w-[1px] bg-line -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {items.map((item, idx) => {
          const isDone = item.status === 'completed';
          const isCurrent = item.status === 'current';
          const isFailed = item.status === 'failed';

          return (
            <div
              key={item.id}
              className="relative flex items-start group"
              data-testid={`${testId}-item-${idx}`}
            >
              {/* Dot / Icon */}
              <div
                className={cn(
                  'absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 flex items-center justify-center border bg-paper -translate-x-1/2 transition-colors',
                  isDone && 'bg-ink border-ink text-paper',
                  isCurrent && 'border-ink text-ink ring-4 ring-mist',
                  isFailed && 'bg-danger border-danger text-paper',
                  !isDone && !isCurrent && !isFailed && 'border-line text-muted'
                )}
              >
                {isDone ? (
                  <Check className="h-3 w-3 stroke-[2.5]" />
                ) : isFailed ? (
                  <span className="text-[10px] font-bold">!</span>
                ) : (
                  <Circle className="h-1.5 w-1.5 fill-current" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 ml-2 text-left">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4
                    className={cn(
                      'text-xs uppercase tracking-wider font-medium',
                      isCurrent ? 'text-ink font-semibold' : 'text-ink-soft'
                    )}
                  >
                    {item.title}
                  </h4>
                  {item.timestamp && (
                    <span className="text-[11px] text-muted font-mono">
                      {item.timestamp}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-xs text-muted mt-0.5">{item.subtitle}</p>
                )}
                {item.note && (
                  <div className="mt-1.5 p-2 bg-mist border border-line text-xs text-ink-soft">
                    {item.note}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

