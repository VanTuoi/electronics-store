// @ts-check
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/pages/admin/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false
  },
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: []
};
