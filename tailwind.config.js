/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F5F1',
          100: '#DCE8DF',
          200: '#B5CFC0',
          300: '#8AB29A',
          400: '#5E8B72',
          500: '#3C6255',
          600: '#2F5233',
          700: '#264028',
          800: '#1D3320',
          900: '#14241A',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAFAF8',
          200: '#F5F4EF',
          300: '#EDEAE0',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#2D2D2D',
          muted: '#6B6B6B',
          light: '#9A9A9A',
        },
        priority: {
          low: '#3C6255',
          lowBg: '#E8F0EA',
          medium: '#B8860B',
          mediumBg: '#FBF3E0',
          high: '#8B2020',
          highBg: '#F5E8E8',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Lora"', '"Noto Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,0.06)',
        card: '0 4px 16px rgba(0,0,0,0.08)',
        lift: '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
