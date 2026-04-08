"use client";

import { useState } from "react";
import { PagesHero } from "@/components/hearderCom/hearder";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Loader2, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { useGetPublicNewsQuery } from "@/store/api/publicNewsApi";

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetPublicNewsQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const total = data?.total ?? 0;
  const start = (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, total);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = (() => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  })();

  return (
    <>
      <Navbar />
      <PagesHero img="/portfolio/picture1.jpg" title="News & Reports" />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest News &amp; Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of event reports, success stories, and
            updates from the field.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-lilac" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">
              Failed to load articles. Please try again later.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Newspaper className="w-12 h-12 text-lilac/40" />
            <p className="text-gray-500 text-lg">No articles published yet.</p>
          </div>
        )}

        {/* Articles grid */}
        {!isLoading && articles.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                All News Articles
              </h2>
              <span className="text-sm text-gray-500">
                Showing {start}–{end} of {total} article{total !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <Link href={`/news/${article.id}`}>
                    <div className="relative h-48 bg-gray-100">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper className="w-10 h-10 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                      {article.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>
                          {new Date(article.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-lilac transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 mb-3 line-clamp-3">
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
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            {article.authorImage && (
                              <Image
                                src={article.authorImage}
                                alt={article.author}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {article.author}
                          </span>
                        </div>
                        <span className="text-lilac font-medium text-sm">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-1">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-lilac/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* First page + ellipsis */}
                  {pageNumbers[0] > 1 && (
                    <>
                      <button
                        onClick={() => goToPage(1)}
                        className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-lilac/10 transition-colors text-sm"
                      >
                        1
                      </button>
                      {pageNumbers[0] > 2 && (
                        <span className="px-2 text-gray-400">…</span>
                      )}
                    </>
                  )}

                  {/* Page numbers */}
                  {pageNumbers.map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-lilac text-white"
                          : "border border-gray-200 hover:bg-lilac/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* Last page + ellipsis */}
                  {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                        <span className="px-2 text-gray-400">…</span>
                      )}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-lilac/10 transition-colors text-sm"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-lilac/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </>
  );
}