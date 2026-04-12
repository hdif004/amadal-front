import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/api";

const Filters = ({ onFilterChange, availableBrands = [], initialCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandsOpen, setBrandsOpen] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(err => console.error("Erreur fetchCategories:", err));
  }, []);

  useEffect(() => {
    onFilterChange({ categories: selectedCategories, brands: selectedBrands });
  }, [selectedCategories, selectedBrands, onFilterChange]);

  const toggleCategory = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0;

  const allFilters = [
    ...categories,
    { idcategory: "none", name: "Autre" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24 w-full lg:w-[240px] flex flex-col gap-5 max-h-[calc(100vh-7rem)] overflow-y-auto filters-scroll">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Filtres</h2>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">
            Tout effacer
          </button>
        )}
      </div>

      {/* Catégories */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Catégories</p>
        <ul className="flex flex-col gap-1">
          {allFilters.map((cat) => {
            const active = selectedCategories.includes(cat.idcategory);
            return (
              <li key={cat.idcategory}>
                <button
                  onClick={() => toggleCategory(cat.idcategory)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    active ? "bg-primary/10 text-primary font-semibold" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                  {active && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Marques — tiroir */}
      {availableBrands.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setBrandsOpen(!brandsOpen)}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-1"
          >
            <span>Marques</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${brandsOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${brandsOpen ? "max-h-96" : "max-h-0"}`}>
            <ul className="flex flex-col gap-1 pt-2">
              {availableBrands.map((brand) => {
                const active = selectedBrands.includes(brand);
                return (
                  <li key={brand}>
                    <button
                      onClick={() => toggleBrand(brand)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        active ? "bg-primary/10 text-primary font-semibold" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {brand}
                      {active && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
