import React, { useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  'data-testid'?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      id: customId,
      checked,
      disabled,
      'data-testid': testId = 'checkbox-input',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;

    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="inline-flex items-start cursor-pointer select-none group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={id}
              checked={checked}
              disabled={disabled}
              data-testid={testId}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                'w-4 h-4 border border-line bg-paper rounded-none transition-colors duration-150',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-1',
                'peer-checked:bg-ink peer-checked:border-ink',
                'peer-disabled:bg-mist peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                error && 'border-danger',
                className
              )}
            >
              <Check className="h-3.5 w-3.5 text-paper stroke-[2.5] hidden peer-checked:block" />
            </div>
          </div>
          {(label || description) && (
            <div className="ml-2.5 text-sm text-left">
              {label && <span className="font-normal text-ink group-hover:text-ink-soft">{label}</span>}
              {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
            </div>
          )}
        </label>
        {error && <p className="text-xs text-danger ml-6">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

