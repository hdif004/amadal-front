import React from 'react';
import AboutCard from '../components/AboutCard';

const pilierCards = [
  {
    image: '/piliers/innovation.jpg',
    title: 'Innovation',
    description: 'Pour assurer une qualité et une précision de premier plan.'
  },
  {
    image: '/piliers/expertise.jpg',
    title: 'Expertise',
    description: 'Notre équipe possède une expertise approfondie dans divers domaines.'
  },
  {
    image: '/piliers/qualite.jpg',
    title: 'Qualité',
    description: 'Nous nous engageons à maintenir les plus hauts standards de qualité.'
  },
];

const AboutPiliers = () => {
  return (
    <section className="min-h-screen flex items-center bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Nos Piliers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {pilierCards.map((card, index) => (
            <AboutCard
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPiliers; 