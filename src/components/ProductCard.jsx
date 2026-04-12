import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { generateProductUrl } from '../utils/urlHelpers';

const ProductCard = ({ product = {} }) => {
  const { language } = useLanguage();

  const name = product[`name_${language}`] || product.name || "";

  return (
    <Link to={generateProductUrl(product)} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-[0_4px_20px_rgba(4,129,98,0.2)] transition-shadow duration-200">
        {/* Image */}
        <div className="w-full aspect-square overflow-hidden bg-gray-50">
          {product.imageURL ? (
            <img
              src={product.imageURL}
              alt={name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="p-3 flex flex-col gap-1">
          {product.categoryName && product.categoryName !== "N/A" && (
            <p className="text-xs lg:text-[10px] text-primary/60 font-medium uppercase tracking-wide truncate">
              {product.categoryName}
            </p>
          )}
          <p className="text-sm lg:text-xs font-semibold text-gray-900 truncate">
            {name}
          </p>
          {product.brandName && product.brandName !== "N/A" && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1 w-fit truncate max-w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-primary flex-shrink-0">
                <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {product.brandName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
