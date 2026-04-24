// vite.config.js
import tailwindcss from "@tailwindcss/vite"; // Import the plugin
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the plugin to the plugins array
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons.svg"],
      manifest: {
        name: "Vision Vibe",
        short_name: "VisionVibe",
        theme_color: "#2563eb",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
});
