import React, { useEffect, useState } from 'react';
import { offers } from '@/services';
import type { Offer } from '@/shared/types';
import { useUIStore } from '@/stores/ui.store';
import { Tag, Check, Copy } from 'lucide-react';

export const OffersStrip: React.FC = () => {
  const [coupons, setCoupons] = useState<Offer[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { addToast } = useUIStore();

  useEffect(() => {
    let mounted = true;
    offers.list().then((res) => {
      if (mounted) {
        setCoupons(res.filter((o) => !!o.code));
      }
    }).catch(() => {
      // fallback silent
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleCopy = async (code?: string) => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      addToast({
        type: 'success',
        message: `Code ${code} copied to clipboard!`,
      });
      setTimeout(() => setCopiedCode(null), 2500);
    } catch {
      // ignore
    }
  };

  if (!coupons.length) return null;

  return (
    <section
      aria-label="Promotional Offers and Coupons"
      className="bg-mist/60 border-y border-line py-2.5 overflow-x-auto no-scrollbar"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center gap-3 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted font-medium pr-2 border-r border-line">
          <Tag className="w-3.5 h-3.5" />
          <span>Offers</span>
        </div>
        <div className="flex items-center gap-2.5">
          {coupons.map((c) => {
            const isCopied = copiedCode === c.code;
            return (
              <button
                key={c.id}
                type="button"
                data-testid={`offer-chip-${c.code?.toLowerCase()}`}
                onClick={() => handleCopy(c.code)}
                className="group inline-flex items-center gap-2 px-3 py-1 bg-paper border border-line text-xs font-mono text-ink hover:border-ink transition-colors rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
              >
                <span className="font-semibold">{c.code}</span>
                <span className="text-[11px] text-muted font-sans border-l border-line pl-2">
                  {c.title}
                </span>
                {isCopied ? (
                  <Check className="w-3 h-3 text-ok shrink-0" />
                ) : (
                  <Copy className="w-3 h-3 text-muted group-hover:text-ink shrink-0 transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

