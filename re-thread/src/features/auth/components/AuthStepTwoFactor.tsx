import React, { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { QrCode, Copy, Check, Key } from 'lucide-react';
import { TWOFACTOR_DEMO_CODE } from '@/config/constants';

export interface AuthStepTwoFactorProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const AuthStepTwoFactor: React.FC<AuthStepTwoFactorProps> = ({
  onComplete,
  onSkip,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);

  const manualKey = 'RT2F-7741-KORA-BLR9';
  const backupCodes = [
    '4910-8201', '3912-7492', '8204-1029', '5519-3820',
    '7192-4910', '1920-5829', '6620-1928', '3819-5029',
  ];

  const handleCopyKey = () => {
    navigator.clipboard.writeText(manualKey).then(() => {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    });
  };

  const handleCopyBackup = () => {
    navigator.clipboard.writeText(backupCodes.join('\n')).then(() => {
      setCopiedCodes(true);
      setTimeout(() => setCopiedCodes(false), 2000);
    });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === TWOFACTOR_DEMO_CODE) {
      setError('');
      onComplete();
    } else {
      setError(`Invalid authenticator code. (Use demo code ${TWOFACTOR_DEMO_CODE})`);
    }
  };

  return (
    <div className="space-y-6 text-left" data-testid="auth-twofactor-step">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Step 3 of 4</span>
        <h3 className="text-base font-semibold uppercase tracking-wider text-ink">
          Two-Factor Authentication
        </h3>
        <p className="text-xs text-muted mt-1">
          Secure your seller earnings and rental deposits with an authenticator app.
        </p>
      </div>

      {/* Mock QR & Secret */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-line bg-mist">
        <div className="w-24 h-24 bg-paper border border-line p-2 flex flex-col items-center justify-center text-ink shrink-0">
          <QrCode className="w-16 h-16 stroke-[1.25]" />
          <span className="text-[9px] font-mono mt-0.5">SCAN ME</span>
        </div>
        <div className="flex-1 space-y-1.5 text-xs">
          <span className="text-muted text-[11px] block">Or enter setup key manually:</span>
          <div className="flex items-center gap-2">
            <code className="bg-paper border border-line px-2 py-1 font-mono text-[11px] text-ink select-all">
              {manualKey}
            </code>
            <button
              type="button"
              onClick={handleCopyKey}
              className="p-1 hover:text-ink text-muted transition-colors"
              aria-label="Copy secret key"
            >
              {copiedKey ? <Check className="h-3.5 w-3.5 text-ok" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          label="Enter 6-Digit Authenticator Code"
          placeholder="123456"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          helperText={`Demo code accepted: ${TWOFACTOR_DEMO_CODE}`}
          data-testid="auth-2fa-input"
        />

        {error && <p className="text-xs text-danger">{error}</p>}

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-1"
            disabled={code.length !== 6}
            data-testid="auth-2fa-verify-btn"
          >
            Confirm & Enable 2FA
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onSkip}
            data-testid="auth-2fa-skip-btn"
          >
            Set Up Later
          </Button>
        </div>
      </form>

      {/* Backup codes preview */}
      <div className="pt-2 border-t border-line text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase font-mono tracking-wider text-muted flex items-center gap-1">
            <Key className="h-3 w-3" /> One-Time Backup Codes
          </span>
          <button
            type="button"
            onClick={handleCopyBackup}
            className="text-[11px] underline text-muted hover:text-ink"
          >
            {copiedCodes ? 'Copied!' : 'Copy 8 Codes'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px] text-muted">
          {backupCodes.map((c) => (
            <span key={c} className="p-1 bg-mist text-center">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

