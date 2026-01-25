/**
 * SDK Tests
 */

import { describe, it, expect, beforeEach, vi } from 'bun:test';
import { TurnstileChallenge, initChallenge } from '../src/sdk/index.js';
import { getErrorDisplay, isRetryableError } from '../src/sdk/errors.js';
import { RetryHandler } from '../src/sdk/retry.js';
import { TelemetryManager } from '../src/sdk/telemetry.js';
import { I18n } from '../src/i18n/loader.js';

declare global {
  interface Window {
    turnstile: {
      render: ReturnType<typeof vi.fn>;
      reset: ReturnType<typeof vi.fn>;
      remove: ReturnType<typeof vi.fn>;
    };
    navigator: {
      language: string;
    };
  }

  interface Document {
    getElementById: ReturnType<typeof vi.fn>;
    createElement: ReturnType<typeof vi.fn>;
    head: {
      appendChild: ReturnType<typeof vi.fn>;
    };
  }
}

// Mock window.turnstile
global.window = {
  turnstile: {
    render: vi.fn(),
    reset: vi.fn(),
    remove: vi.fn()
  },
  navigator: {
    language: 'en-US'
  }
};

global.document = {
  getElementById: vi.fn(),
  createElement: vi.fn(),
  head: {
    appendChild: vi.fn()
  }
};

describe('initChallenge', () => {
  it('should throw error without siteKey', () => {
    expect(() => initChallenge({ containerId: 'test' } as ChallengeOptions)).toThrow('siteKey is required');
  });

  it('should throw error without containerId', () => {
    expect(() => initChallenge({ siteKey: 'test' } as ChallengeOptions)).toThrow('containerId is required');
  });

  it('should return ChallengeController instance', () => {
    const controller = initChallenge({
      siteKey: 'test-sitekey',
      containerId: 'test-container'
    });
    expect(controller).toBeInstanceOf(TurnstileChallenge);
  });
});

describe('RetryHandler', () => {
  let retryHandler: RetryHandler;

  beforeEach(() => {
    retryHandler = new RetryHandler({ min: 100, max: 1000, maxAttempts: 3 });
  });

  it('should start with correct delay', () => {
    expect(retryHandler.getNextDelay()).toBe(100);
  });

  it('should double delay exponentially', () => {
    expect(retryHandler.getNextDelay()).toBe(100);
    expect(retryHandler.getNextDelay()).toBe(200);
    expect(retryHandler.getNextDelay()).toBe(400);
  });

  it('should cap delay at max', () => {
    expect(retryHandler.getNextDelay()).toBe(100);
    expect(retryHandler.getNextDelay()).toBe(200);
    expect(retryHandler.getNextDelay()).toBe(400);
    expect(retryHandler.getNextDelay()).toBe(800);
    expect(retryHandler.getNextDelay()).toBe(1000);
    expect(retryHandler.getNextDelay()).toBe(1000);
  });

  it('should reset attempts', () => {
    retryHandler.getNextDelay();
    retryHandler.reset();
    expect(retryHandler.getNextDelay()).toBe(100);
  });
});

describe('Error Handling', () => {
  it('should return fallback for unknown errors', () => {
    const display = getErrorDisplay('unknown-error-code');
    expect(display.message).toBe('An error occurred');
    expect(display.action).toBe('Please try again or contact support');
  });

  it('should return mapped error for known codes', () => {
    const display = getErrorDisplay('network-error');
    expect(display.message).toBe('Network issue detected');
    expect(display.action).toBe('Check your internet connection and try again');
  });

  it('should identify retryable errors', () => {
    expect(isRetryableError('network-error')).toBe(true);
    expect(isRetryableError('verification-expired')).toBe(true);
    expect(isRetryableError('timeout-error')).toBe(true);
    expect(isRetryableError('rate-limit')).toBe(true);
    expect(isRetryableError('blocked')).toBe(false);
  });
});

describe('TelemetryManager', () => {
  it('should not emit when disabled', () => {
    const hook = vi.fn();
    const telemetry = new TelemetryManager(false);
    telemetry.addHook(hook);
    
    telemetry.emit({
      event: 'challenge_shown',
      timestamp: Date.now(),
      page_type: 'test',
      theme: 'light',
      locale: 'en'
    });
    
    expect(hook).not.toHaveBeenCalled();
  });

  it('should emit when enabled', () => {
    const hook = vi.fn();
    const telemetry = new TelemetryManager(true);
    telemetry.addHook(hook);
    
    telemetry.emit({
      event: 'challenge_shown',
      timestamp: Date.now(),
      page_type: 'test',
      theme: 'light',
      locale: 'en'
    });
    
    expect(hook).toHaveBeenCalledTimes(1);
  });

  it('should handle hook failures gracefully', () => {
    const failingHook = vi.fn(() => { throw new Error('Hook failed'); });
    const successHook = vi.fn();
    const telemetry = new TelemetryManager(true);
    telemetry.addHook(failingHook);
    telemetry.addHook(successHook);
    
    telemetry.emit({
      event: 'challenge_shown',
      timestamp: Date.now(),
      page_type: 'test',
      theme: 'light',
      locale: 'en'
    });
    
    expect(failingHook).toHaveBeenCalled();
    expect(successHook).toHaveBeenCalled();
  });
});

describe('I18n', () => {
  it('should interpolate variables', () => {
    const i18n = new I18n();
    i18n.loadLocale('en', { test: 'Wait {{seconds}} seconds' });
    
    expect(i18n.t('test', { seconds: 30 })).toBe('Wait 30 seconds');
  });

  it('should return key for missing translations', () => {
    const i18n = new I18n();
    expect(i18n.t('missing.key')).toBe('missing.key');
  });

  it('should support nested keys', () => {
    const i18n = new I18n();
    i18n.loadLocale('en', {
      error: {
        message: 'Error message'
      }
    });
    
    expect(i18n.t('error.message')).toBe('Error message');
  });
});
