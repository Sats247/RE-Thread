import React from 'react';
import { Button } from '@/shared/ui';
import { Lock } from 'lucide-react';
import { getImageUrl } from '@/shared/lib/image';

export interface GuestGateCardProps {
  onUnlockClick: () => void;
}

export const GuestGateCard: React.FC<GuestGateCardProps> = ({ onUnlockClick }) => {
  return (
    <div className="relative mt-12 w-full select-none" data-testid="guest-gate-card">
      {/* Blurred peek row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 blur-md opacity-40 pointer-events-none">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="aspect-[3/4] bg-mist overflow-hidden">
            <img
              src={getImageUrl(`peek-${n}`, 400, 500)}
              alt="Blurred preview"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Centered Overlay Card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-paper border border-line p-6 sm:p-8 max-w-md w-full text-center shadow-xl space-y-4">
          <div className="w-10 h-10 border border-line bg-mist flex items-center justify-center mx-auto text-ink">
            <Lock className="h-5 w-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-base font-medium uppercase tracking-wider text-ink mb-1.5">
              Explore 60+ More Drops
            </h3>
            <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">
              Sign up or log in to view the complete catalog of verified second-hand listings across Bengaluru.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={onUnlockClick}
            data-testid="guest-gate-unlock-btn"
          >
            Log In or Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

