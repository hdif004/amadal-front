import React from "react";

const NewsCard = ({ post, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer px-8 sm:px-8 md:px-12 lg:px-24 py-8 sm:py-4">
      <div className="flex flex-col w-full max-w-[550px] justify-center gap-6 sm:gap-7 mt-2 sm:mt-4">
        <div className="flex justify-between">
          <h3 className="text-black text-base sm:text-xs opacity-65">{post.category} · {post.read_time}</h3>
          <h3 className="text-black text-base sm:text-xs opacity-65">{post.date_published}</h3>
        </div>
        <h1 className="text-4xl sm:text-3xl md:text-4xl line-clamp-2 leading-tight">{post.title}</h1>
        <p className="text-black text-lg sm:text-xs opacity-65 line-clamp-3 leading-relaxed">{post.description}</p>
        <div className="flex items-center">
          <h1 className="text-black text-lg sm:text-sm">Read More</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#000"
            className="size-6 sm:size-4 ml-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
