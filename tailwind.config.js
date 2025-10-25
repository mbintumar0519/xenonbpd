/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          light: '#E8F4FD',
          dark: '#357ABD',
        },
        navy: '#1a365d',
        text: {
          primary: '#2c3e50',
          secondary: '#64748b',
        },
        background: {
          light: '#f8fafb',
          white: '#ffffff',
        },
        border: '#e2e8f0',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      gradientColorStops: {
        'gradient-start': 'var(--gradient-start)',
        'gradient-end': 'var(--gradient-end)',
      },
      fontFamily: {
        heading: ['IBM Plex Sans', 'Poppins', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 