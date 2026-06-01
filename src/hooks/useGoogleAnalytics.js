import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-XD5SJCEC13';

/**
 * Envoie un page_view à GA4 à chaque changement de route.
 * Nécessaire pour les SPA : gtag('config') n'envoie pas de page_view
 * sur les navigations client (il est configuré avec send_page_view: false
 * dans index.html). Ce hook prend le relais pour toutes les pages vues.
 */
export default function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [location]);
}
