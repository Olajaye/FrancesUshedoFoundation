"use client";

import { useState, useEffect } from "react";
// import { Logo } from "@/components/Navbar/Logo";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { NavItem } from "@/components/Navbar/NavItem";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/portfolio", label: "Portfolio" }, // Fixed typo from "portfoilio"
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];
export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-lilac py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-start gap-2 sm:gap-8">
            <div className="flex items-center gap-2">
              <IoMdMailUnread className="w-4 h-4 md:w-5 md:h-5 text-white" />{" "}
              <p className="text-white text-sm md:text-base font-montserrat">
                foundation@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneVolume className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <p className="text-white text-sm md:text-base  font-montserrat">
                +44 828 787 6545{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "bg-white/90 backdrop-blur-sm transition-all duration-300 ease-in-out shadow-md", // Made shadow subtle and always present for
          isScrolled ? "shadow-lilac/30" : "shadow-lilac/10"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            <Link href="/">
              <Image
                src="/logo/cropLogo.png"
                alt="Foundation Logo"
                width={180}
                height={60}
                className="w-auto h-10 md:h-12"
                priority
              />
            </Link>
            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    isActive={pathname === item.href}
                    label={item.label}
                  />
                </li>
              ))}
            </ul>
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </header>
    </nav>
  );
};
