import GalleryImage from './GalleryImage';

function Gallery() {
  const images = [
    { src: '/junks/IMG_2792.JPG', alt: 'Nature', caption: 'Beautiful landscape' },
    { src: '/junks/Untitled-4.jpg', alt: 'City', caption: 'Urban view' },
    { src: '/junks/IMG_2792.JPG', alt: 'Portrait' },
    { src: '/junks/IMG_2792.JPG', alt: 'Animals', caption: 'Wildlife' },
    // ... more images
  ];

  // const handleImageClick = (src: string) => {
    //console.log('Image clicked:', src);
    // Open modal or lightbox here
  //};

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <GalleryImage
            key={index}
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            // onClick={handleImageClick}
            className="aspect-square" // Force square aspect ratio
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;