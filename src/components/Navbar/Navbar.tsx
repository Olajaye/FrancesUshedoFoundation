"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/Navbar/Logo";
import { MobileMenu } from '@/components/Navbar/MobileMenu';
import { NavItem } from "@/components/Navbar/NavItem";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-700 ease-in-out",
        scrolled 
          ? "bg-[#ffffffcd] shadow-lg backdrop-blur-sm py-0" 
          : "md:bg-transparent py-3 bg-[#ffffffcd]"
      )}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  rounded-xl py-3", scrolled ? "md:bg-transparent" : "md:bg-[#ffffffcd]")}>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavItem 
                key={item.href} 
                href={item.href} 
                label={item.label} 
              />
            ))}
          </nav>
          
          {/* Mobile menu toggle */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
};