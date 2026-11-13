/** Serves the static export in ./out, for `npm start` and the end-to-end test. */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.join(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT) || 3017;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".ttf": "font/ttf", ".wasm": "application/wasm", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".ico": "image/x-icon" };

createServer((req, res) => {
  let rel = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  if (rel.endsWith("/")) rel += "index.html";
  let file = path.join(root, rel);
  // Never serve anything outside ./out.
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(root, "404.html");
  res.writeHead(file.endsWith("404.html") ? 404 : 200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Tabaa on http://127.0.0.1:${port}`));
