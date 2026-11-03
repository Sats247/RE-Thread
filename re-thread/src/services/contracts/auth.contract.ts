import type { User } from '@/shared/types';

export interface OnboardingData {
  name: string;
  phone?: string;
  locality?: string;
  interests: User['interests'];
}

export interface AuthContract {
  signInWithGoogle(): Promise<User>;
  signUp(email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  verifyOtp(code: string): Promise<User>;
  resendOtp(): Promise<void>;
  setup2fa(): Promise<{ qrDataUrl: string; manualKey: string; backupCodes: string[] }>;
  confirm2fa(code: string): Promise<void>;
  verify2fa(code: string): Promise<User>;
  completeOnboarding(data: OnboardingData): Promise<User>;
  signOut(): Promise<void>;
  getSession(): Promise<User | null>;
}
