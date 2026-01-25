# Turnstile UX Kit

A self-contained, beginner-friendly kit for polished Turnstile verification, blocked, and rate-limited experiences.

## Features

✨ **Polished UI Templates** - Pre-built, accessible templates for common scenarios  
🎨 **Theme System** - 6 built-in themes with CSS custom properties  
🌍 **Localization** - Built-in i18n support with easy locale addition  
♿ **Accessible** - WCAG AA compliant, keyboard-first design  
📊 **Telemetry Ready** - Pluggable event tracking without vendor lock-in  
🧩 **Framework Agnostic** - Works with vanilla JS, React, Vue, Svelte  
📦 **Drop-in Ready** - Single-file HTML templates for Cloudflare custom error pages  

## Quick Start

### Installation

```bash
npm install @turnstile/ux-kit
```

### Basic Usage

```html
<!DOCTYPE html>
<html data-theme="light">
<head>
  <link rel="stylesheet" href="node_modules/@turnstile/ux-kit/dist/styles/light.css">
</head>
<body>
  <div id="turnstile-widget"></div>
  
  <script type="module">
    import { initChallenge } from '@turnstile/ux-kit';
    
    const challenge = initChallenge({
      siteKey: 'your-site-key',
      containerId: 'turnstile-widget',
      theme: 'auto',
      callbacks: {
        onToken: (token) => {
          console.log('Verified!', token);
        },
        onError: (error) => {
          console.error('Error:', error);
        }
      }
    });
  </script>
</body>
</html>
```

### Using Templates

Simply copy and upload one of the built templates to your CDN or Cloudflare:

```bash
# Available templates
dist/templates/turnstile-inline.html
dist/templates/turnstile-redirect.html
dist/templates/rate-limited.html
dist/templates/blocked-waf.html
dist/templates/blocked-geo.html
dist/templates/generic-error.html
```

## Themes

The kit includes 6 pre-built themes:

- **system** - Auto light/dark based on system preference
- **light** - Light mode (default)
- **dark** - Dark mode
- **high-contrast** - WCAG AAA compliant high contrast
- **brand-minimal** - White-label friendly neutral theme
- **terminal** - Dark theme for dev tools

Switch themes via the `data-theme` attribute:

```html
<html data-theme="dark">
```

Or programmatically:

```javascript
challenge.setTheme('dark');
```

## Localization

### Loading Locales

```javascript
import { I18n } from '@turnstile/ux-kit';

const i18n = new I18n();
await i18n.loadLocale('en', {
  turnstile: {
    heading: 'Verify You're Human',
    description: 'Please complete the verification'
  }
});

i18n.setLocale('en');
```

### Adding New Locales

Create a JSON file in `i18n/locales/`:

```json
{
  "turnstile": {
    "heading": "Verifica que eres humano",
    "description": "Por favor completa la verificación"
  }
}
```

See `src/i18n/locales/` for full structure.

## Telemetry

Add custom telemetry hooks:

```javascript
const challenge = initChallenge({
  siteKey: 'your-site-key',
  containerId: 'turnstile-widget',
  telemetry: true,
  callbacks: {
    onToken: (token) => { /* ... */ }
  }
});

// Add telemetry hook
challenge.onTelemetry((event) => {
  // Send to your analytics
  analytics.track('turnstile_event', event);
});
```

### Events

- `challenge_shown` - Widget displayed
- `challenge_solved` - User completed verification
- `challenge_failed` - Verification failed
- `blocked_shown` - Block page shown
- `retry_clicked` - User clicked retry
- `theme_changed` - Theme was changed
- `language_changed` - Language was changed

## Cloudflare Custom Error Pages

1. Build the kit: `npm run build`
2. Copy template to Cloudflare
3. Replace `YOUR_SITE_KEY` with your Turnstile site key
4. Upload as a custom error page

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

## API Reference

### `initChallenge(options: ChallengeOptions): ChallengeController`

Initialize a Turnstile challenge widget.

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `siteKey` | `string` | required | Your Turnstile site key |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Widget theme |
| `size` | `'normal' \| 'compact' \| 'flexible'` | `'normal'` | Widget size |
| `language` | `string` | `'en'` | BCP-47 language code |
| `containerId` | `string` | required | DOM element ID to render widget |
| `callbacks` | `Callbacks` | - | Event callbacks |
| `ux` | `UXOptions` | - | UX settings |
| `telemetry` | `boolean` | `false` | Enable telemetry |

#### Controller Methods

- `render()` - Render the widget
- `reset()` - Reset the widget
- `destroy()` - Clean up and remove widget
- `setLanguage(lang)` - Change language
- `setTheme(theme)` - Change theme
- `isReady()` - Check if widget is loaded
- `onTelemetry(hook)` - Add telemetry hook

## Examples

- [React/Next.js](./examples/react-next/README.md)
- [Vue/Nuxt](./examples/vue-nuxt/README.md)
- [Svelte/SvelteKit](./examples/svelte-kit/README.md)
- [Vanilla JS](./examples/vanilla/README.md)

## License

MIT

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
