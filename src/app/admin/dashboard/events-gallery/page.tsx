"use client";

import { useState, useEffect, useRef } from "react";
import {
  ImageIcon,
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
  Loader2,
  ChevronDown,
  Calendar,
  Images,
  Upload,
  Star,
} from "lucide-react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import {
  useGetEventsQuery,
  useGetEventGalleryQuery,
  useSaveEventGalleryMutation,
  GalleryPhoto,
} from "@/store/api/eventsApi";

// ─── image compression ───────────────────────────────────────────────────────

async function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  photos,
  startIndex,
  title,
  onClose,
}: {
  photos: GalleryPhoto[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(false); }, [current]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && current > 0) setCurrent((c) => c - 1);
      if (e.key === "ArrowRight" && current < photos.length - 1) setCurrent((c) => c + 1);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [current, photos.length, onClose]);

  const photo = photos[current];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2"
      >
        <BsX className="w-6 h-6" />
      </button>

      <div
        className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 flex items-center justify-center">
          {current > 0 && (
            <button
              onClick={() => setCurrent((c) => c - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white/80 rounded-full p-3"
            >
              <BiChevronLeft className="w-6 h-6" />
            </button>
          )}
          {current < photos.length - 1 && (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white/80 rounded-full p-3"
            >
              <BiChevronRight className="w-6 h-6" />
            </button>
          )}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <img
            src={photo.url}
            alt={photo.description ?? ""}
            className={`max-w-full max-h-[70vh] object-contain rounded-xl transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div className="lg:w-80 bg-white/95 rounded-2xl p-4 overflow-y-auto space-y-4">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
            {photo.description && (
              <p className="text-sm text-gray-600 mt-1">{photo.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">{current + 1} / {photos.length}</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-xs font-medium text-gray-600 mb-2">All Photos</p>
            <div className="grid grid-cols-3 gap-1.5">
              {photos.map((p, i) => (
                <img
                  key={p.id}
                  src={p.url}
                  alt={p.description ?? ""}
                  onClick={() => setCurrent(i)}
                  className={`w-full h-16 object-cover rounded-lg cursor-pointer transition-all ${
                    i === current ? "ring-2 ring-lilac" : "opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── gallery manager (inner component, mounts after event is selected) ────────

function GalleryManager({ eventId, eventTitle }: { eventId: string; eventTitle: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: galleryData, isLoading: galleryLoading } = useGetEventGalleryQuery(eventId);
  const [saveGallery, { isLoading: isSaving }] = useSaveEventGalleryMutation();

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [dirty, setDirty] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");

  // prefill when DB data arrives
  useEffect(() => {
    if (galleryData) {
      setPhotos(Array.isArray(galleryData.photos) ? (galleryData.photos as GalleryPhoto[]) : []);
      setDirty(false);
    }
  }, [galleryData]);

  // ── upload ────────────────────────────────────────────────────────────────
  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const added: GalleryPhoto[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const url = await compressImage(file);
        added.push({ id: uid(), url, description: "" });
      } catch { /* skip */ }
    }
    if (added.length) { setPhotos((p) => [...p, ...added]); setDirty(true); }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── photo actions ─────────────────────────────────────────────────────────
  function deletePhoto(id: string) { setPhotos((p) => p.filter((x) => x.id !== id)); setDirty(true); }

  function setCover(id: string) {
    setPhotos((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx <= 0) return prev;
      const arr = [...prev];
      const [item] = arr.splice(idx, 1);
      return [item, ...arr];
    });
    setDirty(true);
  }

  function startEdit(photo: GalleryPhoto) { setEditingId(photo.id); setEditCaption(photo.description ?? ""); }

  function saveCaption(id: string) {
    setPhotos((p) => p.map((x) => x.id === id ? { ...x, description: editCaption } : x));
    setEditingId(null);
    setDirty(true);
  }

  // ── save to DB ────────────────────────────────────────────────────────────
  async function handleSave() {
    await saveGallery({ eventId, photos });
    setDirty(false);
  }

  if (galleryLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-7 h-7 animate-spin text-lilac" />
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-lilac/20 p-5 space-y-5">
      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-semibold text-gray-800">{eventTitle}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            First photo is the album cover · {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lilac to-darckLilac text-white text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {isSaving ? "Saving…" : "Save Gallery"}
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-lilac/40 text-darckLilac text-sm rounded-xl hover:bg-lilac/5 transition-all disabled:opacity-60"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading…" : "Upload Photos"}
          </button>
        </div>
      </div>

      {/* empty drop zone */}
      {photos.length === 0 && !uploading && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-lilac/40 rounded-xl py-16 flex flex-col items-center gap-3 text-gray-400 hover:border-lilac hover:text-lilac/70 transition-colors"
        >
          <Upload className="w-10 h-10 opacity-60" />
          <span className="text-sm font-medium">Click to upload photos</span>
          <span className="text-xs">JPG, PNG, WebP · multiple files supported</span>
        </button>
      )}

      {/* photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden border border-lilac/20 bg-gray-100"
            >
              <div className="aspect-square cursor-pointer" onClick={() => setPreviewIndex(index)}>
                <img
                  src={photo.url}
                  alt={photo.description ?? ""}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 pointer-events-none" />

              {/* cover badge */}
              {index === 0 ? (
                <div className="absolute top-1.5 left-1.5">
                  <span className="flex items-center gap-1 bg-darckLilac text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    <Star className="w-2.5 h-2.5" /> Cover
                  </span>
                </div>
              ) : (
                <div className="absolute top-1.5 left-1.5">
                  <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {index + 1}
                  </span>
                </div>
              )}

              {/* action buttons */}
              <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {index !== 0 && (
                  <button
                    onClick={() => setCover(photo.id)}
                    className="p-1.5 bg-white/90 hover:bg-darckLilac hover:text-white rounded-lg text-gray-700 shadow-sm transition-colors"
                    title="Set as cover"
                  >
                    <Star className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => startEdit(photo)}
                  className="p-1.5 bg-white/90 hover:bg-white rounded-lg text-gray-700 shadow-sm"
                  title="Edit caption"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="p-1.5 bg-red-50/90 hover:bg-red-100 rounded-lg text-red-600 shadow-sm"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              {/* inline caption editor */}
              {editingId === photo.id ? (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-white/95 p-2 flex gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    autoFocus
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveCaption(photo.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    placeholder="Add caption…"
                    className="flex-1 text-xs border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-lilac min-w-0"
                  />
                  <button onClick={() => saveCaption(photo.id)} className="p-1 bg-darckLilac text-white rounded">
                    <Check className="w-3 h-3" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1 bg-gray-100 text-gray-600 rounded">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : photo.description ? (
                <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <p className="text-white text-[10px] truncate">{photo.description}</p>
                </div>
              ) : null}
            </div>
          ))}

          {/* add more tile */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-xl border-2 border-dashed border-lilac/30 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-lilac hover:text-lilac transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Plus className="w-6 h-6" /><span className="text-xs">Add more</span></>}
          </button>
        </div>
      )}

      {/* unsaved bar */}
      {dirty && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-sm text-amber-700">You have unsaved changes.</p>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-lg transition-colors disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            {isSaving ? "Saving…" : "Save Now"}
          </button>
        </div>
      )}

      {/* lightbox */}
      {previewIndex !== null && (
        <Lightbox
          photos={photos}
          startIndex={previewIndex}
          title={eventTitle}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function EventsGalleryPage() {
  const { data: events = [], isLoading: eventsLoading } = useGetEventsQuery();
  const [selectedEventId, setSelectedEventId] = useState("");

  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? null;

  if (eventsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-lilac" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events Gallery</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload and manage photo albums for each event
        </p>
      </div>

      {/* event selector */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-lilac/20">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Event
        </label>
        <div className="relative max-w-md">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-lilac appearance-none"
          >
            <option value="">— Choose an event —</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title} · {ev.date}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {selectedEvent && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <Images className="w-4 h-4 text-lilac flex-shrink-0" />
            <span>
              Album: <span className="font-medium text-gray-800">{selectedEvent.title}</span>
            </span>
          </div>
        )}
      </div>

      {/* gallery manager (mounted only when an event is selected — triggers its own fetch) */}
      {!selectedEventId ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white/40 rounded-2xl border border-dashed border-lilac/30">
          <ImageIcon className="w-14 h-14 opacity-30 mb-3" />
          <p className="text-sm">Select an event above to manage its gallery</p>
        </div>
      ) : (
        <GalleryManager
          key={selectedEventId}
          eventId={selectedEventId}
          eventTitle={selectedEvent?.title ?? ""}
        />
      )}
    </div>
  );
}
