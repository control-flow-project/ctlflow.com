import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { once } from "node:events";
import { fileURLToPath, pathToFileURL } from "node:url";

export const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const contentTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };

export function netlifyHeaders(filename) {
  const source = fs.readFileSync(path.join(root, "netlify.toml"), "utf8");
  const headers = {};
  for (const block of source.split("[[headers]]").slice(1)) {
    const pattern = /^\s*for = "([^"]+)"/mu.exec(block)?.[1];
    if (pattern !== "/*" && pattern !== filename && !(pattern?.endsWith("/*") && filename.startsWith(pattern.slice(0, -1)))) continue;
    for (const match of block.matchAll(/^\s{4}([A-Za-z-]+) = "([^"]*)"$/gmu)) headers[match[1]] = match[2];
  }
  return headers;
}

export async function startServer(port = 4321) {
  const publicRoot = path.join(root, "public");
  if (!fs.existsSync(path.join(publicRoot, "index.html"))) throw new Error("Build the site before starting the local preview");
  const server = createServer((request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      const decoded = decodeURIComponent(url.pathname);
      if (!["GET", "HEAD"].includes(request.method) || decoded.includes("\\") || decoded.includes("\0") || decoded.split("/").some(segment => segment.startsWith("."))) {
        response.writeHead(400); response.end(); return;
      }
      let target = path.resolve(publicRoot, `.${decoded}`);
      if (!target.startsWith(`${publicRoot}/`) && target !== publicRoot) throw new Error("Path outside public output");
      let status = 200;
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
        if (!decoded.endsWith("/")) { response.writeHead(301, { Location: `${url.pathname}/${url.search}` }); response.end(); return; }
        target = path.join(target, "index.html");
      }
      if (!fs.existsSync(target) || !fs.statSync(target).isFile()) { target = path.join(publicRoot, "404.html"); status = 404; }
      const bytes = fs.readFileSync(target);
      response.writeHead(status, { ...netlifyHeaders(url.pathname), "Content-Type": contentTypes[path.extname(target)] ?? "application/octet-stream", "Content-Length": bytes.length });
      response.end(request.method === "HEAD" ? undefined : bytes);
    } catch { response.writeHead(400); response.end(); }
  });
  server.listen(port, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  return { server, origin: `http://127.0.0.1:${address.port}`, close: () => new Promise((resolve, reject) => { server.close(error => error ? reject(error) : resolve()); server.closeAllConnections(); }) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT ?? 4321);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("PORT must be 1024–65535");
  const preview = await startServer(port);
  console.log(JSON.stringify({ status: "ready", url: preview.origin }));
  for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => { void preview.close(); });
}
