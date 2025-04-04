/* eslint-disable camelcase */
/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"]
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
        }
    }
});
