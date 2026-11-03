import { seedUsers } from './users.seed';
import { seedSellers } from './sellers.seed';
import { seedListings } from './listings.seed';
import { seedReviews } from './reviews.seed';
import { seedOrders } from './orders.seed';
import { seedRentals } from './rentals.seed';
import { seedArticles } from './articles.seed';
import { seedOffers } from './offers.seed';

export function seedAll(): void {
  seedUsers();
  seedSellers();
  seedListings();
  seedReviews();
  seedOrders();
  seedRentals();
  seedArticles();
  seedOffers();
}
