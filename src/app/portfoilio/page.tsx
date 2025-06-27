"use client";
// import Gallery from "@/components/Gallery/Gallery";

import React, { useState, useMemo, useEffect } from "react";

import {
  BiChevronLeft,
  BiChevronRight,
  // BiDownload,
  // BiHeart,
} from "react-icons/bi";
import { BsX } from "react-icons/bs";

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  photographer: string;
  width: number;
  height: number;
}
export interface SearchFilters {
  query: string;
  category: string;
  tag: string;
}

const photos: Photo[] = [
  {
    id: "1",
    url: "/home/picture2.jpg",
    thumbnail: "/home/picture2.jpg",
    title: "Mountain Landscape",
    description: "Breathtaking mountain vista with misty peaks",
    category: "nature",
    tags: ["mountains", "landscape", "mist", "scenic"],
    photographer: "James Wheeler",
    width: 1260,
    height: 750,
  },
  {
    id: "2",
    url: "/home/tryout3.png",
    thumbnail: "/home/tryout3.png",
    title: "City Architecture",
    description: "Modern urban architecture with glass and steel",
    category: "architecture",
    tags: ["city", "building", "modern", "urban"],
    photographer: "Expect Best",
    width: 1260,
    height: 750,
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
    width: 1260,
    height: 750,
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
    width: 1260,
    height: 750,
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
    width: 1260,
    height: 750,
  },
  {
    id: "6",
    url: "https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    title: "Modern Office",
    description: "Contemporary office space with clean lines",
    category: "architecture",
    tags: ["office", "interior", "modern", "design"],
    photographer: "Maxvacuum",
    width: 1260,
    height: 750,
  },
  {
    id: "7",
    url: "https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    title: "Sunset Beach",
    description: "Golden sunset over pristine beach",
    category: "nature",
    tags: ["beach", "sunset", "golden", "peaceful"],
    photographer: "Jess Loiterton",
    width: 1260,
    height: 750,
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
    width: 1260,
    height: 750,
  },
  {
    id: "9",
    url: "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    title: "Mountain Lake",
    description: "Crystal clear mountain lake reflection",
    category: "nature",
    tags: ["lake", "mountains", "reflection", "pristine"],
    photographer: "Simon Berger",
    width: 1260,
    height: 750,
  },
  {
    id: "10",
    url: "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    title: "Modern Bridge",
    description: "Architectural marvel spanning the city",
    category: "architecture",
    tags: ["bridge", "architecture", "engineering", "urban"],
    photographer: "Pixabay",
    width: 1260,
    height: 750,
  },
  {
    id: "11",
    url: "https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    title: "Desert Dunes",
    description: "Majestic sand dunes in golden light",
    category: "nature",
    tags: ["desert", "dunes", "sand", "arid"],
    photographer: "Walid Ahmad",
    width: 1260,
    height: 750,
  },
  {
    id: "12",
    url: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
    title: "Night Market",
    description: "Bustling night market with vibrant colors",
    category: "urban",
    tags: ["market", "night", "street", "vibrant"],
    photographer: "Aleksandar Pasaric",
    width: 1260,
    height: 750,
  },
];

const page = () => {
  return (
    <>
      <section className="bg-portfoilio bg-cover h-[45vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 899 }}
        >
          <div className="container mx-auto px-6 ">
            <div>
              <h2 className="text-6xl font-serif text-start">Portfoilio</h2>
              <div className="w-[100px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 mx-auto py-12">
        {/* <Gallery /> */}
        <PhotoGallery />
      </section>
    </>
  );
};

export default page;

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    tag: "",
  });

  if (false) {
    setFilters({
      query: "",
      category: "",
      tag: "",
    });
  }

  // Extract unique categories and tags
  // const categories = useMemo(() => {
  //   const cats = new Set(photos.map((photo) => photo.category));
  //   return Array.from(cats).sort();
  // }, []);

  // const tags = useMemo(() => {
  //   const allTags = photos.flatMap((photo) => photo.tags);
  //   const uniqueTags = new Set(allTags);
  //   return Array.from(uniqueTags).sort();
  // }, []);

  // Filter photos based on search criteria
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesQuery =
        !filters.query ||
        photo.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        photo.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        photo.photographer.toLowerCase().includes(filters.query.toLowerCase());

      const matchesCategory =
        !filters.category || photo.category === filters.category;
      const matchesTag = !filters.tag || photo.tags.includes(filters.tag);

      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [filters]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;

    const currentIndex = filteredPhotos.findIndex(
      (p) => p.id === selectedPhoto.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex =
        currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="aspect-square">
                <PhotoCard
                  photo={photo}
                  onClick={() => handlePhotoClick(photo)}
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
              No photos found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria to find more photos.
            </p>
          </div>
        )}

        {/* Modal */}
        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            photos={filteredPhotos}
            onClose={handleCloseModal}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
};

interface PhotoModalProps {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // const [liked, setLiked] = useState(false);

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const canGoNext = currentIndex < photos.length - 1;
  const canGoPrev = currentIndex > 0;

  useEffect(() => {
    setImageLoaded(false);
  }, [photo.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canGoPrev) onNavigate("prev");
      if (e.key === "ArrowRight" && canGoNext) onNavigate("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate, canGoPrev, canGoNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 999 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors duration-200 bg-black/30 hover:bg-black/50 rounded-full p-2 backdrop-blur-sm"
      >
        <BsX className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      {canGoPrev && (
        <button
          onClick={() => onNavigate("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200 bg-black/30 hover:bg-black/50 rounded-full p-3 backdrop-blur-sm"
        >
          <BiChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canGoNext && (
        <button
          onClick={() => onNavigate("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200 bg-black/30 hover:bg-black/50 rounded-full p-3 backdrop-blur-sm"
        >
          <BiChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 max-h-[90vh]">
        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={photo.url}
            alt={photo.title}
            className={`max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 bg-white/95 backdrop-blur-sm rounded-2xl p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {/* {photo.title} */}
                Vist to Kano
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {/* {photo.description} */}
                description of the outreach at Kano
              </p>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Photographer</span>
                <span className="font-medium text-gray-900">
                  {photo.photographer}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Category</span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {photo.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Dimensions</span>
                <span className="text-sm text-gray-900">
                  {photo.width} × {photo.height}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 flex gap-3">
              {/* <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  liked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <BiHeart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {liked ? "Liked" : "Like"}
              </button> */}
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                {/* <BiDownload className="w-4 h-4" /> */}
                Donate to this Out react
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-white"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={photo.thumbnail}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-lg mb-1 truncate">
            {photo.title}
          </h3>
          <p className="text-white/90 text-sm mb-2 line-clamp-2">
            {photo.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs">
              by {photo.photographer}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {photo.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
