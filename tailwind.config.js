/** @type {import('tailwindcss').Config} */

const SANS_STACK = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"SF Pro Display"',
  '"SF Pro Text"',
  '"Segoe UI"',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif'
];

export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    // One radius grammar: 12px cards, 8px thumbs, full pills. Nothing else exists.
    borderRadius: {
      none: '0px',
      lg: '8px',
      xl: '12px',
      full: '9999px'
    },
    extend: {
      colors: {
        canvas: '#05070A',
        rail: '#070A0E',
        surface: {
          DEFAULT: '#0F171E',
          2: '#141824'
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.16)'
        },
        ink: {
          DEFAULT: '#FFFFFF',
          secondary: '#9AA9B4',
          tertiary: '#94A3B8',
          muted: '#94A3B8'
        },
        accent: {
          DEFAULT: '#00A8E1',
          hover: '#33BBEB'
        },
        action: {
          DEFAULT: 'rgba(51,65,75,0.6)',
          active: '#414E58'
        },
        badge: {
          DEFAULT: '#1E2830',
          text: '#E2E8F0'
        },
        progress: {
          track: '#4A5863',
          fill: '#FFFFFF'
        },
        error: '#F87171'
      },
      fontFamily: {
        sans: SANS_STACK
      },
      boxShadow: {
        card: '0 8px 24px -12px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(255,255,255,0.18), 0 0 24px -6px rgba(255,255,255,0.12)'
      }
    }
  }
};
