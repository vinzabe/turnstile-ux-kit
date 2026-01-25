/**
 * Core SDK implementation
 */

import type { ChallengeOptions, ChallengeController, TelemetryEvent } from './types';
import { TelemetryManager } from './telemetry';
import { RetryHandler } from './retry';
import { getErrorDisplay, isRetryableError } from './errors';

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export class TurnstileChallenge implements ChallengeController {
  private options: ChallengeOptions;
  private widgetId: string | null = null;
  private container: HTMLElement | null = null;
  private telemetry: TelemetryManager;
  private retryHandler: RetryHandler | null = null;
  private startTime: number = 0;
  private isLoaded: boolean = false;

  constructor(options: ChallengeOptions) {
    this.options = this.validateOptions(options);
    this.telemetry = new TelemetryManager(options.telemetry || false);

    if (this.options.ux?.autoRetry) {
      this.retryHandler = new RetryHandler({
        min: this.options.ux.retryBackoffMs?.min || 1000,
        max: this.options.ux.retryBackoffMs?.max || 30000,
        maxAttempts: 3
      });
    }

    this.loadTurnstileScript();
  }

  private validateOptions(options: ChallengeOptions): ChallengeOptions {
    if (!options.siteKey) {
      throw new Error('siteKey is required');
    }
    if (!options.containerId) {
      throw new Error('containerId is required');
    }
    return options;
  }

  private loadTurnstileScript(): void {
    if (typeof window !== 'undefined' && !window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.isLoaded = true;
        this.render();
      };
      document.head.appendChild(script);
    } else if (window.turnstile) {
      this.isLoaded = true;
    }
  }

  render(): void {
    if (!this.isLoaded || !window.turnstile) {
      return;
    }

    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      console.error(`Container ${this.options.containerId} not found`);
      return;
    }

    this.startTime = Date.now();
    this.telemetry.emit({
      event: 'challenge_shown',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: this.options.theme || 'auto',
      locale: this.options.language || 'en'
    });

    const turnstileOptions: Record<string, unknown> = {
      sitekey: this.options.siteKey,
      theme: this.options.theme || 'auto',
      size: this.options.size || 'normal',
      language: this.options.language || 'en',
      callback: (token: string) => this.handleSuccess(token),
      'error-callback': (error: string) => this.handleError(error),
      'expired-callback': () => this.handleExpired(),
      'unsupported-callback': () => this.handleUnsupported()
    };

    this.widgetId = window.turnstile.render(this.container, turnstileOptions);
  }

  private handleSuccess(token: string): void {
    const elapsed = Date.now() - this.startTime;

    this.telemetry.emit({
      event: 'challenge_solved',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: this.options.theme || 'auto',
      locale: this.options.language || 'en',
      elapsed_ms: elapsed
    });

    if (this.options.callbacks?.onToken) {
      this.options.callbacks.onToken(token);
    }
  }

  private handleError(error: string): void {
    this.telemetry.emit({
      event: 'challenge_failed',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: this.options.theme || 'auto',
      locale: this.options.language || 'en',
      error_code: error
    });

    const errorDisplay = getErrorDisplay(error);

    if (this.options.callbacks?.onError) {
      this.options.callbacks.onError(error);
    }

    if (this.options.ux?.autoRetry && isRetryableError(error) && this.retryHandler) {
      this.retryWithBackoff(error);
    }
  }

  private async retryWithBackoff(errorCode: string): void {
    if (!this.retryHandler) return;

    const success = await this.retryHandler.retry(async () => {
      this.reset();
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    if (!success && this.options.callbacks?.onError) {
      this.options.callbacks.onError(errorCode);
    }
  }

  private handleExpired(): void {
    this.telemetry.emit({
      event: 'challenge_failed',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: this.options.theme || 'auto',
      locale: this.options.language || 'en',
      error_code: 'verification-expired'
    });

    if (this.options.callbacks?.onError) {
      this.options.callbacks.onError('verification-expired');
    }
  }

  private handleUnsupported(): void {
    this.telemetry.emit({
      event: 'challenge_failed',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: this.options.theme || 'auto',
      locale: this.options.language || 'en',
      error_code: 'browser-unsupported'
    });

    if (this.options.callbacks?.onError) {
      this.options.callbacks.onError('browser-unsupported');
    }
  }

  reset(): void {
    if (this.widgetId && window.turnstile) {
      window.turnstile.reset(this.widgetId);
    }
  }

  destroy(): void {
    if (this.widgetId && window.turnstile) {
      window.turnstile.remove(this.widgetId);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
    if (this.retryHandler) {
      this.retryHandler.cancel();
    }
    this.telemetry.clearHooks();
  }

  setLanguage(lang: string): void {
    const oldLocale = this.options.language;
    this.options.language = lang;

    this.telemetry.emit({
      event: 'language_changed',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: this.options.theme || 'auto',
      locale: lang
    });

    if (this.options.callbacks?.onEvent) {
      this.options.callbacks.onEvent('language_changed', { old: oldLocale, new: lang });
    }

    this.destroy();
    this.render();
  }

  setTheme(theme: 'auto' | 'light' | 'dark'): void {
    const oldTheme = this.options.theme;
    this.options.theme = theme;

    this.telemetry.emit({
      event: 'theme_changed',
      timestamp: Date.now(),
      page_type: 'turnstile',
      theme: theme,
      locale: this.options.language || 'en'
    });

    if (this.options.callbacks?.onEvent) {
      this.options.callbacks.onEvent('theme_changed', { old: oldTheme, new: theme });
    }

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }

    this.destroy();
    this.render();
  }

  isReady(): boolean {
    return this.isLoaded;
  }

  onTelemetry(hook: (event: TelemetryEvent) => void): void {
    this.telemetry.addHook(hook);
  }
}

export function initChallenge(options: ChallengeOptions): TurnstileChallenge {
  return new TurnstileChallenge(options);
}
