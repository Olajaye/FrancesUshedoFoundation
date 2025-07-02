"use client";

import React, { useState,  useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
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

// New Album interface
export interface Album {
  id: string;
  name: string;
  description: string;
  coverPhoto: Photo; // Photo to represent the album
  photos: Photo[];
}

// Sample albums data (grouping existing photos)
const albums: Album[] = [
  {
    id: "1",
    name: "Visit to Kano",
    description: `
    Last month, I had the privilege of joining a charity organization on a visit to Kano, Nigeria’s second-largest city, known for its rich culture and bustling economy. The goal of our visit was to provide support to underprivileged communities, particularly orphans and widows, through food donations, educational materials, and medical outreach.  

    Our journey began early in the morning as we loaded two trucks with bags of rice, beans, cooking oil, notebooks, and medical supplies. The excitement among our team was palpable, knowing we were about to make a meaningful impact. Upon arrival in Kano, we were warmly welcomed by local volunteers who guided us to a small community on the outskirts of the city.  

    The first stop was an orphanage housing over 50 children. The sight of their bright smiles despite their hardships was both heartwarming and humbling. We distributed food items, school supplies, and toys, while a team of volunteer doctors conducted health checks. The children sang and danced in appreciation, their joy filling the air. One little girl, Aisha, clung to a new notebook like a treasure, whispering, *“Now I can write my stories.”* Her words reminded me of the power of small gestures.  

    Next, we visited a widow’s cooperative where dozens of women gathered to receive food packs and sewing machines donated by our organization. Many of these women, left to fend for their families alone, expressed deep gratitude. Hajiya Fatima, the group’s leader, thanked us tearfully, saying, *“This will help us feed our children and learn skills to earn a living.”*  

    Before leaving, we stopped at a local primary school with crumbling walls and few resources. We handed out books, pencils, and uniforms to eager pupils. The headmaster, Mallam Yusuf, explained how many children struggled to attend school due to poverty. “Education is their only hope,” he said, urging us to continue supporting them.  

    As we drove back, I reflected on the day’s events. Though our contributions were modest, they brought immediate relief and hope to many. Kano’s resilience and warmth left a lasting impression on me. The trip reinforced the belief that charity is not just about giving but also about connecting, understanding, and inspiring change—one community at a time.  

    This visit was a reminder that even in the face of hardship, kindness can light the way forward. I left Kano with a heart full of gratitude and a renewed commitment to serving those in need.
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
      width: 1260,
      height: 750,
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
    ],
  },
  {
    id: "2",
    name: "Urban Exploration",
    description: `
    Last month, I had the privilege of joining a charity organization on a visit to Kano, Nigeria’s second-largest city, known for its rich culture and bustling economy. The goal of our visit was to provide support to underprivileged communities, particularly orphans and widows, through food donations, educational materials, and medical outreach.  

    Our journey began early in the morning as we loaded two trucks with bags of rice, beans, cooking oil, notebooks, and medical supplies. The excitement among our team was palpable, knowing we were about to make a meaningful impact. Upon arrival in Kano, we were warmly welcomed by local volunteers who guided us to a small community on the outskirts of the city.  

    The first stop was an orphanage housing over 50 children. The sight of their bright smiles despite their hardships was both heartwarming and humbling. We distributed food items, school supplies, and toys, while a team of volunteer doctors conducted health checks. The children sang and danced in appreciation, their joy filling the air. One little girl, Aisha, clung to a new notebook like a treasure, whispering, *“Now I can write my stories.”* Her words reminded me of the power of small gestures.  

    Next, we visited a widow’s cooperative where dozens of women gathered to receive food packs and sewing machines donated by our organization. Many of these women, left to fend for their families alone, expressed deep gratitude. Hajiya Fatima, the group’s leader, thanked us tearfully, saying, *“This will help us feed our children and learn skills to earn a living.”*  

    Before leaving, we stopped at a local primary school with crumbling walls and few resources. We handed out books, pencils, and uniforms to eager pupils. The headmaster, Mallam Yusuf, explained how many children struggled to attend school due to poverty. “Education is their only hope,” he said, urging us to continue supporting them.  

    As we drove back, I reflected on the day’s events. Though our contributions were modest, they brought immediate relief and hope to many. Kano’s resilience and warmth left a lasting impression on me. The trip reinforced the belief that charity is not just about giving but also about connecting, understanding, and inspiring change—one community at a time.  

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
      width: 1260,
      height: 750,
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
    ],
  },
  // Add more albums as needed
];

const page = () => {
  return (
    <>
      <section className="bg-portfoilio bg-cover h-[35vh] py-12 bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-start text-white px-4"
          style={{ zIndex: 899 }}
        >
          <div className="container mx-auto px-6">
            <div>
              <h2 className="text-6xl font-montserrat font-semibold text-start">
                Portfolio
              </h2>
              <div className="w-[100px] h-2 bg-darckLilac"></div>
            </div>
          </div>
        </div>
      </section>

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
    setSelectedPhoto(album.coverPhoto); // Default to cover photo
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    setSelectedPhoto(null);
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {albums.length > 0 ? (
          // //sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
          <div className="grid grid-cols-3 gap-6"> 
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

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-white"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={album.coverPhoto.thumbnail}
          alt={album.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-lg mb-1 truncate">
            {album.name}
          </h3>
          <p className="text-white/90 text-sm mb-2 line-clamp-2">
            {album.photos.length} photos
          </p>
        </div>
      </div>
      {/* <h3 className="text-xl text-dark text">{album.description}</h3> */}
    </div>
  );
};

interface PhotoModalProps {
  album: Album;
  selectedPhoto: Photo;
  onClose: () => void;
  onPhotoSelect: (photo: Photo) => void;
}

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

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 max-h-[90vh]">
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

        <div className="lg:w-80 bg-white/95 backdrop-blur-sm rounded-2xl p-6 overflow-y-auto">
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
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Photographer</span>
                <span className="font-medium text-gray-900">
                  {selectedPhoto.photographer}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Category</span>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {selectedPhoto.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Dimensions</span>
                <span className="text-sm text-gray-900">
                  {selectedPhoto.width} × {selectedPhoto.height}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPhoto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
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
