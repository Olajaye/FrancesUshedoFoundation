'use client';
import Image from 'next/image';
import React from 'react';
// import PropTypes from 'prop-types';

type GalleryImageProps = {
  src: string;
  alt?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  onClick?: (src: string) => void;
  className?: string;
};

const GalleryImage: React.FC<GalleryImageProps> = ({ 
  src, 
  alt, 
  caption, 
  width, 
  height, 
  // onClick, 
  className 
}) => {
  // const handleClick = () => {
  //   if (onClick) {
  //     onClick(src);
  //   }
  // };

  return (
    <div 
      className={`relative m-2 overflow-hidden rounded-md shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg ${className}`}
      style={{ width, height }}
    >
      <div 
        className="relative w-full h-full cursor-pointer"
        // onClick={handleClick}
      >
        <Image
          src={src}
          alt={alt?? "Gallery image"}
          width={500}
          height={500}
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
          loading="lazy"
        />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white text-sm text-center">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};

// GalleryImage.propTypes = {
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string,
//   caption: PropTypes.string,
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onClick: PropTypes.func,
//   className: PropTypes.string,
// };

// GalleryImage.defaultProps = {
//   alt: 'Gallery image',
//   caption: '',
//   width: '100%',
//   height: 'auto',
//   className: '',
// };

export default GalleryImage;