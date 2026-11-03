import React from 'react';
import { useUIStore, type ToastItem } from '@/stores/ui.store';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
  'data-testid'?: string;
}

export const Toast: React.FC<ToastProps> = ({
  toast,
  onDismiss,
  'data-testid': testId = 'toast-notification',
}) => {
  const icons = {
    info: <Info className="h-4 w-4 text-ink flex-shrink-0" />,
    success: <CheckCircle2 className="h-4 w-4 text-ok flex-shrink-0" />,
    warn: <AlertTriangle className="h-4 w-4 text-warn flex-shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-danger flex-shrink-0" />,
  };

  return (
    <div
      role="status"
      data-testid={testId}
      className={cn(
        'flex items-center justify-between gap-3 px-4 py-3 bg-paper border border-line shadow-lg',
        'min-w-[280px] max-w-sm rounded-none animate-in fade-in slide-in-from-bottom-2'
      )}
    >
      <div className="flex items-center gap-2.5">
        {icons[toast.type]}
        <p className="text-xs text-ink font-normal">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        data-testid={`${testId}-dismiss`}
        className="text-muted hover:text-ink transition-colors p-0.5 focus-visible:outline-none"
        aria-label="Dismiss toast"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-auto"
      data-testid="toast-container"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

