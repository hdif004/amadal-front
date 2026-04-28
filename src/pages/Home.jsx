import React, { useRef, useEffect, Suspense, lazy } from 'react';
import Navbar from '../sections/Navbar';
import HeroHeader from '../sections/HeroHeader';
import BestProducts from '../sections/BestProducts';
const News = lazy(() => import('../sections/News'));
const BrandsLoop = lazy(() => import('../sections/BrandsLoop'));
const LatestPosts = lazy(() => import('../sections/LatestPosts'));
const VideoPlayer = lazy(() => import('../sections/VideoPlayer'));
const ContactMap = lazy(() => import('../sections/ContactMap'));
import Footer from '../sections/Footer';
import '../index.css';
import NavFilters from '../sections/NavFilters';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../config';

const Home = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const section7Ref = useRef(null);

  // Scroll-reveal : fade-up léger à l'entrée dans le viewport
  useEffect(() => {
    const targets = [
      section2Ref,
      section3Ref,
      section4Ref,
      section5Ref,
      section6Ref,
    ];

    targets.forEach((ref) => {
      if (!ref.current) return;
      ref.current.style.opacity = '0';
      ref.current.style.transform = 'translateY(28px)';
      ref.current.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="no-scrollbar">
      <Helmet>
        <title>Amadal Global Systems | Solutions d'irrigation</title>
        <meta name="description" content="Amadal Global Systems, spécialiste en solutions d'irrigation, équipements agricoles et systèmes hydrauliques au Maroc." />
        <meta property="og:title" content="Amadal Global Systems | Solutions d'irrigation" />
        <meta property="og:description" content="Amadal Global Systems, spécialiste en solutions d'irrigation, équipements agricoles et systèmes hydrauliques au Maroc." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/AmadalGreen.webp`} />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>
      <Navbar />

      <div ref={section1Ref}>
        <HeroHeader />
      </div>

      <div ref={section2Ref} className="mt-4">
        <BestProducts />
      </div>

      <Suspense fallback={null}>
        <div ref={section3Ref} className="mt-12 lg:mt-16">
          <News />
        </div>

        <div ref={section4Ref} className="mt-12 lg:mt-16">
          <BrandsLoop />
        </div>

        <div ref={section5Ref} className="mt-12 lg:mt-16">
          <LatestPosts />
        </div>

        <div className="mt-12 lg:mt-16">
          <VideoPlayer />
        </div>

        <div ref={section6Ref} className="mt-12 lg:mt-16">
          <ContactMap />
        </div>
      </Suspense>

      <Footer
        section1Ref={section1Ref}
        section2Ref={section2Ref}
        section3Ref={section3Ref}
        section4Ref={section4Ref}
        section5Ref={section5Ref}
        section6Ref={section6Ref}
      />
    </div>
  );
};

export default Home;
