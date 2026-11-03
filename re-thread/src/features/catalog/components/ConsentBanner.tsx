import React, { useState, useEffect } from 'react';
import { useActivityStore } from '@/stores/activity.store';
import { Button } from '@/shared/ui';
import { Shield } from 'lucide-react';

export const ConsentBanner: React.FC = () => {
  const { setConsent } = useActivityStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't made a choice yet
    const recorded = localStorage.getItem('rt:consent-choice');
    if (!recorded) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleChoice = (accepted: boolean) => {
    setConsent(accepted);
    localStorage.setItem('rt:consent-choice', accepted ? 'accepted' : 'declined');
    setVisible(false);
  };

  return (
    <aside
      aria-label="Privacy & Personalization Preferences"
      data-testid="consent-banner"
      className="fixed bottom-16 md:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-paper border border-line p-5 shadow-2xl animate-in slide-in-from-bottom-3 duration-200 text-left select-none"
    >
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 stroke-[1.5] text-ink shrink-0 mt-0.5" />
        <div className="space-y-3">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-ink">
              Tailored For You (Client-Side Privacy)
            </h4>
            <p className="text-xs text-muted leading-relaxed mt-1">
              We store your viewed occasions and styles locally on your device to curate your personalized “For You” feed. No personal data is sent to third parties.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleChoice(true)}
              data-testid="consent-accept-btn"
            >
              Accept Personalization
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleChoice(false)}
              data-testid="consent-decline-btn"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
