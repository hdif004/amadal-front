import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Navbar from "../sections/Navbar";
import ProductsSections from "../sections/ProductsSections";
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../config';

const Products = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <Helmet>
        <title>Produits | Amadal Global Systems</title>
        <meta name="description" content="Explorez notre catalogue complet de produits d'irrigation, pompes, systèmes goutte-à-goutte et équipements agricoles." />
        <meta property="og:title" content="Produits | Amadal Global Systems" />
        <meta property="og:description" content="Explorez notre catalogue complet de produits d'irrigation, pompes, systèmes goutte-à-goutte et équipements agricoles." />
        <meta property="og:url" content={`${SITE_URL}/products`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${SITE_URL}/products`} />
      </Helmet>
      <Navbar />
      <div className="mt-16 sm:mt-20">
        <Breadcrumb />
        <ProductsSections />
      </div>
    </div>
  );
};

export default Products;
