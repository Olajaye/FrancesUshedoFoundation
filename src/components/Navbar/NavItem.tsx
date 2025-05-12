"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
}

export const NavItem = ({ href, label }: NavItemProps) => {
  // const pathname = usePathname();
  // const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={"text-2xl font-medium transition-colors text-darckLilac font-roboto"}
    >
      {label}
    </Link>
  );
};
