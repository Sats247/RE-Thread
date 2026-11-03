import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { X, Heart, ShoppingBag, User as UserIcon, Calendar, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useWishlistStore } from '@/stores/wishlist.store';
import { useCartStore } from '@/stores/cart.store';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const { user } = useAuthStore();
  const wishlistCount = useWishlistStore((s) => s.getCount());
  const cartCount = useCartStore((s) => s.getCount());

  if (!open) return null;

  const categories = [
    { label: 'New Arrivals', href: `${ROUTES.BROWSE}?filter=new` },
    { label: 'Holiday & Occasions', href: `${ROUTES.BROWSE}?filter=occasions` },
    { label: 'Tops & Shirts', href: `${ROUTES.BROWSE}?category=tops` },
    { label: 'Bottoms & Denim', href: `${ROUTES.BROWSE}?category=bottoms` },
    { label: 'Ethnic & Festive', href: `${ROUTES.BROWSE}?category=ethnic` },
    { label: 'Outerwear', href: `${ROUTES.BROWSE}?category=outerwear` },
    { label: 'Shoes & Bags', href: `${ROUTES.BROWSE}?category=shoes-bags` },
    { label: 'Sale (Up to 70% off)', href: `${ROUTES.BROWSE}?filter=sale`, isSale: true },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-testid="mobile-menu"
      className="fixed inset-0 z-50 flex flex-col bg-paper transition-transform duration-200"
    >
      {/* Mobile Menu Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <Link
          to={ROUTES.HOME}
          onClick={onClose}
          className="font-light tracking-[0.2em] text-lg uppercase text-ink"
        >
          RE-thread
        </Link>
        <button
          type="button"
          onClick={onClose}
          data-testid="mobile-menu-close"
          className="p-1 text-muted hover:text-ink focus-visible:outline-none"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8 text-left">
        {/* Main 4 Navigation Sections */}
        <div className="space-y-4">
          <Link
            to={ROUTES.BROWSE}
            onClick={onClose}
            data-testid="mobile-nav-buy"
            className="flex items-center justify-between text-xl font-light tracking-wider text-ink py-1"
          >
            <span>BUY</span>
            <ArrowRight className="h-4 w-4 text-muted" />
          </Link>
          <Link
            to={ROUTES.RENT}
            onClick={onClose}
            data-testid="mobile-nav-rent"
            className="flex items-center justify-between text-xl font-light tracking-wider text-ink py-1"
          >
            <span>RENT</span>
            <ArrowRight className="h-4 w-4 text-muted" />
          </Link>
          <Link
            to={ROUTES.SELL}
            onClick={onClose}
            data-testid="mobile-nav-sell"
            className="flex items-center justify-between text-xl font-light tracking-wider text-ink py-1"
          >
            <span>SELL</span>
            <ArrowRight className="h-4 w-4 text-muted" />
          </Link>
          <Link
            to={ROUTES.STORIES}
            onClick={onClose}
            data-testid="mobile-nav-stories"
            className="flex items-center justify-between text-xl font-light tracking-wider text-ink py-1"
          >
            <span>STORIES</span>
            <ArrowRight className="h-4 w-4 text-muted" />
          </Link>
        </div>

        {/* Categories */}
        <div className="pt-4 border-t border-line">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-3">
            SHOP BY CATEGORY
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                onClick={onClose}
                className={`text-xs py-1.5 transition-colors ${
                  cat.isSale ? 'text-sale font-medium' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links / Account */}
        <div className="pt-4 border-t border-line space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-2">
            ACCOUNT & ORDERS
          </span>
          <Link
            to={user ? ROUTES.PROFILE : ROUTES.AUTH}
            onClick={onClose}
            className="flex items-center gap-3 text-xs uppercase tracking-wider text-ink py-1"
          >
            <UserIcon className="h-4 w-4 text-muted" />
            <span>{user ? `Profile (${user.name})` : 'Sign In / Register'}</span>
          </Link>
          <Link
            to={ROUTES.WISHLIST}
            onClick={onClose}
            className="flex items-center justify-between text-xs uppercase tracking-wider text-ink py-1"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-4 w-4 text-muted" />
              <span>Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="text-[10px] font-mono bg-mist px-2 py-0.5">{wishlistCount}</span>
            )}
          </Link>
          <Link
            to={ROUTES.CART}
            onClick={onClose}
            className="flex items-center justify-between text-xs uppercase tracking-wider text-ink py-1"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4 text-muted" />
              <span>Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="text-[10px] font-mono bg-ink text-paper px-2 py-0.5">{cartCount}</span>
            )}
          </Link>
          <Link
            to={ROUTES.RENTALS}
            onClick={onClose}
            className="flex items-center gap-3 text-xs uppercase tracking-wider text-ink py-1"
          >
            <Calendar className="h-4 w-4 text-muted" />
            <span>My Rentals</span>
          </Link>
        </div>
      </div>

      {/* Footer locality strip */}
      <div className="px-5 py-4 border-t border-line bg-mist flex items-center justify-between text-xs text-muted">
        <span>Bengaluru, Karnataka</span>
        <span className="font-mono">INR ₹</span>
      </div>
    </div>
  );
};

