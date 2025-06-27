import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        lilac: "#E89EED",
        darckLilac: "#d154d6",
        "lilac-gradient": "linear-gradient(to right, #d0b1d1, #d154d6)",
      },
      screens: {
        'custom': '1038px',
        'custom2': '1275px',
      },
      backgroundImage: {
        'hero': "url('/home/welcomeHero.png')",
        "footerbg": "url('/footer/footert.jpg')",
        "homeAbout": "url('/home/picture2.jpg')",
        "about": "url('/about/IMG_3137.jpg')",
        "portfoilio": "url('/portfolio/picture1.jpg')",
        "contact": "url('/contact/IMG_3137.jpg')",
        "dark-overlay":
          "linear-gradient(rgba(0,0,0, 0.5), rgba(0, 0, 0, 0.5))",
        "light-overlay":
          "linear-gradient(rgba(255, 255, 255, 1), rgba(0,0,0, 0.1))",
        "lilac-gradient": "linear-gradient(to right, #d0b1d1, #d154d6)",
      },
      colors: {
        lilac: "#d0b1d1",
        darckLilac: "#d154d6",
      },
      fontFamily: {
        EduQld: ["var(--eduQld-beginner)"],
        roboto: ["var(--font-lora)"],
        poppins: ["var(--font-poppins)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
