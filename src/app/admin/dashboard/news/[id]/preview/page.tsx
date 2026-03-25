"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Loader2,
  Edit,
  Eye,
  EyeOff,
} from "lucide-react";

interface News {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  postedTime: string;
  image: string;
  author: string;
  authorRole: string;
  authorImage: string;
  featured: boolean;
  tags: string[];
  content: string;
  stats: Stat[];
  gallery: GalleryImage[];
  hidden?: boolean;
}

interface Stat {
  id: string;
  label: string;
  value: string;
}

interface GalleryImage {
  id: string;
  url: string;
}

export default function PreviewNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [params.id]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/admin/news/${params.id}`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHide = async () => {
    if (!news) return;

    try {
      await fetch(`/api/admin/news/${news.id}/toggle-hidden`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden: !news.hidden }),
      });
      fetchNews();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">News not found</p>
        <Link
          href="/admin/dashboard/news"
          className="mt-4 inline-block text-lilac hover:text-darckLilac"
        >
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleHide}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
              news.hidden
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {news.hidden ? (
              <>
                <Eye className="w-4 h-4" />
                Unhide
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                Hide
              </>
            )}
          </button>
          <Link
            href={`/admin/dashboard/news/${news.id}/edit`}
            className="px-4 py-2 bg-lilac/10 text-darckLilac rounded-xl hover:bg-lilac/20 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
        </div>
      </div>

      {/* Preview Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800 text-sm">
          This is a preview of how the news will appear to visitors.
        </p>
      </div>

      {/* News Content */}
      <article className="bg-white rounded-xl shadow-sm border border-lilac/20 overflow-hidden">
        {/* Main Image */}
        {news.image && (
          <div className="relative h-[400px] w-full">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
            {news.featured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                Featured
              </span>
            )}
            {news.hidden && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-gray-500 text-white text-sm font-semibold rounded-full">
                Hidden
              </span>
            )}
          </div>
        )}

        <div className="p-8">
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-lilac/10 text-darckLilac text-sm font-medium rounded-full">
              {news.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(news.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {news.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-lilac/20">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              {news.authorImage ? (
                <Image
                  src={news.authorImage}
                  alt={news.author}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {news.author}
              </p>
              <p className="text-gray-600">{news.authorRole}</p>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-gradient-to-r from-lilac/5 to-darckLilac/5 p-6 rounded-xl mb-8">
            <p className="text-xl italic text-gray-700 leading-relaxed">
              {news.excerpt}
            </p>
          </div>

          {/* Stats */}
          {news.stats && news.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {news.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-gradient-to-br from-lilac/10 to-darckLilac/5 p-6 rounded-xl text-center"
                >
                  <p className="text-3xl font-bold text-darckLilac mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {news.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {news.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Gallery */}
          {news.gallery && news.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {news.gallery.map((image) => (
                  <div
                    key={image.id}
                    className="relative h-48 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt="Gallery image"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Published Date */}
          <div className="mt-8 pt-8 border-t border-lilac/20">
            <p className="text-sm text-gray-500">
              Published on{" "}
              {new Date(news.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {news.postedTime}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
