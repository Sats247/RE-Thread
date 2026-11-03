import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/config/routes';
import { catalog } from '@/services';
import { useAsync } from '@/shared/hooks/useAsync';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryTiles } from '../components/CategoryTiles';
import { PromoSection } from '../components/PromoCard';
import { ImpactBanner } from '../components/ImpactBanner';
import { ProductCarouselSection } from '../components/ProductCarouselSection';
import { GuestGateCard } from '../components/GuestGateCard';
import { TestimonialSplit } from '../components/TestimonialSplit';
import { ValueProps } from '../components/ValueProps';
import { ConsentBanner } from '../components/ConsentBanner';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { useGuestGate } from '../hooks/useGuestGate';
import type { Listing } from '@/shared/types';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { data: feeds } = useAsync(() => catalog.homeFeeds(), []);
  const { checkOrIncrementView } = useGuestGate(() => setAuthModalOpen(true));

  // If already authenticated, redirect to user feed /home
  if (user) {
    return <Navigate to={ROUTES.USER_HOME} replace />;
  }

  const handleProductClick = (listing: Listing) => {
    const allowed = checkOrIncrementView();
    if (allowed) {
      navigate(listing.kind === 'rent' ? `/rent/${listing.id}` : `/product/${listing.id}`);
    }
  };

  return (
    <div className="w-full flex flex-col bg-paper" data-testid="landing-page">
      <HeroBanner />
      <CategoryTiles />
      <PromoSection />
      <ImpactBanner />

      {/* Fresh from sellers (8 items limit for guests) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        {feeds && (
          <ProductCarouselSection
            listings={feeds.freshFromSellers}
            onProductClick={handleProductClick}
          />
        )}

        {/* Guest Gate: Blurred row + Login CTA */}
        <GuestGateCard onUnlockClick={() => setAuthModalOpen(true)} />
      </div>

      <TestimonialSplit />
      <ValueProps />
      <ConsentBanner />

      {/* Auth Modal for Gated Guest Flows */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </div>
  );
};

export default LandingPage;

