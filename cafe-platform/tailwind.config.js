/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          cream: '#F7F3ED',
          paper: '#FFFDF9',
          ink: '#1C1613',
          muted: '#71665E',
          roast: '#4A2E1B',
          caramel: '#C67C4E',
          amber: '#E5A65E',
          line: '#E7DED3',
          sage: '#3D5A45',
          gold: '#D4AF37'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'cafe': '0 10px 30px rgba(47, 34, 24, 0.08)',
        'cafe-lg': '0 20px 40px rgba(47, 34, 24, 0.12)',
        'glow': '0 0 30px rgba(198, 124, 78, 0.25)',
      }
    },
  },
  plugins: [],
}
