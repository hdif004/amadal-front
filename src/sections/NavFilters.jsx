import React, { useEffect, useState } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import NavFiltersCard from '../components/NavFiltersCard';

const NavFilters = () => {
  const NavFiltersData = [
    { id: 1, name: 'TUBES' },
    { id: 2, name: 'RACCORDS' },
    { id: 3, name: 'VANNES' },
    { id: 4, name: 'ACCESSOIRES' },
    { id: 5, name: 'AROSAGE' },
    { id: 6, name: 'ACCESSOIRES DE POMPAGE' },
    { id: 7, name: 'ACCESSOIRES DE POMPAGE' },
    { id: 8, name: 'ACCESSOIRES DE POMPAGE' },
    { id: 9, name: 'ACCESSOIRES DE POMPAGE' },
    { id: 10, name: 'ACCESSOIRES DE POMPAGE' },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      setTotalSlides(emblaApi.slideNodes().length);

      const onSelect = () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);
      onSelect(); // Set initial index

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <div className="bg-white h-20 w-full mt-[60px] flex items-center overflow-hidden">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex">
          {NavFiltersData.map((card) => (
            <div key={card.id} className="flex px-5">
              <NavFiltersCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavFilters;
