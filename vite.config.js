import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/

const manifestForPlugin = {
  registerType: "prompt",
  devOptions: {
    enabled: true,
  },
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.png"],
  manifest: {
    name: "Lucidus",
    short_name: "Lucidus",
    description: "An app that can show help student to find internship.",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
