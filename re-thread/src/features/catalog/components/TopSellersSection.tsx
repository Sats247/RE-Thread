import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { seller } from '@/services';
import type { SellerProfile } from '@/shared/types';
import { Badge, Rating } from '@/shared/ui';
import { ROUTES } from '@/config/routes';
import { ShieldCheck, Store, User } from 'lucide-react';

export const TopSellersSection: React.FC = () => {
  const navigate = useNavigate();
  const [topSellers, setTopSellers] = useState<SellerProfile[]>([]);

  useEffect(() => {
    let active = true;
    seller.topSellers().then((res) => {
      if (active) setTopSellers(res.slice(0, 4));
    }).catch(() => {
      // silent
    });
    return () => {
      active = false;
    };
  }, []);

  if (!topSellers.length) return null;

  return (
    <section data-testid="top-sellers-section" className="py-14 border-b border-line bg-paper">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-line gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-muted mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-ok" />
              <span>Verified Wardrobes & Stores</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-ink uppercase">
              Top-Rated Bengaluru Sellers
            </h2>
          </div>
          <p className="text-xs text-muted max-w-xs sm:text-right">
            Verified sellers with quality-checked pre-owned wardrobes and fast dispatch
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map((s) => {
            const isVerified = s.verification.status === 'auto' || s.verification.status === 'admin';
            return (
              <div
                key={s.id}
                data-testid={`seller-card-${s.id}`}
                onClick={() => navigate(ROUTES.SELLER_PROFILE.replace(':id', s.id))}
                className="border border-line p-5 bg-paper hover:border-ink cursor-pointer transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-mist border border-line flex items-center justify-center overflow-hidden shrink-0">
                      {s.avatarUrl ? (
                        <img src={s.avatarUrl} alt={s.displayName} className="w-full h-full object-cover" />
                      ) : s.type === 'store' ? (
                        <Store className="w-5 h-5 text-muted" />
                      ) : (
                        <User className="w-5 h-5 text-muted" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-medium text-ink truncate">{s.displayName}</h4>
                        {isVerified && (
                          <span
                            title={s.verification.reason || 'Verified Seller'}
                            aria-label={s.verification.reason || 'Verified Seller'}
                          >
                            <ShieldCheck className="w-4 h-4 text-ok shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted truncate">{s.locality}, Bengaluru</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 py-3 border-y border-line/60 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Rating</span>
                      <div className="flex items-center gap-1">
                        <Rating value={s.ratingAvg} size="sm" />
                        <span className="font-mono text-ink font-medium">({s.ratingAvg.toFixed(1)})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Completed Sales</span>
                      <span className="font-mono text-ink font-medium">{s.salesCount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={s.type === 'store' ? 'verified' : 'mist'} size="sm">
                    {s.type === 'store' ? 'Registered Store' : 'Individual Closet'}
                  </Badge>
                  <span className="text-[11px] uppercase tracking-wider text-muted font-medium hover:text-ink">
                    View Store →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

