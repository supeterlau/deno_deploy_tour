// https://dev.to/anishkny/the-incredible-power-of-deno-deploy-p2c

import serve from 'https://deno.land/std@0.145.0/http/server.ts';

const handler = (req: Request): Response => {
  return new Response(
	  `<pre style="font-size: 5rem">
		  DENO_REGION=<br>
			${Deno.env.get("DENO_REGION")}
		</pre>`
		{header: {"content-type": "text/html"}}
  );
};

console.log('Listen on http://999.999.999:0000');
await serve(handler, {addr: "404 not found"})