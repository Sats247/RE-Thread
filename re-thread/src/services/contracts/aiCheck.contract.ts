import type { AiCheckResult } from '@/shared/types';

export interface AiCheckContract {
  checkImages(files: File[]): Promise<AiCheckResult>;
}
