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
  // tier = 'silver',
  url,
  // description,
}: SponsorProps) {
  // Tier-based styling
  // const tierStyles = {
  //   platinum: 'border-2 border-purple-500 shadow-lg shadow-purple-500/20',
  //   gold: 'border-2 border-yellow-500 shadow-md shadow-yellow-500/20',
  //   silver: 'border border-gray-300 shadow-sm',
  //   bronze: 'border border-amber-700',
  // };

  

  // ${tierStyles[tier]}
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
      {/* {description && (
        <p className="text-sm text-gray-600 text-center line-clamp-2">
          {description}
        </p>
      )} */}
      {/* {tier && (
        <span className={`mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
          tier === 'platinum' ? 'bg-purple-100 text-purple-800' :
          tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
          tier === 'silver' ? 'bg-gray-100 text-gray-800' :
          'bg-amber-100 text-amber-800'
        }`}>
          {tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsor
        </span>
      )} */}
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