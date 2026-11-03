import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { catalog } from '@/services';
import type { Bundle } from '@/shared/types';
import { Price, Button, Badge } from '@/shared/ui';
import { ROUTES } from '@/config/routes';
import { Layers, ArrowRight } from 'lucide-react';

export const BundlesSection: React.FC = () => {
  const navigate = useNavigate();
  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    let active = true;
    catalog.getBundles().then((res) => {
      if (active) setBundles(res.slice(0, 4));
    }).catch(() => {
      // fallback silent
    });
    return () => {
      active = false;
    };
  }, []);

  if (!bundles.length) return null;

  return (
    <section data-testid="bundles-section" className="py-14 border-b border-line bg-paper">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-line gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-muted mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Garment Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-ink uppercase">
              Combos & Bundles
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            data-testid="bundles-view-all-btn"
            onClick={() => navigate(`${ROUTES.BROWSE}?kind=sale`)}
            className="text-xs uppercase tracking-wider self-start sm:self-auto"
          >
            <span>View All Outfits</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              data-testid={`bundle-card-${bundle.id}`}
              className="border border-line p-5 bg-paper hover:border-ink transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="sale" size="sm">
                    {`Save ${bundle.savingsPct}%`}
                  </Badge>
                  <span className="text-[11px] font-mono uppercase text-muted">
                    {`${bundle.listingIds.length} Items Included`}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-ink uppercase tracking-wide mb-2 line-clamp-2">
                  {bundle.title}
                </h3>
                <p className="text-xs text-muted mb-4">
                  Curated outfit pairing ready for instant checkout with flat shipping.
                </p>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-muted">Combo Price</div>
                  <Price amount={bundle.bundlePrice} size="md" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  data-testid={`bundle-shop-${bundle.id}`}
                  onClick={() => navigate(`${ROUTES.BROWSE}?q=${encodeURIComponent(bundle.title.split(' ')[0] ?? '')}`)}
                >
                  Shop Look
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

