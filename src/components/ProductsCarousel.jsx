import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchRelatedProducts, fetchCategories } from "../api/api";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../contexts/LanguageContext";

const ProductsCarousel = ({ currentProductId }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [relatedProducts, fetchedCategories] = await Promise.all([
          fetchRelatedProducts(currentProductId, language),
          fetchCategories(),
        ]);
        setProducts(relatedProducts);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [currentProductId, language]);

  if (products.length === 0) return null;

  return (
    <div className="w-full my-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 px-4 lg:px-0">
        {t("products.related")}
      </h2>
      <div className="relative">
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        <div
          className="flex gap-3 overflow-x-auto px-4 lg:px-0 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[44%] lg:w-[calc(100%/5.5)]">
              <ProductCard
                product={{
                  ...product,
                  categoryName: categories.find(c => c.idcategory === product.idcategory)?.name || "N/A",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCarousel;
