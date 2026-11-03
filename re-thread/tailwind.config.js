/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        'ink-soft': '#1f1f1f',
        paper: '#ffffff',
        mist: '#f4f4f4',
        line: '#e5e5e5',
        muted: '#6b6b6b',
        sale: '#d0021b',
        'accent-green': '#2f5d3a',
        ok: '#2e7d32',
        warn: '#ed6c02',
        danger: '#d32f2f',
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px',
      },
      letterSpacing: {
        widest: '0.08em',
      },
    },
  },
  plugins: [],
}
