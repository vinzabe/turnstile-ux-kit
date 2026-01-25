# React Adapter

React component wrapper for Turnstile UX Kit.

## Installation

```bash
npm install @turnstile/ux-kit
```

## Basic Usage

```tsx
import { TurnstileChallenge } from '@turnstile/ux-kit/react';

function LoginForm() {
  return (
    <form>
      <TurnstileChallenge
        siteKey="your-site-key"
        theme="auto"
        callbacks={{
          onToken: (token) => {
            console.log('Token:', token);
          },
          onError: (error) => {
            console.error('Error:', error);
          }
        }}
      />
    </form>
  );
}
```

## Props

All `ChallengeOptions` except `containerId`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `siteKey` | `string` | required | Turnstile site key |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Widget theme |
| `size` | `'normal' \| 'compact' \| 'flexible'` | `'normal'` | Widget size |
| `language` | `string` | `'en'` | Language code |
| `callbacks` | `Callbacks` | - | Event callbacks |
| `ux` | `UXOptions` | - | UX settings |
| `telemetry` | `boolean` | `false` | Enable telemetry |
| `onReady` | `() => void` | - | Callback when ready |

## Telemetry Hook

```tsx
import { TurnstileChallenge, useTurnstileTelemetry } from '@turnstile/ux-kit/react';

function App() {
  const controllerRef = useRef<ChallengeController | null>(null);
  const { events } = useTurnstileTelemetry();

  useEffect(() => {
    if (controllerRef.current) {
      const cleanup = addEventListener(controllerRef.current);
      return cleanup;
    }
  }, [controllerRef.current]);

  return <TurnstileChallenge siteKey="..." />;
}
```

## Next.js Integration

```tsx
'use client';

import { TurnstileChallenge } from '@turnstile/ux-kit/react';

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <TurnstileChallenge
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        callbacks={{
          onToken: (token) => {
            fetch('/api/verify', {
              method: 'POST',
              body: JSON.stringify({ token })
            });
          }
        }}
      />
    </div>
  );
}
```

## TypeScript

Types are fully typed:

```tsx
import type { ChallengeController } from '@turnstile/ux-kit';

const controllerRef = useRef<ChallengeController | null>(null);
```

## Examples

See `examples/react-next/` for complete Next.js example.
