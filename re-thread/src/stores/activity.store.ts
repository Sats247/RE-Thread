import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ActivityEvent {
  type: 'view_category' | 'view_brand' | 'view_occasion' | 'search';
  value: string;
}

interface ActivityState {
  viewedCategories: string[];
  viewedBrands: string[];
  viewedOccasions: string[];
  searches: string[];
  consentGiven: boolean;
  track: (event: ActivityEvent) => void;
  setConsent: (consent: boolean) => void;
  clearActivity: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      viewedCategories: [],
      viewedBrands: [],
      viewedOccasions: [],
      searches: [],
      consentGiven: false,
      track: (event) => {
        if (!get().consentGiven) return;
        const pushLimited = (arr: string[], val: string, limit = 20) => {
          const filtered = arr.filter((x) => x !== val);
          return [val, ...filtered].slice(0, limit);
        };
        if (event.type === 'view_category') {
          set((s) => ({ viewedCategories: pushLimited(s.viewedCategories, event.value) }));
        } else if (event.type === 'view_brand') {
          set((s) => ({ viewedBrands: pushLimited(s.viewedBrands, event.value) }));
        } else if (event.type === 'view_occasion') {
          set((s) => ({ viewedOccasions: pushLimited(s.viewedOccasions, event.value) }));
        } else if (event.type === 'search') {
          set((s) => ({ searches: pushLimited(s.searches, event.value) }));
        }
      },
      setConsent: (consent) => set({ consentGiven: consent }),
      clearActivity: () => set({ viewedCategories: [], viewedBrands: [], viewedOccasions: [], searches: [] }),
    }),
    { name: 'rt:activity', version: 1 }
  )
);

