/**
 * Internationalization (i18n) loader
 */

import type { I18nOptions } from '../sdk/types.js';

interface LocaleData {
  [key: string]: unknown;
}

export class I18n {
  private locale: string;
  private fallbackLocale: string;
  private translations: Map<string, LocaleData>;

  constructor(options: I18nOptions = {}) {
    this.locale = options.locale || this.detectBrowserLocale();
    this.fallbackLocale = options.fallbackLocale || 'en';
    this.translations = new Map();
  }

  private detectBrowserLocale(): string {
    if (typeof window !== 'undefined' && window.navigator) {
      const browserLang = window.navigator.language;
      return browserLang.split('-')[0];
    }
    return 'en';
  }

  async loadLocale(locale: string, data: LocaleData): Promise<void> {
    this.translations.set(locale, data);
  }

  async loadLocaleFromUrl(locale: string, url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.translations.set(locale, data);
    } catch (error) {
      console.warn(`Failed to load locale ${locale} from ${url}:`, error);
    }
  }

  setLocale(locale: string): void {
    this.locale = locale;
  }

  getLocale(): string {
    return this.locale;
  }

  t(key: string, params: Record<string, string | number> = {}): string {
    const keys = key.split('.');
    let value: unknown = this.translations.get(this.locale) || this.translations.get(this.fallbackLocale);

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = key;
        break;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    return this.interpolate(value, params);
  }

  private interpolate(template: string, params: Record<string, string | number>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, param) => {
      return String(params[param] || '');
    });
  }

  hasLocale(locale: string): boolean {
    return this.translations.has(locale);
  }

  getAvailableLocales(): string[] {
    return Array.from(this.translations.keys());
  }
}
