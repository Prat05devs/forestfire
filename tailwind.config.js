/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#eef6f1",
          100: "#d7e9dd",
          200: "#b2d3bd",
          300: "#81b493",
          400: "#508f6c",
          500: "#2f7250",
          600: "#225c40",
          700: "#194a35",
          800: "#123a2b",
          900: "#082d20",
          950: "#041d15"
        },
        glacier: "#e5eeff",
        ember: "#f57c00",
        alert: "#c91f25",
        ink: "#0b1c30",
        mist: "#f8f9ff",
        muted: "#5f6b66"
      },
      fontFamily: {
        sans: ["Manrope Variable", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(8, 45, 32, 0.12)",
        device: "0 32px 80px rgba(4, 29, 21, 0.22)"
      }
    }
  },
  plugins: []
};
