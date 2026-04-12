import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  const spinnerClasses = fullPage 
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50" 
    : "flex items-center justify-center min-h-[200px]";

  return (
    <div className={spinnerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-primary font-light">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 