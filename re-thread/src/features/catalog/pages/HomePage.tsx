import React, { useEffect, useState } from 'react';
import { catalog } from '@/services';
import type { HomeFeeds } from '@/services/contracts/catalog.contract';
import { SearchBar } from '../components/SearchBar';
import { OffersStrip } from '../components/OffersStrip';
import { ForYouSection } from '../components/ForYouSection';
import { CategoryTiles } from '../components/CategoryTiles';
import { OccasionChipsRow } from '../components/OccasionChipsRow';
import { ProductCarouselSection } from '../components/ProductCarouselSection';
import { BundlesSection } from '../components/BundlesSection';
import { NearYouSection } from '../components/NearYouSection';
import { TopSellersSection } from '../components/TopSellersSection';
import { ROUTES } from '@/config/routes';

export const HomePage: React.FC = () => {
  const [feeds, setFeeds] = useState<HomeFeeds | null>(null);

  useEffect(() => {
    let active = true;
    catalog.homeFeeds().then((res) => {
      if (active) setFeeds(res);
    }).catch(() => {
      // silent
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div data-testid="user-home-page" className="min-h-screen bg-paper pb-16">
      {/* Prominent Search Header */}
      <section className="bg-mist/30 border-b border-line py-6 sm:py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
                Bengaluru Pre-Owned & Rental Collective
              </span>
              <h1 className="text-xl sm:text-2xl font-light uppercase tracking-wide text-ink mt-0.5">
                Find Your Next Verified Look
              </h1>
            </div>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Live Platform & Seller Offers Strip */}
      <OffersStrip />

      {/* Personalized For You Carousel */}
      <ForYouSection />

      {/* Department Category Tiles */}
      <section className="py-12 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
              Departments
            </span>
            <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wide text-ink mt-0.5">
              Explore By Wardrobe
            </h2>
          </div>
          <CategoryTiles />
        </div>
      </section>

      {/* Occasion Curation Chips */}
      <OccasionChipsRow />

      {/* Trending Now Carousel */}
      {feeds?.trending && feeds.trending.length > 0 && (
        <ProductCarouselSection
          listings={feeds.trending}
          eyebrow="Popular This Week"
          title="Trending in Bengaluru"
          viewAllHref={`${ROUTES.BROWSE}?sort=popularity`}
          testId="trending-now-section"
        />
      )}

      {/* Multi-Garment Combos and Bundles */}
      <BundlesSection />

      {/* Occasion & Luxury Rental Spotlight */}
      {feeds?.rentSpotlight && feeds.rentSpotlight.length > 0 && (
        <ProductCarouselSection
          listings={feeds.rentSpotlight}
          eyebrow="Occasion Wear"
          title="Rental Spotlight"
          viewAllHref={ROUTES.RENT}
          testId="rent-spotlight-section"
        />
      )}

      {/* Hyperlocal Near You Section */}
      <NearYouSection />

      {/* Top-Rated Verified Sellers */}
      <TopSellersSection />
    </div>
  );
};

export default HomePage;

