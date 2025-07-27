import {
  Roboto,
  Poppins,
  Edu_QLD_Beginner,
  Montserrat,
} from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "500"],
  variable: "--font-poppins",
});

export const edu_QLD_Beginner = Edu_QLD_Beginner({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--eduQld-beginner",
});
