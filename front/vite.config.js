import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cspweb/",
  server: {
    host: "0.0.0.0",
    port: 8000,
    proxy: {
      // всё, что идёт на /api, будет редиректиться:
      "/api": {
        target: "http://cspweb.ru",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
