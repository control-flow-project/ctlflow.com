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

test("Docker and setup guides keep server containers separate from host fleets", () => {
  const quickstart = read("content/docs/ctlflow/local-docker.md");
  for (const expected of ["one-shot", "existing native provider login", "fleet runs on the execution host, not in Docker",
    "CROSSFIRE_RUNTIME_IMAGE", "CROSSFIRE_MIGRATION_IMAGE", "published release 0.1.22", "server-state",
    "does not stop host agents", "does not install a", "No credential"])
    assert.equal((quickstart + read("content/docs/fleet/setup.md")).includes(expected), true, expected);
  assert.equal(quickstart.includes("docker compose exec"), false);
  assert.equal(quickstart.includes("CTLFLOW_FLEET_IMAGE"), false);
  assert.equal(quickstart.includes("MANIFEST_DIGEST"), false);
  assert.match(quickstart, /export CROSSFIRE_RUNTIME_IMAGE=ghcr\.io\/control-flow-project\/crossfire-csharp-nativeaot@sha256:[a-f0-9]{64}\n/u);
  assert.match(quickstart, /export CROSSFIRE_MIGRATION_IMAGE=ghcr\.io\/control-flow-project\/crossfire-migrations@sha256:[a-f0-9]{64}\n/u);
  assert.equal(quickstart.includes("Later documentation/onboarding UI changes are not contained in those images."), true);
  assert.equal(quickstart.includes("private packages need"), true);
  const packages = read("content/docs/ctlflow/containers.md");
  for (const expected of ["Number 2", "configDigest", "descriptorDigest", "org.crossfire.package=1", "Schema 1 is not imported"])
    assert.equal(packages.includes(expected), true, expected);
  for (const name of ["crossfire-node", "crossfire-csharp-managed", "crossfire-csharp-nativeaot", "crossfire-rust", "crossfire-migrations"])
    assert.equal(packages.includes(name), true, name + " published image");
  for (const page of [quickstart, packages]) assert.equal(page.includes("/services/crossfire/docs/releases/0.1.22.md"), true);
  const setup = read("content/docs/fleet/setup.md");
  assert.equal(setup.includes("$HOME/.local/share/ctlflow/releases/<version>/node_modules/.bin/fleet"), true);
  assert.equal(setup.includes("not Codex/Pi"), true);
  const implementation = read("content/docs/ctlflow/implementations.md");
  assert.equal(implementation.includes("11.0.100-rc.2.26504.105"), true);
  assert.equal(implementation.includes("11.0.0-rc.2.26504.105"), true);
  assert.equal(implementation.includes("schema 18"), true);
  assert.equal(read("content/docs/toolsmith/installation.md").includes("Toolsmith 0.4.1"), true);
});

test("authored pages describe agents without restricting them to software work", () => {
  const pages = fs.readdirSync(path.join(root, "content"), { recursive: true }).filter(filename => filename.endsWith(".md")).map(filename => `content/${filename}`);
  const templates = fs.readdirSync(path.join(root, "layouts"), { recursive: true }).filter(filename => filename.endsWith(".html")).map(filename => `layouts/${filename}`);
  for (const filename of [...pages, ...templates, "hugo.toml"]) {
    const source = read(filename);
    if (/^generated: true$/mu.test(source)) continue;
    const prose = source.replace(/^```[^\n]*\n[\s\S]*?^```[\t ]*$/gmu, "").replace(/`[^`\n]+`/gu, "").replace(/\s+/gu, " ");
    assert.equal(/\bcoding[\s-]+(?:agents?|assistants?|harness(?:es)?|sessions?|conversations?)\b/iu.test(prose), false, `${filename}: general agent terminology`);
  }
  const introduction = read("content/docs/_index.md");
  assert.equal(introduction.includes("researchers, writers and reviewers"), true);
  assert.equal(introduction.includes("runtime adapters for Codex and Earendil Pi"), true);
  assert.equal(read("content/docs/fleet/pi.md").includes("@earendil-works/pi-coding-agent@1.0.0"), true);
});

test("key introductions identify agent fleets while product names remain exact", () => {
  for (const filename of ["content/_index.md", "content/docs/_index.md", "content/docs/crossfire/_index.md", "content/docs/fleet/_index.md", "content/docs/fleetd/_index.md", "content/docs/examples/_index.md", "hugo.toml"]) {
    assert.equal(read(filename).includes("agent fleet"), true, filename);
  }
  assert.equal(read("content/docs/fleet/setup.md").includes('title: "Set up an agent fleet"'), true);
  assert.equal(read("content/docs/examples/fleet-street.md").includes('title: "fleet-street: an agent fleet for theatre"'), true);
  assert.equal(read("layouts/index.html").includes("Example agent fleet"), true);
  for (const product of ["crossfire", "fleetd", "fleet"]) assert.equal(read(`content/docs/${product}/_index.md`).includes(`title: ${product}`), true);
});

test("example introductions describe the task without incidental licensing or site housekeeping", () => {
  for (const filename of ["content/docs/examples/_index.md", "content/docs/examples/fleet-street.md"]) {
    const introduction = read(filename).replace(/^---\n[\s\S]*?\n---\n/u, "").split(/^## /mu)[0];
    assert.doesNotMatch(introduction, /\bMIT\b|\blicen[cs](?:e|ed|ing)\b|\bsource snapshot\b|\bnot a .*product\b/iu, filename);
    assert.match(introduction, /(?:task|brief|production)/u, filename);
  }
  assert.equal(read("content/docs/examples/fleet-street.md").includes("MIT asset notice"), false);
  assert.equal(read("content/license.md").includes("ctlflow, Toolsmith and this website use the MIT license."), true);
  assert.equal(read("content/docs/toolsmith/installation.md").includes("MIT-licensed source"), true);
  assert.equal(read("layouts/partials/sidebar.html").includes("Source-based documentation"), false);
});

test("all fenced examples declare a language or explicitly declare plain text", () => {
  const pages = fs.readdirSync(path.join(root, "content"), { recursive: true }).filter(filename => filename.endsWith(".md"));
  let examples = 0;
  for (const filename of pages) {
    let inside = false;
    for (const line of read(`content/${filename}`).split("\n")) {
      if (!line.startsWith("```")) continue;
      if (!inside) {
        assert.match(line, /^```\S/u, `${filename}: explicit example language`);
        examples += 1;
      }
      inside = !inside;
    }
    assert.equal(inside, false, `${filename}: closed fences`);
  }
  assert.equal(examples > 1200, true);
});

test("every JSON example has preceding prose identifying its producer or role", () => {
  const pages = fs.readdirSync(path.join(root, "content"), { recursive: true }).filter(filename => filename.endsWith(".md"));
  let examples = 0;
  for (const filename of pages) {
    const source = read(`content/${filename}`);
    for (const match of source.matchAll(/^```json\n([\s\S]*?)^```[\t ]*$/gmu)) {
      const introduction = source.slice(0, match.index).split(/\n\s*\n/u).filter(Boolean).at(-1) ?? "";
      assert.equal(introduction.startsWith("#"), false, `${filename}: JSON needs an introduction, not just a heading`);
      assert.match(introduction, /\b(?:service|server|agent|operator|fleetd|client|tool|response|configuration|returned)\b/iu, `${filename}: identify the JSON producer or purpose`);
      assert.doesNotThrow(() => JSON.parse(match[1]), `${filename}: valid JSON example`);
      examples += 1;
    }
  }
  assert.equal(examples > 100, true);
});

test("theatre examples distinguish ordinary chat from supplied and agent-written files", () => {
  const guide = read("content/docs/examples/fleet-street.md");
  assert.match(guide, /> Could three performances/u);
  for (const [name, producer] of [["brief", /person does not need to write JSON/u], ["budget", /budget analyst prepares/u], ["report", /writing agent prepares/u]]) {
    const position = guide.indexOf(`{{< fleet-street-code name="${name}" >}}`);
    assert.equal(position >= 0, true, `${name}: example is present`);
    const prefix = guide.slice(0, position);
    assert.match(prefix, producer, name);
    assert.equal(prefix.includes(`examples/${name}.json`), true, `${name}: existing input file is named`);
  }
  assert.equal(guide.includes("--budget examples/budget.json"), true);
  assert.equal(guide.includes("--budget .local/budget.json"), false);
  assert.equal(guide.includes("git clone https://github.com/control-flow-project/fleet-street.git\ncd fleet-street"), true);
  assert.equal(guide.includes("git fetch origin"), false);
  assert.equal(fs.existsSync(path.join(root, "layouts/shortcodes/fleet-street-checkout.html")), false);
});

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
      assert.equal(page.includes("This JSON illustrates a response returned by the service, not a request to send."), true, `${product}.${operation.name}: server-produced JSON`);
      assert.equal(page.includes("The service produces these fields inside `data`"), true, `${product}.${operation.name}: response-data origin`);
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
  assert.equal(sources.ctlflow.revision, "74b51eac5493b63832899e319344bf2ec8f37715");
  assert.equal(sources.ctlflow.version, "0.1.22");
  assert.equal(sources.toolsmith.revision, "9fb2183fd6c6ff9b7c270314965f83d1ea838abe");
  assert.equal(sources.toolsmith.version, "0.4.1");
  for (const product of ["crossfire", "fleetd", "fleet"]) assert.equal(read(`content/docs/${product}/_index.md`).includes(`title: ${product}`), true);
  const optional = read("content/docs/toolsmith/_index.md").replace(/\s+/gu, " ");
  assert.equal(optional.includes("separate project"), true);
  assert.equal(optional.includes("omit it completely"), true);
  assert.equal(read("AGENTS.md").includes("parent monorepo; crossfire, fleetd and fleet"), true);
});

test("guides are edited independently of generated API contracts", () => {
  const manifest = JSON.parse(read("data/reference-manifest.json"));
  assert.equal(guideReferences.length, 47);
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

test("controller guides and every generated operation require the same OS-user credential", () => {
  const catalogs = JSON.parse(read("data/operations.json"));
  assert.equal(catalogs.fleetd.length, 19);
  for (const operation of catalogs.fleetd) {
    assert.equal(operation.auth, "controller", operation.name);
    const page = read(`content/docs/api/fleetd/${slug(operation.name)}.md`);
    assert.equal(page.includes("Authorization: Bearer <authenticationKey>"), true, operation.name);
    assert.equal(page.includes("/docs/fleetd/authentication/"), true, operation.name);
    assert.equal(page.includes("Missing or incorrect credentials return 401"), true, operation.name);
    assert.equal(page.includes("auth: public"), false, operation.name);
  }
  const guide = read("content/docs/fleetd/authentication.md");
  for (const required of ["$XDG_CONFIG_HOME/ctlflow/fleetd.json", "$HOME/.config/ctlflow/fleetd.json",
    "$HOME/Library/Application Support/ctlflow/fleetd.json", "0700/0600", "4096",
    "256-bit", "full controller authority", "remote", "no compatibility path"])
    assert.equal(guide.includes(required), true, required);
  assert.deepEqual(JSON.parse(/```json\n([\s\S]*?)\n```/u.exec(guide)[1]), { schemaVersion: 1 });
  const setup = read("content/docs/fleet/setup.md");
  assert.equal(setup.includes("pinned npm"), true);
  assert.equal(setup.includes("does not need .NET or Rust"), true);
  const client = read("content/docs/api/client-examples.md");
  assert.equal(client.includes("Authorization: Bearer %s"), true);
  assert.equal(client.includes("--header @-"), true);
  assert.equal(client.includes("Do not attach `Cookie`, `Origin` or `Authorization`"), false);
});

test("Toolsmith guides match the recorded public 0.4 library ownership", () => {
  const installation = read("content/docs/toolsmith/installation.md");
  assert.equal(installation.includes("ctlflow_toolsmith-0.4.1"), true);
  assert.equal(installation.includes("0.3.0"), false);
  const library = read("content/docs/toolsmith/library.md");
  const rows = library.split("\n");
  assert.equal(rows.find(line => line.startsWith("| `toolsmith.files` |")).includes("`replace_bytes`"), true);
  assert.equal(rows.find(line => line.startsWith("| `toolsmith.filesystem` |")).includes("replace_bytes"), false);
  for (const symbol of ["toolsmith.paths", "toolsmith.acquisition.configuration", "indexed_scope", "matching_scope", "prepare_connection", "HtmlInspection"])
    assert.equal(library.includes(symbol), true, symbol);
  assert.equal(read("content/docs/toolsmith/security.md").includes("stale approval"), true);
});
