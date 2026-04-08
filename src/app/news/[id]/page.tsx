"use client";

import { PagesHero } from "@/components/hearderCom/hearder";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowLeft, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useGetPublicNewsByIdQuery } from "@/store/api/publicNewsApi";

interface NewsDetailPageProps {
  params: { id: string };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = params;
  const { data: article, isLoading, isError } = useGetPublicNewsByIdQuery(id);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-lilac" />
        </div>
        <Footer />
      </>
    );
  }

  if (isError || !article) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-gray-500 text-lg">Article not found.</p>
          <Link href="/news" className="text-lilac hover:text-darkLilac font-medium">
            ← Back to News
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const stats = Array.isArray(article.stats)
    ? (article.stats as { label: string; value: string }[])
    : [];

  const gallery = Array.isArray(article.gallery)
    ? (article.gallery as { url: string }[])
    : [];

  return (
    <>
      <Navbar />
      <PagesHero img={article.image || "/portfolio/picture1.jpg"} title={article.title} />

      <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-lilac hover:text-darkLilac transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All News
          </Link>
        </div>

        {/* Article header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-lilac/10 text-darkLilac px-4 py-2 rounded-full font-medium text-sm">
              {article.category}
            </span>
            {article.featured && (
              <span className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 border-t border-b border-gray-200 py-6">
            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {article.authorImage && (
                <Image
                  src={article.authorImage}
                  alt={article.author}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div>
              <p className="font-bold text-gray-900">{article.author}</p>
              <p className="text-sm text-gray-500">{article.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <p className="text-2xl font-bold text-lilac mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Excerpt */}
        <div className="bg-lilac/5 border-l-4 border-lilac p-5 rounded-r-xl mb-8">
          <p className="text-lg italic text-gray-700">{article.excerpt}</p>
        </div>

        {/* Content */}
        <article
          className="prose prose-lg max-w-none mb-12 prose-headings:text-gray-900 prose-a:text-lilac"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-lilac hover:text-white transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Event Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative h-56 rounded-xl overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Share This Article
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm"
            >
              Twitter / X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/news"
              className="text-center px-8 py-3 border border-lilac text-lilac rounded-lg hover:bg-lilac/10 transition-colors"
            >
              View All News
            </Link>
            <Link
              href="/event"
              className="text-center px-8 py-3 bg-lilac text-white rounded-lg hover:bg-darkLilac transition-colors"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}