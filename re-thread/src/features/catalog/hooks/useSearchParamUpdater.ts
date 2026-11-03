import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Low-level URL search param manipulation helpers.
 * Shared between useCatalogFilters and other hooks that need URL sync.
 */
export function useSearchParamUpdater() {
  const [, setSearchParams] = useSearchParams();

  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          updater(next);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      updateParams((p) => {
        if (!value) p.delete(key);
        else p.set(key, value);
        p.delete('page');
      });
    },
    [updateParams]
  );

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      updateParams((p) => {
        const current = p.getAll(key);
        p.delete(key);
        if (current.includes(value)) {
          current.filter((v) => v !== value).forEach((v) => p.append(key, v));
        } else {
          [...current, value].forEach((v) => p.append(key, v));
        }
        p.delete('page');
      });
    },
    [updateParams]
  );

  const removeArrayOrScalar = useCallback(
    (key: string, value?: string) => {
      updateParams((p) => {
        if (!value) {
          p.delete(key);
        } else {
          const current = p.getAll(key);
          p.delete(key);
          current.filter((v) => v !== value).forEach((v) => p.append(key, v));
        }
        p.delete('page');
      });
    },
    [updateParams]
  );

  return { updateParams, setParam, toggleArrayParam, removeArrayOrScalar };
}

