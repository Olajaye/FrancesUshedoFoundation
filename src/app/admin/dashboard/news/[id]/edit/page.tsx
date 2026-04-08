"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, Loader2, Eye, Save } from "lucide-react";
import {
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
} from "@/store/api/newsApi";

interface StatItem {
  label: string;
  value: string;
}

interface GalleryItem {
  url: string;
  file?: File;
}

interface FormData {
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
  stats: StatItem[];
  gallery: GalleryItem[];
}

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: news, isLoading } = useGetNewsByIdQuery(id);
  const [updateNews, { isLoading: isSaving, error }] = useUpdateNewsMutation();

  const [submitError, setSubmitError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [currentStat, setCurrentStat] = useState({ label: "", value: "" });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    category: "",
    date: "",
    postedTime: "",
    image: "",
    author: "",
    authorRole: "",
    authorImage: "",
    featured: false,
    tags: [],
    content: "",
    stats: [],
    gallery: [],
  });

  // Populate form once data loads
  useEffect(() => {
    if (!news) return;
    setFormData({
      title: news.title,
      excerpt: news.excerpt,
      category: news.category,
      date: new Date(news.date).toISOString().split("T")[0],
      postedTime: news.postedTime?.slice(0, 5) || "12:00",
      image: news.image,
      author: news.author,
      authorRole: news.authorRole,
      authorImage: news.authorImage,
      featured: news.featured,
      tags: news.tags,
      content: news.content,
      stats: Array.isArray(news.stats)
        ? (news.stats as StatItem[])
        : [],
      gallery: Array.isArray(news.gallery)
        ? (news.gallery as GalleryItem[])
        : [],
    });
  }, [news]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "author" | "gallery",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      if (type === "main") {
        setFormData((prev) => ({ ...prev, image: url }));
      } else if (type === "author") {
        setFormData((prev) => ({ ...prev, authorImage: url }));
      } else {
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, { url, file }],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    const tag = currentTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) =>
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));

  const addStat = () => {
    if (currentStat.label.trim() && currentStat.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        stats: [...prev.stats, currentStat],
      }));
      setCurrentStat({ label: "", value: "" });
    }
  };

  const removeStat = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));

  const removeGalleryImage = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await updateNews({
        id,
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        date: formData.date,
        content: formData.content,
        author: formData.author,
        image: formData.image,
        authorRole: formData.authorRole,
        authorImage: formData.authorImage,
        featured: formData.featured,
        tags: formData.tags,
        postedTime: formData.postedTime,
        stats: formData.stats,
        gallery: formData.gallery.map(({ url }) => ({ url })),
      }).unwrap();

      router.push("/admin/dashboard/news");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data: { error: string } }).data?.error
          : "Failed to save. Please try again.";
      setSubmitError(message || "Failed to save.");
    }
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="relative bg-white max-w-4xl mx-auto rounded-xl shadow-xl">
          <div className="sticky top-0 bg-white border-b border-lilac/20 p-4 flex items-center justify-between rounded-t-xl">
            <h2 className="text-xl font-bold">News Preview</h2>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {formData.image && (
              <div className="relative h-96 w-full mb-6 rounded-xl overflow-hidden">
                <Image src={formData.image} alt={formData.title} fill className="object-cover" />
              </div>
            )}
            <h1 className="text-3xl font-bold mb-4">{formData.title || "Untitled"}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-lilac/10 text-darckLilac text-sm rounded-full">
                {formData.category || "Category"}
              </span>
              <span className="text-sm text-gray-500">
                {formData.date ? new Date(formData.date).toLocaleDateString() : ""}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                {formData.authorImage && (
                  <Image src={formData.authorImage} alt={formData.author} fill className="object-cover" />
                )}
              </div>
              <div>
                <p className="font-medium">{formData.author}</p>
                <p className="text-sm text-gray-500">{formData.authorRole}</p>
              </div>
            </div>
            <div className="bg-lilac/5 p-4 rounded-lg mb-6">
              <p className="text-lg italic text-gray-700">{formData.excerpt || "No excerpt"}</p>
            </div>
            {formData.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {formData.stats.map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-lilac/10 to-darckLilac/5 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-darckLilac">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="prose max-w-none mb-6 text-gray-700 whitespace-pre-wrap">
              {formData.content || "No content"}
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {formData.gallery.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.gallery.map((image, i) => (
                    <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                      <Image src={image.url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit News Article</h1>
            <p className="text-gray-600">Update the news article details</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors flex items-center gap-2"
            >
              <Eye className="w-5 h-5" /> Preview
            </button>
            <Link
              href="/admin/dashboard/news"
              className="px-4 py-2 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Error */}
        {(submitError || error) && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {submitError || "Something went wrong. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.excerpt}
                      onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                    <textarea
                      required
                      rows={10}
                      value={formData.content}
                      onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Statistics</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={currentStat.label}
                      onChange={(e) => setCurrentStat((p) => ({ ...p, label: e.target.value }))}
                      className="flex-1 px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Stat label"
                    />
                    <input
                      type="text"
                      value={currentStat.value}
                      onChange={(e) => setCurrentStat((p) => ({ ...p, value: e.target.value }))}
                      className="w-32 px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Value"
                    />
                    <button
                      type="button"
                      onClick={addStat}
                      className="px-4 py-2 bg-lilac/10 text-darckLilac rounded-lg hover:bg-lilac/20"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.stats.map((stat, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span>
                          <span className="font-medium">{stat.label}:</span> {stat.value}
                        </span>
                        <button type="button" onClick={() => removeStat(i)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Gallery Images</h2>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "gallery")}
                    className="w-full"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.gallery.map((image, i) => (
                      <div key={i} className="relative group">
                        <div className="relative h-24 rounded-lg overflow-hidden">
                          <Image src={image.url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Publishing</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    >
                      <option value="">Select category</option>
                      <option value="Announcement">Announcement</option>
                      <option value="Event">Event</option>
                      <option value="Impact Story">Impact Story</option>
                      <option value="Press Release">Press Release</option>
                      <option value="Blog">Blog</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={formData.postedTime}
                      onChange={(e) => setFormData((p) => ({ ...p, postedTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                      className="rounded border-lilac/30 text-lilac focus:ring-lilac"
                    />
                    <span className="text-sm text-gray-700">Mark as featured</span>
                  </label>
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Media</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "main")} className="w-full" />
                    {formData.image && (
                      <div className="relative h-32 w-full mt-2 rounded-lg overflow-hidden">
                        <Image src={formData.image} alt="Main" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "author")} className="w-full" />
                    {formData.authorImage && (
                      <div className="relative h-16 w-16 mt-2 rounded-full overflow-hidden">
                        <Image src={formData.authorImage} alt="Author" fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Tags</h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1 px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Add a tag"
                    />
                    <button type="button" onClick={addTag} className="px-4 py-2 bg-lilac/10 text-darckLilac rounded-lg hover:bg-lilac/20">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-lilac/10 text-darckLilac rounded-full">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Author Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Role</label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData((p) => ({ ...p, authorRole: e.target.value }))}
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/dashboard/news"
              className="px-6 py-3 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-lilac to-darckLilac text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {showPreview && <PreviewModal />}
    </>
  );
}
