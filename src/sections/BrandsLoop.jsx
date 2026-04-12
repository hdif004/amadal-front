import React from "react";
import { useTranslation } from "react-i18next";
import Rain from "../assets/logocarousel/Rain.png";
import RainBird from "../assets/logocarousel/RainBird.png";
import Hunter from "../assets/logocarousel/Hunter.png";
import Cepex from "../assets/logocarousel/Cepex.png";
import Azud from "../assets/logocarousel/Azud.png";
import Astore from "../assets/logocarousel/Astore.png";
import Effast from "../assets/logocarousel/Effast.png";
import Hidroten from "../assets/logocarousel/Hidroten.png";
import Plastica from "../assets/logocarousel/Plastica.png";

const logos = [
  { src: Azud, alt: "Azud" },
  { src: RainBird, alt: "Rain Bird" },
  { src: Hunter, alt: "Hunter" },
  { src: Astore, alt: "Astore" },
  { src: Hidroten, alt: "Hidroten" },
  { src: Effast, alt: "Effast" },
  { src: Plastica, alt: "Plastica" },
  { src: Cepex, alt: "Cepex" },
  { src: Rain, alt: "Rain" },
];

const BrandsLoop = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#f7faf9] py-12 lg:py-16">

      {/* En-tête */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 mb-10 flex flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
            {t("brands.label")}
          </span>
          <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {t("brands.title")}
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients latéraux */}
        <div className="absolute left-0 top-0 w-16 lg:w-40 h-full bg-gradient-to-r from-[#f7faf9] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-16 lg:w-40 h-full bg-gradient-to-l from-[#f7faf9] to-transparent pointer-events-none z-10" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee items-center">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-8 lg:mx-14 flex items-center justify-center
                           grayscale opacity-50 hover:grayscale-0 hover:opacity-100
                           transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 lg:h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default BrandsLoop;
