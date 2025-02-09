import React, { useEffect, useState } from 'react';
import { ImageCarousel } from './ImageCarousel';

interface ScrollHeaderProps {
  images: string[];
  name: string;
  role: string;
}

export function ScrollHeader({ images, name, role }: ScrollHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : ''
      }`}
    >
      <div
        className={`container mx-auto px-4 transition-all duration-500 ease-in-out ${
          scrolled ? 'py-2' : 'py-8'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`transition-all duration-500 ease-in-out ${
              scrolled ? 'w-12 h-12' : 'w-40 h-40'
            }`}
          >
            <ImageCarousel images={images} interval={5000} />
          </div>
          
          <div>
            <h1
              className={`font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text transition-all duration-500 ${
                scrolled ? 'text-xl' : 'text-4xl'
              }`}
            >
              {name}
            </h1>
            <p
              className={`text-gray-400 transition-all duration-500 ${
                scrolled ? 'text-sm' : 'text-lg'
              }`}
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}