import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/logo-192.jpg", "icons/logo-512.jpg"],
      manifest: {
        name: "RogueShore",
        short_name: "RogueShore",
        description: "A modern e-commerce web application.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#A67C68",
        icons: [
          {
            src: "icons/logo-192.jpg",
            sizes: "192x192",
            type: "image/jpeg",
          },
          {
            src: "icons/logo-512.jpg",
            sizes: "512x512",
            type: "image/jpeg",
          },
          {
            src: "icons/logo-512.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
