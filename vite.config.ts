/* eslint-disable camelcase */
/* eslint-disable no-undef */
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import { generateSitemap } from "./scripts/generate-sitemap";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "generate-sitemap",
      async closeBundle() {
        if (process.env.NODE_ENV === "production") {
          await generateSitemap();
        }
      }
    },
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent"
      }
    }),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
        additionalData: `$layout-scope: true;`
      }
    }
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        unsafe: true
      }
    },
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          const defaultName = "assets/[name]-[hash][extname]";
          if (!assetInfo.name) return defaultName;

          if (assetInfo.name.includes("style.scss")) {
            return "assets/css/layout-[hash][extname]";
          }
          return defaultName;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        manualChunks: {
          bootstrap: ["bootstrap"],
          admin: ["~/styles/admin.css"]
        }
      }
    }
  }
});
