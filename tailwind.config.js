/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#fbf2e3',
          100: '#f3e0bf',
          200: '#e6c189',
          300: '#d4a05a',
          400: '#b87a3a',
          500: '#8b5a2b',
          600: '#6b4220',
          700: '#4a2d16',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
