import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { afterEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { verifyFleetStreet } from "../scripts/fleet-street.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const fixtures = [];
afterEach(() => { for (const directory of fixtures.splice(0)) fs.rmSync(directory, { recursive: true, force: true }); });

function fixture() {
  fs.mkdirSync(path.join(root, ".temp"), { recursive: true });
  const directory = fs.mkdtempSync(path.join(root, ".temp/example-proof-"));
  fixtures.push(directory);
  const metadata = verifyFleetStreet(root);
  for (const relative of ["scripts/fleet-street.mjs", "data/fleetstreet.json", ...Object.keys(metadata.outputs)]) {
    const target = path.join(directory, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, relative), target);
  }
  return directory;
}

test("fleet-street snapshots retain the complete pinned example and report", () => {
  const metadata = verifyFleetStreet(root);
  assert.equal(metadata.agentCount, 10);
  assert.equal(metadata.fleetRelease, "0.1.23");
  assert.equal(Object.keys(metadata.snippets).length, 7);
  assert.equal(Object.keys(metadata.outputs).length, 12);
  const roster = fs.readFileSync(path.join(root, "assets", metadata.snippets.roster.asset), "utf8");
  assert.equal([...roster.matchAll(/^\[\[instances\]\]$/gmu)].length, 10);
  const coordinator = fs.readFileSync(path.join(root, "assets", metadata.snippets.coordinator.asset), "utf8");
  assert.equal(coordinator.includes('model_reasoning_effort = "medium"'), true);
  assert.equal(coordinator.includes("include_agents = true"), true);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, "static/examples/fleet-street/report/data/budget.json"), "utf8")).balance, "-457.75");
});

test("the example uses personalized current-server setup instead of a second CLI installation", () => {
  const guide = fs.readFileSync(path.join(root, "content/docs/examples/fleet-street.md"), "utf8");
  const setup = guide.split("## Set up the example\n")[1].split("## Configuration and permissions")[0];
  assert.equal(setup.includes("personalized setup guide"), true);
  assert.equal(setup.includes("--config"), true);
  assert.equal(setup.includes(".local/fleet/runtime.toml"), true);
  assert.equal(setup.includes("/docs/fleet/setup/"), true);
  assert.doesNotMatch(setup, /fleet\/fleetd 0\.1\.\d+|node_modules\/\.bin\/fleet|npm ci/u);
});

test("edited or missing example bytes and incomplete inventories fail the build check", () => {
  const directory = fixture();
  const asset = path.join(directory, "assets/examples/fleet-street/send.sh");
  fs.appendFileSync(asset, "unexpected edit\n");
  assert.throws(() => verifyFleetStreet(directory), /example changed/u);
  fs.unlinkSync(asset);
  assert.throws(() => verifyFleetStreet(directory), /ENOENT/u);
  const metadataFile = path.join(directory, "data/fleetstreet.json");
  const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));
  delete metadata.outputs["assets/examples/fleet-street/send.sh"];
  fs.writeFileSync(metadataFile, JSON.stringify(metadata));
  assert.throws(() => verifyFleetStreet(directory), /Incomplete/u);
});

test("dangling output links cannot redirect example verification outside the checkout", () => {
  const directory = fixture();
  const asset = path.join(directory, "assets/examples/fleet-street/send.sh");
  fs.unlinkSync(asset);
  fs.symlinkSync(path.join(directory, "nonexistent"), asset);
  assert.throws(() => verifyFleetStreet(directory), /symbolic/u);
});

test("unrecorded report files cannot accidentally ship with the fictional preview", () => {
  const directory = fixture();
  const extra = path.join(directory, "static/examples/fleet-street/report/unreviewed.txt");
  fs.writeFileSync(extra, "Not part of the approved report bundle");
  assert.throws(() => verifyFleetStreet(directory), /Unrecorded example output/u);
  assert.equal(fs.readFileSync(extra, "utf8"), "Not part of the approved report bundle");
});
