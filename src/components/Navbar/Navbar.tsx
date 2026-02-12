"use client";

import { useState, useEffect } from "react";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { NavItem } from "@/components/Navbar/NavItem";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/event", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];
export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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
          isScrolled ? "shadow-lilac/30" : "shadow-lilac/10",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 md:py-2 ">
            <Link href="/" className="flex items-center ">
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

            <ul className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    isActive={pathname === item.href}
                    label={item.label}
                  />
                </li>
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
            </ul>
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </header>
    </nav>
  );
};
