/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0b0f17",
        panelBg: "rgba(18, 24, 38, 0.75)",
        glassBorder: "rgba(255, 255, 255, 0.08)",
        glowCyan: "#06b6d4",
      },
      boxShadow: {
        cyanGlow: "0 0 20px -2px rgba(6, 182, 212, 0.4)",
        cyanGlowSubtle: "0 0 12px -1px rgba(6, 182, 212, 0.25)",
        glassCard: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
