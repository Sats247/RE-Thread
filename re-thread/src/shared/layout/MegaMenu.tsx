import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/shared/lib/image';

export interface MegaMenuProps {
  section: 'buy' | 'rent' | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ section, onClose }) => {
  if (!section) return null;

  const buyHighlights = [
    { label: 'New Arrivals', href: `${ROUTES.BROWSE}?filter=new` },
    { label: 'Verified Sellers', href: `${ROUTES.BROWSE}?verifiedOnly=true` },
    { label: 'Under ₹999', href: `${ROUTES.BROWSE}?priceMax=999` },
    { label: 'Premium & Designer', href: `${ROUTES.BROWSE}?filter=premium` },
    { label: 'Combos & Bundles', href: ROUTES.OFFERS },
  ];

  const buyShops = [
    { label: 'Indiranagar Vintage Edit', href: `${ROUTES.BROWSE}?locality=Indiranagar` },
    { label: 'Koramangala Streetwear', href: `${ROUTES.BROWSE}?locality=Koramangala` },
    { label: 'Ethnic & Festive Thrift', href: `${ROUTES.BROWSE}?category=festive` },
    { label: 'Basavanagudi Silk Vault', href: `${ROUTES.BROWSE}?locality=Basavanagudi` },
  ];

  const rentHighlights = [
    { label: 'Tuxedos & Black Tie', href: `${ROUTES.RENT}?category=tuxedo` },
    { label: 'Sherwanis & Bandhgalas', href: `${ROUTES.RENT}?category=sherwani` },
    { label: 'Bridal & Party Lehengas', href: `${ROUTES.RENT}?category=lehenga` },
    { label: 'Designer Evening Gowns', href: `${ROUTES.RENT}?category=gown` },
    { label: 'Festive & Heritage Sarees', href: `${ROUTES.RENT}?category=saree` },
  ];

  const rentOccasions = [
    { label: 'Weddings & Receptions', href: `${ROUTES.RENT}?occasion=wedding` },
    { label: 'Cocktail & Club Nights', href: `${ROUTES.RENT}?occasion=club` },
    { label: 'College & Convocations', href: `${ROUTES.RENT}?occasion=college` },
    { label: 'Pre-wedding Photoshoots', href: `${ROUTES.RENT}?occasion=party` },
  ];

  const highlights = section === 'buy' ? buyHighlights : rentHighlights;
  const secondary = section === 'buy' ? buyShops : rentOccasions;
  const secondaryHeader = section === 'buy' ? 'FEATURED SHOPS' : 'OCCASIONS';

  return (
    <>
      {/* Dim overlay */}
      <div
        className="fixed inset-0 top-[138px] z-30 bg-black/40 backdrop-blur-none transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        data-testid="mega-menu"
        className="absolute top-full left-0 right-0 z-40 bg-paper border-b border-line shadow-sm"
        onMouseLeave={onClose}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-12 gap-8 text-left">
          {/* Column 1: Highlights */}
          <div className="col-span-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-4">
              HIGHLIGHTS
            </span>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="text-sm font-normal text-ink hover:text-muted transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Secondary / Shops */}
          <div className="col-span-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-4">
              {secondaryHeader}
            </span>
            <ul className="space-y-3">
              {secondary.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="text-sm font-normal text-ink hover:text-muted transition-colors block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Promo Card 1 */}
          <div className="col-span-3">
            <Link
              to={section === 'buy' ? `${ROUTES.BROWSE}?filter=curated` : `${ROUTES.RENT}?filter=curated`}
              onClick={onClose}
              className="group relative block aspect-[4/5] overflow-hidden bg-mist"
            >
              <img
                src={getImageUrl(section === 'buy' ? 'mega-buy-1' : 'mega-rent-1', 400, 500)}
                alt="Curated collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white text-xs uppercase tracking-widest font-medium">
                  {section === 'buy' ? 'Curated Vintage' : 'Occasion Wear'}
                </span>
                <span className="text-white/80 text-[11px] inline-flex items-center gap-1 mt-1">
                  Explore now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>

          {/* Column 4: Promo Card 2 */}
          <div className="col-span-3">
            <Link
              to={ROUTES.SELL}
              onClick={onClose}
              className="group relative block aspect-[4/5] overflow-hidden bg-mist"
            >
              <img
                src={getImageUrl(section === 'buy' ? 'mega-buy-2' : 'mega-rent-2', 400, 500)}
                alt="Sell or Rent your wardrobe"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white text-xs uppercase tracking-widest font-medium">
                  {section === 'buy' ? 'Sell Your Wardrobe' : 'Rent Out Your Suits'}
                </span>
                <span className="text-white/80 text-[11px] inline-flex items-center gap-1 mt-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

