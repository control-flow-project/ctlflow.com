import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { guideReferences, catalogSources, frontmatter } from "./docs/sources.mjs";
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
for (const [project, source] of guideReferences) read(project, source);
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
  "services/fleetd/node/packages/storage/src/authentication.ts",
  "services/fleet/node/packages/ssh-transport/assets/authentication.json",
  "services/crossfire/database/management/sqlite/contract.json",
  "global.json", "rust-toolchain.toml",
]) read("ctlflow", filename);
const matrixLines = [frontmatter({ title: "Matrix operation catalog", description: `${matrix.operations.length} Matrix HTTP operations with parameters and agent access classifications.`, weight: 50, sourceProject: "ctlflow", sourcePath: matrixPath, generated: true }),
  `This catalog is generated from Matrix ${matrix.version}. The input SHA-256 is \`${matrix.sourceSha256}\`. crossfire calls these endpoints over HTTP. Availability depends on the homeserver.`, "", "Only operations allowed by the agent dispatcher can be used by an agent. Each call also requires crossfire permission and Matrix membership and powers. The catalog includes restricted and unsupported operations so their status is visible.", "", "JSON body and response fields are defined in the [Matrix Client-Server specification](https://spec.matrix.org/v1.12/client-server-api/). These endpoints return Matrix responses, not crossfire REST envelopes.", "", "- [Matrix integration and directed mentions](/docs/crossfire/matrix/)", "- [Other HTTP routes](/docs/api/native-http/)", ""];
for (const operation of matrix.operations) {
  matrixLines.push(`## ${operation.command}`, "", `\`${operation.method} ${operation.path}\``, "", `Native operation: \`${operation.id}\`. Access: **${operation.access}**. Body: **${operation.body}**. Response: **${operation.response}**.`, "");
  if (operation.parameters.length) { matrixLines.push("| Parameter | Location | Required | Type |", "| --- | --- | --- | --- |"); for (const parameter of operation.parameters) matrixLines.push(`| \`${parameter.name}\` | ${parameter.location} | ${parameter.required ? "yes" : "no"} | ${parameter.type} |`); matrixLines.push(""); }
}
outputs.set("content/docs/api/matrix-catalog.md", `${matrixLines.join("\n").trimEnd()}\n`);
outputs.set("data/sources.json", `${JSON.stringify(sources, null, 2)}\n`);
outputs.set("data/operations.json", `${JSON.stringify(inventories, null, 2)}\n`);
const inputs = Object.entries(snapshots).flatMap(([project, snapshot]) => [...snapshot.consumed].map(([filename, hash]) => [`${project}:${filename}`, hash]));
const manifest = { sources, inputs: Object.fromEntries(inputs.sort()), generator: Object.fromEntries(generatorPaths.map(relative => [relative, sha256(fs.readFileSync(path.join(directory, relative)))])), outputs: Object.fromEntries([...outputs].sort().map(([filename, text]) => [filename, sha256(text)])), counts: { crossfire: inventories.crossfire.length, fleetd: inventories.fleetd.length, matrix: matrix.operations.length, schemaModules: model.modules.size, guides: guideReferences.length } };
outputs.set("data/reference-manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
const changed = reconcileOutputs(directory, outputs, check);
console.log(JSON.stringify({ mode: check ? "check" : "sync", changed: changed.length, ...manifest.counts }));
