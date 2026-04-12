import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../sections/Navbar';
import { Helmet } from 'react-helmet-async';
import AboutHeader from '../sections/AboutHeader';
import AboutSecteurs from '../sections/AboutSecteurs';
import AboutPiliers from '../sections/AboutPiliers';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    const sections = gsap.utils.toArray('.section');
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelector('.content'),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Helmet>
        <title>À propos | Amadal Global Systems</title>
        <meta name="description" content="Découvrez Amadal Global Systems, notre histoire, nos valeurs et notre expertise dans les solutions d'irrigation et équipements agricoles au Maroc." />
        <meta property="og:title" content="À propos | Amadal Global Systems" />
        <meta property="og:description" content="Découvrez Amadal Global Systems, notre histoire, nos valeurs et notre expertise dans les solutions d'irrigation et équipements agricoles au Maroc." />
        <meta property="og:url" content="https://amadal.ma/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://amadal.ma/about" />
      </Helmet>
      <Navbar />
      <div className="section">
        <div className="content">
          <AboutHeader />
        </div>
      </div>
      <div className="section">
        <div className="content">
          <AboutSecteurs />
        </div>
      </div>
      <div className="section">
        <div className="content">
          <AboutPiliers />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;