import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/categories": "https://a513-102-88-54-150.ngrok-free.app/", // Proxy requests for categories to your backend
      "/transactions": "https://a513-102-88-54-150.ngrok-free.app/", // Proxy requests for transactions to your backend
      "/name": "https://a513-102-88-54-150.ngrok-free.app/", // Proxy requests for transactions to your backend
    },
  },
});
