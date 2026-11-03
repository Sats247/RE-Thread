import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { ALL_OCCASIONS } from '@/config/constants';
import type { Occasion } from '@/shared/types';
import { Sparkles } from 'lucide-react';

interface OccasionChipsRowProps {
  activeOccasion?: string;
  onSelect?: (occasion: Occasion) => void;
  className?: string;
}

export const OccasionChipsRow: React.FC<OccasionChipsRowProps> = ({
  activeOccasion,
  onSelect,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleChipClick = (occasion: Occasion) => {
    if (onSelect) {
      onSelect(occasion);
    } else {
      navigate(`${ROUTES.BROWSE}?occasion=${encodeURIComponent(occasion)}`);
    }
  };

  const formatLabel = (occ: string) => {
    return occ
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <section
      aria-label="Occasion curation"
      className={`py-6 border-b border-line bg-paper ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-muted">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shop By Occasion</span>
          </div>
          <span className="text-[11px] text-muted">21 curated aesthetics</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {ALL_OCCASIONS.map((occ) => {
            const isSelected = activeOccasion === occ;
            return (
              <button
                key={occ}
                type="button"
                data-testid={`occasion-chip-${occ}`}
                onClick={() => handleChipClick(occ as Occasion)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-all border font-medium rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
                  isSelected
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper text-muted border-line hover:border-ink hover:text-ink'
                }`}
              >
                {formatLabel(occ)}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

