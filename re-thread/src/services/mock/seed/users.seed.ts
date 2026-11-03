import { db } from '../db';
import type { User } from '@/shared/types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-aarav',
    name: 'Aarav Patel',
    email: 'aarav.patel@gmail.com',
    phone: '+91 98450 12345',
    locality: 'Koramangala',
    role: 'user',
    twoFactorEnabled: false,
    interests: { occasions: ['brunch', 'resort', 'club'], categories: ['men'] },
    createdAt: '2025-06-12T10:00:00.000Z',
  },
  {
    id: 'user-meera',
    name: 'Meera Rao',
    email: 'meera.rao@outlook.com',
    phone: '+91 97400 54321',
    locality: 'Indiranagar',
    role: 'user',
    twoFactorEnabled: true,
    interests: { occasions: ['daily', 'college', 'party'], categories: ['women'] },
    createdAt: '2026-02-15T14:30:00.000Z',
  },
  {
    id: 'user-kavya',
    name: 'Kavya Sharma',
    email: 'kavya.sharma@yahoo.com',
    phone: '+91 99800 67890',
    locality: 'HSR Layout',
    role: 'user',
    sellerProfileId: 'seller-kavya',
    twoFactorEnabled: true,
    interests: { occasions: ['festive', 'brunch', 'date'], categories: ['women'] },
    createdAt: '2024-11-01T09:00:00.000Z',
  },
  {
    id: 'user-thread-co',
    name: 'Vikram Mehta (Thread & Co.)',
    email: 'store@threadandco.in',
    phone: '+91 98800 11223',
    locality: 'Indiranagar',
    role: 'user',
    sellerProfileId: 'seller-thread-co',
    twoFactorEnabled: true,
    interests: { occasions: ['wedding', 'formal', 'party'], categories: ['men', 'women', 'unisex'] },
    createdAt: '2024-03-10T08:00:00.000Z',
  },
  {
    id: 'user-admin',
    name: 'RE-thread Admin',
    email: 'admin@re-thread.in',
    locality: 'Bengaluru',
    role: 'admin',
    twoFactorEnabled: true,
    interests: { occasions: [], categories: [] },
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'user-rohan',
    name: 'Rohan Gupta',
    email: 'rohan.g@gmail.com',
    phone: '+91 91234 56789',
    locality: 'Jayanagar',
    role: 'user',
    sellerProfileId: 'seller-rohan',
    twoFactorEnabled: false,
    interests: { occasions: ['daily', 'gym', 'weekend-getaway'], categories: ['men'] },
    createdAt: '2025-01-18T11:00:00.000Z',
  },
  {
    id: 'user-ananya',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@gmail.com',
    phone: '+91 98765 43210',
    locality: 'Malleshwaram',
    role: 'user',
    sellerProfileId: 'seller-ananya',
    twoFactorEnabled: false,
    interests: { occasions: ['wedding', 'festive'], categories: ['women'] },
    createdAt: '2025-04-05T16:00:00.000Z',
  },
];

export function seedUsers(): void {
  const existing = db.get<User[]>('users');
  if (existing && existing.length > 0) return;
  db.set<User[]>('users', INITIAL_USERS);
}
