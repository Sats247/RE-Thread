import { db } from '../db';
import type { Review } from '@/shared/types';
import { INITIAL_LISTINGS } from './listings.seed';

const REVIEW_AUTHORS = ['Aarav P.', 'Sneha R.', 'Vikram K.', 'Meera S.', 'Priya N.', 'Rohan G.', 'Ananya I.', 'Karthik B.'];
const REVIEW_COMMENTS = [
  'Item was exactly as described! Beautiful quality and crisp packaging.',
  'Great pre-owned condition, smells freshly laundered. Highly recommend this seller.',
  'Slightly snug around the chest, but fabric quality is top-notch.',
  'Perfect for the weekend event in Indiranagar. Fast delivery.',
  'Excellent vintage piece with genuine character. Saved huge versus brand new retail.',
  'Fit was true to size. Fabric feels very breathable and authentic.',
];

function generateReviews(): Review[] {
  const reviews: Review[] = [];
  let reviewIdCounter = 1;

  // Generate 2-3 reviews for first 45 listings
  for (let i = 0; i < Math.min(INITIAL_LISTINGS.length, 50); i++) {
    const listing = INITIAL_LISTINGS[i]!;
    const reviewCount = (i % 3) + 1; // 1, 2, or 3 reviews

    for (let r = 0; r < reviewCount; r++) {
      const rating = ([5, 5, 4, 5, 4, 3][(i + r) % 6] ?? 5) as 1 | 2 | 3 | 4 | 5;
      const fit = ([3, 3, 2, 4, 3][(i * 2 + r) % 5] ?? 3) as 1 | 2 | 3 | 4 | 5;
      const author = REVIEW_AUTHORS[(i + r) % REVIEW_AUTHORS.length]!;

      reviews.push({
        id: `rev-${reviewIdCounter++}`,
        listingId: listing.id,
        sellerId: listing.sellerId,
        userId: `user-rev-${(i % 5) + 1}`,
        rating,
        title: rating >= 4 ? 'Loved the quality & fit' : 'Decent pre-loved piece',
        body: `${REVIEW_COMMENTS[(i + r) % REVIEW_COMMENTS.length]} — ${author}`,
        fit,
        height: "5'9\"",
        weight: '68 kg',
        bodyType: ['Athletic', 'Regular', 'Slim'][(i + r) % 3]!,
        sizePurchased: listing.size,
        createdAt: new Date(Date.now() - (reviewIdCounter * 2) * 86400000).toISOString(),
      });
    }
  }

  return reviews;
}

export const INITIAL_REVIEWS: Review[] = generateReviews();

export function seedReviews(): void {
  const existing = db.get<Review[]>('reviews');
  if (existing && existing.length > 0) return;
  db.set<Review[]>('reviews', INITIAL_REVIEWS);
}
