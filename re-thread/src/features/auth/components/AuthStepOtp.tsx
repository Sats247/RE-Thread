import React, { useState, useEffect } from 'react';
import { Button, Input } from '@/shared/ui';
import { ShieldCheck, Clock } from 'lucide-react';
import { OTP_DEMO_CODE } from '@/config/constants';

export interface AuthStepOtpProps {
  email: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const AuthStepOtp: React.FC<AuthStepOtpProps> = ({
  email,
  onVerifySuccess,
  onBack,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [resendTimer, setResendTimer] = useState(30);
  const [lockedTimer, setLockedTimer] = useState(0);

  // Resend countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  // Lock countdown
  useEffect(() => {
    if (lockedTimer > 0) {
      const t = setTimeout(() => setLockedTimer((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [lockedTimer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedTimer > 0) return;

    if (code.trim() === OTP_DEMO_CODE) {
      setError('');
      onVerifySuccess();
    } else {
      const nextFailures = failedAttempts + 1;
      setFailedAttempts(nextFailures);

      if (nextFailures >= 3) {
        setLockedTimer(30);
        setError('Too many incorrect attempts. Locked for 30 seconds.');
      } else {
        setError(`Incorrect code. (${3 - nextFailures} attempts remaining before temporary lock).`);
      }
    }
  };

  const handleResend = () => {
    if (resendTimer > 0 || lockedTimer > 0) return;
    setResendTimer(30);
    setError('');
    setCode('');
  };

  return (
    <div className="space-y-6 text-left" data-testid="auth-otp-step">
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Step 2 of 4</span>
        <h3 className="text-base font-semibold uppercase tracking-wider text-ink">
          Verify Your Code
        </h3>
        <p className="text-xs text-muted">
          A 6-digit verification code was sent to <strong className="text-ink">{email}</strong>.
        </p>
      </div>

      <div className="p-3 bg-mist border border-line text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-ink font-mono font-medium">
          <ShieldCheck className="h-4 w-4 text-ok" />
          <span>Demo Hint: Use code <strong>{OTP_DEMO_CODE}</strong></span>
        </div>
        <p className="text-[11px] text-muted">
          Testing wrong code? Enter any other digits to test retry limits and lockouts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="6-Digit Verification Code"
          type="text"
          maxLength={6}
          pattern="[0-9]*"
          placeholder="123456"
          disabled={lockedTimer > 0}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          data-testid="auth-otp-input"
        />

        {error && <p className="text-xs text-danger">{error}</p>}

        {lockedTimer > 0 ? (
          <div className="p-2.5 bg-red-50 border border-danger/30 text-xs text-danger flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 animate-spin" />
            <span>Account locked for {lockedTimer}s</span>
          </div>
        ) : (
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={code.length !== 6}
            data-testid="auth-otp-verify-btn"
          >
            Verify & Proceed
          </Button>
        )}
      </form>

      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-line">
        <button
          type="button"
          onClick={onBack}
          className="underline hover:text-ink"
        >
          ← Change Email
        </button>

        <button
          type="button"
          disabled={resendTimer > 0 || lockedTimer > 0}
          onClick={handleResend}
          className="underline hover:text-ink disabled:opacity-40 disabled:no-underline"
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
        </button>
      </div>
    </div>
  );
};

