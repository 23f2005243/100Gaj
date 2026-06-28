/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Blue Palette
        'light-blue-100': '#E6F3FF',
        'light-blue-200': '#B3D9FF',
        'light-blue-300': '#80BFFF',
        'light-blue-400': '#4DA6FF',
        'light-blue-500': '#1A8CFF',
        // Light Orange Palette
        'light-orange-100': '#FFF5E6',
        'light-orange-200': '#FFE4B5',
        'light-orange-300': '#FFD194',
        'light-orange-400': '#FFBF73',
        'light-orange-500': '#FFAD52',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1.5s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
