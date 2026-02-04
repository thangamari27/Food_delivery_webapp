import React from 'react';
import { Store } from 'lucide-react';

const AdminLoader = ({loaderName}) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="border-t-3 border-orange-500 bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          
          {/* Restaurant-themed icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center">
                <Store className='' />
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium">Loading {loaderName}...</p>
          <p className="text-gray-500 text-sm mt-1">Please wait while we fetch your data</p>
          
          {/* Progress dots animation */}
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smaller inline loader for specific sections
export const InlineLoader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-gray-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
      </div>
      {text && <p className="mt-3 text-gray-600 text-sm">{text}</p>}
    </div>
  );
};

// Table row skeleton loader
export const TableSkeletonLoader = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="animate-pulse">
      {/* Table header skeleton */}
      <div className="flex space-x-4 mb-4">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={`header-${index}`} className="h-6 bg-gray-200 rounded flex-1"></div>
        ))}
      </div>
      
      {/* Table rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4 mb-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={`cell-${rowIndex}-${colIndex}`} 
              className={`h-8 bg-gray-100 rounded flex-1 ${colIndex === 0 ? 'max-w-12' : ''}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Card skeleton loader
export const CardSkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
          {/* Image skeleton */}
          <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
          
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          </div>
          
          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 bg-gray-100 rounded w-16"></div>
            <div className="h-6 bg-gray-100 rounded w-20"></div>
            <div className="h-6 bg-gray-100 rounded w-14"></div>
          </div>
          
          {/* Action buttons skeleton */}
          <div className="flex justify-between">
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminLoader;