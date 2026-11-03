import React, { useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  'data-testid'?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      children,
      id: customId,
      disabled,
      'data-testid': testId = 'select-field',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label htmlFor={id} className="text-xs uppercase tracking-wider text-muted font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            data-testid={testId}
            className={cn(
              'w-full bg-paper text-ink border border-line rounded-none px-3.5 py-2.5 text-sm appearance-none',
              'transition-colors duration-150 pr-10',
              'focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink',
              'disabled:bg-mist disabled:text-muted disabled:cursor-not-allowed',
              error && 'border-danger focus:border-danger focus:ring-danger',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown
            className="absolute right-3.5 h-4 w-4 pointer-events-none text-muted"
            aria-hidden="true"
          />
        </div>
        {error ? (
          <p className="text-xs text-danger mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

