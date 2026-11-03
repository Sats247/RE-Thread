import React from 'react';
import { ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: <ShieldCheck className="h-6 w-6 stroke-[1.5] text-ink mb-3" />,
      title: 'Verified Bengaluru Sellers',
      description: 'Individuals with verified sales track records and registered offline boutiques with inspected licenses.',
    },
    {
      icon: <Sparkles className="h-6 w-6 stroke-[1.5] text-ink mb-3" />,
      title: 'AI & Quality-Checked',
      description: 'Automated photo checks prevent blurry stock listings; rental garments follow strict sanitization checklists.',
    },
    {
      icon: <Truck className="h-6 w-6 stroke-[1.5] text-ink mb-3" />,
      title: 'Courier or Direct Meetup',
      description: 'Flat ₹70 courier across Bengaluru (Free over ₹999) or free direct in-person handoffs at local metro stations.',
    },
  ];

  return (
    <section className="border-t border-line bg-paper py-12 select-none" data-testid="value-props-section">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {props.map((p) => (
            <div key={p.title} className="p-4 border-l border-line sm:border-l-0 sm:pl-0">
              {p.icon}
              <h3 className="text-sm uppercase tracking-wider font-semibold text-ink mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

