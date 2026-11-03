import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  listingId: string;
  sellerId: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (listingId: string) => void;
  clearCart: () => void;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        // Unique items in second-hand: prevent duplicate listing adds
        const exists = get().items.some((i) => i.listingId === item.listingId);
        if (!exists) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (listingId) => {
        set((state) => ({ items: state.items.filter((i) => i.listingId !== listingId) }));
      },
      clearCart: () => set({ items: [] }),
      getCount: () => get().items.length,
    }),
    { name: 'rt:cart', version: 1 }
  )
);

