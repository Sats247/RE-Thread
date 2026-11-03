import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { getImageUrl } from '@/shared/lib/image';

interface CategoryTile {
  label: string;
  href: string;
  imageSeed: string;
}

export const CategoryTiles: React.FC = () => {
  const tiles: CategoryTile[] = [
    { label: "Women's Collection", href: `${ROUTES.BROWSE}?category=women`, imageSeed: 'cat-women' },
    { label: "Men's Essentials", href: `${ROUTES.BROWSE}?category=men`, imageSeed: 'cat-men' },
    { label: 'Ethnic & Festive', href: `${ROUTES.BROWSE}?category=festive`, imageSeed: 'cat-ethnic' },
    { label: 'Tops & Outerwear', href: `${ROUTES.BROWSE}?category=tops`, imageSeed: 'cat-outerwear' },
    { label: 'Occasion & Suits', href: ROUTES.RENT, imageSeed: 'cat-suits' },
    { label: 'Bags & Accessories', href: `${ROUTES.BROWSE}?category=shoes-bags`, imageSeed: 'cat-bags' },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left select-none" data-testid="category-tiles">
      <div className="flex items-baseline justify-between mb-8 border-b border-line pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted">Curated Directory</span>
          <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-ink mt-0.5">
            Shop by Category
          </h2>
        </div>
        <Link
          to={ROUTES.BROWSE}
          className="text-xs uppercase tracking-widest font-medium text-ink underline hover:text-muted"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            to={tile.href}
            data-testid={`category-tile-${tile.label.toLowerCase().replace(/\s+/g, '-')}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-full aspect-[4/5] overflow-hidden bg-mist mb-3">
              <img
                src={getImageUrl(tile.imageSeed, 400, 500)}
                alt={tile.label}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="text-xs uppercase tracking-wider font-medium text-ink border-b border-transparent group-hover:border-ink transition-colors pb-0.5">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

