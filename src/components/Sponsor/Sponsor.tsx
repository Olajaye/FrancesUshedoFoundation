import Image from 'next/image';
import Link from 'next/link';

export interface SponsorProps {
  name: string;
  logoUrl: string;
  logoAlt: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
  url?: string;
  description?: string;
}

export default function SponsorCard({
  name,
  logoUrl,
  logoAlt,
  url,
}: SponsorProps) {
  const content = (
    <div className={`flex flex-col items-center p-4 rounded-lg bg-white   transition-all duration-300 hover:shadow-lg`}>
      <div className="relative w-full h-24 mb-4">
        <Image
          src={logoUrl}
          alt={logoAlt}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100px, 200px"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
    </div>
  );

  return url ? (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </Link>
  ) : (
    content
  );
}