import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export function verifyPublishedArtwork(root) {
  const registry = JSON.parse(fs.readFileSync(path.join(root, "data/artwork.json"), "utf8"));
  if (!registry || typeof registry !== "object" || Array.isArray(registry) || Object.keys(registry).length === 0) throw new Error("Artwork registry must be a nonempty object");
  const sources = new Map();
  for (const [name, filename] of Object.entries(registry)) {
    if (!/^[a-z][a-z0-9-]*$/u.test(name) || filename !== `artwork/${name}.png`) throw new Error(`Invalid artwork source: ${name}`);
    const source = path.join(root, "assets", filename);
    if (!fs.lstatSync(source).isFile()) throw new Error(`Artwork must be a regular source file: ${name}`);
    const hash = createHash("sha256").update(fs.readFileSync(source)).digest("hex");
    if (sources.has(hash)) throw new Error(`Repeated artwork source: ${sources.get(hash)} and ${name}`);
    sources.set(hash, name);
  }
  const placements = new Map();
  const pending = [path.join(root, "public")];
  while (pending.length) {
    const directory = pending.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) pending.push(filename);
      else if (entry.isFile() && entry.name.endsWith(".html")) {
        const location = path.relative(path.join(root, "public"), filename);
        const html = fs.readFileSync(filename, "utf8");
        for (const match of html.matchAll(/\bdata-artwork=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gu)) {
          const name = match[1] ?? match[2] ?? match[3];
          if (!Object.hasOwn(registry, name)) throw new Error(`Unknown artwork ${name} in ${location}`);
          if (placements.has(name)) throw new Error(`Repeated artwork ${name}: ${placements.get(name)} and ${location}`);
          placements.set(name, location);
        }
      }
    }
  }
  for (const name of Object.keys(registry)) if (!placements.has(name)) throw new Error(`Unused artwork source: ${name}`);
  return { assets: sources.size, placements: placements.size };
}
