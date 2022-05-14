import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactSvgPlugin from "vite-plugin-react-svg";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import { qrcode } from "vite-plugin-qrcode";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_CLIENT_",
  plugins: [
    react(),
    qrcode(),
    tsconfigPaths(),
    reactSvgPlugin({
      defaultExport: "url",
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "icons/favicon.ico",
        "robots.txt",
        "icons/apple-touch-icon.png",
        "icons/maskable_icon_x512.png",
      ],
      manifest: false,
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          getCache({
            pattern: /^https:\/\/fonts.googleapis.com/,
            name: "Google-Fonts-Googleapis",
          }),
          getCache({
            pattern: /^https:\/\/fonts.gstatic.com/,
            name: "Google-Fonts-Gstatic",
          }),
          getCache({
            pattern: /assets\/.*\.svg/,
            name: "Svg-Assets",
          }),
        ],
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
  publicDir: "./src/static",
});

function getCache({ name, pattern }: any) {
  return {
    urlPattern: pattern,
    handler: "CacheFirst" as const,
    options: {
      cacheName: name,
      expiration: {
        maxEntries: 500,
        maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
      },
      cacheableResponse: {
        statuses: [200],
      },
    },
  };
}
