import { h, renderSSR, Helmet } from "./deps.ts";
import { Status, Application, Router } from "./deps.ts";

import { SubApp } from "./components/SubApp.tsx";

// import { createRequire } from "https://deno.land/std@0.139.0/node/module.ts";

// const require = createRequire(import.meta.url);
// console.log(new URL("http://example.com/a/b?q=c"));

const App = () => (
  <div>
    <Helmet>
      <html lang="en" amp />
      <title>Nano App</title>
      <meta name="description" content="Server Side Rendered Nano JSX App" />
    </Helmet>

    <SubApp />
    <Helmet footer>
      <script src="/scripts.js"></script>
    </Helmet>
    <h1>Yep</h1>
  </div>
);

const ssr = renderSSR(<App />);
const { body, head, footer, attributes } = Helmet.SSR(ssr);

const html = `
<!DOCTYPE html>
<html ${attributes.html.toString()}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${head.join("\n")}
</head>
<body ${attributes.body.toString()}>
${body}
${footer.join("\n")}
</body>
</html>
`;

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = html;
});

const ask = async (url: string) => {
  try {
    const res = await fetch(url)
    console.log(res)
    return await res.text()
  } catch(err){
    console.error(err)
    return JSON.stringify(err)
  }
}
router.get("/proxy", async (ctx) => {
  const {response: res, request: req} = ctx
  const toUrl = (new URLSearchParams(req.url.search)).get('to') || "www.baidu.com"
  console.log(toUrl)
  const content = await ask(toUrl)
  
  // const match = req.url.match(/\?to=(.*)/)
  //if(match){
  //  console.log(`To: ${match[1]}`)
  // }
  // res.body = { hello: "oak" };

res.body = content
  res.type = "text";
  res.status = Status.OK;
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ port }) => {
  console.log(`Deno App Listening on: http://localhost:${port}`);
});

await app.listen({ port: 5000 });
