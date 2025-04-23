/* eslint-disable camelcase */
/* eslint-disable no-undef */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        svgr({
            svgrOptions: {
                icon: true,
                exportType: "named",
                namedExport: "ReactComponent"
            }
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
