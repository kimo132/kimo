import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500); // Delay to show 100%
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-64 h-64 relative animate-spin-slow mb-8">
        <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-purple-500 opacity-20"></div>
        <div 
          className="absolute inset-0 rounded-full border-t-2 border-purple-500"
          style={{
            clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          Loading Experience
        </h2>
        <p className="text-gray-400">Please wait while we prepare something amazing...</p>
      </div>
    </div>
  );
}