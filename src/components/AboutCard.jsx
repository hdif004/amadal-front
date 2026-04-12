import React from 'react';

const AboutCard = ({ image, title, description }) => {
  return (
    <div className="w-full md:w-[300px] bg-white rounded-lg overflow-hidden shadow-md">
      {/* Image Container */}
      <div className="h-[200px] bg-gray-100">
        {image && (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Content Container */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {title}
        </h3>
        
        {/* Description (only shown if provided) */}
        {description && (
          <p className="text-gray-600 text-sm font-light">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutCard;
