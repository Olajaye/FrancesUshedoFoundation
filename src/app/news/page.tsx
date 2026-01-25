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
    image: "/news/gala-2025.jpg",
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
    image: "/news/workshop-report.jpg",
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
    image: "/news/health-center.jpg",
    author: "Maria Rodriguez",
    authorRole: "Operations Manager",
    featured: true,
    tags: ["Facility", "Health Center", "Community"],
  },
  {
    id: 4,
    title: "Volunteer Spotlight: John Doe's 10 Years of Service",
    excerpt:
      "Celebrating a decade of dedication from one of our longest-serving volunteers...",
    category: "Volunteer Spotlight",
    date: "July 22, 2025",
    readTime: "6 min read",
    image: "/news/volunteer-spotlight.jpg",
    author: "Lisa Wang",
    authorRole: "Volunteer Coordinator",
    featured: false,
    tags: ["Volunteer", "Recognition", "Community"],
  },
  {
    id: 5,
    title: "Quarterly Impact Report: Q2 2025 Achievements",
    excerpt:
      "A comprehensive look at our foundation's achievements and community impact for the second quarter...",
    category: "Impact Report",
    date: "June 30, 2025",
    readTime: "8 min read",
    image: "/news/impact-report.jpg",
    author: "David Smith",
    authorRole: "Program Director",
    featured: false,
    tags: ["Report", "Impact", "Statistics"],
  },
  {
    id: 6,
    title: "Partnership Announcement: Healthcare Alliance 2025",
    excerpt:
      "We're proud to announce a new partnership with leading healthcare providers to expand our services...",
    category: "Partnership",
    date: "May 18, 2025",
    readTime: "4 min read",
    image: "/news/partnership.jpg",
    author: "Robert Kim",
    authorRole: "Partnership Director",
    featured: false,
    tags: ["Partnership", "Collaboration", "Healthcare"],
  },
];

const categories = [
  "All News",
  "Event Reports",
  "Impact Reports",
  "Announcements",
  "Volunteer Stories",
  "Partnerships",
];

const NewsPage = () => {
  return (
    <>
      <PagesHero img={"/portfolio/picture1.jpg"} title="News & Reports" />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest News & Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of event reports, success stories, and
            updates from the field.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-lilac hover:text-lilac hover:bg-lilac/5 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {newsArticles
              .filter((article) => article.featured)
              .map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/news/${article.id}`}>
                    <div className="md:flex h-full">
                      <div className="md:w-2/5 relative h-64 md:h-auto">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-lilac text-white px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-lilac transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-6 flex-grow">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                              {/* Author image would go here */}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {article.author}
                              </p>
                              <p className="text-sm text-gray-500">
                                {article.authorRole}
                              </p>
                            </div>
                          </div>

                          <span className="text-lilac font-medium flex items-center">
                            Read More
                            <svg
                              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* All News Grid */}
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

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-lilac transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
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

        {/* <div className="mt-20 bg-gradient-to-r from-lilac to-darkLilac rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 text-lilac-100">
              Subscribe to our newsletter to receive the latest news and reports
              directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-lilac font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default NewsPage;
