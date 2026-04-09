"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, X, Loader2, Eye, Upload, ImageIcon, UserCircle2, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useCreateNewsMutation } from "@/store/api/newsApi";

interface Stat {
  label: string;
  value: string;
}

interface GalleryImage {
  url: string;
  file?: File;
}

function ImageUploadZone({
  label,
  value,
  onChange,
  onRemove,
  shape = "rectangle",
  hint,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  shape?: "rectangle" | "circle";
  hint?: string;
}) {
  const isCircle = shape === "circle";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className={`relative group ${isCircle ? "w-20 h-20" : "w-full h-40"}`}>
          <div className={`relative w-full h-full overflow-hidden bg-gray-100 ${isCircle ? "rounded-full" : "rounded-xl"}`}>
            <Image src={value} alt={label} fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <label className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isCircle ? "rounded-full" : "rounded-xl"}`}>
            <Upload className="w-5 h-5 text-white" />
            <input type="file" accept="image/*" onChange={onChange} className="hidden" />
          </label>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center border-2 border-dashed border-lilac/30 bg-lilac/5 hover:bg-lilac/10 hover:border-lilac/50 transition-colors cursor-pointer ${isCircle ? "w-20 h-20 rounded-full" : "w-full h-40 rounded-xl"}`}>
          <div className="flex flex-col items-center gap-2 text-center p-4">
            {isCircle ? (
              <UserCircle2 className="w-8 h-8 text-lilac/50" />
            ) : (
              <>
                <div className="p-2 bg-lilac/10 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-darckLilac" />
                </div>
                <p className="text-sm font-medium text-gray-600">Click to upload</p>
                {hint && <p className="text-xs text-gray-400">{hint}</p>}
              </>
            )}
          </div>
          <input type="file" accept="image/*" onChange={onChange} className="hidden" />
        </label>
      )}
    </div>
  );
}

export default function CreateNewsPage() {
  const router = useRouter();
  const [createNews, { isLoading, error }] = useCreateNewsMutation();
  const [showPreview, setShowPreview] = useState(false);
  const [submitError, setSubmitError] = useState("");
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
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === "gallery") {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, { url: reader.result as string, file }],
          }));
        };
        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "main") {
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
        } else {
          setFormData((prev) => ({ ...prev, authorImage: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tagToRemove) });
  };

  const addStat = () => {
    if (currentStat.label.trim() && currentStat.value.trim()) {
      setFormData({ ...formData, stats: [...formData.stats, currentStat] });
      setCurrentStat({ label: "", value: "" });
    }
  };

  const removeStat = (index: number) => {
    setFormData({ ...formData, stats: formData.stats.filter((_, i) => i !== index) });
  };

  const removeGalleryImage = (index: number) => {
    setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await createNews({
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
          : "Failed to create news. Please try again.";
      setSubmitError(message || "Failed to create news.");
    }
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="relative bg-white max-w-4xl mx-auto rounded-xl shadow-xl">
          <div className="sticky top-0 bg-white border-b border-lilac/20 p-4 flex items-center justify-between rounded-t-xl">
            <h2 className="text-xl font-bold">News Preview</h2>
            <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg">
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
              <span className="text-sm text-gray-500">{new Date(formData.date).toLocaleDateString()}</span>
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
              <p className="text-lg italic text-gray-700">{formData.excerpt || "No excerpt provided"}</p>
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
            <div className="prose max-w-none mb-6">{formData.content || "No content provided"}</div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">#{tag}</span>
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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create News Article</h1>
            <p className="text-sm text-gray-500 mt-0.5">Fill in the details to publish a new article</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 border border-lilac/30 rounded-xl hover:bg-lilac/10 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <Link
              href="/admin/dashboard/news"
              className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Error banner */}
        {(submitError || error) && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {submitError || "Something went wrong. Please try again."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Main column ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Basic Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-5">
                <h2 className="text-base font-semibold text-gray-800">Basic Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent placeholder:text-gray-400"
                    placeholder="Enter a compelling title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent placeholder:text-gray-400 resize-none"
                    placeholder="Brief summary shown in news listings…"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Content *</label>
                  <textarea
                    required
                    rows={12}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent placeholder:text-gray-400 font-mono leading-relaxed"
                    placeholder="Write your full article here…"
                  />
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-darckLilac" />
                  <h2 className="text-base font-semibold text-gray-800">Statistics</h2>
                </div>

                {/* Add stat row */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={currentStat.label}
                      onChange={(e) => setCurrentStat({ ...currentStat, label: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent placeholder:text-gray-400"
                      placeholder="Label (e.g. Children Helped)"
                    />
                  </div>
                  <div className="w-28">
                    <input
                      type="text"
                      value={currentStat.value}
                      onChange={(e) => setCurrentStat({ ...currentStat, value: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addStat())}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent placeholder:text-gray-400"
                      placeholder="Value"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addStat}
                    className="px-4 py-2.5 bg-darckLilac text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Add stat
                  </button>
                </div>

                {/* Stat cards */}
                {formData.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.stats.map((stat, i) => (
                      <div key={i} className="relative group flex flex-col items-center justify-center bg-gradient-to-br from-lilac/10 to-darckLilac/5 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-darckLilac">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                        <button
                          type="button"
                          onClick={() => removeStat(i)}
                          className="absolute top-1.5 right-1.5 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {formData.stats.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No statistics added yet</p>
                )}
              </div>

              {/* Gallery */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-4">
                <h2 className="text-base font-semibold text-gray-800">Gallery Images</h2>

                {/* Dropzone */}
                <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-lilac/30 bg-lilac/5 hover:bg-lilac/10 hover:border-lilac/50 transition-colors rounded-xl p-8 cursor-pointer">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-lilac/20">
                    <Upload className="w-6 h-6 text-darckLilac" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Click to upload images</p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP — multiple allowed</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "gallery")}
                    className="hidden"
                  />
                </label>

                {/* Thumbnails */}
                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {formData.gallery.map((image, i) => (
                      <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <Image src={image.url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Publishing */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-4">
                <h2 className="text-base font-semibold text-gray-800">Publishing</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent bg-white"
                  >
                    <option value="">Select category</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Event">Event</option>
                    <option value="Impact Story">Impact Story</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Blog">Blog</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                    <input
                      type="time"
                      value={formData.postedTime}
                      onChange={(e) => setFormData({ ...formData, postedTime: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Featured toggle */}
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-lilac/5 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Featured article</p>
                    <p className="text-xs text-gray-400">Highlighted on the homepage</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-checked:bg-darckLilac rounded-full transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                  </div>
                </label>
              </div>

              {/* Media */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-5">
                <h2 className="text-base font-semibold text-gray-800">Media</h2>

                <ImageUploadZone
                  label="Main Image"
                  value={formData.image}
                  onChange={(e) => handleImageUpload(e, "main")}
                  onRemove={() => setFormData({ ...formData, image: "" })}
                  hint="Recommended: 1200 × 630px"
                />
              </div>

              {/* Author */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-4">
                <h2 className="text-base font-semibold text-gray-800">Author</h2>

                {/* Avatar + fields side by side */}
                <div className="flex gap-4 items-start">
                  <ImageUploadZone
                    label=""
                    value={formData.authorImage}
                    onChange={(e) => handleImageUpload(e, "author")}
                    onRemove={() => setFormData({ ...formData, authorImage: "" })}
                    shape="circle"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent"
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                      <input
                        type="text"
                        value={formData.authorRole}
                        onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent"
                        placeholder="e.g. Communications Director"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-lilac/20 space-y-3">
                <h2 className="text-base font-semibold text-gray-800">Tags</h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lilac/40 focus:border-transparent placeholder:text-gray-400"
                    placeholder="Type a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="p-2.5 bg-darckLilac text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {formData.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-lilac/10 text-darckLilac text-xs font-medium rounded-full"
                      >
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No tags added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit row */}
          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/admin/dashboard/news"
              className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-lilac to-darckLilac text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing…
                </>
              ) : (
                "Publish Article"
              )}
            </button>
          </div>
        </form>
      </div>

      {showPreview && <PreviewModal />}
    </>
  );
}