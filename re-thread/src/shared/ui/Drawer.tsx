import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'right' | 'left';
  className?: string;
  'data-testid'?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  side = 'right',
  className,
  'data-testid': testId = 'drawer-panel',
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/50 transition-opacity animate-in fade-in"
          data-testid={`${testId}-overlay`}
        />
        <DialogPrimitive.Content
          data-testid={testId}
          className={cn(
            'fixed inset-y-0 z-50 flex flex-col bg-paper w-full sm:max-w-md border-line shadow-none transition ease-in-out duration-200',
            side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
            className
          )}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-line">
            {title && (
              <DialogPrimitive.Title className="text-base font-medium uppercase tracking-wider text-ink">
                {title}
              </DialogPrimitive.Title>
            )}
            <DialogPrimitive.Close
              data-testid={`${testId}-close`}
              className="text-muted hover:text-ink transition-colors p-1 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          {footer && <div className="border-t border-line p-6 bg-paper">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

