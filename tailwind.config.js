/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          dark: 'var(--color-brand-dark)'
        },
        danger: 'var(--color-danger)',
        dangerHover: 'var(--color-danger-hover)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)'
      },
      fontFamily: {
        sans: 'var(--font-family)',
      },
      fontSize: {
        base: 'var(--font-size-base)',
        h1: 'var(--font-size-h1)',
        h2: 'var(--font-size-h2)',
        h3: 'var(--font-size-h3)',
        body: 'var(--font-size-body)'
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) * 0.5)',
        lg: 'calc(var(--radius) * 1.5)'
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      },
      focusRing: {
        DEFAULT: 'var(--focus-ring)'
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /^data-theme-/
    }
  ]
}
