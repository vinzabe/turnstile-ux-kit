/**
 * Telemetry management system
 */

import type { TelemetryEvent, TelemetryHook } from './types.js';

export class TelemetryManager {
  private hooks: TelemetryHook[] = [];
  private enabled: boolean;

  constructor(enabled: boolean = false) {
    this.enabled = enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  addHook(hook: TelemetryHook): void {
    this.hooks.push(hook);
  }

  removeHook(hook: TelemetryHook): void {
    const index = this.hooks.indexOf(hook);
    if (index > -1) {
      this.hooks.splice(index, 1);
    }
  }

  emit(event: TelemetryEvent): void {
    if (!this.enabled) return;

    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || Date.now()
    };

    this.hooks.forEach(hook => {
      try {
        hook(enrichedEvent);
      } catch (error) {
        console.warn('Telemetry hook failed:', error);
      }
    });
  }

  clearHooks(): void {
    this.hooks = [];
  }
}
