import React, { useState, useEffect } from 'react';
import { useDemoStore, type PersonaId } from '@/stores/demo.store';
import { PERSONAS, switchPersona } from './personas';
import { db } from '@/services';
import { getNow } from '@/shared/lib/format';
import { Settings2, X, RefreshCw, Clock, AlertTriangle, Smartphone, Sparkles } from 'lucide-react';

export const DemoPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {
    persona,
    latency,
    setLatency,
    clockOffsetDays,
    advanceClock,
    setClockOffsetDays,
    forceError,
    setForceError,
    forceAiResult,
    setForceAiResult,
    phoneFrame,
    togglePhoneFrame,
  } = useDemoStore();

  // Keyboard shortcut Ctrl+Shift+D or query param ?demo=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === '1') setOpen(true);
    if (params.get('frame') === 'phone' && !phoneFrame) togglePhoneFrame();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phoneFrame, togglePhoneFrame]);

  const handleResetDb = () => {
    if (confirm('Reset mock database to default seeded fixtures?')) {
      db.reset();
      window.location.reload();
    }
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid="demo-panel-toggle"
        className="fixed bottom-20 md:bottom-6 left-4 z-40 bg-ink text-paper text-xs uppercase tracking-widest px-3 py-2 flex items-center gap-2 shadow-xl border border-line hover:bg-ink-soft select-none font-medium"
      >
        <Settings2 className="h-3.5 w-3.5" />
        <span>Demo: {PERSONAS[persona]?.name.split(' ')[0]}</span>
      </button>

      {/* Drawer Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          data-testid="demo-panel-drawer"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-paper border-l border-line shadow-2xl flex flex-col p-6 overflow-y-auto text-left select-none text-ink animate-in slide-in-from-right duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Test Harness</span>
              <h3 className="text-base font-semibold uppercase tracking-wider text-ink">Demo Control Panel</h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-muted hover:text-ink focus-visible:outline-none"
              aria-label="Close demo panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6 text-xs flex-1">
            {/* 1. Switch Persona */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-muted block mb-2 font-medium">
                1. Switch Persona
              </label>
              <select
                value={persona}
                onChange={(e) => switchPersona(e.target.value as PersonaId)}
                data-testid="demo-persona-select"
                className="w-full bg-paper border border-line p-2.5 text-xs text-ink focus:outline-none focus:border-ink"
              >
                {Object.values(PERSONAS).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-muted mt-1.5 leading-relaxed bg-mist p-2 border border-line">
                {PERSONAS[persona]?.scenarioNotes}
              </p>
            </div>

            {/* 2. Fast-Forward Clock */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-muted font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 2. Clock Fast-Forward
                </span>
                <span className="font-mono text-xs text-ink">{getNow().toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <button
                  type="button"
                  onClick={() => advanceClock(1)}
                  className="flex-1 py-1.5 px-2 bg-mist border border-line hover:bg-line text-center text-xs"
                >
                  +1 Day
                </button>
                <button
                  type="button"
                  onClick={() => advanceClock(3)}
                  className="flex-1 py-1.5 px-2 bg-mist border border-line hover:bg-line text-center text-xs"
                >
                  +3 Days
                </button>
                <button
                  type="button"
                  onClick={() => advanceClock(7)}
                  className="flex-1 py-1.5 px-2 bg-mist border border-line hover:bg-line text-center text-xs"
                >
                  +7 Days
                </button>
              </div>
              {clockOffsetDays > 0 && (
                <button
                  type="button"
                  onClick={() => setClockOffsetDays(0)}
                  className="text-[11px] text-muted underline hover:text-ink block"
                >
                  Reset Clock to Today (+{clockOffsetDays}d active)
                </button>
              )}
            </div>

            {/* 3. Failure & AI Test Injection */}
            <div className="space-y-3 pt-2 border-t border-line">
              <span className="text-xs uppercase font-mono tracking-wider text-muted font-medium block">
                3. Simulation Overrides
              </span>
              <label className="flex items-center justify-between cursor-pointer p-2 bg-mist border border-line">
                <span className="flex items-center gap-2 text-xs">
                  <AlertTriangle className="h-3.5 w-3.5 text-danger" />
                  Force Next API Call to Fail
                </span>
                <input
                  type="checkbox"
                  checked={forceError}
                  onChange={(e) => setForceError(e.target.checked)}
                  className="h-4 w-4"
                />
              </label>

              <div className="p-2 bg-mist border border-line space-y-1.5">
                <span className="flex items-center gap-1.5 text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-accent-green" />
                  Force AI Image Check
                </span>
                <div className="flex gap-2">
                  {(['none', 'pass', 'fail'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForceAiResult(opt === 'none' ? null : opt)}
                      className={`flex-1 py-1 text-[11px] uppercase font-mono border ${
                        (opt === 'none' && forceAiResult === null) || forceAiResult === opt
                          ? 'bg-ink text-paper border-ink'
                          : 'bg-paper text-muted border-line'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Network Latency & Frame */}
            <div className="space-y-3 pt-2 border-t border-line">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-mono tracking-wider text-muted font-medium">
                  Mock Latency
                </span>
                <div className="flex gap-1.5">
                  {(['0', 'normal', 'slow'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLatency(l)}
                      className={`px-2.5 py-1 text-[11px] uppercase font-mono border ${
                        latency === l ? 'bg-ink text-paper border-ink' : 'bg-mist text-muted border-line'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={togglePhoneFrame}
                className="w-full py-2 px-3 border border-line bg-paper hover:bg-mist flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <Smartphone className="h-3.5 w-3.5" />
                {phoneFrame ? 'Exit Phone View Frame' : 'Toggle 390px Phone Frame'}
              </button>
            </div>

            {/* 5. Reset DB */}
            <div className="pt-2 border-t border-line">
              <button
                type="button"
                onClick={handleResetDb}
                data-testid="demo-reset-db-btn"
                className="w-full py-2.5 px-3 bg-danger text-paper hover:bg-red-700 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-medium"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Mock DB to Seed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

