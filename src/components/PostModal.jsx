import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
};

const PostModal = ({ post, onClose }) => {
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const scrollPrev = useCallback((e) => { e.stopPropagation(); emblaApi?.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback((e) => { e.stopPropagation(); emblaApi?.scrollNext(); }, [emblaApi]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row
                   w-full max-w-4xl max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gauche — Média */}
        <div className="relative bg-black flex-shrink-0 w-full md:w-[50%] aspect-square md:aspect-auto">
          {hasVideo ? (
            <video src={post.video} controls autoPlay className="w-full h-full object-contain" />
          ) : images.length > 0 ? (
            <>
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {images.map((img, i) => (
                    <div key={i} className="flex-[0_0_100%] min-w-0 h-full">
                      <img src={img} alt={`${post.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {hasMultiple && currentIndex > 0 && (
                <button onClick={scrollPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              {hasMultiple && currentIndex < images.length - 1 && (
                <button onClick={scrollNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}

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
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
        </div>

        {/* Droite — Contenu */}
        <div className="flex flex-col flex-1 min-h-0 max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <img src="/AmadalGreen.png" alt="Amadal" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">Amadal</p>
                <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
              </div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Corps */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
            {post.title && (
              <p className="text-base font-bold text-gray-900 leading-snug">{post.title}</p>
            )}
            {post.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{post.description}</p>
            )}
          </div>

          {/* Lien */}
          {post.lien && (
            <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
              <a href={post.lien} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary
                           border border-primary/30 rounded-full px-4 py-2
                           hover:bg-primary hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Voir le post original
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
