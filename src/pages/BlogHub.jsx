import React, { useState, useEffect } from "react";
import Navbar from "../sections/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../sections/Footer";
import { fetchBlogPosts } from "../api/api";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from '../config';

const formatTitleForUrl = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .trim();
};

const BlogHub = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        
        // Sort in ascending order (smallest to largest)
        const sortedData = [...data].sort((a, b) => {
          const idA = parseInt(a.id, 10);
          const idB = parseInt(b.id, 10);
          return idA - idB;
        });
        
        const featured = sortedData.filter(post => post.featured);
        setBlogPosts(sortedData);
        setFeaturedPosts(featured);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Carousel Logic
  useEffect(() => {
    if (featuredPosts.length <= 1) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentFeaturedIndex(current => 
            current === featuredPosts.length - 1 ? 0 : current + 1
          );
          return 0;
        }
        return prev + (100 / (6000 / 20));
      });
    }, 20);

    return () => clearInterval(progressInterval);
  }, [featuredPosts.length, currentFeaturedIndex]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentFeatured = featuredPosts[currentFeaturedIndex];

  return (
    <div onClick={(e) => console.log('BlogHub container clicked', e)}>
      <Helmet>
        <title>Blog | Amadal Global Systems</title>
        <meta name="description" content="Actualités, conseils et articles sur l'irrigation, l'agriculture et les équipements hydrauliques au Maroc." />
        <meta property="og:title" content="Blog | Amadal Global Systems" />
        <meta property="og:description" content="Actualités, conseils et articles sur l'irrigation, l'agriculture et les équipements hydrauliques au Maroc." />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/AmadalGreen.png`} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
      </Helmet>
      <Navbar />
      <div className="pt-[60px]" onClick={(e) => console.log('Content container clicked', e)}>
        {/* Featured Post Carousel */}
        {featuredPosts.length > 0 && (
          <div className="relative w-full h-[70vh] rounded-b-[50px] pointer-events-none">
            <img
              src={currentFeatured?.image_url || "./NewsImage.png"}
              alt={currentFeatured?.title || "Featured"}
              className="object-cover w-full h-full rounded-b-[50px]"
            />
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)] rounded-b-[50px] pointer-events-none"
            ></div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 bg-opacity-30">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10 p-3 sm:p-6 text-white z-[2] pointer-events-auto max-w-[90%] sm:max-w-[80%] lg:max-w-[60%]">
              <p className="text-sm font-semibold uppercase italic mb-2 text-white">
                Featured
              </p>
              <p className="text-sm mb-4 text-white font-light">
                {currentFeatured?.date_published} &nbsp; · &nbsp; {currentFeatured?.read_time}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                {currentFeatured?.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white font-light line-clamp-2 sm:line-clamp-none">
                {currentFeatured?.description}
              </p>
              <button 
                onClick={() => {
                  window.location.href = `/blog/${formatTitleForUrl(currentFeatured?.title)}/${currentFeatured?.id}`;
                }}
                className="flex justify-center items-center pt-8 group cursor-pointer"
              >
                Read more{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-4 group-hover:ml-2 transition-all duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            {/* Carousel indicators */}
            {featuredPosts.length > 1 && (
              <div className="absolute bottom-4 right-10 flex gap-2 pointer-events-auto">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentFeaturedIndex(index);
                      setProgress(0);
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer hover:bg-white ${
                      currentFeaturedIndex === index ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Added Previous/Next buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentFeaturedIndex(current => 
                  current === 0 ? featuredPosts.length - 1 : current - 1
                );
                setProgress(0);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 rounded-full p-2 transition-all pointer-events-auto"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentFeaturedIndex(current => 
                  current === featuredPosts.length - 1 ? 0 : current + 1
                );
                setProgress(0);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 rounded-full p-2 transition-all"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}

        {/* Blog Posts Section */}
        <div className="container mx-auto px-4 py-8 relative">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-gray-600">Discover our latest insights and stories</p>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                  {currentPosts.map((post) => {
                    return (
                      <div key={post.id}>
                        <BlogCard 
                          blog={post} 
                          className="min-h-[360px] max-h-[360px]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`mx-1 px-4 py-2 rounded-md transition-colors ${
                        currentPage === number
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogHub;