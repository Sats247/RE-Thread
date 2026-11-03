import React, { useState } from 'react';
import {
  Button,
  Modal,
  Drawer,
  BottomSheet,
  Skeleton,
  EmptyState,
  ErrorState,
  AsyncBoundary,
} from '@/shared/ui';
import { useUIStore } from '@/stores/ui.store';

export const KitchenSinkFeedback: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { addToast } = useUIStore();
  const [asyncStatus, setAsyncStatus] = useState<'loading' | 'success' | 'error'>('success');

  return (
    <section className="space-y-8 text-left">
      <div>
        <h2 className="text-base font-semibold uppercase tracking-wider text-ink mb-1">
          3. Feedback, Overlays & Async Boundaries
        </h2>
        <p className="text-xs text-muted">Modal, Drawer, BottomSheet, Toasts, Empty, Error, Skeletons.</p>
      </div>

      {/* Overlay triggers */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-mono text-muted block">Overlays & Modals</span>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="outline" size="sm" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Button variant="outline" size="sm" onClick={() => setSheetOpen(true)}>Open Bottom Sheet</Button>
        </div>
      </div>

      {/* Toast triggers */}
      <div className="space-y-3 pt-2">
        <span className="text-xs uppercase font-mono text-muted block">Toast Notifications</span>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => addToast({ type: 'success', message: 'Item added to your bag!' })}>Success</Button>
          <Button variant="secondary" size="sm" onClick={() => addToast({ type: 'info', message: 'Bengaluru postal code saved.' })}>Info</Button>
          <Button variant="secondary" size="sm" onClick={() => addToast({ type: 'warn', message: 'Rental return due in 24 hours.' })}>Warning</Button>
          <Button variant="secondary" size="sm" onClick={() => addToast({ type: 'error', message: 'Failed to verify photo clarity.' })}>Error</Button>
        </div>
      </div>

      {/* Skeletons, EmptyState & ErrorState */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="space-y-3">
          <span className="text-xs uppercase font-mono text-muted block">Loading Skeletons</span>
          <div className="p-4 border border-line bg-paper space-y-3">
            <Skeleton className="h-28 w-full" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </div>

        <div>
          <span className="text-xs uppercase font-mono text-muted block mb-3">Empty State</span>
          <EmptyState
            title="No Listings Found"
            description="Try adjusting your occasion or size filters."
            actionLabel="Reset Filters"
            onAction={() => alert('Reset filters')}
          />
        </div>

        <div>
          <span className="text-xs uppercase font-mono text-muted block mb-3">Error State</span>
          <ErrorState
            title="Connection Interrupted"
            message="Unable to fetch Bengaluru seller listings."
            onRetry={() => alert('Retrying fetch...')}
          />
        </div>
      </div>

      {/* AsyncBoundary demo */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-mono text-muted block">AsyncBoundary Container</span>
          <div className="flex gap-2">
            {(['loading', 'success', 'error'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setAsyncStatus(st)}
                className={`text-[10px] uppercase font-mono px-2 py-0.5 border ${
                  asyncStatus === st ? 'bg-ink text-paper border-ink' : 'bg-mist text-muted border-line'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
        <div className="border border-line p-4">
          <AsyncBoundary
            state={{
              status: asyncStatus,
              data: { title: 'Async Data Successfully Rendered' },
              error: asyncStatus === 'error' ? new Error('Mock API request failed.') : null,
              reload: () => setAsyncStatus('success'),
            }}
          >
            {(data: { title: string }) => (
              <div className="p-4 bg-mist text-xs text-ink font-mono">{data.title}</div>
            )}
          </AsyncBoundary>
        </div>
      </div>

      {/* Modals & Drawers */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Quick Size Guide"
        description="Standard Indian garment measurements in inches."
      >
        <div className="space-y-4 py-2 text-xs text-ink">
          <p>Please double-check measurements since pre-owned items are unique (qty 1).</p>
          <div className="p-3 bg-mist font-mono text-[11px] space-y-1">
            <p>Size M · Chest: 38-40" · Waist: 32-34"</p>
            <p>Size L · Chest: 42-44" · Waist: 36-38"</p>
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={() => setModalOpen(false)}>
            Close Size Guide
          </Button>
        </div>
      </Modal>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Custom Side Drawer"
        footer={<Button variant="primary" size="md" className="w-full" onClick={() => setDrawerOpen(false)}>Done</Button>}
      >
        <p className="text-xs text-muted leading-relaxed">
          Drawers slide smoothly from the right on desktop and expand responsively.
        </p>
      </Drawer>

      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title="Mobile Filter Sheet">
        <div className="space-y-4 py-2">
          <p className="text-xs text-muted">Ideal for selecting filters, price ranges, and sorts on touch devices.</p>
          <Button variant="primary" size="md" className="w-full" onClick={() => setSheetOpen(false)}>Apply</Button>
        </div>
      </BottomSheet>
    </section>
  );
};
