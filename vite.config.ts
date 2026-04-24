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
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.svg", "icons.svg"],
      manifest: {
        name: "Vision Vibe",
        short_name: "VisionVibe",
        description: "Analyze the vibe of your images with Gemini AI",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
