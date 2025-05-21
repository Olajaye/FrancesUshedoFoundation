import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime?: string;
  tags?: string[];
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  // imageUrl,
  imageAlt,
  author,
  date,
  readTime = '5 min read',
  tags = [],
  slug,
}: BlogCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Image */}
      <Link href={`/blog/${slug}`} className="block overflow-hidden h-48">
        <Image
          src='/picture2.jpg'
          alt={imageAlt}
          width={400}
          height={240}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col bg-white p-6">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link href={`/blog/${slug}`} className="hover:text-indigo-600">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>

        {/* Footer with author and metadata */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image
                className="h-8 w-8 rounded-full"
                src={"/picture2.jpg"}
                alt={`${author.name} avatar`}
                width={32}
                height={32}
              />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{author.name}</p>
              <div className="flex space-x-1 text-gray-500">
                <time dateTime={date}>{date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          <Link
            href={`/blog/${slug}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            aria-label={`Read more about ${title}`}
          >
            Read more &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}