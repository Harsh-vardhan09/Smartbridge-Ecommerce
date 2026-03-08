/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a', // deep black/charcoal
          light: '#2d2d2d',
        },
        accent: {
          DEFAULT: '#ef4444', // bold red
          hover: '#dc2626',
        },
        secondary: {
          DEFAULT: '#f5f5f5', // clean white/light gray
          dark: '#e5e5e5',
        },
        support: {
          yellow: '#fbbf24', // muted yellow
          neutral: '#9ca3af', // subtle neutral
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
