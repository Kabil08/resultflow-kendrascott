import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/proxy": {
        target: "https://www.kendrascott.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            // Remove existing security headers
            proxyReq.removeHeader("Content-Security-Policy");
            proxyReq.removeHeader("X-Frame-Options");

            // Add permissive headers
            proxyReq.setHeader("Content-Security-Policy", "");
            proxyReq.setHeader("X-Frame-Options", "ALLOWALL");
          });
        },
      },
    },
    cors: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
