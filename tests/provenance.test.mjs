import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { createSnapshot, sha256 } from "../scripts/docs/snapshot.mjs";
import { generatedExtras, reconcileOutputs, verifyStored } from "../scripts/docs/stored.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
function temporary(context) {
  fs.mkdirSync(path.join(root, ".temp"), { recursive: true });
  const directory = fs.mkdtempSync(path.join(root, ".temp/provenance-test-"));
  context.after(() => fs.rmSync(directory, { recursive: true }));
  return directory;
}
function write(directory, relative, value) {
  const target = path.join(directory, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value);
}

test("source snapshots consume exact Git bytes despite dirty or deleted worktree files", context => {
  const directory = temporary(context);
  const git = args => execFileSync("git", ["-C", directory, ...args], { stdio: "pipe", encoding: "utf8" });
  git(["init", "--initial-branch=source-fixture"]);
  git(["config", "user.name", "Website test fixture"]);
  git(["config", "user.email", "fixture@example.test"]);
  write(directory, "contract.ts", "export const version = 1;\n");
  git(["add", "contract.ts"]);
  git(["commit", "-m", "source fixture"]);
  const snapshot = createSnapshot(directory);
  write(directory, "contract.ts", "uncommitted invalid data");
  write(directory, "unrelated.txt", "Unrelated shared work");
  assert.equal(snapshot.read("contract.ts"), "export const version = 1;\n");
  fs.unlinkSync(path.join(directory, "contract.ts"));
  assert.equal(snapshot.exists("contract.ts"), true);
  assert.equal(snapshot.read("contract.ts"), "export const version = 1;\n");
  assert.throws(() => snapshot.read("unrelated.txt"), /Missing source/u);
  assert.throws(() => snapshot.read("../outside"), /Missing source/u);
  assert.equal(snapshot.consumed.get("contract.ts"), sha256("export const version = 1;\n"));
  write(directory, "bom.txt", Buffer.from([0xef, 0xbb, 0xbf, 0x41]));
  write(directory, "invalid.txt", Buffer.from([0xc0, 0xaf]));
  git(["add", "bom.txt", "invalid.txt"]);
  git(["commit", "-m", "encoding fixtures"]);
  const encoded = createSnapshot(directory);
  assert.equal(encoded.read("bom.txt"), "\ufeffA");
  assert.equal(encoded.consumed.get("bom.txt"), sha256(Buffer.from([0xef, 0xbb, 0xbf, 0x41])));
  assert.throws(() => encoded.read("invalid.txt"), /encoded data|encoding/u);
});

test("removed generated pages are detected and safely removed, not retained", context => {
  const directory = temporary(context);
  const old = "---\ngenerated: true\n---\nOld operation";
  write(directory, "content/docs/api/crossfire/removed.md", old);
  write(directory, "data/reference-manifest.json", JSON.stringify({ outputs: { "content/docs/api/crossfire/removed.md": sha256(old) } }));
  const outputs = new Map([["data/reference-manifest.json", JSON.stringify({ outputs: {} })]]);
  assert.throws(() => reconcileOutputs(directory, outputs, true), /removed:/u);
  reconcileOutputs(directory, outputs, false);
  assert.equal(fs.existsSync(path.join(directory, "content/docs/api/crossfire/removed.md")), false);
});

test("edited removed output is protected instead of deleted", context => {
  const directory = temporary(context);
  write(directory, "content/docs/api/crossfire/edited.md", "Shared edits");
  write(directory, "data/reference-manifest.json", JSON.stringify({ outputs: { "content/docs/api/crossfire/edited.md": sha256("Original") } }));
  assert.throws(() => reconcileOutputs(directory, new Map(), false), /Refusing to remove edited/u);
  assert.equal(fs.readFileSync(path.join(directory, "content/docs/api/crossfire/edited.md"), "utf8"), "Shared edits");
});

test("unrecorded generated extras, missing files and changed bytes fail checks", context => {
  const directory = temporary(context);
  write(directory, "content/docs/api/fleetd/unrecorded.md", "Not in manifest");
  assert.equal(generatedExtras(directory, new Set()).length, 1);
  assert.throws(() => reconcileOutputs(directory, new Map(), true), /Unrecorded generated/u);
  fs.unlinkSync(path.join(directory, "content/docs/api/fleetd/unrecorded.md"));
  const expected = new Map([["content/docs/api/crossfire/read.md", "expected"]]);
  assert.throws(() => reconcileOutputs(directory, expected, true), /differs/u);
  write(directory, "content/docs/api/crossfire/read.md", "changed");
  assert.throws(() => reconcileOutputs(directory, expected, true), /differs/u);
  assert.throws(() => reconcileOutputs(directory, new Map([["../outside", "no"]]), false), /Invalid generated output path/u);
});

test("the checked-in source, generator and output ledger is complete", () => {
  const manifest = verifyStored(root);
  assert.equal(manifest.counts.crossfire, 92);
  assert.equal(manifest.counts.fleetd, 19);
  assert.equal(manifest.counts.matrix, 157);
  assert.equal(manifest.counts.schemaModules >= 30, true);
  assert.equal(Object.keys(manifest.inputs).every(filename => /^(ctlflow|toolsmith):/u.test(filename)), true);
});

test("unsafe symlink output parents fail before any stale file is removed", context => {
  const directory = temporary(context);
  const external = temporary(context);
  const old = "Owned stale page";
  write(directory, "content/docs/api/crossfire/old.md", old);
  write(external, "kept.md", "Outside the selected output root");
  write(directory, "data/reference-manifest.json", JSON.stringify({ outputs: { "content/docs/api/crossfire/old.md": sha256(old) } }));
  fs.symlinkSync(external, path.join(directory, "content/docs/api/fleetd"), "dir");
  const outputs = new Map([["content/docs/api/fleetd/kept.md", "Must not be written"]]);
  assert.throws(() => reconcileOutputs(directory, outputs, false), /Symbolic/u);
  assert.equal(fs.readFileSync(path.join(directory, "content/docs/api/crossfire/old.md"), "utf8"), old);
  assert.equal(fs.readFileSync(path.join(external, "kept.md"), "utf8"), "Outside the selected output root");
});

test("a later shared-edit conflict cannot partially remove earlier stale files", context => {
  const directory = temporary(context);
  write(directory, "content/docs/api/crossfire/old.md", "Old page");
  write(directory, "content/docs/api/crossfire/edited.md", "Preserve this edit");
  write(directory, "data/reference-manifest.json", JSON.stringify({ outputs: {
    "content/docs/api/crossfire/old.md": sha256("Old page"),
    "content/docs/api/crossfire/edited.md": sha256("Original generated page"),
  } }));
  assert.throws(() => reconcileOutputs(directory, new Map([["content/docs/api/crossfire/edited.md", "Replacement"]]), false), /Refusing to overwrite/u);
  assert.equal(fs.existsSync(path.join(directory, "content/docs/api/crossfire/old.md")), true);
  assert.equal(fs.readFileSync(path.join(directory, "content/docs/api/crossfire/edited.md"), "utf8"), "Preserve this edit");
});
