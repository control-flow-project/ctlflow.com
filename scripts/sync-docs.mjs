import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { guideSources, catalogSources, frontmatter, pageUrl } from "./docs/sources.mjs";
import { createModel, extractOperations, schemaId } from "./docs/model.mjs";
import { apiIndex, operationPage, schemaPage, slug } from "./docs/api-pages.mjs";
import { createSnapshot, sha256 } from "./docs/snapshot.mjs";
import { generatorPaths, reconcileOutputs } from "./docs/stored.mjs";

const directory = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const argumentsList = process.argv.slice(2);
const check = argumentsList.includes("--check");
const supplied = new Map();
for (let index = 0; index < argumentsList.length; index += 1) {
  const key = argumentsList[index];
  if (key === "--check") continue;
  if (!["--ctlflow", "--toolsmith"].includes(key) || supplied.has(key) || !argumentsList[index + 1]) throw new Error("Use --ctlflow PATH --toolsmith PATH [--check]; no other flags are accepted");
  supplied.set(key, path.resolve(argumentsList[++index]));
}
if (!supplied.has("--ctlflow") || !supplied.has("--toolsmith")) throw new Error("Supply explicit --ctlflow and --toolsmith source directories");
const roots = { ctlflow: supplied.get("--ctlflow"), toolsmith: supplied.get("--toolsmith") };
const sources = {};
const snapshots = Object.fromEntries(Object.entries(roots).map(([project, root]) => [project, createSnapshot(root)]));
const outputs = new Map();
function read(project, relative) {
  return snapshots[project].read(relative);
}
for (const [project, root] of Object.entries(roots)) {
  const revision = snapshots[project].revision;
  sources[project] = { repository: `https://github.com/control-flow-project/${project}`, revision, version: project === "ctlflow" ? JSON.parse(read(project, "package.json")).version : /^version = "([^"]+)"/mu.exec(read(project, "pyproject.toml"))[1] };
}
const guideMap = new Map(guideSources.map(([project, source, output]) => [`${project}:${source}`, pageUrl(output)]));
function rewrite(project, source, text) {
  const parts = text.replace(/^---\n[\s\S]*?\n---\n/u, "").split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/gmu);
  return parts.map((part, index) => {
    if (index % 2) return part;
    const prose = source === "docs/specification.md" ? part.replaceAll("/<publicKey>/index.html", "`/<publicKey>/index.html`").replaceAll("database/<database>/<backend>/{migrations,seeds}", "`database/<database>/<backend>/{migrations,seeds}`") : part;
    return prose.replace(/\[([^\]]+)\]\(([^\s)]+)\)/gu, (match, label, destination) => {
      if (/^(?:https?:|mailto:|#)/u.test(destination)) return match;
      const [relative, anchor] = destination.split("#", 2);
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(source), relative));
      const target = guideMap.get(`${project}:${resolved}`);
      if (target) return `[${label}](${target}${anchor ? `#${anchor}` : ""})`;
      if (resolved.startsWith(".analysis/") || resolved.startsWith("../")) return label;
      return `[${label}](source:${project}:${resolved}${anchor ? `#${anchor}` : ""})`;
    });
  }).join("").replace(/^# [^\n]+\n/u, "").trim();
}
for (const [project, source, output, title, description, weight] of guideSources) {
  const content = rewrite(project, source, read(project, source));
  outputs.set(`content/${output}`, `${frontmatter({ title, description, weight, sourceProject: project, sourcePath: source, generated: true })}${content}\n`);
}
const model = createModel(roots.ctlflow, snapshots.ctlflow);
for (const filename of ["rest/envelope.ts", "rest/limits.ts", "matrix-directory.ts"]) model.closure(model.load(path.join(roots.ctlflow, "services/crossfire/node/packages/contracts/src", filename)));
const inventories = {};
for (const [product, catalog] of Object.entries(catalogSources)) {
  const operations = extractOperations(model, path.join(roots.ctlflow, catalog));
  inventories[product] = operations.map(operation => Object.fromEntries(["name", "method", "path", "auth", "status", "collection", "permissions", "requestFormat", "requestBytes"].filter(key => operation[key] !== undefined).map(key => [key, operation[key]])));
  outputs.set(`content/docs/api/${product}/_index.md`, apiIndex(operations, product));
  for (const operation of operations) outputs.set(`content/docs/api/${product}/${slug(operation.name)}.md`, operationPage(model, operation, product));
  model.closure(model.load(path.join(roots.ctlflow, catalog)));
}
for (const module of [...model.modules.values()]) {
  outputs.set(`content/docs/api/schemas/${schemaId(module)}.md`, schemaPage(model, module));
}
const matrixPath = "services/crossfire/node/packages/adapter-matrix/src/operations.json";
const matrix = JSON.parse(read("ctlflow", matrixPath));
for (const filename of [
  "services/crossfire/node/apps/server/src/router.ts",
  "services/crossfire/node/apps/server/src/content-server.ts",
  "services/crossfire/node/apps/server/src/artifacts.ts",
  "services/crossfire/node/apps/server/src/http/create-server.ts",
  "services/crossfire/node/apps/server/src/http/transport.ts",
  "services/crossfire/node/apps/server/src/http/registration.ts",
  "services/crossfire/node/apps/server/src/http/registration-page.ts",
  "services/crossfire/node/apps/server/src/http/matrix-directory.ts",
  "services/crossfire/node/packages/contracts/src/matrix-directory.ts",
  "services/crossfire/node/apps/server/src/http/matrix-profile.ts",
  "services/crossfire/node/apps/server/src/http/binary.ts",
  "services/crossfire/node/packages/contracts/src/rest/limits.ts",
  "services/fleetd/node/apps/daemon/src/http.ts",
  "services/fleetd/node/apps/daemon/src/main.ts",
  "services/crossfire/database/management/sqlite/contract.json",
  "global.json", "rust-toolchain.toml",
]) read("ctlflow", filename);
const matrixLines = [frontmatter({ title: "Matrix operation catalog", description: `All ${matrix.operations.length} native catalog entries, including explicit denied/unsupported families and parameters.`, weight: 50, sourceProject: "ctlflow", sourcePath: matrixPath, generated: true }),
  `The catalog is derived from Matrix ${matrix.version}. Its input fingerprint is \`${matrix.sourceSha256}\`. It uses native HTTP, not a Node Matrix SDK. A catalog entry is not proof that the selected homeserver supports it.`, "", "Access classifications are client safeguards, not server authorization. Only entries admitted by the agent dispatcher may be used by an agent. Operator/account/unsupported entries remain explicitly restricted. Current crossfire grants, real native membership, powers and endpoint-specific checks still apply.", "", "- [Matrix integration and directed mentions](/docs/crossfire/matrix/)", "- [Native non-REST protocols](/docs/api/native-http/)", ""];
for (const operation of matrix.operations) {
  matrixLines.push(`## ${operation.command}`, "", `\`${operation.method} ${operation.path}\``, "", `Native operation: \`${operation.id}\`. Access: **${operation.access}**. Body: **${operation.body}**. Response: **${operation.response}**.`, "");
  if (operation.parameters.length) { matrixLines.push("| Parameter | Location | Required | Type |", "| --- | --- | --- | --- |"); for (const parameter of operation.parameters) matrixLines.push(`| \`${parameter.name}\` | ${parameter.location} | ${parameter.required ? "yes" : "no"} | ${parameter.type} |`); matrixLines.push(""); }
  matrixLines.push("Native JSON body and response schemas are defined by the pinned Matrix Client-Server specification, not by crossfire's REST envelope. Endpoint help and the native specification supply their exact fields.", "");
}
outputs.set("content/docs/api/matrix-catalog.md", `${matrixLines.join("\n").trimEnd()}\n`);
outputs.set("data/sources.json", `${JSON.stringify(sources, null, 2)}\n`);
outputs.set("data/operations.json", `${JSON.stringify(inventories, null, 2)}\n`);
const inputs = Object.entries(snapshots).flatMap(([project, snapshot]) => [...snapshot.consumed].map(([filename, hash]) => [`${project}:${filename}`, hash]));
const manifest = { sources, inputs: Object.fromEntries(inputs.sort()), generator: Object.fromEntries(generatorPaths.map(relative => [relative, sha256(fs.readFileSync(path.join(directory, relative)))])), outputs: Object.fromEntries([...outputs].sort().map(([filename, text]) => [filename, sha256(text)])), counts: { crossfire: inventories.crossfire.length, fleetd: inventories.fleetd.length, matrix: matrix.operations.length, schemaModules: model.modules.size, guides: guideSources.length } };
outputs.set("data/reference-manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
const changed = reconcileOutputs(directory, outputs, check);
console.log(JSON.stringify({ mode: check ? "check" : "sync", changed: changed.length, ...manifest.counts }));
