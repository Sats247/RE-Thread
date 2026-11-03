import { AppError } from '@/shared/types';
import { useDemoStore } from '@/stores/demo.store';

/**
 * Simulates network latency and checks demo error flags.
 */
export async function simulateLatency(): Promise<void> {
  // Check if Demo Panel forced error is active
  const { forceError, setForceError } = useDemoStore.getState();
  if (forceError) {
    setForceError(false); // Reset one-shot error trigger
    throw new AppError('forced-error', 'Simulated service failure from Demo Panel');
  }

  let ms = 250;
  try {
    const setting = localStorage.getItem('rt:demo-latency');
    if (setting === '0') {
      ms = 0;
    } else if (setting === 'slow') {
      ms = 2000;
    } else {
      ms = 250 + Math.floor(Math.random() * 450);
    }
  } catch {
    ms = 250;
  }

  if (ms > 0) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
