import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, LayoutGrid } from "lucide-react";

const CARD_COLORS = [
  { border: "border-l-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  { border: "border-l-blue-500",    bg: "bg-blue-50",    text: "text-blue-700"    },
  { border: "border-l-orange-500",  bg: "bg-orange-50",  text: "text-orange-700"  },
  { border: "border-l-purple-500",  bg: "bg-purple-50",  text: "text-purple-700"  },
  { border: "border-l-rose-500",    bg: "bg-rose-50",    text: "text-rose-700"    },
  { border: "border-l-teal-500",    bg: "bg-teal-50",    text: "text-teal-700"    },
  { border: "border-l-amber-500",   bg: "bg-amber-50",   text: "text-amber-700"   },
  { border: "border-l-indigo-500",  bg: "bg-indigo-50",  text: "text-indigo-700"  },
];

const CategoryPicker = ({ categories }) => (
  <section className="px-4 md:px-8 lg:px-20 xl:px-40 mt-14 mb-20">
    <div className="flex items-end justify-between mb-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Nos Produits</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Sélectionnez une catégorie pour explorer les produits correspondants
        </p>
      </div>
      <Link
        to="?all=true"
        className="hidden sm:flex items-center gap-1.5 text-sm text-primary hover:underline flex-shrink-0 mb-1"
      >
        <LayoutGrid size={15} />
        Voir tout
      </Link>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {categories.map((cat, index) => {
        const color = CARD_COLORS[index % CARD_COLORS.length];
        return (
          <Link
            key={cat.idcategory}
            to={`?category=${cat.idcategory}`}
            className={`group flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 border-l-4 ${color.border} p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-lg ${color.bg} ${color.text} flex items-center justify-center font-bold text-sm flex-shrink-0`}
              >
                {cat.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                {cat.name}
              </span>
            </div>
            <ChevronRight
              size={16}
              className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0"
            />
          </Link>
        );
      })}
    </div>

    {/* "Voir tout" pour mobile */}
    <div className="sm:hidden mt-6 text-center">
      <Link
        to="?all=true"
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
      >
        <LayoutGrid size={15} />
        Voir tous les produits
      </Link>
    </div>
  </section>
);

export default CategoryPicker;
