"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  navItems: { href: string; label: string }[];
}

export const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
    <div className="md:hidden relative z-50" style={{ zIndex: 2000 }}>
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
      >
        <span
          className={cn(
            "w-6 h-0.5 bg-darckLilac rounded-full transition-all duration-300 ease-out",
            isOpen && "rotate-45 translate-y-1.5",
          )}
        />
        <span
          className={cn(
            "w-6 h-0.5 bg-darckLilac rounded-full my-1 transition-all duration-300 ease-out",
            isOpen && "opacity-0",
          )}
        />
        <span
          className={cn(
            "w-6 h-0.5 bg-darckLilac rounded-full transition-all duration-300 ease-out",
            isOpen && "-rotate-45 -translate-y-1.5",
          )}
        />
      </button>

      <div
        className={cn(
          "fixed top-[60px] left-0 right-0 bottom-0  z-10 p-6 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "hidden -translate-x-full",
        )}
      >
        <nav className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-lg">
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

          <button
            onClick={() => router.push("/donate")}
            className="
                  relative
                  overflow-hidden
                  px-6 py-2
                  bg-lilac
                  text-dark
                  font-semibold
                  font-montserrat
                  rounded-full
                  transition-all
                  duration-1000
                  ease-in-out
                  hover:text-white
                  hover:bg-darkLilac
                  hover:scale-105
                  active:scale-95
                  group
                  animate-pulseScale
                "
          >
            <span className="relative z-10">Donate</span>

            <span
              className="
                    absolute
                    left-[-100%]
                    top-0
                    h-full
                    w-full
                    bg-white/20
                    skew-x-[-20deg]
                    transition-all
                    duration-700
                    group-hover:left-[100%]
                  "
            />
          </button>
        </nav>
      </div>
    </div>
  );
};
