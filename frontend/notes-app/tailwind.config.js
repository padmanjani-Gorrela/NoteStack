/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // this scans all React components
  ],
  theme: {
    extend: {
      //colors used in the project
      colors:{
        primary:"#2B85FF",
        secondary:"#EF863E"
      },
       keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-fast': {
            '0%, 100%': { transform: 'translateY(0px) rotate(45deg)' },
            '50%': { transform: 'translateY(-15px) rotate(45deg)' },
        },
        'pen-float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(-45deg)' },
            '50%': { transform: 'translateY(-10px) rotate(-42deg)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'float-slow': 'float-slow 4s ease-in-out infinite',
        'float-fast': 'float-fast 3s ease-in-out infinite',
        'pen-float': 'pen-float 3.5s ease-in-out infinite',
      }
      
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        }
      })
    }
  ],
}
