"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/Navbar/Logo";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { NavItem } from "@/components/Navbar/NavItem";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
      <div className="bg-darckLilac p-3">mlakmklfmvl</div>

      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur-sm bg-opacity-90",
          "transition-all duration-300 ease-in-out shadow-lg",
          isScrolled
            ? "bg-white shadow-lilac/20"
            : "bg-white/50 shadow-transparent"
        )} // scrolled ? "bg-white py-0" : "bg-white"
      >
        <div
          className={cn("container mx-auto px-4 sm:px-6 lg:px-8 py-3")} //scrolled ? "md:bg-white" : "md:bg-white"
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo />

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
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
