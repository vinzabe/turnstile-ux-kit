/**
 * Type definitions for Turnstile UX Kit SDK
 */

export type ChallengeTheme = 'auto' | 'light' | 'dark';
export type ChallengeSize = 'normal' | 'compact' | 'flexible';

export interface ChallengeOptions {
  siteKey: string;
  theme?: ChallengeTheme;
  size?: ChallengeSize;
  language?: string;
  containerId: string;
  callbacks?: {
    onToken?: (token: string) => void;
    onError?: (errorCode: string) => void;
    onEvent?: (eventName: string, payload: Record<string, unknown>) => void;
  };
  ux?: {
    autoRetry?: boolean;
    retryBackoffMs?: { min: number; max: number };
    showTroubleshooting?: boolean;
  };
  telemetry?: boolean;
}

export interface ChallengeController {
  render(): void;
  reset(): void;
  destroy(): void;
  setLanguage(lang: string): void;
  setTheme(theme: ChallengeTheme): void;
  isReady(): boolean;
  onTelemetry(hook: TelemetryHook): void;
}

export type TelemetryEventType =
  | 'challenge_shown'
  | 'challenge_solved'
  | 'challenge_failed'
  | 'blocked_shown'
  | 'retry_clicked'
  | 'theme_changed'
  | 'language_changed';

export interface TelemetryEvent {
  event: TelemetryEventType;
  timestamp: number;
  page_type: string;
  theme: ChallengeTheme;
  locale: string;
  elapsed_ms?: number;
  request_id?: string;
  error_code?: string;
  [key: string]: unknown;
}

export type TelemetryHook = (event: TelemetryEvent) => void;

export interface I18nOptions {
  locale?: string;
  fallbackLocale?: string;
}

export interface ErrorDisplay {
  message: string;
  action: string;
}

export interface RetryOptions {
  min: number;
  max: number;
  maxAttempts?: number;
}
