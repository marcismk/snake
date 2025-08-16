import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/store": "/src/store",
      "@/components": "/src/components",
      "@/config": "/src/config",
    },
  },
});
