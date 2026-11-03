import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  'data-testid'?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
  'data-testid': testId = 'form-stepper',
}) => {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)} data-testid={testId}>
      <ol className="flex items-center w-full">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isClickable = Boolean(onStepClick && idx <= currentStep);

          return (
            <li
              key={step.id}
              className={cn(
                'relative flex-1 flex flex-col items-center sm:items-start group',
                idx !== steps.length - 1 && 'pr-4 sm:pr-8'
              )}
            >
              {/* Connecting line */}
              {idx !== steps.length - 1 && (
                <div
                  className="absolute top-4 left-[50%] sm:left-4 w-full h-[1px] bg-line -z-10"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      'h-full bg-ink transition-all duration-300',
                      isCompleted ? 'w-full' : 'w-0'
                    )}
                  />
                </div>
              )}

              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(idx)}
                data-testid={`${testId}-step-${idx}`}
                className={cn(
                  'flex items-center gap-2.5 bg-paper px-1 py-1 rounded-none text-left',
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'w-7 h-7 flex items-center justify-center text-xs font-mono border transition-colors',
                    isCompleted && 'bg-ink border-ink text-paper',
                    isCurrent && 'border-ink text-ink font-semibold',
                    !isCompleted && !isCurrent && 'border-line text-muted bg-paper'
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : idx + 1}
                </span>
                <div className="hidden sm:block">
                  <p
                    className={cn(
                      'text-xs uppercase tracking-wider font-medium',
                      isCurrent ? 'text-ink' : 'text-muted'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[11px] text-muted">{step.description}</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

