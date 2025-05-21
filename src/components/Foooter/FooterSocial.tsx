import React from 'react';
import { BsDribbble, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { LiaLinkedin } from 'react-icons/lia';


const FooterSocial: React.FC = () => {
  const socialLinks = [
    { Icon: FaFacebook, href: '#', ariaLabel: 'Facebook' },
    { Icon: BsTwitter, href: '#', ariaLabel: 'Twitter' },
    { Icon: BsInstagram, href: '#', ariaLabel: 'Instagram' },
    { Icon: BsDribbble, href: '#', ariaLabel: 'Dribbble' },
    { Icon: LiaLinkedin, href: '#', ariaLabel: 'LinkedIn' },
  ];

  return (
    <div className="flex space-x-4 mt-6">
      {socialLinks.map((social, index) => (
        <a 
          key={index}
          href={social.href}
          aria-label={social.ariaLabel}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-300 hover:bg-darckLilac hover:text-white transition-all duration-300"
        >
          <social.Icon size={16} />
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;