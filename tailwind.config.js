/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.ts',
    './data/**/*.ts',
    './lib/**/*.ts',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.6875rem',
      },
      colors: {
        bg: {
          base: '#0A0A0B',
          surface: '#101013',
          raised: '#15151A',
          card: '#1A1A20',
          hover: '#202029',
          active: '#262631',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          default: 'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.16)',
        },
        text: {
          primary: '#EAEAF5',
          secondary: '#C9C9D8',
          tertiary: '#8F8FA3',
          muted: '#626276',
        },
        accent: {
          purple: '#6E56CF',
          'purple-hover': '#7C66DC',
          'purple-dim': 'rgba(110,86,207,0.16)',
        },
        status: {
          green: '#3DD68C',
          'green-dim': 'rgba(61,214,140,0.12)',
          red: '#E5484D',
          'red-dim': 'rgba(229,72,77,0.12)',
          amber: '#F76B15',
          'amber-dim': 'rgba(247,107,21,0.12)',
          blue: '#3B9EDE',
          'blue-dim': 'rgba(59,158,222,0.12)',
          teal: '#5CB8B2',
          'teal-dim': 'rgba(92,184,178,0.12)',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 18px rgba(110,86,207,0.24)',
        'glow-green': '0 0 12px rgba(61,214,140,0.32)',
      },
      animation: {
        'fade-in': 'fade-in 160ms ease-out',
        'slide-up': 'slide-up 180ms ease-out',
        'pulse-slow': 'pulse 2.5s ease-in-out infinite',
        blink: 'blink 1.4s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
    },
  },
  plugins: [],
}
