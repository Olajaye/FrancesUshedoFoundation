import Link from "next/link";
import React from "react";

interface FooterLinksProps {
  title: string;
  links: Array<{
    text: string;
    href: string;
  }>;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <div className="mb-8 md:mb-0">
      <h3 className="text-xl md:text-2xl font-montserrat font-semibold mb-6">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-300 hover:text-darckLilac transition-colors duration-300"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
