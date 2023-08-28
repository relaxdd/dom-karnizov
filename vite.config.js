import { resolve } from "path";
import vitePugPlugin from "vite-plugin-pug-transformer";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  plugins: [vitePugPlugin({})],
  build: {
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
