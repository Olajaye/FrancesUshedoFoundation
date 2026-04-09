"use client";

import Footer from "@/components/Footer/Footer";
import { PagesHero } from "@/components/hearderCom/hearder";
import { Navbar } from "@/components/Navbar/Navbar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsX } from "react-icons/bs";

// ─── types ───────────────────────────────────────────────────────────────────

interface Photo {
  id: string;
  url: string;
  description?: string;
}

interface Album {
  id: string;
  name: string;
  description: string;
  coverPhoto: Photo;
  photos: Photo[];
}

// ─── sub-components ──────────────────────────────────────────────────────────

const AlbumCard: React.FC<{ album: Album; onClick: () => void }> = ({
  album,
  onClick,
}) => (
  <div
    className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-white h-[280px]"
    onClick={onClick}
  >
    <div className="relative h-full overflow-hidden">
      <img
        src={album.coverPhoto.url}
        alt={album.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-lilac transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="h-[80px] flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1 truncate">
              {album.name}
            </h3>
            <p className="text-white/90 text-sm mb-2">
              {album.photos.length} photos
            </p>
          </div>
          <p className="text-white/80 text-sm truncate line-clamp-2">
            {album.description.slice(0, 40)}…
          </p>
        </div>
      </div>

      <div className="absolute top-3 left-3">
        <span className="bg-lilac/90 text-white text-xs font-medium px-2 py-1 rounded-full">
          {album.photos.length} photos
        </span>
      </div>
    </div>
  </div>
);

const PhotoModal: React.FC<{
  album: Album;
  selectedPhoto: Photo;
  onClose: () => void;
  onPhotoSelect: (photo: Photo) => void;
}> = ({ album, selectedPhoto, onClose, onPhotoSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentIndex = album.photos.findIndex((p) => p.id === selectedPhoto.id);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < album.photos.length - 1;

  const navigate = (dir: "prev" | "next") => {
    if (dir === "prev" && canGoPrev) onPhotoSelect(album.photos[currentIndex - 1]);
    if (dir === "next" && canGoNext) onPhotoSelect(album.photos[currentIndex + 1]);
  };

  useEffect(() => { setImageLoaded(false); }, [selectedPhoto.id]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 999 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black hover:bg-black/50 rounded-full p-2 backdrop-blur-sm"
      >
        <BsX className="w-6 h-6" />
      </button>

      <div className="w-full container mx-auto flex flex-col lg:flex-row gap-6 max-h-[90vh]">
        <div className="relative flex-1">
          {canGoPrev && (
            <button
              onClick={() => navigate("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white/50 rounded-full p-3 backdrop-blur-sm"
            >
              <BiChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canGoNext && (
            <button
              onClick={() => navigate("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white/50 rounded-full p-3 backdrop-blur-sm"
            >
              <BiChevronRight className="w-6 h-6" />
            </button>
          )}
          <div className="flex-1 flex items-center justify-center relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.description ?? ""}
              className={`max-w-full max-h-[70vh] object-contain rounded-lg transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

        <div className="lg:w-96 bg-white/95 backdrop-blur-sm rounded-2xl p-3 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{album.name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {selectedPhoto.description || album.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Album Photos</h3>
              <div className="grid grid-cols-2 gap-2">
                {album.photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={photo.description ?? ""}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer ${
                      photo.id === selectedPhoto.id ? "ring-2 ring-lilac" : ""
                    }`}
                    onClick={() => onPhotoSelect(photo)}
                  />
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-justify text-sm text-gray-600">{album.description}</p>
            </div>

            <div className="border-t pt-4">
              <Link
                href="/donate"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-darckLilac text-white rounded-lg hover:bg-lilac transition-colors duration-200"
              >
                Donate to this Outreach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── gallery ──────────────────────────────────────────────────────────────────

const PhotoGallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("failed");
        const json: Array<{
          id: string;
          eventId: string;
          title: string;
          description: string;
          photos: Photo[];
        }> = await res.json();

        // /api/gallery already filters empty galleries and joins event data
        const built: Album[] = json.map((g) => ({
          id: g.eventId,
          name: g.title,
          description: g.description,
          coverPhoto: g.photos[0],
          photos: g.photos,
        }));

        setAlbums(built);
      } catch {
        // silently fail — show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setSelectedPhoto(album.coverPhoto);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-lilac/30 border-t-lilac rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {albums.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {albums.map((album) => (
            <div key={album.id} className="aspect-square">
              <AlbumCard album={album} onClick={() => openAlbum(album)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No albums yet</h3>
          <p className="text-gray-600">
            Check back soon — event galleries will appear here.
          </p>
        </div>
      )}

      {selectedAlbum && selectedPhoto && (
        <PhotoModal
          album={selectedAlbum}
          selectedPhoto={selectedPhoto}
          onClose={closeModal}
          onPhotoSelect={setSelectedPhoto}
        />
      )}
    </div>
  );
};

// ─── page ─────────────────────────────────────────────────────────────────────

const GalleryPage = () => (
  <>
    <Navbar />
    <PagesHero img="/portfolio/picture1.jpg" title="Gallery" />
    <section className="container px-4 mx-auto py-12">
      <PhotoGallery />
    </section>
    <Footer />
  </>
);

export default GalleryPage;
