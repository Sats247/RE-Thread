import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { ArrowRight, Check } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useUIStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    addToast({
      type: 'success',
      message: 'Subscribed to early drop updates!',
    });
  };

  return (
    <footer className="bg-mist border-t border-line text-ink pt-12 pb-24 md:pb-12 select-none" data-testid="footer-section">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-line text-left">
          {/* Column 1: Account */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-ink mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <Link to={ROUTES.AUTH} className="hover:text-ink transition-colors">
                  Log In / Sign Up
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ORDERS} className="hover:text-ink transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RENTALS} className="hover:text-ink transition-colors">
                  My Rentals
                </Link>
              </li>
              <li>
                <Link to={ROUTES.WISHLIST} className="hover:text-ink transition-colors">
                  Saved Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-ink mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <Link to={ROUTES.STORIES} className="hover:text-ink transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to={ROUTES.STORIES} className="hover:text-ink transition-colors">
                  Editorial Stories
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SELL} className="hover:text-ink transition-colors">
                  Sell On RE-thread
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SELLER_DASHBOARD} className="hover:text-ink transition-colors">
                  Seller Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Help */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-ink mb-4">
              Get Help
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <Link to={ROUTES.SUPPORT} className="hover:text-ink transition-colors">
                  Help Center & FAQ
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SUPPORT} className="hover:text-ink transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RENT} className="hover:text-ink transition-colors">
                  Rental Terms
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SUPPORT_NEW} className="hover:text-ink transition-colors">
                  Report a Grievance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-ink mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <a href="#instagram" className="hover:text-ink transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#twitter" className="hover:text-ink transition-colors">
                  X / Twitter
                </a>
              </li>
              <li>
                <span className="text-muted block">Bengaluru, Karnataka</span>
              </li>
              <li>
                <span className="font-mono text-muted block">hello@re-thread.in</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter Email Capture */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-ink mb-2">
              Stay in the loop
            </h4>
            <p className="text-xs text-muted mb-4 leading-relaxed">
              Sign up for curated drop announcements, vintage previews, and Bengaluru community swap events.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-paper border border-line text-xs text-ok">
                <Check className="h-4 w-4" />
                <span>You are on the list for early drop notifications.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  data-testid="footer-email-input"
                  className="flex-1 bg-paper border border-line rounded-none px-3.5 py-2.5 text-xs focus:outline-none focus:border-ink placeholder:text-muted"
                />
                <button
                  type="submit"
                  data-testid="footer-email-submit"
                  aria-label="Subscribe"
                  className="bg-ink text-paper px-4 py-2.5 hover:bg-ink-soft transition-colors flex items-center justify-center rounded-none"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to={ROUTES.SUPPORT} className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link to={ROUTES.SUPPORT} className="hover:text-ink transition-colors">
              Terms of Service
            </Link>
            <Link to={ROUTES.SUPPORT} className="hover:text-ink transition-colors">
              Verification Standards
            </Link>
            <Link to={ROUTES.KITCHEN_SINK} className="hover:text-ink font-mono text-[11px] underline">
              Kitchen Sink
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span>© 2026 RE-thread Technologies Inc.</span>
            <span>·</span>
            <span>Bengaluru</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

