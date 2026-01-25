# API Reference

## initChallenge

```typescript
function initChallenge(options: ChallengeOptions): ChallengeController
```

Initialize a Turnstile challenge widget.

### Parameters

#### `options: ChallengeOptions`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `siteKey` | `string` | **required** | Your Turnstile site key |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Widget theme |
| `size` | `'normal' \| 'compact' \| 'flexible'` | `'normal'` | Widget size |
| `language` | `string` | `'en'` | BCP-47 language code |
| `containerId` | `string` | **required** | DOM element ID to render widget |
| `callbacks` | `Callbacks` | `undefined` | Event callbacks |
| `ux` | `UXOptions` | `undefined` | UX settings |
| `telemetry` | `boolean` | `false` | Enable telemetry events |

### Returns

`ChallengeController` - Controller instance

---

## ChallengeController

### Methods

#### `render(): void`

Render the Turnstile widget in the specified container.

#### `reset(): void`

Reset the widget state.

#### `destroy(): void`

Clean up and remove the widget from the DOM.

#### `setLanguage(lang: string): void`

Change the widget language.

```javascript
challenge.setLanguage('es');
```

#### `setTheme(theme: 'auto' | 'light' | 'dark'): void`

Change the widget theme.

```javascript
challenge.setTheme('dark');
```

#### `isReady(): boolean`

Check if the Turnstile script is loaded and ready.

```javascript
if (challenge.isReady()) {
  challenge.render();
}
```

#### `onTelemetry(hook: (event: TelemetryEvent) => void): void`

Add a telemetry hook for event tracking.

```javascript
challenge.onTelemetry((event) => {
  console.log('Event:', event);
});
```

---

## Telemetry Events

### TelemetryEvent

```typescript
interface TelemetryEvent {
  event: 'challenge_shown' | 'challenge_solved' | 'challenge_failed' | 'blocked_shown' | 'retry_clicked' | 'theme_changed' | 'language_changed';
  timestamp: number;
  page_type: string;
  theme: 'auto' | 'light' | 'dark';
  locale: string;
  elapsed_ms?: number;
  request_id?: string;
  error_code?: string;
}
```

### Event Types

- `challenge_shown` - Widget displayed to user
- `challenge_solved` - User completed verification successfully
- `challenge_failed` - Verification failed
- `blocked_shown` - Block/error page shown
- `retry_clicked` - User clicked retry button
- `theme_changed` - User changed theme
- `language_changed` - User changed language

---

## I18n

### I18n Class

#### `constructor(options?: I18nOptions)`

Create an i18n instance.

```javascript
const i18n = new I18n({
  locale: 'en',
  fallbackLocale: 'en'
});
```

#### `async loadLocale(locale: string, data: LocaleData): Promise<void>`

Load locale data programmatically.

```javascript
await i18n.loadLocale('fr', {
  turnstile: {
    heading: 'Vérifiez que vous êtes humain'
  }
});
```

#### `async loadLocaleFromUrl(locale: string, url: string): Promise<void>`

Load locale data from a URL.

```javascript
await i18n.loadLocaleFromUrl('fr', '/i18n/fr.json');
```

#### `setLocale(locale: string): void`

Set the active locale.

```javascript
i18n.setLocale('es');
```

#### `getLocale(): string`

Get the current locale.

```javascript
const locale = i18n.getLocale();
```

#### `t(key: string, params?: Record<string, string | number>): string`

Get a translated string.

```javascript
const message = i18n.t('turnstile.heading');
const dynamic = i18n.t('ratelimit.wait', { seconds: 30 });
```

---

## Error Handling

### Error Codes

| Code | Message | Retryable |
|------|---------|-----------|
| `network-error` | Network issue detected | Yes |
| `verification-expired` | Verification expired | Yes |
| `browser-unsupported` | Browser not supported | No |
| `verification-failed` | Verification failed | Yes |
| `timeout-error` | Request timed out | Yes |
| `rate-limit` | Too many attempts | Yes |
| `blocked` | Access blocked | No |

### getErrorDisplay

```typescript
function getErrorDisplay(code: string): { message: string; action: string }
```

Get human-friendly error message and action.

```javascript
import { getErrorDisplay } from '@turnstile/ux-kit';

const error = getErrorDisplay('network-error');
console.log(error.message); // "Network issue detected"
console.log(error.action); // "Check your internet connection and try again"
```

### isRetryableError

```typescript
function isRetryableError(code: string): boolean
```

Check if an error can be retried.

```javascript
import { isRetryableError } from '@turnstile/ux-kit';

if (isRetryableError('network-error')) {
  // Retry
}
```

---

## CSS Custom Properties

### Theme Tokens

All themes use CSS custom properties that can be overridden:

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #1f2937;
  --color-muted: #6b7280;
  --color-brand: #2563eb;
  --color-danger: #dc2626;
  --color-warning: #d97706;
  --color-success: #059669;
  
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --font-size-base: 16px;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-body: 16px;
  
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --focus-ring: 0 0 0 3px rgba(0, 0, 0, 0.2);
}
```

Override in your CSS:

```css
[data-theme="custom"] {
  --color-brand: #your-brand-color;
  --font-family: 'Your Font', sans-serif;
}
```
