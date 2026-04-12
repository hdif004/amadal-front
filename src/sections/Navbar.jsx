import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { searchProducts } from "../api/api";
import { asset } from "../config";

/* ── Lien de navigation avec état actif ─────────────────────────── */
const NavLink = ({ path, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`text-[13px] font-bold uppercase tracking-widest transition-colors duration-200
        ${isActive ? "text-primary" : "text-gray-600 hover:text-primary"}`}
    >
      {label}
    </Link>
  );
};

/* ── Sélecteur de langue ────────────────────────────────────────── */
const LanguageSelector = ({ light = false }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const other = language === "fr" ? "en" : "fr";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest transition-colors
          ${light ? "text-gray-600 hover:text-primary" : "text-primary hover:text-primary/70"}`}
      >
        {language}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2.5} stroke="currentColor"
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <button
            onClick={() => { setLanguage(other); setIsOpen(false); }}
            className="block w-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-widest
                       text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors text-left"
          >
            {other}
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Navbar principale ──────────────────────────────────────────── */
const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);

  /* Ferme les suggestions au clic extérieur */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Ombre navbar au scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Bloque le scroll body quand menu mobile ouvert */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 2) {
      try {
        const data = await searchProducts(val);
        setSuggestions(data.slice(0, 6));
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setMobileOpen(false);
  };

  const handleSuggestionClick = (s) => {
    navigate(`/products/${encodeURIComponent(s.name)}/${s.id}`);
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setMobileOpen(false);
  };

  const links = [
    { path: "/", label: t("navbar.home") },
    { path: "/products", label: t("navbar.products") },
    { path: "/blog", label: t("navbar.blog") },
    { path: "/posts", label: t("navbar.posts") },
    { path: "/about", label: t("navbar.about") },
    { path: "/contact", label: t("navbar.contact") },
  ];

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-[9999] bg-white transition-shadow duration-300
                       ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={asset("AmadalGreen.png")} alt="Amadal Global Systems" className="h-8 lg:h-9 w-auto" />
            </Link>

            {/* Liens desktop */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {links.map((l) => (
                <NavLink key={l.path} path={l.path} label={l.label} />
              ))}
            </div>

            {/* Droite desktop : search + langue */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Barre de recherche */}
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl
                             px-3 py-2 w-[200px] xl:w-[250px] focus-within:border-primary
                             focus-within:bg-white transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder={t("navbar.search")}
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
                  />
                </form>

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl
                                 shadow-xl border border-gray-100 z-50 overflow-hidden">
                    {suggestions.map((s) => (
                      <li key={s.id}
                        onClick={() => handleSuggestionClick(s)}
                        className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                        {s.imageURL && (
                          <img src={s.imageURL} alt={s.name}
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                        )}
                        <span className="text-sm text-gray-700 truncate">{s.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Séparateur + langue */}
              <div className="w-px h-5 bg-gray-200" />
              <LanguageSelector />
            </div>

            {/* Bouton hamburger mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 flex-shrink-0"
              aria-label="Ouvrir le menu"
            >
              <span className="w-full h-0.5 bg-primary rounded-full" />
              <span className="w-5 h-0.5 bg-primary rounded-full" />
              <span className="w-full h-0.5 bg-primary rounded-full" />
            </button>

          </div>
        </div>
      </nav>

      {/* ── Menu mobile ───────────────────────────────────────────── */}

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-[9998] lg:hidden transition-opacity duration-300
                    ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer depuis la droite */}
      <div className={`fixed top-0 right-0 h-full w-full bg-white z-[9999] lg:hidden
                       flex flex-col shadow-2xl
                       transition-transform duration-300 ease-out
                       ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* En-tête drawer */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src={asset("AmadalGreen.png")} alt="Amadal Global Systems" className="h-7 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Liens */}
        <nav className="flex flex-col px-6 py-6 gap-1 flex-1 overflow-y-auto">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-bold uppercase tracking-widest text-gray-700
                         hover:text-primary hover:bg-gray-50 px-3 py-3 rounded-xl
                         transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Bas du drawer : search + langue */}
        <div className="px-6 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-4">
          <form onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5
                       focus-within:border-primary focus-within:bg-white transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder={t("navbar.search")}
              value={query}
              onChange={handleSearchChange}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </form>

          {/* Suggestions mobile */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
              {suggestions.map((s) => (
                <li key={s.id}
                  onClick={() => handleSuggestionClick(s)}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                  {s.imageURL && (
                    <img src={s.imageURL} alt={s.name}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                  )}
                  <span className="text-sm text-gray-700 truncate">{s.name}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Langue</span>
            <LanguageSelector light />
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
