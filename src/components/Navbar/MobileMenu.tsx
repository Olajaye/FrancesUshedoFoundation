"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MobileMenuProps {
  navItems: { href: string; label: string }[];
}

export const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-10 h-10 relative z-20"
      >
        <span
          className={cn(
            "w-6 h-0.5 bg-darckLilac rounded-full transition-all duration-300 ease-out",
            isOpen && "rotate-45 translate-y-1.5"
          )}
        />
        <span
          className={cn(
            "w-6 h-0.5 bg-darckLilac rounded-full my-1 transition-all duration-300 ease-out",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "w-6 h-0.5 bg-darckLilac rounded-full transition-all duration-300 ease-out",
            isOpen && "-rotate-45 -translate-y-1.5"
          )}
        />
      </button>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-lilac/80 backdrop-blur-sm z-10 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed top-[72px] left-0 right-0 bottom-0 bg-background z-10 p-6 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary py-3 text-lg font-medium border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};