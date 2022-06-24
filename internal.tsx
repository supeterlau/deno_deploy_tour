// https://dev.to/anishkny/the-incredible-power-of-deno-deploy-p2c

import {serve} from 'https://deno.land/std@0.145.0/http/server.ts';

const handler = (req: Request): Response => {
  return new Response(
	  `<pre style="font-size:3rem;">
DENO_REGION=<br>
${Deno.env.get("DENO_REGION")}
</pre>`,
		{headers: {"content-type": "text/html"}}
  );
};

console.log('Listen on http://999.999.999:0000');
// await serve(handler, {hostname: "404 not found", port: 0})

await serve(handler);

// serve((_req) => new Response("Hello, world"));