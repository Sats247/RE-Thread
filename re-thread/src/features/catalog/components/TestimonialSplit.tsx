import React from 'react';
import { Rating, Price } from '@/shared/ui';
import { getImageUrl } from '@/shared/lib/image';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export const TestimonialSplit: React.FC = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-20 select-none text-left" data-testid="testimonial-split">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-line bg-mist p-6 sm:p-12">
        {/* Quote Left */}
        <div className="md:col-span-7 space-y-6">
          <Rating value={5} size="md" />
          <blockquote className="text-xl sm:text-2xl font-light text-ink leading-relaxed">
            “I found a pristine Kanjivaram silk saree from a Basavanagudi seller that retail was charging triple for. The dry cleaning and verified checks gave me total peace of mind.”
          </blockquote>

          <div className="pt-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-ink block">
              Priya Nambiar
            </span>
            <span className="text-xs text-muted">Indiranagar, Bengaluru · Verified Buyer</span>
          </div>

          {/* Linked Product Preview */}
          <div className="pt-4 border-t border-line/60 flex items-center gap-4">
            <img
              src={getImageUrl('quote-product-saree', 120, 150)}
              alt="Pure Kanjivaram Saree"
              className="w-14 h-18 object-cover bg-paper border border-line"
            />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted block font-medium">
                Reviewed Item
              </span>
              <Link to={`${ROUTES.RENT}/listing-r-4`} className="text-xs font-medium text-ink hover:underline">
                Pure Kanjivaram Golden Zari Silk Saree
              </Link>
              <Price amount={1199} rentalPeriod="/ 3 days" size="sm" className="mt-1" />
            </div>
          </div>
        </div>

        {/* Big Editorial Image Right */}
        <div className="md:col-span-5 aspect-[4/5] bg-paper overflow-hidden">
          <img
            src={getImageUrl('editorial-portrait-testimonial', 600, 750)}
            alt="Customer wearing pre-loved clothing"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

