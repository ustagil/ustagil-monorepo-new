import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "utils",
      formats: ["es", "umd"],
      fileName: (format) => `utils.${format}.js`,
    },
    rollupOptions: {
      external: ["@ustagil/typings", "axios", "jwt-decode"],
      output: {
        globals: {},
      },
    },
  },
});
