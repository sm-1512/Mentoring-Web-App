/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");


export default withMT({
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
    extend: {
      gridTemplateColumns: {
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
    },
    colors:{
      'primary':'#5F6FFF',
      'secondary':'#111827', 
    }
  },
  },
  plugins: [],
});