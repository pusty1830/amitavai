
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff2bd1',
        'neon-cyan': '#00eaff',
        'neon-purple': '#7a00ff',
        'neon-lime': '#c7ff00',
        'neon-blue': '#00b7ff'
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 234, 255, 0.8), 0 0 20px rgba(122,0,255,0.6)',
        'neon-strong': '0 0 15px rgba(255, 43, 209, 0.9), 0 0 35px rgba(0,183,255,0.9)'
      },
      backgroundImage: {
        'grid-dark': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 1px)",
        'neon-gradient': "linear-gradient(135deg, rgba(0,234,255,0.15), rgba(122,0,255,0.15))",
        'neon-stripes': "repeating-linear-gradient(45deg, rgba(199,255,0,0.08) 0, rgba(199,255,0,0.08) 10px, transparent 10px, transparent 20px)"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2.5s ease-in-out infinite',
        'scroll-glow': 'scrollGlow 10s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(2px)' }
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 234, 255, 0.8), 0 0 20px rgba(122,0,255,0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 43, 209, 0.9), 0 0 40px rgba(0,183,255,0.9)' }
        },
        scrollGlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      }
    },
  },
  plugins: [],
}
