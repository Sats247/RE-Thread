import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { getImageUrl } from '@/shared/lib/image';

interface PromoItem {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  imageSeed: string;
}

export const PromoSection: React.FC = () => {
  const items: PromoItem[] = [
    {
      tag: 'FRESH DROPS',
      title: 'Weekly Vintage & Thrift Arrivals',
      description: 'Handpicked verified pieces from boutique sellers in Indiranagar & Koramangala.',
      buttonText: 'Shop New Arrivals',
      href: `${ROUTES.BROWSE}?sort=newest`,
      imageSeed: 'promo-vintage-arrivals',
    },
    {
      tag: 'RENT FOR LESS',
      title: 'Occasion & Black-Tie Rentals',
      description: 'Italian wool tuxedos, wedding sherwanis, and bridal lehengas with steam sanitization.',
      buttonText: 'Explore Rentals',
      href: ROUTES.RENT,
      imageSeed: 'promo-rent-tuxedos',
    },
    {
      tag: 'CIRCULAR WARDROBE',
      title: 'Turn Your Closet Into Income',
      description: 'List in minutes with AI photo checks. Enjoy discounted 8% platform fee when enabling returns.',
      buttonText: 'Start Selling',
      href: ROUTES.SELL,
      imageSeed: 'promo-sell-closet',
    },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 text-left select-none" data-testid="promo-cards-section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item, idx) => (
          <div
            key={item.title}
            data-testid={`promo-card-${idx}`}
            className="group relative flex flex-col justify-end min-h-[460px] p-6 sm:p-8 overflow-hidden bg-ink"
          >
            {/* Background Image */}
            <img
              src={getImageUrl(item.imageSeed, 600, 800)}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content Overlaid */}
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-mist block">
                {item.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-paper uppercase tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-mist/80 leading-relaxed font-light line-clamp-2">
                {item.description}
              </p>
              <div className="pt-2">
                <Link
                  to={item.href}
                  className="inline-block px-5 py-2.5 bg-paper text-ink hover:bg-mist text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

