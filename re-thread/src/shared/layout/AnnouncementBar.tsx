import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';

export interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = 'Free courier over ₹999 across Bengaluru',
  linkText = 'Sign up for early drops',
  linkHref = ROUTES.AUTH,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="banner"
      data-testid="announcement-bar"
      className="bg-ink text-paper text-xs py-2 px-4 flex items-center justify-between select-none"
    >
      <div className="hidden sm:block w-16" />

      <div className="flex-1 flex items-center justify-center text-center gap-1.5 font-normal tracking-wide">
        <span>{message}</span>
        <span className="hidden sm:inline">·</span>
        <Link
          to={linkHref}
          data-testid="announcement-link"
          className="underline hover:text-mist inline-flex items-center gap-0.5 font-medium ml-1"
        >
          {linkText}
          <ArrowRight className="h-3 w-3 inline ml-0.5" />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono text-muted/80 tracking-wider hidden sm:inline">
          INR ₹
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          data-testid="announcement-dismiss"
          className="sm:hidden text-muted hover:text-paper p-0.5 focus-visible:outline-none"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

