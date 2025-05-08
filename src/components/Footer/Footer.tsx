"use client";

// import { Separator } from '@/components/ui/separator';
import { BiHeart } from "react-icons/bi";
import { FooterNavLinks } from "./FooterNavLinks";
import { FooterSocial } from "./FooterSocial";
import { Logo } from "../Navbar/Logo";
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Mission and CTA */}
              <div className="lg:col-span-1 space-y-4">
                {/* <h2 className="text-xl font-bold">Hope Charity Foundation</h2> */}
                <Logo/>
                <p className="text-sm text-muted-darklilac font-roboto">
                  Making a difference in communities around the world through
                  compassion, action, and sustainable development programs.
                </p>
                <button className="group relative overflow-hidden">
                  <span className="absolute inset-0 bg-primary-foreground/10 group-hover:bg-transparent transition-colors duration-300"></span>
                  <BiHeart className="h-4 w-4 mr-2 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                  Donate Now
                </button>
              </div>

              {/* Navigation Links */}
              <div className="lg:col-span-2">
                <FooterNavLinks />
              </div>

              {/* Newsletter and Social */}
              <div className="lg:col-span-1 space-y-8">
                {/* <FooterNewsletter /> */}
                <FooterSocial />
              </div>
            </div>
          </div>

          {/* <Separator /> */}
          <hr />

          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} Hope Charity Foundation. All rights
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
