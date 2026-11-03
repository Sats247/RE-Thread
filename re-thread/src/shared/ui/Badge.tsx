import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Check, AlertCircle, AlertTriangle, CheckCircle2, Tag } from 'lucide-react';

export type BadgeVariant = 'ok' | 'warn' | 'danger' | 'mist' | 'ink' | 'sale' | 'verified';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pill?: boolean;
  icon?: React.ReactNode;
  'data-testid'?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'mist',
  pill = false,
  icon,
  children,
  'data-testid': testId = 'status-badge',
  ...props
}) => {
  const variants = {
    ok: 'bg-green-50 text-ok border border-ok/20',
    warn: 'bg-amber-50 text-warn border border-warn/20',
    danger: 'bg-red-50 text-danger border border-danger/20',
    mist: 'bg-mist text-ink-soft border border-line',
    ink: 'bg-ink text-paper border border-ink',
    sale: 'bg-sale text-paper border border-sale',
    verified: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  const defaultIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case 'ok':
        return <Check className="h-3 w-3 mr-1" aria-hidden="true" />;
      case 'warn':
        return <AlertTriangle className="h-3 w-3 mr-1" aria-hidden="true" />;
      case 'danger':
        return <AlertCircle className="h-3 w-3 mr-1" aria-hidden="true" />;
      case 'sale':
        return <Tag className="h-3 w-3 mr-1" aria-hidden="true" />;
      case 'verified':
        return <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <span
      data-testid={testId}
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider',
        pill ? 'rounded-full' : 'rounded-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {defaultIcon()}
      {children}
    </span>
  );
};

