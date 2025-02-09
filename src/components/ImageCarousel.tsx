import React, { useState, useEffect, useCallback } from 'react';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  onImageChange?: (index: number) => void;
}

export function ImageCarousel({ images, interval = 5000, onImageChange }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [nextImage, interval]);

  useEffect(() => {
    if (onImageChange) {
      onImageChange(currentIndex);
    }
  }, [currentIndex, onImageChange]);

  return (
    <div className="relative w-full h-full group">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            index === currentIndex
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-full"
            onTransitionEnd={() => setIsTransitioning(false)}
          />
        </div>
      ))}
      
      <button
        onClick={previousImage}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ←
      </button>
      
      <button
        onClick={nextImage}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}