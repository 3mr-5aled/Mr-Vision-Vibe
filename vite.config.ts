// vite.config.js
import tailwindcss from "@tailwindcss/vite"; // Import the plugin
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the plugin to the plugins array
  ],
});
