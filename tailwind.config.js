/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        finflow: {
          bg: '#05070E',
          surface: '#0B0F19',
          'surface-light': '#121826',
          'surface-card': 'rgba(18, 24, 38, 0.7)',
          border: 'rgba(147, 51, 234, 0.15)',
          'border-hover': 'rgba(168, 85, 247, 0.4)',
          purple: '#8B5CF6',
          violet: '#7C3AED',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
        'purple-blue-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.3))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(6,182,212,0.5))' },
        }
      }
    },
  },
  plugins: [],
}
