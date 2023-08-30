const indexDir = "/html/";

export default function () {
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
