import Link from "next/link";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook as Facebook } from "react-icons/fa";
import { GiThunderBlade } from "react-icons/gi";


export function FooterSocial() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Connect With Us</h3>
      <div className="flex gap-4">
        <Link 
          href="#" 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </Link>
        <Link 
          href="#" 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="Twitter"
        >
          <BsTwitter className="h-5 w-5" />
        </Link>
        <a 
          href="#" 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="Instagram"
        >
          <BsInstagram className="h-5 w-5" />
        </a>
        <a 
          href="#" 
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
          aria-label="Github"
        >
          <GiThunderBlade className="h-5 w-5" />
        </a>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Follow us on social media to see the impact of your support.
      </p>
    </div>
  );
}
