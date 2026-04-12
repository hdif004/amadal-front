import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchBlogPosts } from "../api/api";

/* ── helpers ───────────────────────────────────────────────────── */
const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const toBlogUrl = (post) => {
  const slug = (post.title || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .trim();
  return `/blog/${slug}/${post.id}`;
};

/* ── Skeleton ───────────────────────────────────────────────────── */
const SkeletonFeatured = () => (
  <div className="animate-pulse flex flex-col h-full rounded-2xl overflow-hidden bg-gray-100">
    <div className="flex-1 bg-gray-200" />
    <div className="p-6 flex flex-col gap-3 bg-white">
      <div className="h-2.5 w-1/4 bg-gray-100 rounded-full" />
      <div className="h-6 w-3/4 bg-gray-100 rounded-full" />
      <div className="h-4 w-full bg-gray-100 rounded-full" />
      <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
    </div>
  </div>
);

const SkeletonCompact = () => (
  <div className="animate-pulse flex gap-4 py-4">
    <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-gray-100" />
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <div className="h-3 w-1/3 bg-gray-100 rounded-full" />
      <div className="h-4 w-full bg-gray-100 rounded-full" />
      <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
    </div>
  </div>
);

/* ── Article vedette (grand format) ────────────────────────────── */
const FeaturedArticle = ({ post }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(toBlogUrl(post))}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100
                 shadow-sm hover:shadow-[0_16px_48px_rgba(4,129,98,0.13)]
                 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 flex-shrink-0">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1} stroke="currentColor" className="w-14 h-14 text-gray-200">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-primary">
              <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM9.5 10.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0ZM7.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM6.5 10.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
              <path fillRule="evenodd" d="M4.75 1a.75.75 0 0 1 .75.75V3h5V1.75a.75.75 0 0 1 1.5 0V3h.25A2.75 2.75 0 0 1 15 5.75v7.5A2.75 2.75 0 0 1 12.25 16H3.75A2.75 2.75 0 0 1 1 13.25v-7.5A2.75 2.75 0 0 1 3.75 3H4V1.75A.75.75 0 0 1 4.75 1Zm-1 3.5c-.69 0-1.25.56-1.25 1.25v.75h11v-.75c0-.69-.56-1.25-1.25-1.25H3.75ZM2.5 8v5.25c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V8h-11Z" clipRule="evenodd" />
            </svg>
            {formatDate(post.date_published)}
          </span>
          {post.read_time && (
            <>
              <span className="text-gray-200">·</span>
              <span className="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-primary">
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
                </svg>
                {post.read_time}
              </span>
            </>
          )}
        </div>

        <h2 className="font-bold text-gray-900 text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-1">
            {post.description}
          </p>
        )}

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto pt-2
                         group-hover:gap-2.5 transition-all duration-200">
          {t("news.readMore")}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div>
    </article>
  );
};

/* ── Article compact (liste droite) ────────────────────────────── */
const CompactArticle = ({ post, isLast }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(toBlogUrl(post))}
      className={`group cursor-pointer flex gap-4 py-4 ${!isLast ? "border-b border-gray-100" : ""}`}
    >
      {/* Miniature */}
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1} stroke="currentColor" className="w-7 h-7 text-gray-200">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Texte */}
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <p className="text-[11px] text-gray-400">{formatDate(post.date_published)}</p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug
                       group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        {post.read_time && (
          <p className="text-[11px] text-primary font-medium">{post.read_time}</p>
        )}
      </div>
    </article>
  );
};

/* ── Section News ───────────────────────────────────────────────── */
const News = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setTimedOut(true), 10000);

    fetchBlogPosts()
      .then(setPosts)
      .catch((err) => console.error("Error fetching blog posts:", err))
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  const featured = posts[0] || null;
  const compact = posts.slice(1, 4);
  const isEmpty = !loading && posts.length === 0 || timedOut && posts.length === 0;

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">

        {/* ── En-tête ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                {t("news.label")}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {t("news.title")}{" "}
              <span className="text-primary">{t("news.titleSecondLine")}</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 self-start sm:self-auto text-sm font-semibold text-primary
                       border border-primary/30 rounded-full px-5 py-2.5
                       hover:bg-primary hover:text-white transition-colors duration-200 flex-shrink-0"
          >
            {t("news.viewAll")}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* ── Contenu ── */}
        {isEmpty ? (
          <div className="flex items-center justify-center text-gray-400 text-sm py-20">
            {t("news.noArticles")}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 lg:gap-8">

            {/* Article vedette */}
            <div className="min-h-[420px]">
              {loading ? (
                <SkeletonFeatured />
              ) : featured ? (
                <FeaturedArticle post={featured} />
              ) : null}
            </div>

            {/* Liste compacte */}
            <div className="bg-[#f7faf9] rounded-2xl px-6 py-2 flex flex-col justify-start">
              {loading ? (
                <>
                  <SkeletonCompact />
                  <SkeletonCompact />
                  <SkeletonCompact />
                </>
              ) : (
                compact.map((post, i) => (
                  <div key={post.id} className={i >= 1 ? "hidden lg:block" : ""}>
                    <CompactArticle post={post} isLast={i === compact.length - 1} />
                  </div>
                ))
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default News;
