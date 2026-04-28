import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";
import { generateProductUrl } from "../utils/urlHelpers";
import { getFeaturedProducts, fetchCategories } from "../api/api";

/* ─── Carte produit vedette ─────────────────────────────────────── */
const FeaturedProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const name = product[`name_${language}`] || product.name || "";

  return (
    <Link to={generateProductUrl(product)} className="block group h-full">
      <article
        className="
          bg-white rounded-2xl overflow-hidden h-full flex flex-col
          border border-gray-100
          shadow-sm
          hover:shadow-[0_16px_48px_rgba(4,129,98,0.14)]
          hover:-translate-y-1
          transition-all duration-300 ease-out
        "
      >
        {/* ── Image ── */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 flex-shrink-0">
          {product.imageURL ? (
            <img
              src={product.imageURL}
              alt={name}
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-14 h-14 text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          )}

          {/* Badge vedette */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-primary text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.83-4.401Z"
                clipRule="evenodd"
              />
            </svg>
            {t("bestProducts.featured")}
          </span>

          {/* Gradient bas image */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* ── Contenu ── */}
        <div className="p-5 flex flex-col flex-1 gap-2">
          {product.categoryName && product.categoryName !== "N/A" && (
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">
              {product.categoryName}
            </p>
          )}

          <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2">
            {name}
          </h3>

          {product.description && (
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {product.description.replace(/<[^>]+>/g, "").trim()}
            </p>
          )}

          {/* Pied de carte */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
            {product.brandName && product.brandName !== "N/A" ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1 truncate max-w-[55%]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-primary flex-shrink-0">
                  <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                {product.brandName}
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-200">
              {t("bestProducts.discover")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

/* ─── Section BestProducts ──────────────────────────────────────── */
const BestProducts = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("init", onInit);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
    onInit();

    return () => {
      emblaApi.off("init", onInit);
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const timeout = setTimeout(() => setTimedOut(true), 10000);

    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getFeaturedProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };
    fetchData();

    return () => clearTimeout(timeout);
  }, []);

  const getCategoryName = (id) =>
    categories.find((c) => c.idcategory === id)?.name || "";

  const enriched = products.map((p) => ({
    ...p,
    categoryName: getCategoryName(p.idcategory),
    url: generateProductUrl(p),
  }));

  return (
    <section className="w-full bg-[#f7faf9]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

          {/* ── Panneau gauche ── */}
          <div className="lg:w-[300px] xl:w-[340px] flex-shrink-0 bg-primary rounded-3xl p-8 lg:p-10 flex flex-col justify-between gap-10">
            {/* Texte */}
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/60 flex-shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  {t("bestProducts.featured")}
                </span>
              </div>

              <h2 className="text-3xl xl:text-[2.4rem] font-bold leading-tight text-white">
                {t("bestProducts.title")}
                <br />
                {t("bestProducts.titleSecondLine")}
              </h2>

              <p className="text-sm text-white/65 leading-relaxed">
                {t("bestProducts.subtitle")}
              </p>
            </div>

            {/* CTA + flèches */}
            <div className="flex flex-col gap-5">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white
                           border border-white/30 rounded-full px-5 py-2.5
                           hover:bg-white hover:text-primary transition-colors duration-200"
              >
                {t("bestProducts.fullCatalogue")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={scrollPrev}
                  aria-label={t("bestProducts.previous")}
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             border border-white/30 text-white
                             hover:bg-white hover:text-primary transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  aria-label={t("bestProducts.next")}
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             bg-white text-primary
                             hover:bg-white/90 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Zone carousel ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 justify-between">
            {loading && !timedOut ? (
              /* Skeletons */
              <div className="flex gap-6 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] xl:flex-[0_0_33.333%] flex-shrink-0">
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                      <div className="w-full aspect-[4/3] bg-gray-100" />
                      <div className="p-5 flex flex-col gap-3">
                        <div className="h-2.5 w-1/3 bg-gray-100 rounded-full" />
                        <div className="h-4 w-3/4 bg-gray-100 rounded-full" />
                        <div className="h-3 w-full bg-gray-100 rounded-full" />
                        <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
                        <div className="pt-3 mt-2 border-t border-gray-100 flex justify-between">
                          <div className="h-5 w-20 bg-gray-100 rounded-full" />
                          <div className="h-5 w-16 bg-gray-100 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading && enriched.length === 0 || timedOut && enriched.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm py-16">
                {t("bestProducts.noFeatured")}
              </div>
            ) : (
              <>
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {enriched.map((product) => (
                      <div
                        key={product.id}
                        className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_50%] xl:flex-[0_0_33.333%] px-3 pb-1"
                      >
                        <FeaturedProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                {scrollSnaps.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-2">
                    {scrollSnaps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? "w-6 h-2 bg-primary"
                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestProducts;
