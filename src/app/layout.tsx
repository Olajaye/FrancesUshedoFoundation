import "./globals.css";
import type { Metadata } from "next";
import { edu_QLD_Beginner, montserrat, roboto } from "@/app/Font/font";
import StoreProvider from "@/store/StoreProvider";

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
      <body
        suppressHydrationWarning={true}
        className={`${roboto.variable} ${edu_QLD_Beginner.variable} ${montserrat.variable} `}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
