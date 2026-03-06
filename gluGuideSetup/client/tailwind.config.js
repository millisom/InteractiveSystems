export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFF2E0',
          light: '#FFFAF5',
        },
        secondary: {
          DEFAULT: '#898AC4',
          light: '#C0C9EE',
          medium: '#A2AADB',
          dark: '#898AC4',
        },
        background: {
          primary: '#FFFFFF',
        },
        text: {
          primary: '#000000',
          secondary: '#374151',
          light: '#FFF2E0',
        },
        border: {
          light: '#C0C9EE',
          DEFAULT: '#A2AADB',
        },
        // Semantic colors - WCAG AA and ISO compliant
        success: {
          DEFAULT: '#10B981',
          dark: '#047857',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#FEE2E2',
        },
        info: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#DBEAFE',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'wcag': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'wcag-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
