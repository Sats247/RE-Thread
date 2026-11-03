import React from 'react';
import { useDemoStore } from '@/stores/demo.store';
import { Smartphone, Monitor } from 'lucide-react';

export interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const { phoneFrame, togglePhoneFrame } = useDemoStore();

  if (!phoneFrame) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-start py-6 px-4">
      {/* Control Strip */}
      <div className="flex items-center gap-3 mb-4 bg-ink/90 border border-line/20 px-4 py-2 text-paper text-xs select-none">
        <Smartphone className="h-4 w-4 text-accent-green" />
        <span className="font-mono">Mobile View (390px × 844px)</span>
        <button
          type="button"
          onClick={togglePhoneFrame}
          className="ml-4 underline hover:text-mist flex items-center gap-1 font-medium"
        >
          <Monitor className="h-3 w-3" />
          Exit Phone View
        </button>
      </div>

      {/* Simulated iPhone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-paper shadow-2xl overflow-hidden border-[10px] border-stone-800 rounded-[44px] flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-950 rounded-full z-50 pointer-events-none" />

        {/* Scaled App Window */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-400/50 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};

