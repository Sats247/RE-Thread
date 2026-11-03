import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonaId = 'guest' | 'aarav' | 'meera' | 'kavya' | 'thread-co' | 'admin';

interface DemoState {
  persona: PersonaId;
  latency: '0' | 'normal' | 'slow';
  clockOffsetDays: number;
  forceError: boolean;
  forceAiResult: 'pass' | 'fail' | null;
  phoneFrame: boolean;
  setPersona: (p: PersonaId) => void;
  setLatency: (l: '0' | 'normal' | 'slow') => void;
  setClockOffsetDays: (days: number) => void;
  advanceClock: (days: number) => void;
  setForceError: (force: boolean) => void;
  setForceAiResult: (res: 'pass' | 'fail' | null) => void;
  togglePhoneFrame: () => void;
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      persona: 'guest',
      latency: 'normal',
      clockOffsetDays: 0,
      forceError: false,
      forceAiResult: null,
      phoneFrame: false,
      setPersona: (persona) => set({ persona }),
      setLatency: (latency) => {
        set({ latency });
        localStorage.setItem('rt:demo-latency', latency);
      },
      setClockOffsetDays: (clockOffsetDays) => {
        set({ clockOffsetDays });
        localStorage.setItem('rt:demo-clock-offset', String(clockOffsetDays));
      },
      advanceClock: (days) => {
        set((s) => {
          const updated = s.clockOffsetDays + days;
          localStorage.setItem('rt:demo-clock-offset', String(updated));
          return { clockOffsetDays: updated };
        });
      },
      setForceError: (forceError) => set({ forceError }),
      setForceAiResult: (forceAiResult) => set({ forceAiResult }),
      togglePhoneFrame: () => set((s) => ({ phoneFrame: !s.phoneFrame })),
    }),
    { name: 'rt:demo', version: 1 }
  )
);

