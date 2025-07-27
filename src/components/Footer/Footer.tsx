"use client";

import Image from "next/image";
import Link from "next/link"; // Added for links
import { BiHeart } from "react-icons/bi";
import FooterLinks from "./FooterLinks";
import FooterNewsItem from "./FooterNewsItem";
import FooterContact from "./FooterContacts";
import FooterSocial from "./FooterSocial";

const usefulLinks = [
  { text: "Privacy Policy", href: "/privacy" }, // Updated hrefs to actual paths; adjust as needed
  { text: "Become a Volunteer", href: "/volunteer" },
  { text: "Donate", href: "/donate" },
  { text: "Testimonials", href: "/testimonials" },
  { text: "Causes", href: "/causes" },
  { text: "Portfolio", href: "/portfolio" },
  { text: "News", href: "/news" },
];

const newsItems = [
  { title: "A new cause to help", date: "July 27, 2025" }, // Updated dates to current context
  { title: "We love to help people", date: "July 20, 2025" },
  { title: "The new ideas for helping", date: "July 15, 2025" },
];

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-top bg-no-repeat text-white"
      style={{ backgroundImage: "url('/footer/footer.jpg')" }}
    >
      {" "}
      {/* Assumed bg image path; adjust */}
      <div className="absolute inset-0 bg-black/80" />{" "}
      {/* Lighter overlay for better image visibility */}
      <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and About: Enhanced spacing, responsive text */}
          <div className="space-y-6">
            <Link href="/">
              <Image
                src="/logo/LogoWithoutLabel.png" // Fixed typo in filename
                alt="The Frances Ushedo Foundation Logo"
                width={180}
                height={80}
                className="w-auto h-16 md:h-20"
              />
            </Link>
            <p className="text-gray-300 text-sm md:text-base font-montserrat leading-relaxed max-w-md">
              &quot;In the heart of every child lies a spark of potential. At
              TFUF, we are committed to nurturing this potential in Nigeria,
              providing the support and care that every child deserves. Join us
              in our journey to create brighter futures.&quot;
            </p>
            <FooterSocial />
          </div>

          {/* Useful Links */}
          <div>
            <FooterLinks title="Useful Links" links={usefulLinks} />
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-xl md:text-2xl font-montserrat font-semibold mb-6">
              Latest News
            </h3>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <FooterNewsItem
                  key={index}
                  title={item.title}
                  date={item.date}
                />
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <FooterContact />
          </div>
        </div>

        {/* Copyright: Centered, with heart icon */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm font-montserrat">
          <p>
            Copyright © 2025 All rights reserved | The Frances Ushedo Foundation
            <BiHeart
              className="inline-block ml-1 text-darkLilac"
              size={16}
            />{" "}
            {/* Fixed typo, removed unnecessary fill */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
