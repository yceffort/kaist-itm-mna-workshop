import next from "next";
import Koa from "koa";
import morgan from "koa-morgan";
import Router from "koa-router";
import mount from "koa-mount";
import humps from "humps";
import proxy from "koa-proxies";

const port = parseInt(process.env.PORT || "80", 10);
const dev = process.env.NODE_ENV !== "production";
const jsonbox_id = "box_dca1183468cd353a9e03";

async function main() {
  const nextApp = next({ dev });
  const app = new Koa();
  const router = new Router();

  await nextApp.prepare();
  const handle = nextApp.getRequestHandler();

  function renderNext(route: string) {
    return (ctx: any) => {
      ctx.res.statusCode = 200;
      ctx.respond = false;

      nextApp.render(ctx.req, ctx.res, route, {
        ...((ctx.request && ctx.request.body) || {}),
        ...ctx.params,
        ...(ctx.query && humps.camelizeKeys(ctx.query))
      });
    };
  }

  router.get("/", renderNext("/index"));
  router.get("/quiz/:chapter/:no", renderNext("/quiz"));
  router.get("/finish", renderNext("/finish"));

  app
    .use(morgan("combined"))
    .use(
      proxy("/api", {
        target: `https://jsonbox.io`,
        rewrite: (path: string) => path.replace(/\/api/, `${jsonbox_id}`),
        changeOrigin: true
      })
    )
    .use(router.routes())
    .use(
      mount("/", (ctx: Koa.Context) => {
        handle(ctx.req, ctx.res);
        ctx.respond = false;
      })
    );

  app.listen(port);
}

main();
