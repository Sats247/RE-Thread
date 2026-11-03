import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { getImageUrl } from '@/shared/lib/image';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[520px] sm:h-[620px] bg-ink select-none overflow-hidden" data-testid="hero-banner">
      {/* Background Image with subtle dark overlay */}
      <img
        src={getImageUrl('editorial-hero-fashion', 1600, 900)}
        alt="RE-thread editorial fashion collection"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      {/* Hero Content */}
      <div className="relative h-full max-w-[1280px] mx-auto px-6 flex flex-col items-center justify-center text-center text-paper">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-mist mb-3">
          Circular Fashion · Bengaluru
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-paper uppercase max-w-3xl leading-[1.1] mb-5">
          Wear it again.
        </h1>
        <p className="text-sm sm:text-base text-mist/90 max-w-xl font-light leading-relaxed mb-8">
          The curated marketplace to buy, rent, and sell pre-loved clothing from verified individuals, vendors, and offline stores across Bengaluru.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={ROUTES.BROWSE}
            data-testid="hero-shop-btn"
            className="px-8 py-3.5 bg-paper text-ink hover:bg-mist text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Shop the Collection
          </Link>
          <Link
            to={ROUTES.SELL}
            data-testid="hero-sell-btn"
            className="px-8 py-3.5 border border-paper text-paper hover:bg-paper/10 text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </section>
  );
};

