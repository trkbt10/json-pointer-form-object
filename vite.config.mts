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
    minify: "terser",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => {
        return `[name].${format === "es" ? "js" : "cjs"}`;
      },
    },
    rollupOptions: {},
  },
});
