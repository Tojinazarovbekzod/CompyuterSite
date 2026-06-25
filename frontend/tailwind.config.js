export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 20px 80px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 25%), radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 18%)',
      },
    },
  },
  plugins: [],
}
