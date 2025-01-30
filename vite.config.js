import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/categories": "https://api.npoint.io/f06685e7b9e1b0776d0b", // Proxy requests for categories to your backend
      "/transactions": "https://api.npoint.io/f06685e7b9e1b0776d0b", // Proxy requests for transactions to your backend
      "/name": "https://api.npoint.io/f06685e7b9e1b0776d0b", // Proxy requests for transactions to your backend
    },
  },
});
