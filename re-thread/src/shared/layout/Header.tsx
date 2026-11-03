import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { Menu, Search, Heart, ShoppingBag, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useWishlistStore } from '@/stores/wishlist.store';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/shared/lib/cn';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const wishlistCount = useWishlistStore((s) => s.getCount());
  const cartCount = useCartStore((s) => s.getCount());
  const { openCart } = useUIStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'buy' | 'rent' | null>(null);

  const secondaryCategories = [
    { label: 'Holiday & Occasions', href: `${ROUTES.BROWSE}?occasion=holiday` },
    { label: 'New Arrivals', href: `${ROUTES.BROWSE}?sort=newest` },
    { label: 'Best-Sellers', href: `${ROUTES.BROWSE}?sort=popularity` },
    { label: 'Tops', href: `${ROUTES.BROWSE}?category=tops` },
    { label: 'Bottoms', href: `${ROUTES.BROWSE}?category=bottoms` },
    { label: 'Ethnic', href: `${ROUTES.BROWSE}?category=ethnic` },
    { label: 'Outerwear', href: `${ROUTES.BROWSE}?category=outerwear` },
    { label: 'Shoes & Bags', href: `${ROUTES.BROWSE}?category=shoes-bags` },
    { label: 'Sale', href: `${ROUTES.BROWSE}?sale=true`, isSale: true },
  ];

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-md border-b border-line select-none">
      {/* Main Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Mobile Hamburger or Desktop Primary Nav */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="header-mobile-menu-btn"
            className="md:hidden p-1.5 -ml-1.5 text-ink hover:text-muted focus-visible:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <button
              type="button"
              onMouseEnter={() => setActiveMegaMenu('buy')}
              onClick={() => setActiveMegaMenu((curr) => (curr === 'buy' ? null : 'buy'))}
              data-testid="nav-buy"
              className={cn(
                'text-[13px] uppercase tracking-widest font-medium py-5 transition-colors border-b-2',
                activeMegaMenu === 'buy' ? 'border-ink text-ink' : 'border-transparent text-ink hover:text-muted'
              )}
            >
              BUY
            </button>
            <button
              type="button"
              onMouseEnter={() => setActiveMegaMenu('rent')}
              onClick={() => setActiveMegaMenu((curr) => (curr === 'rent' ? null : 'rent'))}
              data-testid="nav-rent"
              className={cn(
                'text-[13px] uppercase tracking-widest font-medium py-5 transition-colors border-b-2',
                activeMegaMenu === 'rent' ? 'border-ink text-ink' : 'border-transparent text-ink hover:text-muted'
              )}
            >
              RENT
            </button>
            <NavLink
              to={ROUTES.SELL}
              onMouseEnter={() => setActiveMegaMenu(null)}
              data-testid="nav-sell"
              className={({ isActive }) =>
                cn(
                  'text-[13px] uppercase tracking-widest font-medium py-5 transition-colors border-b-2',
                  isActive ? 'border-ink text-ink' : 'border-transparent text-ink hover:text-muted'
                )
              }
            >
              SELL
            </NavLink>
            <NavLink
              to={ROUTES.STORIES}
              onMouseEnter={() => setActiveMegaMenu(null)}
              data-testid="nav-stories"
              className={({ isActive }) =>
                cn(
                  'text-[13px] uppercase tracking-widest font-medium py-5 transition-colors border-b-2',
                  isActive ? 'border-ink text-ink' : 'border-transparent text-ink hover:text-muted'
                )
              }
            >
              STORIES
            </NavLink>
          </nav>
        </div>

        {/* Center: Brand Wordmark */}
        <div className="flex-1 md:flex-initial text-center md:text-left">
          <Link
            to={ROUTES.HOME}
            data-testid="header-logo"
            className="text-xl sm:text-2xl font-light tracking-[0.22em] uppercase text-ink hover:opacity-85 transition-opacity"
          >
            RE-thread
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.SEARCH)}
            data-testid="header-search-btn"
            className="p-1.5 text-ink hover:text-muted transition-colors focus-visible:outline-none"
            aria-label="Search items"
          >
            <Search className="h-4 w-4 stroke-[1.75]" />
          </button>

          <Link
            to={user ? ROUTES.PROFILE : ROUTES.AUTH}
            data-testid="header-account-btn"
            className="hidden sm:inline-flex p-1.5 text-ink hover:text-muted transition-colors focus-visible:outline-none"
            aria-label="My Account"
          >
            <UserIcon className="h-4 w-4 stroke-[1.75]" />
          </Link>

          <Link
            to={ROUTES.WISHLIST}
            data-testid="header-wishlist-btn"
            className="relative p-1.5 text-ink hover:text-muted transition-colors focus-visible:outline-none"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-ink text-paper text-[9px] font-mono flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={openCart}
            data-testid="header-cart-btn"
            className="relative p-1.5 text-ink hover:text-muted transition-colors focus-visible:outline-none"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-ink text-paper text-[9px] font-mono flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Category Strip */}
      <nav
        aria-label="Secondary Category Navigation"
        className="border-t border-line/60 bg-paper overflow-x-auto no-scrollbar"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-start sm:justify-center gap-6 sm:gap-8 h-10 text-xs whitespace-nowrap">
          {secondaryCategories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.href}
              className={cn(
                'transition-colors tracking-wide',
                cat.isSale
                  ? 'text-sale font-medium hover:text-red-700'
                  : 'text-muted hover:text-ink'
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* MegaMenu Dropdown */}
      <MegaMenu section={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />

      {/* Mobile Drawer */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

