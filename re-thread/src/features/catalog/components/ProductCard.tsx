import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlist.store';
import { Price } from '@/shared/ui';
import type { Listing } from '@/shared/types';
import { cn } from '@/shared/lib/cn';

export interface ProductCardProps {
  listing: Listing;
  onCardClick?: (listing: Listing) => void;
  className?: string;
  'data-testid'?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  listing,
  onCardClick,
  className,
  'data-testid': testId = 'product-card',
}) => {
  const { toggleListing, hasListing } = useWishlistStore();
  const isWishlisted = hasListing(listing.id);

  const detailUrl = listing.kind === 'rent' ? `/rent/${listing.id}` : `/product/${listing.id}`;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleListing(listing.id);
  };

  const handleClick = () => {
    onCardClick?.(listing);
  };

  return (
    <div
      data-testid={testId}
      className={cn('group flex flex-col text-left select-none relative', className)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] bg-mist overflow-hidden mb-3">
        <Link to={detailUrl} onClick={handleClick} className="block w-full h-full">
          <img
            src={listing.images[0] ?? ''}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={handleWishlist}
          data-testid={`${testId}-wishlist`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 p-2 bg-paper/90 backdrop-blur-sm rounded-none text-ink hover:text-sale transition-colors shadow-sm"
        >
          <Heart
            className={cn('h-4 w-4 stroke-[1.5]', isWishlisted ? 'fill-sale text-sale' : 'fill-none')}
          />
        </button>

        {/* Tag Pills */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex flex-wrap gap-1.5 pointer-events-none">
          {listing.kind === 'rent' && (
            <span className="bg-ink text-paper text-[10px] uppercase font-mono px-2 py-0.5 tracking-wider">
              Rent
            </span>
          )}
          {listing.returnPolicy.enabled && (
            <span className="bg-paper text-ink text-[10px] uppercase font-medium px-2 py-0.5 tracking-wider border border-line shadow-xs">
              Returnable
            </span>
          )}
        </div>
      </div>

      {/* Meta Line */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span className="uppercase tracking-widest font-medium text-ink">
            {listing.brand}
          </span>
          <span className="capitalize">{listing.condition.replace('-', ' ')}</span>
        </div>

        <Link
          to={detailUrl}
          onClick={handleClick}
          className="text-xs text-ink-soft hover:text-ink font-normal line-clamp-1 transition-colors"
        >
          {listing.title}
        </Link>

        <div className="flex items-center justify-between pt-1">
          <Price
            amount={listing.price}
            mrp={listing.mrp}
            rentalPeriod={listing.kind === 'rent' ? '/ 3 days' : undefined}
            size="sm"
          />
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span>Size {listing.size}</span>
            <span>·</span>
            <span>{listing.locality}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
