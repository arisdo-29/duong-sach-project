/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F1F6F1',
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
          100: '#FBF8F1',
          200: '#F4EFE3',
          300: '#E7DFCC',
        },
        ink: {
          DEFAULT: '#1C1B18',
          soft: '#2E2C27',
          muted: '#5F5A50',
          light: '#8A8578',
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
        sans: ['"Be Vietnam Pro"', '"Noto Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Lora"', '"Noto Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(60,45,20,0.08)',
        card: '0 4px 16px rgba(60,45,20,0.08)',
        lift: '0 8px 24px rgba(60,45,20,0.14)',
      },
    },
  },
  plugins: [],
};
