/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src")
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setup.ts"
    }
});
