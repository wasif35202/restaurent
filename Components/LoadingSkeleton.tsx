// components/LoadingSkeleton.tsx
'use client';
import React from 'react';

interface LoadingSkeletonProps {
  itemCount?: number; // Number of loading items to display
  height?: string; // Height of the image skeleton
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  itemCount = 3,
  height = '40'
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-y-10">
      {[...Array(itemCount)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center border border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg shadow-lg gap-5 p-5 w-full sm:w-1/2 md:w-[32%]" // Responsive width
        >
          <div className={`w-[70%] h-${height} bg-gray-300 animate-pulse`} /> {/* Skeleton for image */}
          <div className="flex flex-col items-start w-full">
            <div className="flex w-full items-center justify-between mb-5">
              <div className="h-6 w-2/3 bg-gray-300 animate-pulse" /> {/* Skeleton for title */}
              <div className="h-6 w-1/4 bg-gray-300 animate-pulse" /> {/* Skeleton for price */}
            </div>
            <div className="h-4 w-full bg-gray-300 animate-pulse" /> {/* Skeleton for description */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
