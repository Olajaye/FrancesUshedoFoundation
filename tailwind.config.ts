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
        lilac: "#d0b1d1",
        darckLilac: "#d154d6",
        "lilac-gradient": "linear-gradient(to right, #d0b1d1, #d154d6)",
      },
      backgroundImage: {
        'hero': "url('/picture1.jpg')",
        'welcomeHero': "url('/welcomeHero.png')",
        "aboutbg": "url('/picture2.jpg')",
        "footerbg": "url('/footert.jpg')",
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
