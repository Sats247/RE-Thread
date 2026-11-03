import type { User } from '@/shared/types';
import { useAuthStore } from '@/stores/auth.store';
import { useDemoStore, type PersonaId } from '@/stores/demo.store';
import { log } from '@/shared/lib/logger';

export interface PersonaDefinition {
  id: PersonaId;
  name: string;
  roleDescription: string;
  user: User | null;
  scenarioNotes: string;
}

export const PERSONAS: Record<PersonaId, PersonaDefinition> = {
  guest: {
    id: 'guest',
    name: 'Guest (Visitor)',
    roleDescription: 'Unauthenticated visitor',
    user: null,
    scenarioNotes: 'Can view landing, first 8 listings, up to 3 product views before gate.',
  },
  aarav: {
    id: 'aarav',
    name: 'Aarav Patel (Active Buyer)',
    roleDescription: 'Buyer with rental & return history',
    user: {
      id: 'user-aarav',
      name: 'Aarav Patel',
      email: 'aarav.patel@gmail.com',
      phone: '+91 98450 12345',
      locality: 'Koramangala',
      role: 'user',
      twoFactorEnabled: false,
      interests: {
        occasions: ['brunch', 'resort', 'club'],
        categories: ['men'],
      },
      createdAt: '2025-06-12T10:00:00.000Z',
    },
    scenarioNotes: 'Has 2 past returns, 1 active/overdue rental with accruing late fees.',
  },
  meera: {
    id: 'meera',
    name: 'Meera Rao (New User)',
    roleDescription: 'New user with zero sales (Locked Dashboard)',
    user: {
      id: 'user-meera',
      name: 'Meera Rao',
      email: 'meera.rao@outlook.com',
      phone: '+91 97400 54321',
      locality: 'Indiranagar',
      role: 'user',
      twoFactorEnabled: true,
      interests: {
        occasions: ['daily', 'college', 'party'],
        categories: ['women'],
      },
      createdAt: '2026-02-15T14:30:00.000Z',
    },
    scenarioNotes: 'Never sold clothes: /seller shows centered locked state with Start Selling CTA.',
  },
  kavya: {
    id: 'kavya',
    name: 'Kavya Sharma (Auto-Verified Seller)',
    roleDescription: 'Individual seller with 14 sales, rating 4.9',
    user: {
      id: 'user-kavya',
      name: 'Kavya Sharma',
      email: 'kavya.sharma@yahoo.com',
      phone: '+91 99800 67890',
      locality: 'HSR Layout',
      role: 'user',
      sellerProfileId: 'seller-kavya',
      twoFactorEnabled: true,
      interests: {
        occasions: ['festive', 'brunch', 'date'],
        categories: ['women'],
      },
      createdAt: '2024-11-01T09:00:00.000Z',
    },
    scenarioNotes: 'Auto-verified badge (≥10 sales, rating ≥4.0). Dashboard unlocked.',
  },
  'thread-co': {
    id: 'thread-co',
    name: 'Thread & Co. (Offline Store)',
    roleDescription: 'Registered offline store in Indiranagar',
    user: {
      id: 'user-thread-co',
      name: 'Vikram Mehta (Thread & Co.)',
      email: 'store@threadandco.in',
      phone: '+91 98800 11223',
      locality: 'Indiranagar',
      role: 'user',
      sellerProfileId: 'seller-thread-co',
      twoFactorEnabled: true,
      interests: {
        occasions: ['wedding', 'formal', 'party'],
        categories: ['men', 'women', 'unisex'],
      },
      createdAt: '2024-03-10T08:00:00.000Z',
    },
    scenarioNotes: 'Admin-verified registered offline store with GST/licence, rental QC queue, return ticket.',
  },
  admin: {
    id: 'admin',
    name: 'System Admin',
    roleDescription: 'Super administrator',
    user: {
      id: 'user-admin',
      name: 'RE-thread Admin',
      email: 'admin@re-thread.in',
      locality: 'Bengaluru',
      role: 'admin',
      twoFactorEnabled: true,
      interests: { occasions: [], categories: [] },
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    scenarioNotes: 'Can access /admin: verification queue, flagged AI listings, complaints.',
  },
};

export function switchPersona(personaId: PersonaId) {
  const persona = PERSONAS[personaId];
  if (!persona) return;

  log.info('demo', 'Switching persona', { personaId, user: persona.user });
  useDemoStore.getState().setPersona(personaId);
  useAuthStore.getState().setUser(persona.user);
}

