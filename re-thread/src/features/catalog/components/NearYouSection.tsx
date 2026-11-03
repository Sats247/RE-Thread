import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { catalog } from '@/services';
import type { Listing } from '@/shared/types';
import { useAuthStore } from '@/stores/auth.store';
import { BENGALURU_LOCALITIES } from '@/config/constants';
import { ProductCard } from './ProductCard';
import { Button, Skeleton } from '@/shared/ui';
import { ROUTES } from '@/config/routes';
import { MapPin, ArrowRight } from 'lucide-react';

export const NearYouSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedLocality, setSelectedLocality] = useState<string>(
    user?.locality || 'Indiranagar'
  );
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    catalog.search({ locality: selectedLocality, pageSize: 4 })
      .then((res) => {
        if (active) setItems(res.items);
      })
      .catch(() => {
        // silent
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selectedLocality]);

  return (
    <section data-testid="near-you-section" className="py-14 border-b border-line bg-mist/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-line gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-muted mb-1">
              <MapPin className="w-3.5 h-3.5 text-ink" />
              <span>Hyperlocal Thrift & Meetup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-ink uppercase">
              Near You In Bengaluru
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {BENGALURU_LOCALITIES.slice(0, 5).map((loc) => (
              <button
                key={loc}
                type="button"
                data-testid={`near-you-locality-${loc.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedLocality(loc)}
                className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border transition-colors whitespace-nowrap ${
                  selectedLocality === loc
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper text-muted border-line hover:border-ink hover:text-ink'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {items.map((listing) => (
                <ProductCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="text-center pt-2">
              <Button
                variant="outline"
                size="sm"
                data-testid="near-you-view-all"
                onClick={() => navigate(`${ROUTES.BROWSE}?locality=${encodeURIComponent(selectedLocality)}`)}
                className="text-xs uppercase tracking-wider"
              >
                <span>{`Browse all ${selectedLocality} listings`}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-muted border border-dashed border-line">
            No live listings in {selectedLocality} right now. Check Indiranagar or Koramangala!
          </div>
        )}
      </div>
    </section>
  );
};

