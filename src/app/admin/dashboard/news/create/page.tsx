"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, X, Upload, Loader2, Eye } from "lucide-react";
import Link from "next/link";

interface Stat {
  label: string;
  value: string;
}

interface GalleryImage {
  url: string;
  file?: File;
}

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    postedTime: new Date().toTimeString().split(" ")[0].slice(0, 5),
    image: "",
    author: "Sarah Johnson",
    authorRole: "Communications Director",
    authorImage: "",
    featured: false,
    tags: [] as string[],
    content: "",
    stats: [] as Stat[],
    gallery: [] as GalleryImage[],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentStat, setCurrentStat] = useState({ label: "", value: "" });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "author" | "gallery",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "main") {
          setFormData({ ...formData, image: reader.result as string });
        } else if (type === "author") {
          setFormData({ ...formData, authorImage: reader.result as string });
        } else if (type === "gallery") {
          setFormData({
            ...formData,
            gallery: [
              ...formData.gallery,
              { url: reader.result as string, file },
            ],
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addStat = () => {
    if (currentStat.label.trim() && currentStat.value.trim()) {
      setFormData({
        ...formData,
        stats: [...formData.stats, currentStat],
      });
      setCurrentStat({ label: "", value: "" });
    }
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index),
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would upload images to your server/storage
      // and then save the news data

      const response = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/dashboard/news");
      }
    } catch (error) {
      console.error("Error creating news:", error);
    } finally {
      setLoading(false);
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
            {/* Main Image */}
            {formData.image && (
              <div className="relative h-96 w-full mb-6 rounded-xl overflow-hidden">
                <Image
                  src={formData.image}
                  alt={formData.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Title and Meta */}
            <h1 className="text-3xl font-bold mb-4">
              {formData.title || "Untitled"}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-lilac/10 text-darckLilac text-sm rounded-full">
                {formData.category || "Category"}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(formData.date).toLocaleDateString()}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                {formData.authorImage && (
                  <Image
                    src={formData.authorImage}
                    alt={formData.author}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-medium">{formData.author}</p>
                <p className="text-sm text-gray-500">{formData.authorRole}</p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-lilac/5 p-4 rounded-lg mb-6">
              <p className="text-lg italic text-gray-700">
                {formData.excerpt || "No excerpt provided"}
              </p>
            </div>

            {/* Stats */}
            {formData.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {formData.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-lilac/10 to-darckLilac/5 p-4 rounded-lg text-center"
                  >
                    <p className="text-2xl font-bold text-darckLilac">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none mb-6">
              {formData.content || "No content provided"}
            </div>

            {/* Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Gallery */}
            {formData.gallery.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-32 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create News Article
            </h1>
            <p className="text-gray-600">
              Fill in the details to publish a new news article
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <Link
              href="/admin/dashboard/news"
              className="px-4 py-2 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Enter news title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Brief summary of the news"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      required
                      rows={10}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50 font-mono"
                      placeholder="Write your news content here..."
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
                      onChange={(e) =>
                        setCurrentStat({
                          ...currentStat,
                          label: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Stat label (e.g., 'Children Helped')"
                    />
                    <input
                      type="text"
                      value={currentStat.value}
                      onChange={(e) =>
                        setCurrentStat({
                          ...currentStat,
                          value: e.target.value,
                        })
                      }
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
                    {formData.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{stat.label}:</span>{" "}
                          {stat.value}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeStat(index)}
                          className="text-red-500 hover:text-red-700"
                        >
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Gallery Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "gallery")}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-24 rounded-lg overflow-hidden">
                          <Image
                            src={image.url}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
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
              {/* Publishing Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Publishing</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.postedTime}
                      onChange={(e) =>
                        setFormData({ ...formData, postedTime: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="rounded border-lilac/30 text-lilac focus:ring-lilac"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Mark as featured
                    </label>
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">Media</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "main")}
                      className="w-full"
                    />
                    {formData.image && (
                      <div className="relative h-32 w-full mt-2 rounded-lg overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Main"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "author")}
                      className="w-full"
                    />
                    {formData.authorImage && (
                      <div className="relative h-16 w-16 mt-2 rounded-full overflow-hidden">
                        <Image
                          src={formData.authorImage}
                          alt="Author"
                          fill
                          className="object-cover"
                        />
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
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      className="flex-1 px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-lilac/10 text-darckLilac rounded-lg hover:bg-lilac/20"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-lilac/10 text-darckLilac rounded-full"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20">
                <h2 className="text-lg font-semibold mb-4">
                  Author Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Role
                    </label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) =>
                        setFormData({ ...formData, authorRole: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-lilac/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/dashboard/news"
              className="px-6 py-3 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-lilac to-darckLilac text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish News"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && <PreviewModal />}
    </>
  );
}
