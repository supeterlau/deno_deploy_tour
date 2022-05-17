Deno Deploy App

cheap-snake-68.deno.dev

Local Development:

yarn dev

deno run -A --import-map vendor/import_map.json app.tsx --allow-net=:5000 --config tsconfig.json --watch ./app.tsx

deno run -A --import-map vendor/import_map.json --allow-net=:5000 --config tsconfig.json --watch -r ./app.tsx
