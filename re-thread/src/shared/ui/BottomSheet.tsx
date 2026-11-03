import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onOpenChange,
  title,
  children,
  className,
  'data-testid': testId = 'bottom-sheet',
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
            'fixed inset-x-0 bottom-0 z-50 max-h-[85vh] flex flex-col bg-paper border-t border-line shadow-none',
            'transition ease-out duration-200 focus:outline-none',
            className
          )}
        >
          {/* Grab handle indicator */}
          <div className="w-12 h-1 bg-line mx-auto mt-3 rounded-full" />
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
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
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

