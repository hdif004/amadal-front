import React, { useState, useEffect } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import PostCard from "../components/PostCard";
import { fetchPosts } from "../api/api";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from '../config';

const POSTS_PER_PAGE = 9;

const PostsPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Helmet>
        <title>Publications | Amadal Global Systems</title>
        <meta name="description" content="Retrouvez les dernières publications et actualités d'Amadal Global Systems sur les réseaux sociaux." />
        <meta property="og:title" content="Publications | Amadal Global Systems" />
        <meta property="og:description" content="Retrouvez les dernières publications et actualités d'Amadal Global Systems sur les réseaux sociaux." />
        <meta property="og:url" content={`${SITE_URL}/posts`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/AmadalGreen.png`} />
        <link rel="canonical" href={`${SITE_URL}/posts`} />
      </Helmet>
      <Navbar />
      <div className="pt-[60px] min-h-screen bg-gray-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">{t("posts.title")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("posts.subtitle")}</p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        page === currentPage
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    →
                  </button>
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

export default PostsPage;
