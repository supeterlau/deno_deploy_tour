import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, ssr, tw } from "https://crux.land/nanossr@0.0.1";

const messages = [];

const channel = new BroadcastChannel("chat");
channel.onmessage = (event) => {
  messages.push(event.data);
};

function handler(req: Request): Response {
  const url = new URL(req.url);
  console.log("path: ", url.pathname);
  switch (url.pathname) {
    case "/front":
      console.log("URL: ", url);
      const name = url.searchParams.get("name") ?? "Deno";
      console.log("name: ", name);
      return ssr(() => <Front name={name} />);
    case "/send":
      const message = url.searchParams.get("msg");
      if (!message) {
        return new Response("?msg not provided", { status: 400 });
      }
      messages.push(message);
      channel.postMessage(message);
      return new Response("message sent." + message);
    case "/messages":
      return new Response(JSON.stringify(messages), {
        "content-type": "application/json",
      });
    default:
      return new Response("Deno Deploy");
  }
}

const Front = (props) => (
  <div class={tw`bg-white flex h-screen`}>
    <h3 class={tw`text-5xl text-gray-600 m-auto mt-20`}>
      Welcome to {props.name} !
    </h3>
  </div>
);

console.log("Listening on http://localhost:8000");

await serve(handler);

// https://cheap-snake-68.deno.dev/send?msg=111
// https://cheap-snake-68.deno.dev/send?msg=222
// https://cheap-snake-68.deno.dev/messages
