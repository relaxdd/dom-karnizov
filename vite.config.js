import { resolve } from "path";
import vitePugPlugin from "vite-plugin-pug-transformer";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/dom-karnizov/',
  appType: "mpa",
  plugins: [
    vitePugPlugin({}),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        checkout: resolve(__dirname, "checkout.html"),
        signin: resolve(__dirname, "signin.html"),
        signup: resolve(__dirname, "signup.html"),
        designer: resolve(__dirname, "designer.html"),
        about: resolve(__dirname, "about.html"),
        delivery: resolve(__dirname, "delivery.html"),
        payment: resolve(__dirname, "payment.html"),
        price: resolve(__dirname, "price.html"),
      },
    },
  },
});
