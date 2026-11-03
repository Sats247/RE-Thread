import React, { useEffect, useState } from 'react';
import { catalog } from '@/services';
import type { Listing } from '@/shared/types';
import { useActivityStore } from '@/stores/activity.store';
import { useAuthStore } from '@/stores/auth.store';
import { ProductCard } from './ProductCard';
import { Carousel, Skeleton } from '@/shared/ui';
import { Sparkles } from 'lucide-react';

export const ForYouSection: React.FC = () => {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const { viewedCategories, viewedBrands, viewedOccasions, searches, consentGiven } = useActivityStore();
  const { user } = useAuthStore();

  useEffect(() => {
    let active = true;
    setLoading(true);

    const signals = {
      viewedCategories: consentGiven ? viewedCategories : user?.interests.categories ?? [],
      viewedBrands: consentGiven ? viewedBrands : [],
      viewedOccasions: consentGiven ? viewedOccasions : user?.interests.occasions ?? [],
      searches: consentGiven ? searches : [],
    };

    catalog.forYou(signals)
      .then((res) => {
        if (active) setItems(res);
      })
      .catch(() => {
        // fallback silent
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [viewedCategories, viewedBrands, viewedOccasions, searches, consentGiven, user]);

  const getReasonCaption = (item: Listing): string => {
    if (viewedBrands.includes(item.brand)) {
      return `Because you viewed ${item.brand}`;
    }
    if (viewedCategories.includes(item.category)) {
      return `Because you viewed ${item.category}'s`;
    }
    const matchedOccasion = item.occasions.find((o) => viewedOccasions.includes(o));
    if (matchedOccasion) {
      return `Because you looked for ${matchedOccasion}`;
    }
    if (user?.interests.categories.includes(item.category)) {
      return 'Curated from your preferences';
    }
    return 'Trending in Bengaluru';
  };

  if (loading) {
    return (
      <section className="py-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="h-6 w-48 bg-line mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section data-testid="for-you-section" className="py-12 border-b border-line bg-mist/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-line gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-muted mb-1">
              <Sparkles className="w-3.5 h-3.5 text-ink" />
              <span>Personalized Edit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-ink uppercase">
              Curated For You
            </h2>
          </div>
          <p className="text-xs text-muted max-w-xs sm:text-right">
            {viewedCategories.length || viewedBrands.length
              ? 'Refined using your recent browsing preferences'
              : 'Trending garments handpicked for you'}
          </p>
        </div>

        <Carousel
          slideClassName="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%]"
          data-testid="for-you-carousel"
        >
          {items.map((listing) => (
            <div key={listing.id}>
              <div className="mb-2 px-2 py-1 bg-paper border border-line text-[10px] font-mono uppercase tracking-wider text-muted truncate">
                {getReasonCaption(listing)}
              </div>
              <ProductCard listing={listing} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

