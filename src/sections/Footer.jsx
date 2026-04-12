import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { asset } from "../config";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("navbar.home") },
    { to: "/products", label: t("navbar.products") },
    { to: "/blog", label: t("navbar.blog") },
    { to: "/posts", label: t("navbar.posts") },
    { to: "/about", label: t("navbar.about") },
    { to: "/contact", label: t("navbar.contact") },
  ];

  return (
    <footer className="bg-primary text-white">

      {/* Corps principal */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">

          {/* ── Colonne 1 : Logo + tagline + réseaux ── */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link to="/">
              <img src={asset("AmadalWhite.svg")} alt="Amadal Global Systems" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-[260px]">
              Spécialiste en solutions d'irrigation, équipements agricoles et systèmes hydrauliques au Maroc.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              <a href="https://web.facebook.com/AMADALGLOBAL/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/amadal_global_systems/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/amadal-global-systems" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Colonne 2 : Navigation ── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
              {t("footer.quickLinks")}
            </h3>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne 3 : Contact ── */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
              {t("footer.contact")}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="text-sm text-white/70 leading-relaxed">
                  121, rue Radi Slaoui, Belvédère<br />Casablanca, Maroc
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:amadal.distribution@gmail.com"
                  className="text-sm text-white/70 hover:text-white transition-colors break-all">
                  amadal.distribution@gmail.com
                </a>

              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                </svg>
                <span className="text-sm text-white/70 leading-relaxed flex flex-col gap-1">
                  <a href="tel:+212522404987" className="hover:text-white transition-colors">+212 522 404 987</a>
                  <a href="tel:+212600008321" className="hover:text-white transition-colors">+212 600 008 321</a>
                  <a href="tel:+212600008318" className="hover:text-white transition-colors">+212 600 008 318</a>
                  <a href="tel:+212600307777" className="hover:text-white transition-colors">+212 600 307 777</a>
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Barre bas */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Amadal Global Systems. {t("footer.rights")}.
          </p>
          <Link to="/privacy-policy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
