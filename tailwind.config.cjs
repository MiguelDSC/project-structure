/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "space-cadet": "#223659",
        "dark-blue": "#001945",
        "foleon-blue": "#00b1ff",
      },
    },
  },
  plugins: [],
};
