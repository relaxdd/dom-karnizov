import { join, resolve } from "path";
import { defineConfig } from "vite";
import * as glob from "glob";
import vitePluginPugTransform from "./vite-plugins/vite-plugin-pug-transform.js";
import vitePluginIndexDir from "./vite-plugins/vite-plugin-index-dir.js";

const locals = { bundler: "Vite" };

export default defineConfig({
  plugins: [
    vitePluginIndexDir(),
    vitePluginPugTransform({
      pugLocals: locals,
      pugOptions: {
        basedir: resolve(__dirname, "src", "pug"),
      },
    }),
  ],
  base: "/dom-karnizov/",
  // appType: "mpa",
  root: join(__dirname, "src"),
  publicDir: join(__dirname, "public"),
  resolve: {
    alias: { "/src": resolve(process.cwd(), "src") },
  },
  build: {
    outDir: join(__dirname, "dist"),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: glob.sync("./src/html/**/*.html"),
    },
  },
});
