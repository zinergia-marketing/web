import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'screen': '100dvh', // Usa dvh en lugar de vh para mejor soporte móvil
        'screen-fallback': '100vh', // Fallback para navegadores antiguos
      },
      minHeight: {
        'screen': '100dvh', // Usa dvh en lugar de vh para mejor soporte móvil
        'screen-fallback': '100vh', // Fallback para navegadores antiguos
      },
      maxHeight: {
        'screen': '100dvh', // Usa dvh en lugar de vh para mejor soporte móvil
        'screen-fallback': '100vh', // Fallback para navegadores antiguos
      },
      colors: {
        primary: {
          purple: '#3b0b5b',
          coral: '#f97373',
          neutral: '#e7d5c4',
        },
        dark: '#1a1a1a',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b0b5b 0%, #f97373 100%)',
        'gradient-inverse': 'linear-gradient(135deg, #f97373 0%, #3b0b5b 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

