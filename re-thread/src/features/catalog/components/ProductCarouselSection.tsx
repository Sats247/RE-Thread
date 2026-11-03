import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { Carousel } from '@/shared/ui';
import { ProductCard } from './ProductCard';
import type { Listing } from '@/shared/types';

export interface ProductCarouselSectionProps {
  listings: Listing[];
  onProductClick?: (listing: Listing) => void;
  eyebrow?: string;
  title?: string;
  viewAllHref?: string;
  testId?: string;
}

export const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
  listings,
  onProductClick,
  eyebrow = 'Daily Drops',
  title = 'Fresh from Sellers',
  viewAllHref = ROUTES.BROWSE,
  testId = 'fresh-from-sellers-section',
}) => {
  const displayListings = listings.slice(0, 8);

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left select-none" data-testid={testId}>
      <div className="flex items-baseline justify-between mb-8 border-b border-line pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted">{eyebrow}</span>
          <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-ink mt-0.5">
            {title}
          </h2>
        </div>
        <Link
          to={viewAllHref}
          className="text-xs uppercase tracking-widest font-medium text-ink underline hover:text-muted"
        >
          Explore All ({listings.length}) →
        </Link>
      </div>

      <Carousel slideClassName="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%]">
        {displayListings.map((listing) => (
          <ProductCard
            key={listing.id}
            listing={listing}
            onCardClick={onProductClick}
            data-testid={`landing-product-${listing.id}`}
          />
        ))}
      </Carousel>
    </section>
  );
};

