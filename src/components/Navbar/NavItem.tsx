"use client";
import Link from "next/link";
import { useState } from "react";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export const NavItem = ({ href, label, isActive }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className={`text-base transition-colors font-montserrat font-semibold ${
          isActive || isHovered ? "text-darckLilac" : "text-black"
        }`}
      >
        {label}
      </Link>
      <div
        className={`h-[2px] bg-darckLilac transition-all duration-300 mt-2 ${
          isActive || isHovered ? "w-full" : "w-0"
        }`}
      ></div>
    </div>
  );
};
