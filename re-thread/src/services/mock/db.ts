import { log } from '@/shared/lib/logger';
import { seedAll } from './seed';

const NS = 'db';
const SEEDED_KEY = 'rt:seeded';

/**
 * LocalStorage-backed in-memory database for mock services.
 * All data is stored under namespaced keys with the `rt:` prefix.
 */
export const db = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(`rt:${key}`);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      log.error(NS, `get(${key}) failed`, err);
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`rt:${key}`, JSON.stringify(value));
    } catch (err) {
      log.error(NS, `set(${key}) failed`, err);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(`rt:${key}`);
    } catch (err) {
      log.error(NS, `remove(${key}) failed`, err);
    }
  },

  reset(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith('rt:')) keysToRemove.push(k);
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      log.info(NS, 'db reset, re-seeding');
      seedAll();
      localStorage.setItem(SEEDED_KEY, 'true');
    } catch (err) {
      log.error(NS, 'reset failed', err);
    }
  },

  isSeeded(): boolean {
    return localStorage.getItem(SEEDED_KEY) === 'true';
  },

  markSeeded(): void {
    localStorage.setItem(SEEDED_KEY, 'true');
  },
};

export function initDb(): void {
  if (!db.isSeeded()) {
    log.info(NS, 'First run – seeding database');
    seedAll();
    db.markSeeded();
  } else {
    log.debug(NS, 'Database already seeded');
  }
}
