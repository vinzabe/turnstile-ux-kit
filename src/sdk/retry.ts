/**
 * Retry handler with exponential backoff
 */

import type { RetryOptions } from './types.js';

export class RetryHandler {
  private attempts: number = 0;
  private currentTimeout: ReturnType<typeof setTimeout> | null = null;
  private options: Required<Omit<RetryOptions, 'maxAttempts'>> & { maxAttempts: number };

  constructor(options: RetryOptions) {
    this.options = {
      min: options.min,
      max: options.max,
      maxAttempts: options.maxAttempts || 3
    };
  }

  getNextDelay(): number {
    const delay = Math.min(
      this.options.min * Math.pow(2, this.attempts),
      this.options.max
    );
    this.attempts++;
    return delay;
  }

  async retry(fn: () => Promise<void>): Promise<boolean> {
    if (this.attempts >= this.options.maxAttempts) {
      this.reset();
      return false;
    }

    const delay = this.getNextDelay();
    await new Promise<void>(resolve => {
      this.currentTimeout = setTimeout(resolve, delay);
    });

    try {
      await fn();
      this.reset();
      return true;
    } catch (error) {
      return this.retry(fn);
    }
  }

  reset(): void {
    this.attempts = 0;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  cancel(): void {
    this.reset();
  }

  getAttempts(): number {
    return this.attempts;
  }

  getMaxAttempts(): number {
    return this.options.maxAttempts;
  }
}
