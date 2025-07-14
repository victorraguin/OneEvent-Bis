import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Permet l'accès depuis d'autres appareils sur le réseau
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
