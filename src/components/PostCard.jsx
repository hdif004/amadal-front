import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import PostModal from "./PostModal";
import { asset } from "../config";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const PostCard = ({ post }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasVideo = !!post.video;
  const images = post.images || [];
  const hasMultiple = images.length > 1;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback((e) => {
    e.stopPropagation();
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e) => {
    e.stopPropagation();
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                   cursor-pointer group hover:shadow-[0_8px_30px_rgba(4,129,98,0.12)]
                   hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Média */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          {hasVideo ? (
            <>
              <video
                src={post.video}
                className="w-full h-full object-cover"
                muted playsInline preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </>
          ) : images.length > 0 ? (
            <>
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {images.map((img, i) => (
                    <div key={i} className="flex-[0_0_100%] min-w-0 h-full">
                      <img
                        src={img}
                        alt={`${post.title} ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Flèches */}
              {hasMultiple && currentIndex > 0 && (
                <button onClick={scrollPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              {hasMultiple && currentIndex < images.length - 1 && (
                <button onClick={scrollNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}

              {/* Dots + compteur */}
              {hasMultiple && (
                <>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, i) => (
                      <span key={i} className={`block rounded-full transition-all duration-200 ${
                        i === currentIndex ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/50"
                      }`} />
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/40 text-white text-xs rounded-full px-2 py-0.5 font-medium z-10">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <img src={asset("AmadalGreen.webp")} alt="Amadal" className="w-4 h-4 object-contain" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Amadal</span>
            </div>
            <span className="text-[11px] text-gray-400">{formatDate(post.date)}</span>
          </div>

          {post.title && (
            <p className="text-sm font-bold text-gray-900 leading-snug mb-1">{post.title}</p>
          )}
          {post.description && (
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.description}</p>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium text-primary">Voir plus</span>
            {post.lien && (
              <a href={post.lien} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Post original
              </a>
            )}
          </div>
        </div>
      </div>

      {modalOpen && createPortal(
        <PostModal post={post} onClose={() => setModalOpen(false)} />,
        document.body
      )}
    </>
  );
};

export default PostCard;
