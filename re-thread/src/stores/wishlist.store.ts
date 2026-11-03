import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  listingIds: string[];
  addListing: (id: string) => void;
  removeListing: (id: string) => void;
  toggleListing: (id: string) => void;
  hasListing: (id: string) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      listingIds: [],
      addListing: (id) => {
        if (!get().listingIds.includes(id)) {
          set((state) => ({ listingIds: [...state.listingIds, id] }));
        }
      },
      removeListing: (id) => {
        set((state) => ({ listingIds: state.listingIds.filter((item) => item !== id) }));
      },
      toggleListing: (id) => {
        if (get().hasListing(id)) {
          get().removeListing(id);
        } else {
          get().addListing(id);
        }
      },
      hasListing: (id) => get().listingIds.includes(id),
      getCount: () => get().listingIds.length,
    }),
    { name: 'rt:wishlist', version: 1 }
  )
);

