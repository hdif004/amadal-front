import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ category, categoryId, productName }) => {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-100 px-4 lg:px-24 py-3 mt-[5rem]">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
            Accueil
          </Link>
        </li>

        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </li>

        <li>
          <Link to="/products" className="text-sm text-gray-400 hover:text-primary transition-colors">
            Produits
          </Link>
        </li>

        {category && (
          <>
            <li className="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="truncate max-w-[120px]">
              {categoryId ? (
                <Link to={`/products?category=${categoryId}`} className="text-sm text-gray-400 hover:text-primary transition-colors">
                  {category}
                </Link>
              ) : (
                <span className="text-sm text-gray-400">{category}</span>
              )}
            </li>
          </>
        )}

        {productName && (
          <>
            <li className="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-sm font-medium text-gray-700 truncate max-w-[160px]">{productName}</li>
          </>
        )}
      </ol>
    </div>
  );
};

export default Breadcrumb;
