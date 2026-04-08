"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Search,
  Calendar,
  User,
  Loader2,
} from "lucide-react";
import {
  useGetNewsQuery,
  useDeleteNewsMutation,
  useToggleHiddenMutation,
} from "@/store/api/newsApi";

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showHidden, setShowHidden] = useState(false);

  const { data: news = [], isLoading } = useGetNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();
  const [toggleHidden] = useToggleHiddenMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    await deleteNews(id);
  };

  const handleToggleHide = async (id: string, currentHidden: boolean) => {
    await toggleHidden({ id, hidden: !currentHidden });
  };

  const categories = ["all", ...Array.from(new Set(news.map((n) => n.category)))];

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesVisibility = showHidden ? true : !item.hidden;
    return matchesSearch && matchesCategory && matchesVisibility;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600">
            Manage your news articles and announcements
          </p>
        </div>
        <Link
          href="/admin/dashboard/news/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lilac to-darckLilac text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Create New News
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-lilac/20">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
              className="rounded border-lilac/30 text-lilac focus:ring-lilac"
            />
            Show hidden
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-sm border border-lilac/20 overflow-hidden hover:shadow-md transition-shadow ${
              item.hidden ? "opacity-60" : ""
            }`}
          >
            <div className="relative h-48 bg-gray-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
              {item.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
                  Featured
                </span>
              )}
              {item.hidden && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
                  Hidden
                </span>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-lilac/10 text-darckLilac text-xs font-medium rounded">
                  {item.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {item.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  {item.authorImage ? (
                    <Image
                      src={item.authorImage}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.author}
                  </p>
                  <p className="text-xs text-gray-500">{item.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-lilac/20">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleHide(item.id, item.hidden)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={item.hidden ? "Unhide" : "Hide"}
                  >
                    {item.hidden ? (
                      <Eye className="w-4 h-4 text-gray-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <Link
                    href={`/admin/dashboard/news/${item.id}/edit`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <Link
                  href={`/admin/dashboard/news/${item.id}/preview`}
                  className="text-sm text-lilac hover:text-darckLilac font-medium"
                >
                  Preview →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No news found</p>
        </div>
      )}
    </div>
  );
}
