import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui';
import { AuthStepCredentials } from './AuthStepCredentials';
import { AuthStepOtp } from './AuthStepOtp';
import { AuthStepTwoFactor } from './AuthStepTwoFactor';
import { AuthStepOnboarding, type OnboardingData } from './AuthStepOnboarding';
import { useAuthStore } from '@/stores/auth.store';
import { useActivityStore } from '@/stores/activity.store';
import { ROUTES } from '@/config/routes';
import type { User } from '@/shared/types';
import { generateId } from '@/shared/lib/id';

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export type AuthWizardStep = 'credentials' | 'otp' | '2fa' | 'onboarding';

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
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
    onOpenChange(false);
    onSuccess?.();
    navigate(ROUTES.USER_HOME);
  };

  const handleEmailSubmitted = (submittedEmail: string, mode: 'login' | 'signup') => {
    setEmail(submittedEmail);
    if (mode === 'login') {
      // Direct returning user path
      setStep('otp');
    } else {
      setStep('otp');
    }
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

    // Seed activity tracking signals
    data.occasions.forEach((occ) => track({ type: 'view_occasion', value: occ }));
    data.categories.forEach((cat) => track({ type: 'view_category', value: cat }));

    setUser(newUser);
    onOpenChange(false);
    onSuccess?.();
    navigate(ROUTES.USER_HOME);
  };

  return (
    <Modal
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          setStep('credentials');
        }
        onOpenChange(val);
      }}
      title="Join RE-thread"
      description="Buy, rent and sell pre-loved fashion across Bengaluru."
      className="max-w-md"
      data-testid="auth-modal"
    >
      <div className="pt-2">
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
    </Modal>
  );
};

