import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Polices toujours servies comme fichiers (jamais en data:) : la politique
    // de sécurité (CSP, vercel.json) n'autorise que font-src 'self'.
    assetsInlineLimit: (file: string) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
  },
});
