import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { fetchCategories, fetchBrands, fetchProductById } from "../api/api";
import Navbar from "../sections/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import ProductsCarousel from "../components/ProductsCarousel";
import Footer from "../sections/Footer";
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../config';
import { slugify } from '../utils/urlHelpers';


const ProductDetail = () => {
  const { productid } = useParams();
  const { language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [fetchedCategories, fetchedBrands, fetchedProduct] =
          await Promise.all([
            fetchCategories(),
            fetchBrands(),
            fetchProductById(productid, language),
          ]);

        setCategories(fetchedCategories);
        setBrands(fetchedBrands);
        setProduct(fetchedProduct);
        setActiveImage(fetchedProduct.imageURL);

        if (window.prerenderReady !== undefined) {
          window.prerenderReady = true;
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };

    fetchProductData();
  }, [productid, language]);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [product]);

  if (!product) {
    return <LoadingSpinner fullPage />;
  }

  const mainCategoryId = product.categories?.length
    ? product.categories[product.categories.length - 1]
    : null;

  const getCategoryName = (id) => {
    if (!id) return null;
    const category = categories.find((cat) => cat.idcategory === id);
    return category ? category.name : null;
  };

  const getBrandName = (id) => {
    const brand = brands.find((brand) => brand.idbrand === id);
    return brand ? brand.name : "N/A";
  };

  const productSlug = product ? slugify(product.name) : '';

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description?.replace(/<[^>]*>/g, ''),
    "image": product.imageURL,
    "brand": {
      "@type": "Brand",
      "name": getBrandName(product.idbrand)
    },
    "category": getCategoryName(mainCategoryId) || "",
    "url": `${SITE_URL}/products/${productSlug}/${product.id}`
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Amadal Global Systems`}</title>
        <meta 
          name="description" 
          content={product.description?.replace(/<[^>]*>/g, '').substring(0, 155) + '...'} 
        />
        
        <meta property="og:title" content={`${product.name} | Amadal Global Systems`} />
        <meta property="og:description" content={product.description?.replace(/<[^>]*>/g, '').substring(0, 155) + '...'} />
        <meta property="og:image" content={product.imageURL} />
        <meta property="og:url" content={`${SITE_URL}/products/${productSlug}/${product.id}`} />
        <meta property="og:type" content="product" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Amadal Global Systems`} />
        <meta name="twitter:description" content={product.description?.replace(/<[^>]*>/g, '').substring(0, 155) + '...'} />
        <meta name="twitter:image" content={product.imageURL} />

        <link rel="canonical" href={`${SITE_URL}/products/${productSlug}/${product.id}`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/products/${product.slug}/${product.id}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/products/${product.slug}/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      <Navbar />
      <div>
        <Breadcrumb
          category={getCategoryName(mainCategoryId)}
          categoryId={mainCategoryId}
          productName={product.name}
        />
      </div>
      {/* CTA sticky mobile */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-3 transition-transform duration-300 ${stickyVisible ? "translate-y-0" : "translate-y-full"}`}>
        <a
          href="/contact"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 text-base font-semibold"
        >
          Demander un devis
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
        {product.pdfUrl && (
          <a
            href={product.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-xl py-4 text-base font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Télécharger la fiche produit
          </a>
        )}
      </div>

      <main className="lg:px-24 pb-44 lg:pb-10 lg:py-10">
        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 w-full">

          {/* Image + Galerie */}
          <div className="w-full lg:w-[35%] flex-shrink-0 flex flex-col gap-3">

            {/* Titre / Catégorie / Marque — visible uniquement sur mobile, au-dessus de l'image */}
            <div className="lg:hidden flex flex-col gap-2 px-4 pt-4 pb-2">
              <p className="text-base font-semibold uppercase tracking-widest text-primary/60">
                {getCategoryName(mainCategoryId)}
              </p>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              {product.brandName && (
                <div className="flex items-center gap-2 w-fit bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary/60 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary">{product.brandName}</span>
                </div>
              )}
            </div>

            {/* Image principale */}
            <div className="lg:rounded-2xl overflow-hidden shadow-md bg-white">
              <img
                className="w-full aspect-square object-cover transition-opacity duration-300"
                src={activeImage || product.imageURL}
                alt={product.name}
                width="800"
                height="800"
                fetchpriority="high"
              />
            </div>

            {/* Thumbnails galerie */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="relative">
                {/* Flou gauche */}
                <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                {/* Flou droit */}
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex gap-3 overflow-x-auto px-4 lg:px-1 pr-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {/* Image principale */}
                  <button
                    onClick={() => setActiveImage(product.imageURL)}
                    className={`flex-shrink-0 w-[30%] rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === product.imageURL ? 'border-primary' : 'border-gray-200'
                    }`}
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <img src={product.imageURL} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                  {/* Galerie */}
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-[30%] rounded-xl overflow-hidden border-2 transition-colors ${
                        activeImage === img ? 'border-primary' : 'border-gray-200'
                      }`}
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-6 w-full px-4 lg:px-0 pt-6 lg:pt-0">

            {/* Catégorie + Titre + Marque — desktop uniquement */}
            <div className="hidden lg:flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary/60">
                {getCategoryName(mainCategoryId)}
              </p>
              <h1 className="text-3xl lg:text-3xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>
              {product.brandName && (
                <div className="flex items-center gap-2 w-fit bg-primary/5 border border-primary/20 rounded-full px-3 py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-primary/60 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary">{product.brandName}</span>
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* Description */}
            {product.description && (
              <div
                className="text-lg lg:text-sm text-gray-600 leading-relaxed product-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Mesures disponibles */}
            {product.specs && product.specs.length > 0 && (
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-3">{product.labelMesure || "Mesures disponibles"}</p>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec, i) => (
                    <span key={i} className="border border-primary text-primary text-base font-medium px-5 py-2.5 rounded-full">
                      {spec.taille}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes produit */}
            {product.note && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setNoteOpen(!noteOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm lg:text-sm font-semibold text-gray-800">Notes du produit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${noteOpen ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${noteOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.note}
                  </p>
                </div>
              </div>
            )}

            {/* Actions — cachées sur mobile (dans la sticky bar) */}
            <div className="hidden lg:flex flex-col gap-3 pt-2">
              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full lg:w-fit border-2 border-primary text-primary rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Télécharger la fiche produit
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              )}
              <a
                href="/contact"
                className="flex items-center justify-center gap-3 w-full lg:w-fit bg-primary text-white rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Demander un devis
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-16">
          <ProductsCarousel currentProductId={product.id} />
        </div>
      </main>
      <div ref={footerRef}><Footer /></div>
    </>
  );
};

export default ProductDetail;