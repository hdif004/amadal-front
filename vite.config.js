import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { partytownVite } from '@builder.io/partytown/utils';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      partytownVite({ dest: path.join(process.cwd(), 'dist', '~partytown') }),
    ],
    base: '/',
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
            'three-vendor':  ['three', '@react-three/fiber', '@react-three/drei'],
            'maps-vendor':   ['@react-google-maps/api', '@vis.gl/react-google-maps', 'google-map-react'],
            'chart-vendor':  ['recharts'],
            'editor-vendor': ['react-quill', 'react-dnd', 'react-dnd-html5-backend', 'react-beautiful-dnd'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  };
});
