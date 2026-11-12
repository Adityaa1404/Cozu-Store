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
    // One radius grammar: 12px cards + full pills. Nothing else exists.
    borderRadius: {
      none: '0px',
      xl: '12px',
      full: '9999px'
    },
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#1E2134',
          subtle: '#23263B'
        },
        surface: {
          DEFAULT: '#22254E',
          hover: '#2A2E5A'
        },
        ink: {
          DEFAULT: '#CEDDF4',
          secondary: '#BCBAC5',
          faint: 'rgba(188,186,197,0.68)'
        },
        line: {
          DEFAULT: 'rgba(206,221,244,0.10)',
          strong: 'rgba(206,221,244,0.18)'
        },
        accent: {
          DEFAULT: '#5793AA',
          hover: '#6BA5BA',
          subtle: 'rgba(87,147,170,0.14)',
          glow: 'rgba(87,147,170,0.35)'
        },
        success: '#7FB79C',
        error: '#C97B84'
      },
      fontFamily: {
        sans: SANS_STACK,
        display: SANS_STACK,
        body: SANS_STACK
      },
      boxShadow: {
        card: '0 1px 0 rgba(206,221,244,0.05), 0 16px 40px -20px rgba(0,0,0,0.55)',
        glow: '0 0 0 1px rgba(87,147,170,0.35), 0 0 24px -6px rgba(87,147,170,0.4)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
};
