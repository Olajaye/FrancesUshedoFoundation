"use client";

// import { Separator } from '@/components/ui/separator';
// import { BiHeart } from "react-icons/bi";
import { FooterNavLinks } from "./FooterNavLinks";
import { FooterSocial } from "./FooterSocial";
// import { Logo } from "../Navbar/Logo";
import Link from "next/link";
import Image from "next/image";
// import { FooterNewsletter } from './FooterNewsletter';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footerbg bg-cover bg-top bg-opacity-0 relative  w-full ">
      <div className="absolute inset-0 bg-light-overlay z-10"></div>
      {/* Overlay */}
      <div className="relative z-50">
        <div className="px-4 sm:px-6 lg:px-8">


          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mission and CTA */}
              <div className="lg:col-span-1 space-y-4">
                <Link
                  href="/"
                  className={"flex items-center gap-2 relative"}
                >
                  <Image
                    src={"/logoNew.png"}
                    alt={"Logo"}
                    width={200}
                    height={200}
                    className="w-auto h-[100px]"
                  />
                  <span className="text-3xl font-extrabold font-EduQld text-[#a564af]  hidden md:inline-block">
                    TFUF
                  </span>
                </Link>
                <p className="text-base text-muted-darklilac font-roboto">
                  Making a difference in communities around the world through
                  compassion, action, and sustainable development programs.
                </p>
                {/* <button className="group flex items-center relative overflow-hidden">
                  <BiHeart className="h-4 w-4 mr-2 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                  Donate Now
                </button> */}
              </div>

              {/* Navigation Links */}
              <div className="lg:col-span-1 flex justify-center items-center">
                <FooterNavLinks />
              </div>

              {/* Newsletter and Social */}
              <div className="lg:col-span-1 space-y-8 flex justify-center items-center">
                {/* <FooterNewsletter /> */}
                <FooterSocial />
              </div>
            </div>
          </div>

          {/* <Separator /> */}
          <hr className="bg-darckLilac text-darckLilac"/>

          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} The Frances Ushedo Foundation. All rights
                reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4 text-sm text-muted-foreground">
              <a
                href="/privacy"
                className="hover:text-primary hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-primary hover:underline transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/accessibility"
                className="hover:text-primary hover:underline transition-colors"
              >
                Accessibility
              </a>
              <a
                href="/cookie-policy"
                className="hover:text-primary hover:underline transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          <div className="py-4 text-center">
            <p className="text-xs text-muted-foreground">
              Hope Charity Foundation is a registered charity (No. 123456789)
              dedicated to creating positive change.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
