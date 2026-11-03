import { db } from '../db';
import { getImageUrl } from '@/shared/lib/image';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  publishedAt: string;
  image: string;
  author: string;
  body: string;
}

export const INITIAL_ARTICLES: Article[] = [
  {
    slug: 'bengaluru-thrift-guide-2026',
    title: 'The Modern Bengaluru Guide to Pre-Loved Fashion',
    excerpt: 'From Indiranagar boutiques to curated Koramangala wardrobe drops: where to find authentic second-hand designer wear.',
    tag: 'Community',
    readTime: '4 min read',
    publishedAt: '2026-02-15',
    image: getImageUrl('story-1', 800, 600),
    author: 'Kavya Sharma',
    body: 'Bengaluru has become the epicentre of India’s sustainable fashion renaissance...',
  },
  {
    slug: 'rental-vs-buying-wedding-season',
    title: 'Why Renting Your Wedding Wardrobe Makes Environmental Sense',
    excerpt: 'The average wedding outfit in India is worn only 1.4 times. Here is how renting saves over 10,000 litres of water.',
    tag: 'Impact',
    readTime: '5 min read',
    publishedAt: '2026-02-10',
    image: getImageUrl('story-2', 800, 600),
    author: 'Vikram Mehta',
    body: 'With festive seasons stretching over months, the wardrobe strain is real...',
  },
  {
    slug: 'how-to-photograph-clothes-for-ai-verification',
    title: '5 Tips to Pass the RE-thread AI Quality Check on Your First Try',
    excerpt: 'Natural light, flat lays, and crisp tag photos: the exact recipe for instant listing approval.',
    tag: 'Seller Guide',
    readTime: '3 min read',
    publishedAt: '2026-01-28',
    image: getImageUrl('story-3', 800, 600),
    author: 'RE-thread Curators',
    body: 'Our automated visual AI analyzes sharpness, contrast, lighting, and garment borders...',
  },
  {
    slug: 'vintage-denim-care-secrets',
    title: 'How to Care for Raw and Selvedge Denim without Ruining the Wash',
    excerpt: 'Preserve deep indigo fades and natural whiskering with gentle steam sanitization techniques.',
    tag: 'Care',
    readTime: '4 min read',
    publishedAt: '2026-01-14',
    image: getImageUrl('story-4', 800, 600),
    author: 'Rohan Gupta',
    body: 'Quality denim gets better with time—provided you avoid harsh industrial detergents...',
  },
];

export function seedArticles(): void {
  const existing = db.get<Article[]>('articles');
  if (existing && existing.length > 0) return;
  db.set<Article[]>('articles', INITIAL_ARTICLES);
}
