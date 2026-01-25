# Turnstile UX Kit

<div align="center">

![Build Status](https://github.com/vinzabe/turnstile-ux-kit/workflows/CI/badge.svg)
![License](https://img.shields.io/npm/l/@turnstile/ux-kit)
![Version](https://img.shields.io/npm/v/@turnstile/ux-kit)
![Downloads](https://img.shields.io/npm/dm/@turnstile/ux-kit)

**A self-contained, beginner-friendly kit for polished Turnstile verification, blocked, and rate-limited experiences**

[Quick Start](#quick-start) • [Documentation](#documentation) • [Examples](#examples) • [Security](#security)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Security](#security)
- [Development](#development)
- [Contributing](#contributing)

## 🎯 Overview

Turnstile UX Kit is a comprehensive, production-ready solution for integrating Cloudflare Turnstile into your web applications. It provides polished, accessible user interface components for all common verification scenarios, including:

- **Inline verification** - Seamless verification within your page
- **Redirect verification** - Full-page verification experience
- **Rate-limited pages** - Friendly messaging when rate limits are hit
- **Blocked pages** - WAF and geographic blocking scenarios
- **Error handling** - Graceful error display and recovery

The kit is built with modern web standards, includes full TypeScript support, and works seamlessly with any JavaScript framework or vanilla JavaScript projects.

### Why Turnstile UX Kit?

- **Zero Configuration** - Works out of the box with sensible defaults
- **Accessibility First** - WCAG AA compliant with keyboard navigation
- **Theme System** - 6 built-in themes with easy customization
- **Internationalization** - Built-in i18n with multi-language support
- **Telemetry Ready** - Event tracking without vendor lock-in
- **Framework Agnostic** - Use with vanilla JS, React, Vue, Svelte, or any framework
- **Production Ready** - Battle-tested with comprehensive test coverage

## 📸 Screenshots

> **🔴 Live Demo:** Open [demo.html](./demo.html) to see all themes and pages in action!

### Light Theme

Clean, modern light theme with high readability:

```
┌─────────────────────────────────────────────────────────┐
│  Verify You're Human                                   │
│  Please complete the verification to continue            │
│                                                         │
│  ┌───────────────────────────────────────────────────┐   │
│  │   [ Turnstile Widget Placeholder ]              │   │
│  │   Actual widget loads when configured          │   │
│  └───────────────────────────────────────────────────┘   │
│                                                         │
│  Powered by Turnstile                                    │
└─────────────────────────────────────────────────────────┘
```

### Dark Theme

Sleek dark theme optimized for low-light environments:

```
┌─────────────────────────────────────────────────────────┐
│  Verify You're Human                                   │
│  Please complete the verification to continue            │
│                                                         │
│  ┌───────────────────────────────────────────────────┐   │
│  │   [ Turnstile Widget Placeholder ]              │   │
│  │   Dark mode colors and styling               │   │
│  └───────────────────────────────────────────────────┘   │
│                                                         │
│  Powered by Turnstile                                    │
└─────────────────────────────────────────────────────────┘
```

### Rate Limited Page

Friendly messaging when rate limits are hit:

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️  Rate Limit Exceeded                             │
│                                                         │
│  You've made too many requests. Please wait a few      │
│  minutes before trying again.                          │
│                                                         │
│  [ Try Again ]  [ Contact Support ]                   │
│                                                         │
│  Request ID: abc123-def456-ghi789                       │
└─────────────────────────────────────────────────────────┘
```

### Blocked Page (WAF)

Security-focused blocking page with clear guidance:

```
┌─────────────────────────────────────────────────────────┐
│  🛡️  Access Blocked                                  │
│                                                         │
│  Our security systems have detected suspicious activity    │
│  from your IP address.                                 │
│                                                         │
│  If you believe this is an error, please contact      │
│  support with request ID below.                   │
│                                                         │
│  [ Contact Support ]                                    │
│                                                         │
│  Request ID: xyz789-abc123-def456                       │
│  Reference Code: WAF_BLOCKED                           │
└─────────────────────────────────────────────────────────┘
```

**To see all themes and pages:**
1. Clone or download this repository
2. Open `demo.html` in your browser
3. Interact with the live examples

## ✨ Features

### 🎨 Polished UI Templates
- Pre-built, accessible templates for all common scenarios
- Consistent design language across all pages
- Mobile-responsive and touch-friendly

### 🌈 Theme System
6 built-in themes with CSS custom properties:
- **system** - Auto light/dark based on system preference
- **light** - Clean, modern light mode
- **dark** - Sleek dark mode
- **high-contrast** - WCAG AAA compliant high contrast
- **brand-minimal** - White-label friendly neutral theme
- **terminal** - Dark theme optimized for dev tools

### 🌍 Localization
- Built-in i18n support with English and Spanish locales
- Easy to add new languages
- RTL language support ready
- Dynamic locale switching

### ♿ Accessibility
- WCAG AA compliant design
- Keyboard-first navigation
- Screen reader optimized
- ARIA labels and roles

### 📊 Telemetry Ready
- Pluggable event tracking without vendor lock-in
- Send events to Google Analytics, Mixpanel, Amplitude, or custom endpoints
- Track challenge performance and user behavior

### 🧩 Framework Agnostic
- Works with vanilla JavaScript
- React adapter included
- Vue, Svelte, and Angular compatible
- No framework lock-in

### 📦 Drop-in Ready
- Single-file HTML templates for Cloudflare custom error pages
- CDN-hosted assets
- Zero build step required for templates

## 🚀 Quick Start

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
          // Send token to your server
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

### Using Pre-built Templates

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

## 📚 Documentation

### Themes

Switch themes via the `data-theme` attribute:

```html
<html data-theme="dark">
```

Or programmatically:

```javascript
challenge.setTheme('dark');
```

### Localization

#### Loading Locales

```javascript
import { I18n } from '@turnstile/ux-kit';

const i18n = new I18n();
await i18n.loadLocale('en', {
  turnstile: {
    heading: "Verify You're Human",
    description: 'Please complete the verification'
  }
});

i18n.setLocale('en');
```

#### Adding New Locales

Create a JSON file in `src/i18n/locales/`:

```json
{
  "turnstile": {
    "heading": "Verifica que eres humano",
    "description": "Por favor completa la verificación"
  }
}
```

See [docs/i18n.md](./docs/i18n.md) for full documentation.

### Telemetry

Add custom telemetry hooks:

```javascript
const challenge = initChallenge({
  siteKey: 'your-site-key',
  containerId: 'turnstile-widget',
  telemetry: true,
  callbacks: {
    onToken: (token) => {
      // Handle successful verification
    }
  }
});

// Add telemetry hook
challenge.onTelemetry((event) => {
  // Send to your analytics
  analytics.track('turnstile_event', event);
});
```

#### Supported Events

- `challenge_shown` - Widget displayed to user
- `challenge_solved` - User completed verification
- `challenge_failed` - Verification failed
- `blocked_shown` - Block page shown
- `retry_clicked` - User clicked retry button
- `theme_changed` - Theme was changed
- `language_changed` - Language was changed

See [docs/api.md](./docs/api.md) for complete API documentation.

### Cloudflare Custom Error Pages

1. Build the kit: `npm run build`
2. Copy template to Cloudflare
3. Replace `YOUR_SITE_KEY` with your Turnstile site key
4. Upload as a custom error page

## 🔒 Security

### Security Best Practices

#### 1. Site Key Management

**Never expose your secret key in client-side code.**

```javascript
// ✅ CORRECT - Only use site key in frontend
const challenge = initChallenge({
  siteKey: '0x4AAAAAAAxxxxxxxxxxxx',  // This is a public site key
  containerId: 'turnstile-widget'
});

// ❌ NEVER DO THIS - Never expose secret key
const SECRET_KEY = '0x4AAAAAAyyyyyyyyyyyyyyy';  // This should stay on server
```

#### 2. Token Validation

Always validate Turnstile tokens on your server:

```javascript
// Example: Node.js Express
const express = require('express');
const axios = require('axios');

app.post('/verify', async (req, res) => {
  const { token } = req.body;

  // Verify token with Cloudflare
  const response = await axios.post(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      secret: process.env.TURNSTILE_SECRET_KEY,  // Server-side secret key
      response: token
    }
  );

  if (response.data.success) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Invalid token' });
  }
});
```

#### 3. Token Expiration

Turnstile tokens expire after a short period. Use them immediately after receiving:

```javascript
const challenge = initChallenge({
  siteKey: 'your-site-key',
  containerId: 'turnstile-widget',
  callbacks: {
    onToken: async (token) => {
      // ✅ Send to server immediately
      await fetch('/verify', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
});
```

#### 4. IP Validation

Compare the client IP with the one Cloudflare verifies:

```javascript
app.post('/verify', async (req, res) => {
  const { token } = req.body;
  const clientIP = req.ip || req.connection.remoteAddress;

  const response = await axios.post(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token
    }
  );

  if (response.data.success && response.data.hostname === 'your-domain.com') {
    // Optional: Validate IP matches
    if (response.data.remote_ip !== clientIP) {
      console.warn('IP mismatch:', clientIP, response.data.remote_ip);
    }
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});
```

#### 5. Content Security Policy

Configure CSP to allow Turnstile:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://challenges.cloudflare.com;
  frame-src https://challenges.cloudflare.com;
  connect-src https://challenges.cloudflare.com;
">
```

#### 6. Rate Limiting

Implement rate limiting on your verification endpoint:

```javascript
const rateLimit = require('express-rate-limit');

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many verification attempts, please try again later'
});

app.post('/verify', verifyLimiter, async (req, res) => {
  // Verification logic
});
```

#### 7. Error Handling

Handle errors gracefully without exposing sensitive information:

```javascript
callbacks: {
  onError: (error) => {
    console.error('Turnstile error:', error);

    // ✅ Show user-friendly message
    showError('Verification failed. Please try again.');

    // ❌ NEVER expose error details
    // showError(`Error: ${error.code} - ${error.message}`);
  }
}
```

### Security Headers

Enable these security headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Vulnerability Reporting

🔒 **Security Policy**

We take security seriously. If you discover a security vulnerability, please:

1. **Do not** create a public issue
2. Email us at: [security@example.com](mailto:security@example.com)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Impact assessment
   - Suggested fix (if known)

4. We will:
   - Acknowledge within 24 hours
   - Provide status updates
   - Fix within 7 days for critical issues
   - Credit you in the release notes

### Dependency Security

This project uses automated dependency scanning:

- GitHub Dependabot: Enabled
- npm audit: Runs on every PR
- Manual audit: Quarterly

Always run `npm audit` before deployment.

For more security information, see [SECURITY.md](./SECURITY.md).

## 🛠️ Development

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

# Type check
npm run typecheck

# Run dev server
npm run dev
```

### Development Environment

This project includes a pre-configured Codespaces environment:

- **Bun** - Fast runtime and package manager
- **Node.js LTS** - Latest stable Node.js
- **VSCode Extensions** - Pre-installed with recommended extensions
- **Auto-install** - Dependencies install automatically

Open in Codespaces: [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/vinzabe/turnstile-ux-kit)

## 📖 API Reference

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

## 📦 Examples

- [React/Next.js](./examples/react-next/README.md)
- [Vue/Nuxt](./examples/vue-nuxt/README.md)
- [Svelte/SvelteKit](./examples/svelte-kit/README.md)
- [Vanilla JS](./examples/vanilla/README.md)

## 📄 License

[MIT](./LICENSE) - Turnstile UX Kit Team

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 🙏 Acknowledgments

- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) - CAPTCHA alternative
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- Community contributors and maintainers

---

<div align="center">

Made with ❤️ by the Turnstile UX Kit Team

[⬆ Back to top](#turnstile-ux-kit)

</div>
