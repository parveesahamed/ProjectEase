/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}'
  ],

  // ✅ Yeh setting bilkul sahi hai. Isse dark mode 'class' se control hota hai.
  darkMode: 'class', 
  
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        surface: "#0b1220", // page background (deep navy)
        card: "#111827",    // card background (slate-900 tone)
      },
      boxShadow: {
        brand: "0 10px 40px rgba(67, 56, 202, 0.25)", // blue-violet glow
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        slideIn: "slideIn .4s ease-out",
      },
    },
  },
  plugins: [],
};
