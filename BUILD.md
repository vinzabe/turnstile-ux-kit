# Build and Release Guide

## Building

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint and format
npm run lint
npm run format
```

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag:
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```
4. Publish to npm:
   ```bash
   npm publish
   ```

## File Structure

```
turnstile-ux-kit/
├── src/
│   ├── sdk/              # Core SDK implementation
│   ├── templates/        # HTML templates
│   ├── styles/           # CSS tokens and components
│   ├── adapters/         # Framework adapters
│   └── i18n/            # Localization files
├── dist/                 # Build outputs
├── tests/               # Test files
├── examples/            # Usage examples
└── docs/                # Documentation
```

## Continuous Integration

Run tests on every commit:
```bash
npm test && npm run lint && npm run typecheck
```
