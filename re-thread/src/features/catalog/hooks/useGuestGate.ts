import { useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { GUEST_PRODUCT_VIEW_LIMIT } from '@/config/constants';

const STORAGE_KEY = 'rt:guest_product_views';

export function useGuestGate(onLimitReached: () => void) {
  const { user } = useAuthStore();
  const [viewCount, setViewCount] = useState<number>(() => {
    try {
      const val = sessionStorage.getItem(STORAGE_KEY);
      return val ? parseInt(val, 10) : 0;
    } catch {
      return 0;
    }
  });

  const checkOrIncrementView = useCallback(
    (e?: React.MouseEvent): boolean => {
      // Authenticated users have unlimited access
      if (user) return true;

      const current = viewCount;
      if (current >= GUEST_PRODUCT_VIEW_LIMIT) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        onLimitReached();
        return false;
      }

      const next = current + 1;
      setViewCount(next);
      try {
        sessionStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return true;
    },
    [user, viewCount, onLimitReached]
  );

  return {
    viewCount,
    limit: GUEST_PRODUCT_VIEW_LIMIT,
    checkOrIncrementView,
  };
}

