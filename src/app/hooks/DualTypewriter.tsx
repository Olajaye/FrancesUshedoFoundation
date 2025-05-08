// components/DualTypewriter.tsx
"use client";

import { useEffect, useState } from 'react';

export function DualTypewriter({ texts, speed = 100, delay = 3000 }: {
  texts: [string, string];
  speed?: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex % texts.length];

    if (!isDeleting && charIndex < currentText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, speed / 2);

      return () => clearTimeout(timeout);
    } else if (!isDeleting && charIndex === currentText.length) {
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex === 0) {
      // Switch to next text
      setIsDeleting(false);
      setTextIndex(prev => (prev + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts, speed, delay]);

  return (
    <span className="relative">
      {displayedText}
      <span className={`absolute ml-1 w-1 h-8 bg-white ${!isDeleting ? 'animate-blink' : ''}`} />
    </span>
  );
}