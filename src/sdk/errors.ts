/**
 * Error mapping for human-friendly error messages
 */

import type { ErrorDisplay } from './types.js';

export const ERROR_MESSAGES: Record<string, ErrorDisplay> = {
  'network-error': {
    message: 'Network issue detected',
    action: 'Check your internet connection and try again'
  },
  'verification-expired': {
    message: 'Verification expired',
    action: 'Please retry verification'
  },
  'browser-unsupported': {
    message: 'Browser not supported',
    action: 'Enable JavaScript or use a modern browser'
  },
  'verification-failed': {
    message: 'Verification failed',
    action: 'Please complete the verification again'
  },
  'timeout-error': {
    message: 'Request timed out',
    action: 'Please try again'
  },
  'invalid-sitekey': {
    message: 'Invalid configuration',
    action: 'Contact support about this error'
  },
  'rate-limit': {
    message: 'Too many attempts',
    action: 'Please wait before trying again'
  },
  'blocked': {
    message: 'Access blocked',
    action: 'Contact support if you believe this is an error'
  }
};

export function getErrorDisplay(code: string): ErrorDisplay {
  return ERROR_MESSAGES[code] || {
    message: 'An error occurred',
    action: 'Please try again or contact support'
  };
}

export function isRetryableError(code: string): boolean {
  const retryableErrors = [
    'network-error',
    'verification-expired',
    'timeout-error',
    'rate-limit'
  ];
  return retryableErrors.includes(code);
}
