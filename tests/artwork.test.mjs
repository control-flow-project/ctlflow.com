import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { verifyPublishedArtwork } from "../scripts/artwork.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const registry = JSON.parse(fs.readFileSync(path.join(root, "data/artwork.json"), "utf8"));
const selections = {
  "docs/ctlflow/_index.md": "ctlflow",
  "docs/crossfire/_index.md": "crossfire",
  "docs/fleetd/_index.md": "fleetd",
  "docs/fleet/_index.md": "fleet",
  "docs/examples/_index.md": "examples",
  "docs/api/_index.md": "api",
  "docs/toolsmith/_index.md": "toolsmith",
};

test("home originals remain 3:2 and all seven section illustrations are panoramic RGBA PNGs", () => {
  assert.deepEqual(Object.keys(registry).sort(), ["api", "collaboration", "crossfire", "ctlflow", "examples", "fleet", "fleetd", "multitool", "playbill", "toolsmith"]);
  for (const [name, filename] of Object.entries(registry)) {
    assert.equal(filename, `artwork/${name}.png`);
    const bytes = fs.readFileSync(path.join(root, "assets", filename));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", name);
    assert.equal(bytes.subarray(12, 16).toString(), "IHDR", name);
    const section = Object.values(selections).includes(name);
    assert.equal(bytes.readUInt32BE(16), section ? 2172 : 1536, `${name} width`);
    assert.equal(bytes.readUInt32BE(20), section ? 724 : 1024, `${name} height`);
    assert.equal(bytes[24], 8, `${name} bit depth`);
    assert.equal(bytes[25], 6, `${name} RGBA color type`);
  }
  assert.deepEqual(fs.readdirSync(path.join(root, "assets/artwork")).sort(), Object.values(registry).map(filename => path.basename(filename)).sort());
});

test("every bold sidebar section requests an illustration and no other document does", () => {
  const actual = {};
  const documents = fs.readdirSync(path.join(root, "content"), { recursive: true }).filter(filename => filename.endsWith(".md"));
  const sections = documents.filter(filename => /^docs\/[^/]+\/_index\.md$/u.test(filename));
  for (const filename of documents) {
    const content = fs.readFileSync(path.join(root, "content", filename), "utf8");
    const selection = /^artwork: (\S+)$/mu.exec(content)?.[1];
    if (selection) {
      assert.equal(sections.includes(filename), true, `${filename}: not a bold sidebar section`);
      assert.equal(selection in registry, true, filename);
      assert.equal(/^generated: true$/mu.test(content), false, filename);
      actual[filename] = selection;
    }
  }
  assert.deepEqual(Object.keys(actual).sort(), sections.sort());
  assert.deepEqual(actual, selections);
});

test("Hugo rejects missing sidebar section artwork and ornamental artwork on child pages", context => {
  const fixture = fs.mkdtempSync(path.join(root, ".temp/artwork-policy-"));
  context.after(() => fs.rmSync(fixture, { recursive: true }));
  for (const directory of ["content/docs/subject", "layouts/_default", "layouts/partials"]) fs.mkdirSync(path.join(fixture, directory), { recursive: true });
  fs.writeFileSync(path.join(fixture, "hugo.toml"), 'baseURL = "https://example.test/"\ndisableKinds = ["taxonomy", "term", "rss", "sitemap"]\n');
  fs.writeFileSync(path.join(fixture, "content/_index.md"), "---\ntitle: Home\n---\n");
  fs.writeFileSync(path.join(fixture, "content/docs/_index.md"), "---\ntitle: Docs\n---\n");
  const section = path.join(fixture, "content/docs/subject/_index.md");
  const child = path.join(fixture, "content/docs/subject/guide.md");
  fs.writeFileSync(section, "---\ntitle: Subject\nartwork: subject\n---\n");
  fs.writeFileSync(child, "---\ntitle: Guide\n---\n");
  fs.writeFileSync(path.join(fixture, "layouts/index.html"), "<main>Home</main>");
  for (const layout of ["list", "single"]) fs.writeFileSync(path.join(fixture, `layouts/_default/${layout}.html`), '{{ partial "page-heading.html" . }}');
  fs.copyFileSync(path.join(root, "layouts/partials/page-heading.html"), path.join(fixture, "layouts/partials/page-heading.html"));
  fs.writeFileSync(path.join(fixture, "layouts/partials/landing-art.html"), '<div data-artwork="{{ .name }}"></div>');
  const local = path.join(root, ".temp/tools/hugo");
  const executable = process.env.HUGO_BINARY ?? (fs.existsSync(local) ? local : "hugo");
  const render = () => spawnSync(executable, ["--source", fixture, "--cacheDir", path.join(fixture, "cache"), "--panicOnWarning"], { encoding: "utf8", timeout: 15000, maxBuffer: 128 * 1024 });
  const valid = render();
  assert.equal(valid.status, 0, `${valid.stdout}\n${valid.stderr}`);
  fs.writeFileSync(section, "---\ntitle: Subject\n---\n");
  const missing = render();
  assert.notEqual(missing.status, 0);
  assert.match(missing.stdout + missing.stderr, /Sidebar section \/docs\/subject\/ requires an illustration/u);
  fs.writeFileSync(section, "---\ntitle: Subject\nartwork: subject\n---\n");
  fs.writeFileSync(child, "---\ntitle: Guide\nartwork: subject\n---\n");
  const forbidden = render();
  assert.notEqual(forbidden.status, 0);
  assert.match(forbidden.stdout + forbidden.stderr, /Illustrations are only allowed on top-level sidebar section pages: \/docs\/subject\/guide\//u);
  fs.writeFileSync(child, "---\ntitle: Guide\n---\n");
  fs.mkdirSync(path.join(fixture, "content/docs/subject/nested"));
  fs.writeFileSync(path.join(fixture, "content/docs/subject/nested/_index.md"), "---\ntitle: Nested\nartwork: subject\n---\n");
  const nested = render();
  assert.notEqual(nested.status, 0);
  assert.match(nested.stdout + nested.stderr, /Illustrations are only allowed on top-level sidebar section pages: \/docs\/subject\/nested\//u);
});

test("published illustrations have three fingerprinted responsive variants and no original PNG downloads", () => {
  const directory = path.join(root, "public/assets/artwork");
  const published = fs.readdirSync(directory).sort();
  assert.equal(published.length, Object.keys(registry).length * 3);
  for (const name of Object.keys(registry)) for (const width of [480, 800, 1200]) {
    const matches = published.filter(filename => new RegExp(`^${name}-${width}\\.[a-f0-9]{64}\\.webp$`, "u").test(filename));
    assert.equal(matches.length, 1, `${name} ${width}px variant`);
    const bytes = fs.readFileSync(path.join(directory, matches[0]));
    assert.equal(bytes.subarray(0, 4).toString(), "RIFF");
    assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
    assert.equal(bytes.length < ({ 480: 80, 800: 160, 1200: 300 }[width]) * 1024, true, `${name} ${width}px byte budget`);
  }
  assert.equal(published.some(filename => filename.endsWith(".png")), false);
  assert.deepEqual(verifyPublishedArtwork(root), { assets: 10, placements: 10 });
});

function artworkFixture(context) {
  fs.mkdirSync(path.join(root, ".temp"), { recursive: true });
  const fixture = fs.mkdtempSync(path.join(root, ".temp/artwork-verification-"));
  context.after(() => fs.rmSync(fixture, { recursive: true }));
  for (const directory of ["assets/artwork", "data", "public/second"]) fs.mkdirSync(path.join(fixture, directory), { recursive: true });
  fs.writeFileSync(path.join(fixture, "data/artwork.json"), JSON.stringify({ first: "artwork/first.png", second: "artwork/second.png" }));
  fs.writeFileSync(path.join(fixture, "assets/artwork/first.png"), "first source bytes");
  fs.writeFileSync(path.join(fixture, "assets/artwork/second.png"), "second source bytes");
  fs.writeFileSync(path.join(fixture, "public/index.html"), '<div data-artwork="first"></div>');
  fs.writeFileSync(path.join(fixture, "public/second/index.html"), "<div data-artwork=second></div>");
  return fixture;
}

test("the production build verifier accepts only unique illustration placements", context => {
  const fixture = artworkFixture(context);
  assert.deepEqual(verifyPublishedArtwork(fixture), { assets: 2, placements: 2 });
  fs.appendFileSync(path.join(fixture, "public/index.html"), '<div data-artwork="second"></div>');
  assert.throws(() => verifyPublishedArtwork(fixture), /Repeated artwork second/u);
});

test("renaming the same source image cannot bypass the production uniqueness gate", context => {
  const fixture = artworkFixture(context);
  fs.copyFileSync(path.join(fixture, "assets/artwork/first.png"), path.join(fixture, "assets/artwork/second.png"));
  assert.throws(() => verifyPublishedArtwork(fixture), /Repeated artwork source: first and second/u);
});

test("the production artwork verifier rejects unknown and unused selections", context => {
  const fixture = artworkFixture(context);
  const page = path.join(fixture, "public/second/index.html");
  fs.writeFileSync(page, '<div data-artwork="unknown"></div>');
  assert.throws(() => verifyPublishedArtwork(fixture), /Unknown artwork unknown/u);
  fs.writeFileSync(page, "<main>No image</main>");
  assert.throws(() => verifyPublishedArtwork(fixture), /Unused artwork source: second/u);
});
