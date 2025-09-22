import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/kendra-scott": {
        target: "https://www.kendrascott.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kendra-scott/, ""),
        headers: {
          "X-Frame-Options": "ALLOWALL",
          "Content-Security-Policy": "",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
