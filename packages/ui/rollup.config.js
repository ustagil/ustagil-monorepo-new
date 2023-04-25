import dotenv from "dotenv";
import glob from "glob";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";

dotenv.config();

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const isProd = process.env.NODE_ENV === "production" ?? false;

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("isProd:", isProd);

export default defineConfig({
  input: Object.fromEntries(
    glob
      .sync("src/**/*[!.stories|!.d].{ts,tsx}")
      .map((file) => [
        path.relative(
          "src",
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ])
  ),
  output: [
    {
      dir: "dist",
      format: "esm",
      sourcemap: isProd,
    },
  ],
  plugins: [
    // peerDepsExternal(),
    // resolve({
    //   extensions: [".ts", ".tsx", ".js", ".jsx"],
    //   preferBuiltins: true,
    //   browser: true,
    // }),
    // commonjs(),
    typescript({
      tsconfig: isProd ? "tsconfig.json" : "tsconfig.dev.json",
      clean: true,
      check: false,
    }),
    // isProd &&
    //   terser({
    //     module: true,
    //     format: {
    //       ecma: 6,
    //     },
    //   }),
    // visualizer(),
  ],
  external: [
    // ...Object.keys(pkg.dependencies ?? {}),
    // ...Object.keys(pkg.devDependencies ?? {}),
    // ...Object.keys(pkg.peerDependencies ?? {}),
  ],
});
