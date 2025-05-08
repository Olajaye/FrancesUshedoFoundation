import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <li>
      <Link 
        href={href} 
        className={cn(
          "text-muted-foreground hover:text-primary hover:underline transition-colors duration-200",
          className
        )}
      >
        {children}
      </Link>
    </li>
  );
}

export function FooterNavLinks() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Who We Are</h3>
        <ul className="space-y-2 text-sm">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/mission">Our Mission</FooterLink>
          <FooterLink href="/team">Our Team</FooterLink>
          <FooterLink href="/partners">Partners</FooterLink>
          <FooterLink href="/success-stories">Success Stories</FooterLink>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Get Involved</h3>
        <ul className="space-y-2 text-sm">
          <FooterLink href="/donate">Donate</FooterLink>
          <FooterLink href="/volunteer">Volunteer</FooterLink>
          <FooterLink href="/fundraise">Fundraise</FooterLink>
          <FooterLink href="/events">Events</FooterLink>
          <FooterLink href="/corporate">Corporate Giving</FooterLink>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Resources</h3>
        <ul className="space-y-2 text-sm">
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/press">Press</FooterLink>
          <FooterLink href="/reports">Annual Reports</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
        </ul>
      </div>
    </div>
  );
}