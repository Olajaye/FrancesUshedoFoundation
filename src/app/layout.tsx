import "./globals.css";
import type { Metadata } from "next";
import {edu_QLD_Beginner, roboto } from "@/app/Font/font";

import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Frances Ushedo Foundation",
  description: "child | foundation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${edu_QLD_Beginner.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
