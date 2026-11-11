/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,html}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        accent: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        surface: {
          page:     '#FAFAF9',
          warm:     '#F6F3EC',
          'page-warm': '#F6F3EC',
          card:     '#FFFFFF',
          elevated: '#FFFFFF',
          glass:    'rgba(255,255,255,0.78)',
          overlay:  'rgba(0,0,0,0.5)',
        },
        pastel: {
          netflix:         '#FBE3E4',
          'netflix-accent':'#E11D48',
          canva:           '#D5F5F6',
          'canva-accent':  '#0891B2',
          capcut:          '#EFF7D3',
          'capcut-accent': '#4D7C0F',
          bstation:        '#F3E5F5',
          'bstation-accent':'#7C3AED',
        },
        editorial: {
          coral: '#E05D44',
          dark:  '#141416',
        },
      },
      fontFamily: {
        display:   ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
        body:      ['Inter', 'system-ui', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-1': ['3rem',     { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-2': ['2.25rem',  { lineHeight: '1.15', letterSpacing: '-0.02em',  fontWeight: '700' }],
        'display-3': ['1.875rem', { lineHeight: '1.2',  letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading':   ['1.5rem',   { lineHeight: '1.25', fontWeight: '600' }],
        'subhead':   ['1.25rem',  { lineHeight: '1.3',  fontWeight: '600' }],
        'body-lg':   ['1.125rem', { lineHeight: '1.6' }],
        'body':      ['1rem',     { lineHeight: '1.6' }],
        'body-sm':   ['0.875rem', { lineHeight: '1.5' }],
        'caption':   ['0.75rem',  { lineHeight: '1.4' }],
        'overline':  ['0.75rem',  { lineHeight: '1.4',  letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: {
        'sm':   '6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        '2xl':  '24px',
        '3xl':  '9999px',
      },
      boxShadow: {
        'xs':  '0 1px 2px rgba(0,0,0,0.05)',
        'sm':  '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'md':  '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
        'lg':  '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        'xl':  '0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)',
        'glass': '0 8px 32px rgba(0,0,0,0.08)',
        'soft-card': '0 20px 50px -12px rgba(40, 30, 20, 0.09)',
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      backdropBlur: {
        'xl': '16px',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':        'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '75':  '75ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      animation: {
        'shimmer':    'shimmer 1.5s ease-in-out infinite',
        'slide-up':   'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in':   'scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in':    'fadeIn 200ms ease-out',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        scaleIn: {
          '0%':   { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};