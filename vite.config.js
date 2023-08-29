import { join, resolve } from "path";
import vitePugPlugin from "vite-plugin-pug-transformer";
import { defineConfig } from "vite";
import * as glob from "glob";

const indexDir = "/html/";

const middleware = () => {
  return {
    name: "middleware",
    apply: "serve",
    configureServer(viteDevServer) {
      return () => {
        viteDevServer.middlewares.use(async (req, res, next) => {
          const parts = req.originalUrl.split("/");

          if (parts.at(-1) === "")
            req.url = indexDir + req.originalUrl + "index.html";
          else {
            if (parts.at(-1).endsWith(".html"))
              req.url = indexDir + req.url;
            else {
              res.writeHead(302, { "Location": req.originalUrl + "/" });
              next();
            }
          }

          // if (!req.originalUrl.endsWith(".html") && req.originalUrl !== "/")
          //   req.url = indexDir + req.originalUrl + ".html";
          // else if (req.url === "/index.html")
          //   req.url = indexDir + req.url;

          next();
        });
      };
    },
  };
};

export default defineConfig({
  plugins: [
    middleware(),
    vitePugPlugin({}),
  ],
  // base: '/dom-karnizov/',
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
