import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support The Frances Ushedo Foundation. Your donation empowers Nigerian children with the health care and education they deserve. Give today — every contribution matters.",
  keywords: [
    "donate to TFUF",
    "donate Nigeria charity",
    "help Nigerian children",
    "Frances Ushedo Foundation donate",
    "child health donation",
  ],
  alternates: { canonical: `${SITE_URL}/donate` },
  openGraph: {
    title: `Donate | ${SITE_NAME}`,
    description: "Your donation empowers Nigerian children with health care and education. Give today.",
    url: `${SITE_URL}/donate`,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `Donate to ${SITE_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Donate | ${SITE_NAME}`,
    description: "Your donation empowers Nigerian children. Give today — every contribution matters.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
