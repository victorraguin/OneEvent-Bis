/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        // Additional theme-aware colors
        'border-light': '#E5E7EB',
        'border-dark': '#374151',
      },
      fontFamily: {
        display: ['Ubuntu', 'sans-serif'],
        body: ['Ubuntu', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      spacing: {
        '128': '32rem',
      },
      opacity: {
        '[.90]': '.90',
        '50': '0.5'
      },
      borderColor: {
        DEFAULT: 'var(--color-text-secondary)',
      },
    },
  },
  plugins: [],
};