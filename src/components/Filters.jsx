import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/api";

const ChevronIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={2} stroke="currentColor"
    className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const Filters = ({ onFilterChange, availableBrands = [], initialCategories = [] }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [openParents, setOpenParents] = useState({});
  const [catsOpen, setCatsOpen] = useState(true);
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
    const cat = categories.find(c => c.idcategory === id);
    const isParent = cat?.parent === 0;

    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        // Désélectionner
        return prev.filter(c => c !== id);
      }
      if (isParent) {
        // Sélectionner parent → retirer tous ses enfants
        const childIds = categories.filter(c => c.parent === id).map(c => c.idcategory);
        return [...prev.filter(c => !childIds.includes(c)), id];
      } else {
        // Sélectionner enfant → retirer le parent
        const parentId = cat?.parent;
        return [...prev.filter(c => c !== parentId), id];
      }
    });
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleParent = (id) => {
    setOpenParents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0;
  const parents = categories.filter(c => c.parent === 0);
  const children = (parentId) => categories.filter(c => c.parent === parentId);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24 w-full lg:w-[240px] flex flex-col gap-3 max-h-[calc(100vh-7rem)] overflow-y-auto filters-scroll">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold text-gray-900">Filtres</h2>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">
            Tout effacer
          </button>
        )}
      </div>

      {/* Tiroir Catégories */}
      <div className="border-t border-gray-100 pt-3">
        <button
          onClick={() => setCatsOpen(!catsOpen)}
          className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-1"
        >
          <span>Catégories</span>
          <ChevronIcon open={catsOpen} />
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${catsOpen ? "max-h-[600px]" : "max-h-0"}`}>
          <ul className="flex flex-col gap-0.5 pt-2">
            {parents.map((parent) => {
              const activeParent = selectedCategories.includes(parent.idcategory);
              const subs = children(parent.idcategory);
              const isOpen = openParents[parent.idcategory] ?? false;

              return (
                <li key={parent.idcategory}>
                  {/* Ligne parent : clic gauche = filtre, chevron = ouvre tiroir */}
                  <div className={`flex items-center rounded-lg transition-colors ${activeParent ? "bg-primary/10" : "hover:bg-gray-50"}`}>
                    <button
                      onClick={() => toggleCategory(parent.idcategory)}
                      className={`flex-1 text-left px-3 py-2 text-sm font-medium ${activeParent ? "text-primary" : "text-gray-700"}`}
                    >
                      {parent.name}
                    </button>
                    <div className="flex items-center gap-1 pr-2">
                      {activeParent && <CheckIcon />}
                      {subs.length > 0 && (
                        <button onClick={() => toggleParent(parent.idcategory)} className="p-0.5">
                          <ChevronIcon open={isOpen} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sous-catégories */}
                  {subs.length > 0 && (
                    <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                      <ul className="ml-3 pl-3 border-l border-gray-100 flex flex-col gap-0.5 py-1">
                        {subs.map((sub) => {
                          const activeSub = selectedCategories.includes(sub.idcategory);
                          return (
                            <li key={sub.idcategory}>
                              <button
                                onClick={() => toggleCategory(sub.idcategory)}
                                className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                                  activeSub ? "bg-primary/10 text-primary font-semibold" : "text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {sub.name}
                                {activeSub && <CheckIcon />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Tiroir Marques */}
      {availableBrands.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <button
            onClick={() => setBrandsOpen(!brandsOpen)}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-1"
          >
            <span>Marques</span>
            <ChevronIcon open={brandsOpen} />
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
                      {active && <CheckIcon />}
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
