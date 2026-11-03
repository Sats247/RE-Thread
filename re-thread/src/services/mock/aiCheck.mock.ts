import type { AiCheckContract } from '../contracts/aiCheck.contract';
import type { AiCheckResult } from '@/shared/types';
import { simulateLatency } from './latency';
import { useDemoStore } from '@/stores/demo.store';

export const aiCheckMock: AiCheckContract = {
  async checkImages(files: File[]): Promise<AiCheckResult> {
    await simulateLatency();

    // Check demo override
    const { forceAiResult } = useDemoStore.getState();

    if (forceAiResult === 'fail') {
      return {
        status: 'flagged',
        score: 48,
        issues: [
          {
            code: 'blurry',
            imageIndex: 0,
            message: 'Image appears out of focus or motion-blurred. Please provide a sharp, well-lit photo.',
          },
        ],
        checkedAt: new Date().toISOString(),
      };
    }

    if (forceAiResult === 'pass') {
      return {
        status: 'pass',
        score: 96,
        issues: [],
        checkedAt: new Date().toISOString(),
      };
    }

    // Deterministic check based on filename
    const issues: AiCheckResult['issues'] = [];

    files.forEach((file, idx) => {
      const name = file.name.toLowerCase();
      if (name.includes('blur')) {
        issues.push({ code: 'blurry', imageIndex: idx, message: 'Garment details are blurry.' });
      } else if (name.includes('dark')) {
        issues.push({ code: 'dark', imageIndex: idx, message: 'Insufficient lighting detected.' });
      } else if (name.includes('watermark')) {
        issues.push({ code: 'watermark', imageIndex: idx, message: 'Watermark or brand graphic detected.' });
      } else if (name.includes('stock')) {
        issues.push({ code: 'stock-photo', imageIndex: idx, message: 'Appears to be a catalog stock photo, not physical item.' });
      }
    });

    if (issues.length > 0) {
      return {
        status: 'flagged',
        score: 55,
        issues,
        checkedAt: new Date().toISOString(),
      };
    }

    return {
      status: 'pass',
      score: 88 + (files.length % 10),
      issues: [],
      checkedAt: new Date().toISOString(),
    };
  },
};
