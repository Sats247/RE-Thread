import React from 'react';
import { Droplets, Wind, RefreshCw } from 'lucide-react';

export const ImpactBanner: React.FC = () => {
  return (
    <section className="bg-accent-green text-paper py-12 sm:py-16 select-none" data-testid="impact-banner">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-paper/80 block mb-2">
          Environmental Accountability
        </span>
        <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-wider text-paper mb-3">
          Our Bengaluru Impact
        </h2>
        <p className="text-xs sm:text-sm text-paper/80 max-w-xl mx-auto font-light leading-relaxed mb-10">
          Every piece bought or rented second-hand prevents clean water waste, chemical dye runoff, and textile landfill build-up across Karnataka.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-paper/20">
          <div className="pt-6 sm:pt-0 flex flex-col items-center">
            <Droplets className="h-6 w-6 stroke-[1.5] mb-2 text-paper/90" />
            <span className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-paper">
              480,000 L
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-paper/80 mt-1">
              Clean Water Saved
            </span>
          </div>

          <div className="pt-6 sm:pt-0 flex flex-col items-center">
            <Wind className="h-6 w-6 stroke-[1.5] mb-2 text-paper/90" />
            <span className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-paper">
              12,400 kg
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-paper/80 mt-1">
              CO₂ Emissions Prevented
            </span>
          </div>

          <div className="pt-6 sm:pt-0 flex flex-col items-center">
            <RefreshCw className="h-6 w-6 stroke-[1.5] mb-2 text-paper/90" />
            <span className="text-3xl sm:text-4xl font-light font-mono tracking-tight text-paper">
              3,250+
            </span>
            <span className="text-xs uppercase tracking-wider font-medium text-paper/80 mt-1">
              Garments Kept in Circulation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

