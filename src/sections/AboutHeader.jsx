import React from 'react';

const stats = [
  { value: "20+", label: "Années d'expérience" },
  { value: "500+", label: "Produits distribués" },
  { value: "3", label: "Secteurs d'activité" },
  { value: "100%", label: "Service client" },
];

const AboutHeader = () => {
  return (
    <>
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texte */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/50" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">À propos</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Qui sommes-nous ?
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                <strong className="text-gray-900">AMADAL GLOBAL SYSTEMS</strong> est un acteur de référence
                au Maroc dans la distribution de vannes, raccords et équipements en thermoplastique
                pour les secteurs de l'irrigation, de l'industrie et des piscines.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Notre mission est de fournir des solutions fiables et performantes partout au Maroc,
                en alliant <span className="text-primary font-medium">recherche</span> — pour anticiper et satisfaire
                les besoins spécifiques de nos clients — et <span className="text-primary font-medium">technologie</span> —
                pour garantir une qualité et une précision de premier plan.
              </p>

              {/* Citation */}
              <blockquote className="border-l-4 border-primary pl-5 py-1">
                <p className="text-gray-700 italic text-sm leading-relaxed">
                  "AMADAL GLOBAL SYSTEMS répond aux plus hauts standards du marché."
                </p>
              </blockquote>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}
                  className="bg-[#f7faf9] rounded-2xl p-6 flex flex-col gap-2 border border-gray-100">
                  <span className="text-3xl lg:text-4xl font-bold text-primary">{s.value}</span>
                  <span className="text-sm text-gray-500 leading-snug">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHeader;
