import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { siteOrigin } from "../scripts/build-options.mjs";
import { netlifyHeaders } from "../scripts/serve.mjs";
import { slug } from "../scripts/docs/api-pages.mjs";
import { guideReferences } from "../scripts/docs/sources.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");

test("all declared operations have complete reference sections and metadata", () => {
  const catalogs = JSON.parse(read("data/operations.json"));
  for (const [product, operations] of Object.entries(catalogs)) {
    const names = new Set();
    for (const operation of operations) {
      assert.equal(names.has(operation.name), false, `${product} unique operation ${operation.name}`);
      names.add(operation.name);
      const page = read(`content/docs/api/${product}/${slug(operation.name)}.md`);
      for (const field of ["Path parameters", "Query parameters", "Request body", "Response data", "Response envelope"]) assert.equal(page.includes(`## ${field}`), true, `${product}.${operation.name}: ${field}`);
      for (const value of [operation.method, operation.path, operation.auth, String(operation.status)]) assert.equal(page.includes(value), true, `${product}.${operation.name} preserves ${value}`);
      for (const permission of operation.permissions) assert.equal(page.includes(permission), true, `${product}.${operation.name} permission`);
      if (product === "fleetd") assert.equal(page.includes("Private controller API"), true, `${operation.name} private boundary`);
      if (operation.requestFormat === "binary") assert.equal(page.includes("raw declared file bytes"), true, "binary wire input");
    }
  }
});

test("binary and custom contracts retain exact constraints, nested fields and distinct bounds", () => {
  const publication = read("content/docs/api/crossfire/create-publication.md");
  assert.equal(publication.includes("files[].sha256"), true, "nested publication integrity field");
  assert.equal(publication.includes("8" + "388608"), true, "native publication file bound");
  const wake = read("content/docs/api/crossfire/create-wake-rule.md");
  assert.equal(wake.includes("schedule.seconds"), true, "interval branch");
  assert.equal(wake.includes("schedule.timeZone"), true, "calendar branch");
  assert.equal(wake.includes("Unknown schedule kind"), true, "custom rejection preserved");
  const reset = read("content/docs/api/crossfire/request-fleet-runtime.md");
  assert.equal(reset.includes("value.confirmFreshHistory === (value.action === 'reset')"), true, "explicit reset predicate");
  const privatePage = read("content/docs/api/fleetd/attachment.md");
  assert.equal(privatePage.includes("1048576 bytes"), true, "private 1 MiB body limit");
  assert.equal(privatePage.includes("Use one exact context"), true, "custom query constraint");
  assert.equal(read("content/docs/api/crossfire/create-runtime-decision.md").includes("16777216 bytes"), true, "native review request override");
});

test("Netlify production and preview origins are explicit and reject unsafe values", () => {
  assert.equal(siteOrigin({}), "https://ctlflow.com/");
  assert.equal(siteOrigin({ CONTEXT: "production", DEPLOY_PRIME_URL: "https://ignored.netlify.app" }), "https://ctlflow.com/");
  assert.equal(siteOrigin({ CONTEXT: "deploy-preview", DEPLOY_PRIME_URL: "https://deploy-preview-1--ctlflow.netlify.app" }), "https://deploy-preview-1--ctlflow.netlify.app/");
  for (const value of ["http://unsafe.test", "https://user:secret@unsafe.test", "https://example.test/path/", "https://example.test/?query=1", "https://example.test/#fragment"]) assert.throws(() => siteOrigin({ CONTEXT: "deploy-preview", DEPLOY_PRIME_URL: value }), /exact HTTPS origin/u);
});

test("Netlify headers keep site scripts/assets local and only hashed assets immutable", () => {
  const html = netlifyHeaders("/docs/api/");
  assert.equal(html["Content-Security-Policy"].includes("script-src 'self'"), true);
  assert.equal(html["Content-Security-Policy"].includes("unsafe-inline"), false);
  assert.equal(html["X-Frame-Options"], "DENY");
  assert.equal(netlifyHeaders("/assets/site.123.js")["Cache-Control"].includes("immutable"), true);
  assert.equal(netlifyHeaders("/index.json")["Cache-Control"].includes("must-revalidate"), true);
  assert.equal(html["Cache-Control"], undefined);
  assert.equal(fs.existsSync(path.join(root, ".github/workflows")), false);
});

test("hierarchy and source URLs preserve constituents and Toolsmith optionality", () => {
  const sources = JSON.parse(read("data/sources.json"));
  assert.equal(sources.ctlflow.repository, "https://github.com/control-flow-project/ctlflow");
  assert.equal(sources.ctlflow.revision, "52bf027974521695c3b058afcc0b5191bd42587b");
  for (const product of ["crossfire", "fleetd", "fleet"]) assert.equal(read(`content/docs/${product}/_index.md`).includes(`title: ${product}`), true);
  const optional = read("content/docs/toolsmith/_index.md").replace(/\s+/gu, " ");
  assert.equal(optional.includes("separate project"), true);
  assert.equal(optional.includes("omit it completely"), true);
  assert.equal(read("AGENTS.md").includes("parent monorepo; crossfire, fleetd and fleet"), true);
});

test("guides are edited independently of generated API contracts", () => {
  const manifest = JSON.parse(read("data/reference-manifest.json"));
  assert.equal(guideReferences.length, 45);
  assert.equal(manifest.counts.guides, guideReferences.length);
  for (const [project, source, output] of guideReferences) {
    const filename = `content/${output}`;
    const guide = read(filename);
    assert.equal(/^generated: true$/mu.test(guide), false, `${filename} is authored`);
    assert.equal(filename in manifest.outputs, false, `${filename} is not a generated output`);
    assert.equal(`${project}:${source}` in manifest.inputs, true, `${filename} source is recorded`);
    assert.match(guide, new RegExp(`^sourceProject: ["']?${project}["']?$`, "mu"));
    assert.equal(guide.includes(`sourcePath: "${source}"`) || guide.includes(`sourcePath: ${source}`), true, `${filename} reference path`);
  }
});
