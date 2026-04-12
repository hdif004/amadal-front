export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://amadal.ma';
export const WP_URL   = import.meta.env.VITE_WP_URL  || '';

// Préfixe les assets du dossier /public avec le base URL (ex: /amadal-front/)
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
