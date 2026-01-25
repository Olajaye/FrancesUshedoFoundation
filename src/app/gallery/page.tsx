"use client";

import { PagesHero } from "@/components/hearderCom/hearder";
import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsX } from "react-icons/bs";

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}
interface PhotoModalProps {
  album: Album;
  selectedPhoto: Photo;
  onClose: () => void;
  onPhotoSelect: (photo: Photo) => void;
}

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  photographer: string;
}

interface Album {
  id: string;
  name: string;
  description: string;
  coverPhoto: Photo;
  photos: Photo[];
}

const albums: Album[] = [
  {
    id: "1",
    name: "Visit to Kano",
    description: `This visit was a reminder that even in the face of hardship, kindness can light the way forward. I left Kano with a heart full of gratitude and a renewed commitment to serving those in need.
  `,
    coverPhoto: {
      id: "1",
      url: "/home/picture2.jpg",
      thumbnail: "/home/picture2.jpg",
      title: "Mountain Landscape",
      description: "Breathtaking mountain vista with misty peaks",
      category: "nature",
      tags: ["mountains", "landscape", "mist", "scenic"],
      photographer: "James Wheeler",
    },
    photos: [
      {
        id: "1",
        url: "/home/picture2.jpg",
        thumbnail: "/home/picture2.jpg",
        title: "Mountain Landscape",
        description: "Breathtaking mountain vista with misty peaks",
        category: "nature",
        tags: ["mountains", "landscape", "mist", "scenic"],
        photographer: "James Wheeler",
      },
      {
        id: "3",
        url: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        thumbnail:
          "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
        title: "Ocean Waves",
        description: "Powerful ocean waves crashing against rocks",
        category: "nature",
        tags: ["ocean", "waves", "water", "coastal"],
        photographer: "Matt Hardy",
      },
      {
        id: "5",
        url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        thumbnail:
          "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
        title: "Forest Path",
        description: "Serene forest pathway with dappled sunlight",
        category: "nature",
        tags: ["forest", "path", "trees", "sunlight"],
        photographer: "Valiphotos",
      },
    ],
  },
  {
    id: "2",
    name: "Urban Exploration",
    description: ` 
    This visit was a reminder that even in the face of hardship, kindness can light the way forward. I left Kano with a heart full of gratitude and a renewed commitment to serving those in need.
  `,
    coverPhoto: {
      id: "2",
      url: "/home/tryout3.png",
      thumbnail: "/home/tryout3.png",
      title: "City Architecture",
      description: "Modern urban architecture with glass and steel",
      category: "architecture",
      tags: ["city", "building", "modern", "urban"],
      photographer: "Expect Best",
    },
    photos: [
      {
        id: "2",
        url: "/home/tryout3.png",
        thumbnail: "/home/tryout3.png",
        title: "City Architecture",
        description: "Modern urban architecture with glass and steel",
        category: "architecture",
        tags: ["city", "building", "modern", "urban"],
        photographer: "Expect Best",
      },
      {
        id: "4",
        url: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        thumbnail:
          "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
        title: "Urban Street",
        description: "Vibrant city street with neon lights",
        category: "urban",
        tags: ["street", "neon", "night", "city"],
        photographer: "Aleksandar Pasaric",
      },
      {
        id: "8",
        url: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        thumbnail:
          "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
        title: "City Skyline",
        description: "Impressive city skyline at twilight",
        category: "urban",
        tags: ["skyline", "city", "twilight", "buildings"],
        photographer: "Pixabay",
      },
    ],
  },
];

const page = () => {
  return (
    <>
      <PagesHero img={"/portfolio/picture1.jpg"} title={"Gallery"} />

      <section className="container px-4 mx-auto py-12">
        <PhotoGallery />
      </section>
    </>
  );
};

export default page;

const PhotoGallery: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setSelectedPhoto(album.coverPhoto);
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    setSelectedPhoto(null);
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {albums.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {albums.map((album) => (
              <div key={album.id} className="aspect-square">
                <AlbumCard
                  album={album}
                  onClick={() => handleAlbumClick(album)}
                />
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No albums found
            </h3>
            <p className="text-gray-600">
              Try adding some albums to your portfolio.
            </p>
          </div>
        )}

        {selectedAlbum && selectedPhoto && (
          <PhotoModal
            album={selectedAlbum}
            selectedPhoto={selectedPhoto}
            onClose={handleCloseModal}
            onPhotoSelect={setSelectedPhoto}
          />
        )}
      </div>
    </div>
  );
};

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-white h-[280px]"
      onClick={onClick}
    >
      <div className="relative h-full overflow-hidden">
        <img
          src={album.coverPhoto.thumbnail}
          alt={album.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-lilac transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="h-[80px] flex flex-col justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1 truncate">
                {album.name}
              </h3>
              <p className="text-white/90 text-sm mb-2">
                {album.photos.length} photos
              </p>
            </div>
            <p className="text-white/80 text-sm line-clamp-2">
              {album.description.slice(0, 60)}
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
};

const PhotoModal: React.FC<PhotoModalProps> = ({
  album,
  selectedPhoto,
  onClose,
  onPhotoSelect,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentIndex = album.photos.findIndex((p) => p.id === selectedPhoto.id);
  const canGoNext = currentIndex < album.photos.length - 1;
  const canGoPrev = currentIndex > 0;

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && canGoPrev) {
      onPhotoSelect(album.photos[currentIndex - 1]);
    } else if (direction === "next" && canGoNext) {
      onPhotoSelect(album.photos[currentIndex + 1]);
    }
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [selectedPhoto.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canGoPrev) handleNavigate("prev");
      if (e.key === "ArrowRight" && canGoNext) handleNavigate("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handleNavigate, canGoPrev, canGoNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 999 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors duration-200 bg-black hover:bg-black/50 rounded-full p-2 backdrop-blur-sm"
      >
        <BsX className="w-6 h-6" />
      </button>

      {canGoPrev && (
        <button
          onClick={() => handleNavigate("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-black/80 hover:text-black transition-colors duration-200 bg-white hover:bg-white/50 rounded-full p-3 backdrop-blur-sm"
        >
          <BiChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canGoNext && (
        <button
          onClick={() => handleNavigate("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-black/80 hover:text-black transition-colors duration-200 bg-white hover:bg-white/50 rounded-full p-3 backdrop-blur-sm"
        >
          <BiChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="w-full container mx-auto flex flex-col lg:flex-row gap-6 max-h-[90vh]">
        <div className="flex-1 flex items-center justify-center relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className={`max-w-full max-h-[70vh] object-contain rounded-lg transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="lg:w-96 bg-white/95 backdrop-blur-sm rounded-2xl p-3 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {album.name}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Album Photos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {album.photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.thumbnail}
                    alt={photo.title}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer ${
                      photo.id === selectedPhoto.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => onPhotoSelect(photo)}
                  />
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3 text-justify">
                {album.description}
              </div>
            </div>

            <div className="border-t pt-4">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Donate to this Outreach
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
