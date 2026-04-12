import React from 'react';
import AboutCard from '../components/AboutCard';

const secteurCards = [
  {
    image: '/secteurs/technologie.jpg',
    title: 'Technologie',
  },
  {
    image: '/secteurs/industrie.jpg',
    title: 'Industrie',
  },
  {
    image: '/secteurs/medical.jpg',
    title: 'Médical',
  },
];

const AboutSecteurs = () => {
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Nos Secteurs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {secteurCards.map((card, index) => (
            <AboutCard
              key={index}
              image={card.image}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSecteurs; 