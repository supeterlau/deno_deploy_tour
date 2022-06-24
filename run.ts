import { createRequire } from "https://deno.land/std@0.139.0/node/module.ts"

const require = createRequire(import.meta.url);

const path = require('path')

console.log(path.resolve('.'))
