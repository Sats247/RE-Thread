import React from 'react';
import { KitchenSinkForms } from './kitchen-sink/KitchenSinkForms';
import { KitchenSinkDataDisplay } from './kitchen-sink/KitchenSinkDataDisplay';
import { KitchenSinkFeedback } from './kitchen-sink/KitchenSinkFeedback';

export const KitchenSinkPage: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-line pb-6 text-left">
        <span className="text-xs uppercase font-mono tracking-widest text-muted">
          Design System & Primitives
        </span>
        <h1 className="text-3xl font-light tracking-tight text-ink mt-1">
          Kitchen Sink
        </h1>
        <p className="text-xs text-muted mt-2 max-w-xl">
          Visual verification of all 22 shared UI components, typography tokens, INR currency formatting, and responsive behaviors across 360px, 768px, and 1280px widths.
        </p>
      </div>

      <KitchenSinkForms />
      <KitchenSinkDataDisplay />
      <KitchenSinkFeedback />
    </div>
  );
};

export default KitchenSinkPage;

