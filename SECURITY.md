# Security Policy

## Supported Versions

| Version | Supported |
|---------|------------|
| 0.1.x   | ✅ Yes     |

## Reporting a Vulnerability

We take security very seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do not** create a public issue or pull request
2. Email your findings to: [security@example.com](mailto:security@example.com)
3. Include the following information:
   - **Description**: Detailed description of the vulnerability
   - **Impact**: What can happen if exploited
   - **Steps to reproduce**: Clear, reproducible steps
   - **Proof of concept**: If applicable, code or screenshots
   - **Suggested fix**: If you have a fix in mind, please share it

### What to Expect

- **Acknowledgment**: We will respond within 24-48 hours
- **Status updates**: You'll receive regular updates on our progress
- **Resolution timeline**:
  - Critical: 7 days or less
  - High: 14 days or less
  - Medium: 30 days or less
  - Low: 90 days or less
- **Credit**: With your permission, we'll credit you in:
  - Security advisory
  - Release notes
  - Hall of Fame (coming soon)

### Disclosure Policy

We follow **Coordinated Vulnerability Disclosure (CVD)**:

1. Receive and validate the report
2. Work with you to understand the issue
3. Develop and test a fix
4. Coordinate disclosure timeline
5. Release advisory and credit reporter

We generally aim for:
- Private fix period: 7-90 days depending on severity
- Public disclosure: After fix is deployed to all affected versions

## Security Best Practices

### For Users of Turnstile UX Kit

#### 1. Keep Dependencies Updated

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

#### 2. Use Environment Variables

Never commit secrets to version control:

```javascript
// ❌ DON'T DO THIS
const apiKey = 'sk_live_1234567890abcdef';

// ✅ DO THIS INSTEAD
const apiKey = process.env.TURNSTILE_SECRET_KEY;
```

Create a `.env` file and add to `.gitignore`:

```
# .env
TURNSTILE_SECRET_KEY=your-secret-key-here
TURNSTILE_SITE_KEY=your-site-key-here
```

#### 3. Validate All Input

Always validate and sanitize user input:

```javascript
// Sanitize input before use
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

const token = sanitizeInput(req.body.token);
```

#### 4. Use HTTPS Only

Never use HTTP for verification:

```javascript
// ✅ Always use HTTPS
const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: JSON.stringify({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token
  })
});

// ❌ Never use HTTP
const response = await fetch('http://challenges.cloudflare.com/turnstile/v0/siteverify', {...});
```

#### 5. Implement Rate Limiting

Protect your verification endpoint:

```javascript
const rateLimit = require('express-rate-limit');

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false
});

app.post('/verify', verifyLimiter, async (req, res) => {
  // Verification logic
});
```

#### 6. Enable CORS Carefully

```javascript
// Only allow specific origins
app.use(cors({
  origin: ['https://your-domain.com', 'https://www.your-domain.com'],
  credentials: true
}));
```

### For Contributors

#### 1. Code Review

All code must be reviewed by at least one maintainer before merging.

#### 2. Security Testing

- Run security tools before submitting PR
- Test for common vulnerabilities:
  - XSS (Cross-Site Scripting)
  - CSRF (Cross-Site Request Forgery)
  - Injection attacks
  - Authentication bypass

#### 3. Dependency Policy

- Only add dependencies from reputable sources
- Prefer maintained packages with recent updates
- Review all new dependencies' security history
- Avoid packages with known vulnerabilities

#### 4. Secrets Management

- Never commit secrets
- Use environment variables
- Rotate secrets regularly
- Use secret scanning tools

## Security Features

### Built-in Protections

Turnstile UX Kit includes several security features:

#### 1. Input Sanitization

All user inputs are automatically sanitized:

```javascript
// Automatic sanitization in SDK
const challenge = initChallenge({
  siteKey: sanitizeSiteKey(userProvidedKey), // Sanitized
  containerId: 'widget-id'
});
```

#### 2. XSS Prevention

Templates are XSS-safe by default:

```html
<!-- ✅ Safe - Content is escaped -->
<div>{{ userContent }}</div>

<!-- ❌ Don't do this - Raw HTML -->
<div v-html="userContent"></div>
```

#### 3. CSP Compatibility

All templates support Content Security Policy:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com
```

## Security Headers

### Recommended Headers

Enable these headers for maximum security:

```http
# Content Security Policy
Content-Security-Policy: default-src 'self'; script-src 'self' 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Prevent clickjacking
X-Frame-Options: DENY

# Enable XSS protection
X-XSS-Protection: 1; mode=block

# Strict Transport Security
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Referrer Policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions Policy
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Dependency Security

### Automated Scanning

We use multiple tools to scan dependencies:

1. **GitHub Dependabot** - Automated dependency updates
2. **npm audit** - Vulnerability scanning
3. **Snyk** - Continuous vulnerability monitoring

### Scanning Frequency

- **On every PR**: Automated security scan
- **Daily**: Automated dependency checks
- **Weekly**: Manual security review
- **Monthly**: Third-party security audit

### Vulnerability Response

When a vulnerability is found:

1. **Immediate action** (within 1 hour):
   - Assess severity
   - Determine affected versions
   - Notify maintainers

2. **Short-term fix** (within 24 hours):
   - Patch if available
   - Workaround if patch unavailable
   - Security advisory for users

3. **Long-term fix** (within 7 days):
   - Release patched version
   - Update documentation
   - Notify all users

## Security Audits

### External Audits

We conduct regular security audits:

- **Quarterly**: Third-party security audit
- **Monthly**: Internal security review
- **Continuous**: Automated vulnerability scanning

### Audit Results

Past audits are available at:
- [Security Audit Reports](./docs/security/audits/) (coming soon)

## Compliance

### Standards Compliance

Turnstile UX Kit is designed to comply with:

- **GDPR** - General Data Protection Regulation
- **CCPA** - California Consumer Privacy Act
- **WCAG 2.1 AA** - Web Content Accessibility Guidelines
- **SOC 2** - Security and Compliance (in progress)

### Data Privacy

We respect user privacy:

- No personal data collected by the kit
- Optional telemetry (disabled by default)
- All telemetry is client-side controlled
- No data sent to third parties without consent

## Getting Help

### Security Questions

- Email: [security@example.com](mailto:security@example.com)
- PGP Key: [Download PGP Key](./pgp/security-key.asc) (coming soon)

### Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Cloudflare Security](https://www.cloudflare.com/security/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## License

This security policy is licensed under the MIT License.

---

Last updated: January 25, 2026
