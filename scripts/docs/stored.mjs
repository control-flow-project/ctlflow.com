import fs from "node:fs";
import path from "node:path";
import { sha256 } from "./snapshot.mjs";

export const generatorPaths = ["scripts/sync-docs.mjs", "scripts/docs/sources.mjs", "scripts/docs/model.mjs", "scripts/docs/fields.mjs", "scripts/docs/api-pages.mjs", "scripts/docs/snapshot.mjs", "scripts/docs/stored.mjs"];

function safeTarget(root, relative) {
  const target = path.resolve(root, relative);
  const normalized = path.relative(path.resolve(root), target);
  if (!target.startsWith(`${path.resolve(root)}/`) || (!normalized.startsWith("content/") && !normalized.startsWith("data/")) || relative !== path.posix.normalize(relative)) throw new Error("Invalid generated output path");
  let current = path.resolve(root);
  for (const segment of ["", ...path.relative(current, target).split(path.sep)]) {
    if (segment) current = path.join(current, segment);
    let information;
    try { information = fs.lstatSync(current); } catch (error) { if (error.code === "ENOENT") continue; throw error; }
    if (information.isSymbolicLink()) throw new Error("Symbolic generated output path is not accepted");
    if (current !== target && !information.isDirectory()) throw new Error("Generated output parent is not a directory");
    if (current === target && !information.isFile()) throw new Error("Generated output is not a regular file");
  }
  return target;
}

export function generatedExtras(root, expected) {
  const extras = [];
  function walk(directory) {
    if (!fs.existsSync(directory)) return;
    if (fs.lstatSync(directory).isSymbolicLink()) throw new Error("Symbolic documentation directory is not accepted");
    for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, item.name);
      if (item.isSymbolicLink()) throw new Error("Symbolic documentation input is not accepted");
      if (item.isDirectory()) walk(target);
      else if (item.name.endsWith(".md")) {
        const relative = path.relative(root, target);
        const ownedApi = /^content\/docs\/api\/(?:crossfire|fleetd|schemas)\//u.test(relative) && relative !== "content/docs/api/schemas/_index.md";
        const marked = /^generated: true$/mu.test(fs.readFileSync(target, "utf8").split("\n---\n", 1)[0]);
        if ((ownedApi || marked) && !expected.has(relative)) extras.push(relative);
      }
    }
  }
  walk(path.join(root, "content"));
  return extras;
}

export function reconcileOutputs(root, outputs, check) {
  const manifestPath = path.join(root, "data/reference-manifest.json");
  safeTarget(root, "data/reference-manifest.json");
  const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : { outputs: {} };
  const differences = [];
  const removals = [];
  const writes = [];
  for (const relative of new Set([...Object.keys(previous.outputs), ...outputs.keys()])) safeTarget(root, relative);
  for (const relative of Object.keys(previous.outputs)) {
    if (outputs.has(relative)) continue;
    const target = safeTarget(root, relative);
    if (!fs.existsSync(target)) continue;
    const current = fs.readFileSync(target, "utf8");
    differences.push(`removed:${relative}`);
    if (!check && sha256(current) !== previous.outputs[relative]) throw new Error(`Refusing to remove edited generated page ${relative}`);
    removals.push(relative);
  }
  const expected = new Set(outputs.keys());
  const pendingRemoved = new Set(Object.keys(previous.outputs).filter(relative => !outputs.has(relative)));
  for (const relative of generatedExtras(root, expected)) if (!pendingRemoved.has(relative)) throw new Error(`Unrecorded generated page: ${relative}`);
  for (const [relative, content] of outputs) {
    const target = safeTarget(root, relative);
    if (fs.existsSync(target) && fs.readFileSync(target, "utf8") === content) continue;
    differences.push(relative);
    if (!check && fs.existsSync(target) && previous.outputs[relative] && sha256(fs.readFileSync(target)) !== previous.outputs[relative]) throw new Error(`Refusing to overwrite edited generated page ${relative}`);
    writes.push([relative, content]);
  }
  if (check && differences.length) throw new Error(`Generated documentation differs: ${differences.join(", ")}`);
  if (!check) {
    for (const relative of removals) fs.unlinkSync(safeTarget(root, relative));
    for (const [relative, content] of writes) {
      const target = safeTarget(root, relative);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(safeTarget(root, relative), content);
    }
  }
  return differences;
}

export function verifyStored(root) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "data/reference-manifest.json"), "utf8"));
  for (const [relative, expected] of Object.entries(manifest.outputs)) {
    const target = safeTarget(root, relative);
    if (!fs.existsSync(target) || sha256(fs.readFileSync(target)) !== expected) throw new Error(`Generated reference is missing or edited: ${relative}`);
  }
  for (const [relative, expected] of Object.entries(manifest.generator)) {
    if (!generatorPaths.includes(relative) || sha256(fs.readFileSync(path.join(root, relative))) !== expected) throw new Error(`Reference generator changed: ${relative}; run docs:sync`);
  }
  if (generatorPaths.some(relative => !(relative in manifest.generator))) throw new Error("Incomplete generator provenance");
  const extras = generatedExtras(root, new Set(Object.keys(manifest.outputs)));
  if (extras.length) throw new Error(`Unrecorded generated references: ${extras.join(", ")}`);
  return manifest;
}
