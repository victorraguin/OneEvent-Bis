import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Pré-rendu (vite build --ssr) : ce paquet CommonJS est inclus dans le
  // bundle serveur pour que son export par défaut soit résolu correctement.
  ssr: {
    noExternal: ['react-fast-marquee'],
  },
});
