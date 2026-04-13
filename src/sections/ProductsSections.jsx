import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Footer from "./Footer";
import { Filter, Search } from "lucide-react";
import { fetchProducts, fetchCategories, fetchBrands, searchProducts } from "../api/api";
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from "react-i18next";
import LoadingSpinner from '../components/LoadingSpinner';

const ProductsSections = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const categoryParam = searchParams.get('category');
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    categories: categoryParam ? [isNaN(categoryParam) ? categoryParam : Number(categoryParam)] : [],
    brands: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(25); // Number of products per page
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]); // New state for search results

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedProducts, fetchedCategories, fetchedBrands] = await Promise.all([
          fetchProducts(language),
          fetchCategories(),
          fetchBrands(),
        ]);

        setProducts(fetchedProducts || []);
        setAllProducts(fetchedProducts || []);
        setCategories(fetchedCategories || []);
        setBrands(fetchedBrands || []);

        // If there's a search query, fetch search results
        if (searchQuery) {
          const data = await searchProducts(searchQuery);
          setSearchResults(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setProducts([]);
        setAllProducts([]);
        setCategories([]);
        setBrands([]);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [language, searchQuery]);

  const applyFilters = useCallback(() => {
    const { categories: selectedCats, brands } = filters;
    let filteredProducts = allProducts;

    if (selectedCats.length > 0) {
      // Récupère tous les IDs enfants d'une catégorie sélectionnée
      const getDescendants = (parentId) => {
        const children = categories.filter(c => c.parent === parentId).map(c => c.idcategory);
        return children.reduce((acc, id) => [...acc, id, ...getDescendants(id)], []);
      };
      const expandedCats = [
        ...selectedCats,
        ...selectedCats.flatMap(id => getDescendants(id)),
      ];

      filteredProducts = filteredProducts.filter((product) => {
        if (!product) return false;
        return product.categories?.some(id => expandedCats.includes(id));
      });
    }

    if (brands.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product && brands.includes(product.brandName)
      );
    }

    setProducts(filteredProducts);
  }, [filters, allProducts]);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1); // Reset to the first page when filters change
  }, [applyFilters]);

  const fetchSearchedProducts = async (query) => {
    try {
      const searchedProducts = await fetchProducts(query);
      setAllProducts(searchedProducts || []);
      setProducts(searchedProducts || []);
      setCurrentPage(1); // Reset to the first page when search results change
    } catch (err) {
      console.error("Error fetching searched products:", err);
      setAllProducts([]);
      setProducts([]);
    }
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between px-4 md:px-8 lg:px-20 xl:px-40 gap-y-4 lg:gap-x-20 mt-14">
        {/* Mobile filter button */}
        <div className="lg:hidden">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-center w-full bg-primary text-white py-2 rounded-md"
          >
            <Filter size={20} className="mr-2 stroke-white" />
            Filters
          </button>
        </div>

        {/* Filters */}
        <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
          <Filters
            onFilterChange={handleFilterChange}
            availableBrands={[...new Set(allProducts.map(p => p.brandName).filter(b => b && b !== "N/A"))]}
            initialCategories={categoryParam ? [isNaN(categoryParam) ? categoryParam : Number(categoryParam)] : []}
          />
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-[1000px] xl:w-full">
          <SearchBar onSearch={fetchSearchedProducts} />
          
          {/* Search Results Section */}
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 2xl:gap-x-4 2xl:gap-y-4 gap-4 lg:gap-x-4 lg:gap-y-10 mb-8">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        categoryName: product.categories?.length
  ? (categories.find(cat => cat.idcategory === product.categories[product.categories.length - 1])?.name
    || categories.find(cat => cat.idcategory === product.categories[0])?.name
    || "N/A")
  : "N/A",
                      }}
                    />
                  ))}
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-8 mb-4">
                <h3 className="text-lg font-medium mb-4">{t('search.allProducts')}</h3>
              </div>
            </div>
          )}

          {/* Regular Products Section */}
          {isLoading ? (
            <LoadingSpinner />
          ) : currentProducts.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
              {t('products.noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 2xl:gap-x-4 2xl:gap-y-4 gap-4 lg:gap-x-4 lg:gap-y-10">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    categoryName: product.categories?.length
  ? (categories.find(cat => cat.idcategory === product.categories[product.categories.length - 1])?.name
    || categories.find(cat => cat.idcategory === product.categories[0])?.name
    || "N/A")
  : "N/A",
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {currentProducts.length > 0 && (
            <div className="flex justify-center gap-2 mt-20 mb-20">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-black'}`}
                >
                  {index + 1}
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