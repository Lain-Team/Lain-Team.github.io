/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        green: '#32dd72',
        grey: 'rgb(148, 148, 148)'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
