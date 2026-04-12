import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchPosts } from "../api/api";
import PostCard from "../components/PostCard";

const LatestPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data.slice(0, 3)))
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                {t("navbar.posts")}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Dernières <span className="text-primary">Publications</span>
            </h2>
          </div>

          <Link
            to="/posts"
            className="inline-flex items-center gap-2 self-start sm:self-auto text-sm font-semibold text-primary
                       border border-primary/30 rounded-full px-5 py-2.5 flex-shrink-0
                       hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Voir tout
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* Grille */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                  <div className="h-3 w-full bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestPosts;
