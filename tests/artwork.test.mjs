import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
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
  "docs/examples/fleet-street.md": "theatre",
};

test("nine distinct original illustrations are local RGBA PNGs with matching intrinsic dimensions", () => {
  assert.deepEqual(Object.keys(registry).sort(), ["collaboration", "crossfire", "ctlflow", "examples", "fleet", "fleetd", "multitool", "playbill", "theatre"]);
  for (const [name, filename] of Object.entries(registry)) {
    assert.equal(filename, `artwork/${name}.png`);
    const bytes = fs.readFileSync(path.join(root, "assets", filename));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", name);
    assert.equal(bytes.subarray(12, 16).toString(), "IHDR", name);
    assert.equal(bytes.readUInt32BE(16), 1536, `${name} width`);
    assert.equal(bytes.readUInt32BE(20), 1024, `${name} height`);
    assert.equal(bytes[24], 8, `${name} bit depth`);
    assert.equal(bytes[25], 6, `${name} RGBA color type`);
  }
  assert.deepEqual(fs.readdirSync(path.join(root, "assets/artwork")).sort(), Object.values(registry).map(filename => path.basename(filename)).sort());
});

test("only selected landing pages request illustrations, never technical guides or generated references", () => {
  const actual = {};
  for (const filename of fs.readdirSync(path.join(root, "content"), { recursive: true }).filter(filename => filename.endsWith(".md"))) {
    const content = fs.readFileSync(path.join(root, "content", filename), "utf8");
    const selection = /^artwork: (\S+)$/mu.exec(content)?.[1];
    if (selection) {
      assert.equal(selection in registry, true, filename);
      assert.equal(/^generated: true$/mu.test(content), false, filename);
      actual[filename] = selection;
    }
  }
  assert.deepEqual(actual, selections);
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
  assert.deepEqual(verifyPublishedArtwork(root), { assets: 9, placements: 9 });
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
