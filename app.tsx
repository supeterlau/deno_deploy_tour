import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, ssr, tw } from "https://crux.land/nanossr@0.0.1";

function handler(req: Request): Response {
  const url = new URL(req.url);
  console.log("URL: ", url);
  const name = url.searchParams.get("name") ?? "Deno";
  console.log("name: ", name);
  // return new Response("Deno Deploy");
  return ssr(() => <Front nmae={name} />);
}

const Front = (props) => (
  <div class={tw`bg-white flex h-screen`}>
    <h3 class={tw`text-5xl text-gray-600 m-auto mt-20`}>
      Welcome {props.name} !
    </h3>
  </div>
);

console.log("Listening on http://localhost:8000");

await serve(handler);
