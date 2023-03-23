import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      //...
      // Actualiza la ruta del archivo principal a index.tsx
      "@/main": "@/index",
    },
  },
});
