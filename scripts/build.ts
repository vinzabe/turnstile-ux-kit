/**
 * Build script for Turnstile UX Kit
 */

import { build } from 'bun';
import { mkdir, copyFile, readFile, writeFile } from 'fs/promises';
import path from 'path';

async function buildSDK() {
  console.log('Building SDK...');
  
  await build({
    entrypoints: ['./src/index.ts', './src/sdk.ts'],
    outdir: './dist',
    target: 'browser',
    format: 'esm',
    minify: true,
    sourcemap: true
  });
  
  await build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    format: 'cjs',
    minify: true,
    sourcemap: true
  });
  
  console.log('✓ SDK built');
}

async function buildCSS() {
  console.log('Building CSS...');
  
  const themes = ['light', 'dark', 'high-contrast', 'brand-minimal', 'terminal'];
  
  for (const theme of themes) {
    await mkdir(`./dist/styles/${theme}`, { recursive: true });
    
    const tokens = await readFile('./src/styles/tokens.css', 'utf-8');
    const components = await readFile('./src/styles/components.css', 'utf-8');
    
    const combined = tokens + '\n' + components;
    await writeFile(`./dist/styles/${theme}.css`, combined);
  }
  
  console.log('✓ CSS built');
}

async function buildTemplates() {
  console.log('Building templates...');
  
  await mkdir('./dist/templates', { recursive: true });
  
  const templates = [
    'turnstile-inline.html',
    'turnstile-redirect.html',
    'rate-limited.html',
    'blocked-waf.html',
    'blocked-geo.html',
    'generic-error.html'
  ];
  
  for (const template of templates) {
    await copyFile(
      `./src/templates/${template}`,
      `./dist/templates/${template}`
    );
  }
  
  console.log('✓ Templates built');
}

async function copyAssets() {
  console.log('Copying assets...');
  
  await mkdir('./dist/i18n', { recursive: true });
  
  const locales = ['en.json', 'es.json'];
  for (const locale of locales) {
    await copyFile(`./src/i18n/locales/${locale}`, `./dist/i18n/${locale}`);
  }
  
  console.log('✓ Assets copied');
}

async function main() {
  console.log('Building Turnstile UX Kit...\n');
  
  await mkdir('./dist', { recursive: true });
  
  await Promise.all([
    buildSDK(),
    buildCSS(),
    buildTemplates(),
    copyAssets()
  ]);
  
  console.log('\n✅ Build complete!');
}

main().catch(console.error);
