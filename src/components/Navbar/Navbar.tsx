"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/Navbar/Logo";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { NavItem } from "@/components/Navbar/NavItem";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" }, // Added leading slash
  { href: "/services", label: "Services" },
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
    <section className="">
      <div className="bg-lilac p-3 ">
        <div className="container mx-auto px-4">
          <div className="flex">
            <div className="flex items-center space-x-2 ps-10">
              <IoMdMailUnread className="w-5 h-5 text-black" />
              <p className="text-white text-base font-semibold">
                foundation@gmail.com
              </p>
            </div>

            <div className="flex items-center space-x-2 ms-32">
              <FaPhoneVolume className="w-5 h-5 text-white" />
              <p className="text-white text-base font-semibold">
                +448287876545
              </p>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky overflow-x-hidden top-0 z-50 backdrop-blur-sm bg-opacity-90",
          "transition-all duration-300 ease-in-out shadow-lg",
          isScrolled
            ? "bg-white shadow-lilac/20"
            : "bg-white/50 shadow-transparent"
        )} // scrolled ? "bg-white py-0" : "bg-white"
      >
        <div
          className={cn("container mx-auto px-4 py-3")} //scrolled ? "md:bg-white" : "md:bg-white"
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo />

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                  label={item.label}
                />
              ))}
            </nav>

            {/* Mobile menu toggle */}
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </header>
    </section>
  );
};
