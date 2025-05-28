'use client';
import React, { useState, useEffect } from 'react';

const FadeText = () => {
  const texts = [
    "The Frances Ushedo Foundation",
    "A Beacon of Hope for Future Generations"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFade(false);
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true);
      }, 2000); // This should match the CSS transition time
    }, 7000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="fade-container flex justify-center items-center">
      <h1 className={`fade-text text-3xl md:text-5xl font-bold leading-tight mb-4 font-lora ${fade ? 'fade-in' : 'fade-out'} `} >
        {texts[currentIndex]}
      </h1>
    </div>
  );
};

export default FadeText;