import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ui-react",
      formats: ["es", "umd"],
      fileName: (format) => `ui-react.${format}.js`,
    },
    rollupOptions: {
      external: [
        "@acme/state",
        "@headlessui/react",
        "@hookform/resolvers",
        "@tanstack/react-query",
        "@tanstack/react-table",
        "next",
        "next-themes",
        "nookies",
        "react",
        "react-dom",
        "react-hook-form",
        "react-icons",
        "zod",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
