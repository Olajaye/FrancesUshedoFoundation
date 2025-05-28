import React from "react";
// import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterNewsItem from "./FooterNewsItem";
import FooterContact from "./FooterContacts";
import FooterSocial from "./FooterSocial";
import { BiHeart } from "react-icons/bi";

import Image from "next/image";

const Footer: React.FC = () => {
  const usefulLinks = [
    { text: "Privacy Policy", href: "#" },
    { text: "Become a Volunteer", href: "#" },
    { text: "Donate", href: "#" },
    { text: "Testimonials", href: "#" },
    { text: "Causes", href: "#" },
    { text: "Portfolio", href: "#" },
    { text: "News", href: "#" },
  ];

  const newsItems = [
    { title: "A new cause to help", date: "MARCH 12, 2018" },
    { title: "We love to help people", date: "MARCH 12, 2018" },
    { title: "The new ideas for helping", date: "MARCH 12, 2018" },
  ];

  return (
    <footer className="bg-footerbg bg-cover bg-top">
      {/* <div className="absolute inset-0 bg-black/80 "></div> */}
      <div
        className="flex flex-col items-center bg-black/85 justify-center text-start text-white px-4"
        style={{ zIndex: 999 }}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and About */}
            <div>
              {/* <FooterLogo /> */}
              <Image
                src={"/logoNew.png"}
                alt={"Logo"}
                width={200}
                height={200}
                className="w-auto h-[80px]"
              />
              <p className="text-gray-400 mt-6 mb-6">
                &quot;In the heart of every child lies a spark of potential. At
                TFUF, we are committed to nurturing this potential in Nigeria,
                providing the support and care that every child deserves. Please
                join us in our journey to create brighter futures.&quot;
              </p>
              <FooterSocial />
            </div>

            {/* Useful Links */}
            <div>
              <FooterLinks title="Useful Links" links={usefulLinks} />
            </div>

            {/* Latest News */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">
                Latest News
              </h3>
              {newsItems.map((item, index) => (
                <FooterNewsItem
                  key={index}
                  title={item.title}
                  date={item.date}
                />
              ))}
            </div>

            {/* Contact */}
            <div>
              <FooterContact />
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>
              Copyright ©2025 All rights reserved |  The Frances Ushedo Foundation
              <BiHeart
                className="inline-block text-darckLilac fill-darktext-darckLilac"
                size={14}
              />{" "}
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
