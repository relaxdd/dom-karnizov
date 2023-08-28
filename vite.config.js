import { resolve } from "path";
import vitePugPlugin from "vite-plugin-pug-transformer";
import { defineConfig } from "vite";

export default defineConfig({
  // root: "src",
  base: "./",
  appType: "mpa",
  plugins: [vitePugPlugin({})],
  build: {
    outDir: resolve(__dirname, "dist"),
    assetsDir: resolve(__dirname, "assets"),
    manifest: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        order: resolve(__dirname, "order.html"),
        signin: resolve(__dirname, "signin.html"),
        signup: resolve(__dirname, "signup.html"),
        designer: resolve(__dirname, "designer.html"),
      },
    },
  },
});
