/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const basePlugins = plugin(({ addBase }) => {
  addBase({
    "@font-face": {
      fontFamily: "Satoshi",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 400,
      src: `url("../public/fonts/Satoshi-Regular.eot")`,
      src: `url('../public/fonts/Satoshi-Regular.eot?#iefix') format('embedded-opentype'), url('../public/fonts/Satoshi-Regular.woff2') format('woff2'), url('../public/fonts/Satoshi-Regular.woff') format('woff'), url('../public/fonts/Satoshi-Regular.ttf') format('truetype')`,
    },
  });
});
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        // satoshi: ["Satoshi", "sans-serif"],
        satoshi: ["var(--Satoshi)", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#ff5722",
      },
    },
  },

  plugins: [],
};
