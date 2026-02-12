import React from "react";
import { PagesHero } from "@/components/hearderCom/hearder";
import Link from "next/link";
import Image from "next/image";

const newsArticles = [
  {
    id: 1,
    title: "Annual Charity Gala Raises $100,000 for Diabetes Prevention",
    excerpt:
      "Our recent fundraising event exceeded expectations, raising critical funds for community health initiatives...",
    category: "Event Report",
    date: "November 10, 2025",
    readTime: "5 min read",
    image: "/home/picture2.jpg",
    author: "Sarah Johnson",
    authorRole: "Event Coordinator",
    featured: true,
    tags: ["Fundraising", "Diabetes", "Community"],
  },
  {
    id: 2,
    title: "Sickle-cell Awareness Workshop Impacts 200+ Participants",
    excerpt:
      "The workshop focused on mental health and self-stigma reduction among sickle-cell survivors...",
    category: "Workshop Report",
    date: "September 25, 2025",
    readTime: "4 min read",
    image: "/home/PHOTO-2025-01-31-12-29-05.jpg",
    author: "Dr. Michael Chen",
    authorRole: "Clinical Director",
    featured: false,
    tags: ["Workshop", "Sickle-cell", "Mental Health"],
  },
  {
    id: 3,
    title: "New Community Health Center Opens in Downtown Area",
    excerpt:
      "Thanks to generous donations, we've opened a new facility offering free screenings and consultations...",
    category: "Announcement",
    date: "August 15, 2025",
    readTime: "3 min read",
    image: "/home/welcomeHero.png",
    author: "Maria Rodriguez",
    authorRole: "Operations Manager",
    featured: true,
    tags: ["Facility", "Health Center", "Community"],
  },
];

const NewsPage = () => {
  return (
    <>
      <PagesHero img={"/portfolio/picture1.jpg"} title="News & Reports" />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest News & Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of event reports, success stories, and
            updates from the field.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              All News Articles
            </h2>
            <div className="text-sm text-gray-500">
              Showing {newsArticles.length} articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <Link href={`/news/${article.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl truncate font-bold text-gray-900 mb-3 line-clamp-2 hover:text-lilac transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-3 line-clamp-3 h-[68px]">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                          {/* Author image placeholder */}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {article.author}
                        </span>
                      </div>

                      <button className="text-lilac font-medium text-sm hover:text-darkLilac transition-colors">
                        Read Article →
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
