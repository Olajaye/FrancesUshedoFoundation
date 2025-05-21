import { ReactNode } from 'react';
import Image from 'next/image';

interface BlogPostProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    date: string;
  };
  imageUrl: string;
  imageAlt: string;
  tags?: string[];
  children?: ReactNode;
}

export default function BlogPost({
  title,
  excerpt,
  author,
  imageUrl,
  imageAlt,
  tags = [],
  children,
}: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Post Header */}
      <header className="mb-8">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-6">{excerpt}</p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Image
              className="h-10 w-10 rounded-full"
              src={author.avatar}
              alt={`${author.name} avatar`}
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{author.name}</p>
            <p className="text-sm text-gray-500">
              <time dateTime={author.date}>{author.date}</time>
            </p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={800}
          height={450}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none text-gray-700">
        {children}
      </div>

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Share this post</h3>
            <div className="flex space-x-4 mt-2">
              {['Twitter', 'Facebook', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{social}</span>
                  <span>{social}</span>
                </a>
              ))}
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to blog
          </a>
        </div>
      </footer>
    </article>
  );
}





//  <BlogPost
//         title="The Future of Web Development in 2023"
//         excerpt="Exploring the latest trends and technologies that are shaping the future of web development."
//         author={{
//           name: "Jane Doe",
//           avatar: "/IMG_2792.JPG",
//           date: "May 15, 2023",
//         }}
//         imageUrl="/IMG_2792.JPG"
//         imageAlt="Web development concepts"
//         tags={["Web Development", "Trends", "2023"]}
//       >
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
//           mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
//           neque eu tellus rhoncus ut eleifend nibh porttitor.
//         </p>

//         <h2>Introduction to Modern Web Development</h2>

//         <p>
//           Ut in nulla enim. Phasellus molestie magna non est bibendum non
//           venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
//           Mauris iaculis porttitor posuere.
//         </p>

//         <h3>Key Technologies</h3>

//         <ul>
//           <li>Next.js and React</li>
//           <li>Tailwind CSS</li>
//           <li>TypeScript</li>
//           <li>Server Components</li>
//         </ul>
//       </BlogPost>