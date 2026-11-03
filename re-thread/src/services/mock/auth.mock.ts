import { AppError } from '@/shared/types';
import type { AuthContract, OnboardingData } from '../contracts/auth.contract';
import type { User } from '@/shared/types';
import { simulateLatency } from './latency';
import { db } from './db';
import { log } from '@/shared/lib/logger';
import { generateId } from '@/shared/lib/id';
import { DEMO_OTP_CODE } from '@/config/constants';

const NS = 'auth';

/** Tracks pending OTP state in memory (not persisted) */
let pendingAuth: { email: string; password: string; attempt: 'login' | 'signup' } | null = null;
let otpAttempts = 0;
const OTP_MAX_ATTEMPTS = 3;

export const authMock: AuthContract = {
  async signInWithGoogle(): Promise<User> {
    await simulateLatency();
    log.info(NS, 'signInWithGoogle');
    // Create or return mock Google user
    const googleUser: User = {
      id: 'google-demo-user',
      name: 'Demo User',
      email: 'demo@google.com',
      role: 'user',
      twoFactorEnabled: false,
      interests: { occasions: [], categories: [] },
      createdAt: new Date().toISOString(),
    };
    const users = db.get<User[]>('users') ?? [];
    const existing = users.find((u) => u.id === googleUser.id);
    if (!existing) {
      db.set('users', [...users, googleUser]);
    }
    db.set('session', googleUser.id);
    return existing ?? googleUser;
  },

  async signUp(email: string, _password: string): Promise<void> {
    await simulateLatency();
    log.info(NS, 'signUp', { email });
    const users = db.get<User[]>('users') ?? [];
    if (users.find((u) => u.email === email)) {
      throw new AppError('email-in-use', 'An account with this email already exists.');
    }
    pendingAuth = { email, password: _password, attempt: 'signup' };
    otpAttempts = 0;
  },

  async signIn(email: string, _password: string): Promise<void> {
    await simulateLatency();
    log.info(NS, 'signIn', { email });
    const users = db.get<User[]>('users') ?? [];
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new AppError('invalid-credentials', 'No account found with this email.');
    }
    pendingAuth = { email, password: _password, attempt: 'login' };
    otpAttempts = 0;
  },

  async verifyOtp(code: string): Promise<User> {
    await simulateLatency();
    log.info(NS, 'verifyOtp');
    if (!pendingAuth) {
      throw new AppError('no-pending-auth', 'No authentication in progress.');
    }
    if (code !== DEMO_OTP_CODE) {
      otpAttempts += 1;
      if (otpAttempts >= OTP_MAX_ATTEMPTS) {
        pendingAuth = null;
        throw new AppError('otp-locked', 'Too many wrong attempts. Please try again in 30 seconds.');
      }
      throw new AppError('invalid-otp', `Invalid code. ${OTP_MAX_ATTEMPTS - otpAttempts} attempt(s) remaining.`);
    }
    otpAttempts = 0;

    if (pendingAuth.attempt === 'signup') {
      const newUser: User = {
        id: generateId(),
        name: '',
        email: pendingAuth.email,
        role: 'user',
        twoFactorEnabled: false,
        interests: { occasions: [], categories: [] },
        createdAt: new Date().toISOString(),
      };
      const users = db.get<User[]>('users') ?? [];
      db.set('users', [...users, newUser]);
      db.set('session', newUser.id);
      pendingAuth = null;
      return newUser;
    } else {
      const users = db.get<User[]>('users') ?? [];
      const user = users.find((u) => u.email === pendingAuth?.email);
      if (!user) throw new AppError('user-not-found', 'User not found.');
      db.set('session', user.id);
      pendingAuth = null;
      return user;
    }
  },

  async resendOtp(): Promise<void> {
    await simulateLatency();
    log.info(NS, 'resendOtp');
    otpAttempts = 0;
  },

  async setup2fa(): Promise<{ qrDataUrl: string; manualKey: string; backupCodes: string[] }> {
    await simulateLatency();
    log.info(NS, 'setup2fa');
    return {
      qrDataUrl: 'https://picsum.photos/seed/qrcode/200/200',
      manualKey: 'JBSWY3DPEHPK3PXP',
      backupCodes: [
        'AAAA-BBBB', 'CCCC-DDDD', 'EEEE-FFFF', 'GGGG-HHHH',
        'IIII-JJJJ', 'KKKK-LLLL', 'MMMM-NNNN', 'OOOO-PPPP',
      ],
    };
  },

  async confirm2fa(code: string): Promise<void> {
    await simulateLatency();
    log.info(NS, 'confirm2fa');
    if (code !== DEMO_OTP_CODE) {
      throw new AppError('invalid-2fa-code', 'Invalid authenticator code.');
    }
    const sessionId = db.get<string>('session');
    if (!sessionId) throw new AppError('not-authenticated', 'Not authenticated.');
    const users = db.get<User[]>('users') ?? [];
    const updated = users.map((u) =>
      u.id === sessionId ? { ...u, twoFactorEnabled: true } : u,
    );
    db.set('users', updated);
  },

  async verify2fa(code: string): Promise<User> {
    await simulateLatency();
    log.info(NS, 'verify2fa');
    if (code !== DEMO_OTP_CODE) {
      throw new AppError('invalid-2fa-code', 'Invalid authenticator code.');
    }
    const sessionId = db.get<string>('session');
    if (!sessionId) throw new AppError('not-authenticated', 'Not authenticated.');
    const users = db.get<User[]>('users') ?? [];
    const user = users.find((u) => u.id === sessionId);
    if (!user) throw new AppError('user-not-found', 'User not found.');
    return user;
  },

  async completeOnboarding(data: OnboardingData): Promise<User> {
    await simulateLatency();
    log.info(NS, 'completeOnboarding', data);
    const sessionId = db.get<string>('session');
    if (!sessionId) throw new AppError('not-authenticated', 'Not authenticated.');
    const users = db.get<User[]>('users') ?? [];
    const updated = users.map((u) =>
      u.id === sessionId
        ? { ...u, name: data.name, phone: data.phone, locality: data.locality, interests: data.interests }
        : u,
    );
    db.set('users', updated);
    const user = updated.find((u) => u.id === sessionId);
    if (!user) throw new AppError('user-not-found', 'User not found.');
    return user;
  },

  async signOut(): Promise<void> {
    await simulateLatency();
    log.info(NS, 'signOut');
    db.remove('session');
  },

  async getSession(): Promise<User | null> {
    const sessionId = db.get<string>('session');
    if (!sessionId) return null;
    const users = db.get<User[]>('users') ?? [];
    return users.find((u) => u.id === sessionId) ?? null;
  },
};
