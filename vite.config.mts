/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      include: "src/**/*.{ts,tsx}",
      outDir: "lib",
    }),
  ],
  resolve: {},
  test: {
    globals: true,
  },
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "bundle",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") {
          return "index.js";
        }
        if (format === "cjs") {
          return "index.cjs";
        }
        return "index.js";
      },
    },
    rollupOptions: {},
  },
});
