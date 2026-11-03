import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthStepCredentials } from '../components/AuthStepCredentials';
import { AuthStepOtp } from '../components/AuthStepOtp';
import { AuthStepTwoFactor } from '../components/AuthStepTwoFactor';
import { AuthStepOnboarding, type OnboardingData } from '../components/AuthStepOnboarding';
import { useAuthStore } from '@/stores/auth.store';
import { useActivityStore } from '@/stores/activity.store';
import { ROUTES } from '@/config/routes';
import type { User } from '@/shared/types';
import { generateId } from '@/shared/lib/id';
import type { AuthWizardStep } from '../components/AuthModal';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { track } = useActivityStore();

  const [step, setStep] = useState<AuthWizardStep>('credentials');
  const [email, setEmail] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleGoogleSignIn = () => {
    const googleUser: User = {
      id: 'google-user-' + generateId().slice(0, 6),
      name: 'Google Demo User',
      email: 'demo.user@gmail.com',
      locality: 'Indiranagar',
      role: 'user',
      twoFactorEnabled: false,
      interests: { occasions: ['brunch', 'festive'], categories: ['women'] },
      createdAt: new Date().toISOString(),
    };
    setUser(googleUser);
    navigate(ROUTES.USER_HOME);
  };

  const handleEmailSubmitted = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep('otp');
  };

  const handleOtpVerified = () => {
    setStep('2fa');
  };

  const handleTwoFactorComplete = () => {
    setTwoFactorEnabled(true);
    setStep('onboarding');
  };

  const handleTwoFactorSkip = () => {
    setTwoFactorEnabled(false);
    setStep('onboarding');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    const newUser: User = {
      id: generateId(),
      name: data.name,
      email,
      phone: data.phone,
      locality: data.locality,
      role: 'user',
      twoFactorEnabled,
      interests: { occasions: data.occasions, categories: data.categories },
      createdAt: new Date().toISOString(),
    };

    data.occasions.forEach((occ) => track({ type: 'view_occasion', value: occ }));
    data.categories.forEach((cat) => track({ type: 'view_category', value: cat }));

    setUser(newUser);
    navigate(ROUTES.USER_HOME);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-paper" data-testid="auth-page">
      <div className="max-w-md w-full border border-line p-8 bg-paper shadow-sm">
        <div className="text-center mb-8 pb-4 border-b border-line">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted block mb-1">
            RE-thread Account
          </span>
          <h1 className="text-2xl font-light uppercase tracking-wider text-ink">
            {step === 'credentials' && 'Sign In / Register'}
            {step === 'otp' && 'Verify Code'}
            {step === '2fa' && 'Security Setup'}
            {step === 'onboarding' && 'Personalize'}
          </h1>
        </div>

        {step === 'credentials' && (
          <AuthStepCredentials
            onGoogleSignIn={handleGoogleSignIn}
            onSubmitEmail={handleEmailSubmitted}
          />
        )}

        {step === 'otp' && (
          <AuthStepOtp
            email={email}
            onVerifySuccess={handleOtpVerified}
            onBack={() => setStep('credentials')}
          />
        )}

        {step === '2fa' && (
          <AuthStepTwoFactor
            onComplete={handleTwoFactorComplete}
            onSkip={handleTwoFactorSkip}
          />
        )}

        {step === 'onboarding' && (
          <AuthStepOnboarding
            initialEmail={email}
            onComplete={handleOnboardingComplete}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;

