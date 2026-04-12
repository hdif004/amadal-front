import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/wp-json': {
        target: 'http://amadal.local',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
