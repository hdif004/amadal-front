import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Footer from "./Footer";
import { Filter, Search } from "lucide-react";
import { fetchProducts, fetchCategories, searchProducts } from "../api/api";
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from "react-i18next";
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsSections = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const categoryParam = searchParams.get('category');
  const { language } = useLanguage();
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: categoryParam ? [isNaN(categoryParam) ? categoryParam : Number(categoryParam)] : [],
    brands: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(25);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Catégories (légères, cachées — pour le lookup des noms)
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Erreur fetchCategories:", err));
  }, []);

  // Étape 2 : chargement des produits
  useEffect(() => {
    setIsLoadingProducts(true);

    const load = async () => {
      try {
        const fetched = await fetchProducts(language);
        setAllProducts(fetched || []);
        setProducts(fetched || []);

        if (searchQuery) {
          const data = await searchProducts(searchQuery);
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("Erreur chargement produits:", err);
        setAllProducts([]);
        setProducts([]);
        setSearchResults([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    load();
    setFilters({
      categories: categoryParam ? [isNaN(categoryParam) ? categoryParam : Number(categoryParam)] : [],
      brands: [],
    });
    setCurrentPage(1);
  }, [language, categoryParam, searchQuery]);

  const applyFilters = useCallback(() => {
    const { categories: selectedCats, brands } = filters;
    let filtered = allProducts;

    if (selectedCats.length > 0) {
      const getDescendants = (parentId) => {
        const children = categories.filter(c => c.parent === parentId).map(c => c.idcategory);
        return children.reduce((acc, id) => [...acc, id, ...getDescendants(id)], []);
      };
      const expandedCats = [
        ...selectedCats,
        ...selectedCats.flatMap(id => getDescendants(id)),
      ];
      filtered = filtered.filter(
        p => p && p.categories?.some(id => expandedCats.includes(id))
      );
    }

    if (brands.length > 0) {
      filtered = filtered.filter(p => p && brands.includes(p.brandName));
    }

    setProducts(filtered);
  }, [filters, allProducts, categories]);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [applyFilters]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const fetchSearchedProducts = async (query) => {
    try {
      const data = await fetchProducts(query);
      setAllProducts(data || []);
      setProducts(data || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Erreur recherche:", err);
      setAllProducts([]);
      setProducts([]);
    }
  };

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const getCategoryName = (product) => {
    if (!product.categories?.length) return "N/A";
    return (
      categories.find(c => c.idcategory === product.categories[product.categories.length - 1])?.name ||
      categories.find(c => c.idcategory === product.categories[0])?.name ||
      "N/A"
    );
  };

  // ─── Vue : grille de produits ───────────────────────────────────────────────
  const selectedCategoryName = categoryParam
    ? categories.find(c => c.idcategory === Number(categoryParam))?.name
    : null;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between px-4 md:px-8 lg:px-20 xl:px-40 gap-y-4 lg:gap-x-20 mt-14">
        {/* Bouton filtre mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center w-full bg-primary text-white py-2 rounded-md"
          >
            <Filter size={20} className="mr-2 stroke-white" />
            Filters
          </button>
        </div>

        {/* Panneau filtres */}
        <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
          <Filters
            onFilterChange={handleFilterChange}
            availableBrands={[...new Set(allProducts.map(p => p.brandName).filter(b => b && b !== "N/A"))]}
            initialCategories={categoryParam ? [isNaN(categoryParam) ? categoryParam : Number(categoryParam)] : []}
          />
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-[1000px] xl:w-full">
          <SearchBar onSearch={fetchSearchedProducts} />

          {/* Résultats de recherche */}
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {t('search.resultsFor')} "{searchQuery}"
              </h2>
              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg mb-8">
                  <Search size={48} className="text-gray-400 mb-2" />
                  <p className="text-gray-600 text-center">
                    {t('search.noResults').replace('{query}', `${searchQuery}`)}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 gap-4 lg:gap-x-4 lg:gap-y-10 2xl:gap-x-4 2xl:gap-y-4 mb-8">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{ ...product, categoryName: getCategoryName(product) }}
                    />
                  ))}
                </div>
              )}
              <div className="border-t border-gray-200 pt-8 mb-4">
                <h3 className="text-lg font-medium mb-4">{t('search.allProducts')}</h3>
              </div>
            </div>
          )}

          {/* Grille principale */}
          {isLoadingProducts ? (
            <LoadingSpinner />
          ) : currentProducts.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
              {t('products.noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 gap-4 lg:gap-x-4 lg:gap-y-10 2xl:gap-x-4 2xl:gap-y-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, categoryName: getCategoryName(product) }}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {currentProducts.length > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-20 mb-20">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-black'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsSections;
