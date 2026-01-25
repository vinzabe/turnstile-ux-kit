# Contributing to Turnstile UX Kit

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to help each other learn and build.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/turnstile-ux-kit.git
   cd turnstile-ux-kit
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feat/your-feature
   ```

## Development Workflow

1. Write code
2. Write tests
3. Run tests and linting:
   ```bash
   npm test
   npm run lint
   npm run typecheck
   ```
4. Commit with conventional commits:
   ```bash
   git commit -m "feat: add dark theme support"
   ```
5. Push to your fork:
   ```bash
   git push origin feat/your-feature
   ```
6. Create a pull request

## Project Structure

- `src/sdk/` - Core SDK implementation
- `src/templates/` - HTML templates
- `src/styles/` - CSS tokens and components
- `src/adapters/` - Framework adapters
- `src/i18n/` - Localization files
- `tests/` - Test files

## Coding Standards

- Use TypeScript with strict mode
- Follow existing code style
- Write tests for new features
- Update documentation
- Keep PRs focused and small

## Adding New Features

1. Update type definitions in `src/sdk/types.ts`
2. Implement the feature
3. Write tests in `tests/`
4. Update documentation
5. Add examples if needed

## Adding New Locales

1. Create `src/i18n/locales/{locale}.json`
2. Copy structure from `en.json`
3. Translate all keys
4. Update `docs/i18n.md`

## Running Tests

```bash
npm test
```

## Reporting Issues

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details

## Questions?

Open a discussion or ask in an existing PR/issue!
