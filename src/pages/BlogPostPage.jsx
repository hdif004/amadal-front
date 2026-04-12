// src/pages/BlogPostPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPostById, fetchAuthorById } from "../api/api";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import { slugify } from '../utils/urlHelpers';
import { Helmet } from 'react-helmet-async';

const BlogPostPage = () => {
  const { blogid } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const blogSlug = post ? slugify(post.title) : '';

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedPost = await fetchBlogPostById(blogid);
        setPost(fetchedPost);
        
        if (fetchedPost.author_id) {
          const authorData = await fetchAuthorById(fetchedPost.author_id);
          setAuthor(authorData);
        } else {
          setAuthor(null);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load blog post. Please try again later.");
        setLoading(false);
      }
    };

    loadData();
  }, [blogid, refresh]);

  const handlePostUpdate = async (updatedPost) => {
    setRefresh(prev => prev + 1);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    // Updated share URLs to include text/content in the share dialog
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`
    };

    // Open popup window with specific dimensions
    const width = 550;
    const height = 400;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open(
      shareUrls[platform],
      'share',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  const renderContent = (content) => {
    const imageUrlRegex = /(https?:\/\/[^\s<]+?\.(?:jpg|jpeg|gif|png|webp))/gi;
    const htmlContent = content.replace(
      imageUrlRegex,
      (url) => `<img src="${url}" alt="Blog content image" class="my-8 w-full rounded-lg max-w-3xl mx-auto"/>`
    );

    return (
      <div
        className="leading-8 text-gray-800 blog-content"
        dangerouslySetInnerHTML={{ 
          __html: htmlContent 
        }}
      />
    );
  };

  // Update the blogContentStyles with even higher specificity and remove prose class
  const blogContentStyles = `
    .blog-content h1 {
      font-size: 2.5rem !important;
      color: #048162 !important;
      margin-bottom: 1rem !important;
      font-weight: bold !important;
    }

    .blog-content h2 {
      font-size: 2rem !important;
      color: #048162 !important;
      margin-bottom: 0.875rem !important;
      font-weight: bold !important;
    }
    .blog-content h3 {
      font-size: 1.2rem !important;
      color: #048162 !important;
      margin-bottom: 0.875rem !important;
      font-weight: bold !important;
    }
  `;

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!post) return <div className="text-center mt-8">Blog post not found.</div>;

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Amadal Global Systems Blog`}</title>
        <meta 
          name="description" 
          content={post.description?.substring(0, 155) + '...'} 
        />
        
        {/* Open Graph tags for Facebook */}
        <meta property="og:title" content={`${post.title} | Amadal Global Systems Blog`} />
        <meta property="og:description" content={post.description?.substring(0, 155) + '...'} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:url" content={`https://amadal.ma/blog/${blogSlug}/${post.id}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Amadal Global Systems Blog`} />
        <meta name="twitter:description" content={post.description?.substring(0, 155) + '...'} />
        <meta name="twitter:image" content={post.image_url} />

        <link rel="canonical" href={`https://amadal.ma/blog/${blogSlug}/${post.id}`} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <style>{blogContentStyles}</style>
        <Navbar />
        
        <div className="container mx-auto px-4 max-w-5xl mt-28">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-8">
            <span>Blog</span>
            <span className="mx-2">{" > "}</span>
            <span>{post.title}</span>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags && post.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-green-50 text-primary rounded-full text-sm font-medium"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          {/* Title Section - Added responsive text size */}
          <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
            {post.title}
          </h1>

          {/* Author Card - Mobile */}
          <div className="lg:hidden mb-8">
            {author && (
              <div className="flex items-start">
                <img
                  src={author.profile_picture}
                  alt={author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{author.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Published {post.date_published}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Main Content and Sidebar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 relative">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <article className="max-w-none">
                {/* Content */}
                <div className="mt-8 text-gray-800 leading-relaxed">
                  <div className="blog-content">
                    {renderContent(post.content)}
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-16 mb-8">
                  <div className="h-px bg-gray-200 w-full mb-8"></div>
                  <div className="flex items-center gap-6">
                    <span className="text-gray-700 font-medium">Share blog</span>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleShare('linkedin')}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        aria-label="Share on LinkedIn"
                        title="Share on LinkedIn"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        aria-label="Share on Facebook"
                        title="Share on Facebook"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32">
                {/* Author Card */}
                <div className="mb-8 bg-white rounded-lg p-4 shadow-sm">
                  {author && (
                    <div className="flex items-start">
                      <img
                        src={author.profile_picture}
                        alt={author.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{author.name}</h3>
                        <p className="text-gray-500 text-sm">
                          Published {post.date_published}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Newsletter Card - Desktop */}
                <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Weekly newsletter
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Just the latest releases and tips, interesting articles,
                    and exclusive interviews in your inbox every week.
                  </p>
                  <input
                    type="email"
                    placeholder="Email..."
                    className="w-full px-4 py-2 border rounded-md mb-4 bg-white"
                  />
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-green-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Card - Mobile */}
          <div className="lg:hidden mt-16 mb-8">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Weekly newsletter
              </h3>
              <p className="text-gray-600 mb-6">
                Just the latest releases and tips, interesting articles,
                and exclusive interviews in your inbox every week.
              </p>
              <input
                type="email"
                placeholder="Email..."
                className="w-full px-4 py-2 border rounded-md mb-4 bg-white"
              />
              <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-green-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
