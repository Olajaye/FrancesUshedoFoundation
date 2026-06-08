"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiHeart } from "react-icons/bi";
import FooterLinks from "./FooterLinks";
import FooterNewsItem from "./FooterNewsItem";
import FooterContact from "./FooterContacts";
import FooterSocial from "./FooterSocial";

const usefulLinks = [
  { text: "Become a Volunteer", href: "/contact" },
  { text: "Donate", href: "/donate" },
  { text: "Gallery", href: "/gallery" },
  { text: "News", href: "/news" },
];

interface NewsItem {
  id: string;
  title: string;
  date: string;
}

const Footer = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/news?limit=3")
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res?.data) setLatestNews(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <footer
      className="relative bg-cover bg-top bg-no-repeat text-white"
      style={{ backgroundImage: "url('/footer/footer.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center bg-white/70 p-2 rounded-md"
            >
              <Image
                src="/logo/logoImg.png"
                alt="Foundation Logo"
                width={180}
                height={60}
                className="w-auto h-10 md:h-16"
                priority
              />
              <Image
                src="/logo/title.png"
                alt="Foundation Logo"
                width={180}
                height={60}
                className="w-auto h-10 md:h-13 hidden md:block"
                priority
              />
            </Link>
            <p className="text-gray-300 text-sm md:text-base font-montserrat italic leading-relaxed max-w-md">
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
            {latestNews.length > 0 ? (
              <div className="space-y-6">
                {latestNews.map((item) => (
                  <FooterNewsItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    date={new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm font-montserrat">
                No news yet.
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <FooterContact />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm font-montserrat">
          <p>
            Copyright © 2025 All rights reserved | The Frances Ushedo
            Foundation
            <BiHeart className="inline-block ml-1 text-darkLilac" size={16} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
