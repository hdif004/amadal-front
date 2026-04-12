import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: mode === 'production' ? '/amadal-front/' : '/',
    server: {
      proxy: {
        '/wp-json': {
          target: env.VITE_WP_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor':     ['embla-carousel-react', 'react-leaflet', 'leaflet'],
            'i18n-vendor':   ['i18next', 'react-i18next'],
            'helmet-vendor': ['react-helmet-async'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  };
});
