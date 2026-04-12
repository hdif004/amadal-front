import React from "react";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (!text) return ''; // Return empty string if text is null or undefined
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

const BlogCard = ({ blog }) => {
  const maxDescriptionLength = 150;
  const maxTitleLength = 50; // Adjust this value based on your needs

  const formatTitleForUrl = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <Link 
      to={`/blog/${formatTitleForUrl(blog.title)}/${blog.id}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden min-h-[360px] max-h-[360px] flex flex-col">
        {/* Image container with fixed height */}
        <div className="h-48 w-full flex-shrink-0">
          <img
            src={blog.image_url || "/placeholder-image.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content container */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-gray-500 text-xs font-light mb-2">
            {blog.date_published || "No date"} · {blog.read_time || "5 min read"}
          </p>
          
          {/* Title with truncation */}
          <h2 className="text-xl text-primary font-bold mb-2 line-clamp-2 h-[56px]">
            {truncateText(blog.title || "Untitled", maxTitleLength)}
          </h2>
          
          {/* Description with remaining space */}
          <p className="text-gray-700 text-xs font-light line-clamp-3">
            {truncateText(blog.description || "No description available", maxDescriptionLength)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

