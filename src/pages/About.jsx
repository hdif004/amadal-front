import React from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../config';
import AboutHeader from '../sections/AboutHeader';
import AboutSecteurs from '../sections/AboutSecteurs';
import AboutPiliers from '../sections/AboutPiliers';

const About = () => {
  return (
    <>
      <Helmet>
        <title>À propos | Amadal Global Systems</title>
        <meta name="description" content="Découvrez Amadal Global Systems, notre histoire, nos valeurs et notre expertise dans les solutions d'irrigation et équipements agricoles au Maroc." />
        <meta property="og:title" content="À propos | Amadal Global Systems" />
        <meta property="og:description" content="Découvrez Amadal Global Systems, notre histoire, nos valeurs et notre expertise dans les solutions d'irrigation et équipements agricoles au Maroc." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/AmadalGreen.png`} />
        <link rel="canonical" href={`${SITE_URL}/about`} />
      </Helmet>

      <Navbar />

      <div className="pt-16">
        <AboutHeader />
        <AboutSecteurs />
        <AboutPiliers />
      </div>

      <Footer />
    </>
  );
};

export default About;
