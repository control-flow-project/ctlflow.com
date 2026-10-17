import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createSnapshot, sha256 } from "./docs/snapshot.mjs";

const website = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const metadataPath = "data/fleetstreet.json";
const sourceFiles = {
  roster: ["fleet/runtime.toml", "toml"],
  coordinator: ["fleet/agents/stage-manager/agent.toml", "toml"],
  brief: ["examples/brief.json", "json"],
  budget: ["examples/budget.json", "json"],
  report: ["examples/report.json", "json"],
  handoff: ["examples/handoff.md", "markdown"],
  send: ["examples/send-handoff.sh", "sh"],
};
const reportFiles = ["index.html", "assets/report.css", "assets/proscenium.svg", "assets/LICENSE.txt", "data/budget.json"];

function target(root, relative) {
  if (relative !== metadataPath && !relative.startsWith("assets/examples/fleet-street/") && !relative.startsWith("static/examples/fleet-street/report/")) throw new Error("Unexpected example output owner");
  const filename = path.resolve(root, relative);
  if (!filename.startsWith(path.resolve(root) + path.sep) || relative !== path.posix.normalize(relative)) throw new Error("Unsafe example output path");
  let current = path.resolve(root);
  for (const segment of relative.split("/")) {
    current = path.join(current, segment);
    if (fs.lstatSync(current, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error("Example outputs cannot traverse symbolic links");
  }
  return filename;
}

function rejectUnrecorded(root, expected) {
  function walk(relative) {
    const directory = path.join(root, relative);
    if (!fs.existsSync(directory)) return;
    if (fs.lstatSync(directory).isSymbolicLink()) throw new Error("Example outputs cannot traverse symbolic links");
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const child = relative + "/" + entry.name;
      if (entry.isSymbolicLink()) throw new Error("Example outputs cannot contain symbolic links");
      if (entry.isDirectory()) walk(child);
      else if (!entry.isFile() || !expected.has(child)) throw new Error(`Unrecorded example output: ${child}`);
    }
  }
  walk("assets/examples/fleet-street");
  walk("static/examples/fleet-street/report");
}

export function verifyFleetStreet(root) {
  const metadata = JSON.parse(fs.readFileSync(target(root, metadataPath), "utf8"));
  if (metadata.repository !== "https://github.com/control-flow-project/fleet-street" || !/^[a-f0-9]{40}$/u.test(metadata.revision)) throw new Error("Invalid fleet-street source revision");
  if (metadata.generator !== sha256(fs.readFileSync(path.join(root, "scripts/fleet-street.mjs")))) throw new Error("fleet-street generator changed; refresh its source snapshot");
  const expectedOutputs = [...Object.entries(sourceFiles).map(([name, [, language]]) => `assets/examples/fleet-street/${name}.${language === "markdown" ? "md" : language}`), ...reportFiles.map(relative => `static/examples/fleet-street/report/${relative}`)].sort();
  if (JSON.stringify(Object.keys(metadata.outputs).sort()) !== JSON.stringify(expectedOutputs)) throw new Error("Incomplete fleet-street output inventory");
  for (const [relative, expected] of Object.entries(metadata.outputs)) {
    if (sha256(fs.readFileSync(target(root, relative))) !== expected) throw new Error(`fleet-street example changed: ${relative}`);
  }
  rejectUnrecorded(root, new Set(expectedOutputs));
  return metadata;
}

export function syncFleetStreet(sourceRoot, check, root = website) {
  const source = createSnapshot(path.resolve(sourceRoot));
  const outputs = new Map();
  const snippets = {};
  for (const [name, [sourcePath, language]] of Object.entries(sourceFiles)) {
    const asset = `examples/fleet-street/${name}.${language === "markdown" ? "md" : language}`;
    outputs.set(`assets/${asset}`, source.read(sourcePath));
    snippets[name] = { path: sourcePath, language, asset };
  }
  const temporary = path.join(root, ".temp");
  fs.mkdirSync(temporary, { recursive: true });
  const fixture = fs.mkdtempSync(path.join(temporary, "fleet-street-"));
  try {
    const modules = ["tools/__init__.py", ...["__init__.py", "__main__.py", "cli.py", "configuration.py", "budget.py", "files.py", "validation.py", "report.py", "assets/report.css", "assets/proscenium.svg", "assets/LICENSE.txt"].map(filename => `tools/fleet_street/${filename}`), "examples/report.json", "examples/budget.json"];
    for (const relative of modules) {
      const filename = path.join(fixture, relative);
      fs.mkdirSync(path.dirname(filename), { recursive: true });
      fs.writeFileSync(filename, source.read(relative));
    }
    const result = spawnSync("python3", ["-m", "tools.fleet_street", "report", "--input", "examples/report.json", "--budget", "examples/budget.json", "--directory", "output"], { cwd: fixture, encoding: "utf8", timeout: 15000, maxBuffer: 1024 * 1024 });
    if (result.status !== 0) throw new Error(`Committed fleet-street report failed: ${result.stderr}`);
    for (const relative of reportFiles) outputs.set(`static/examples/fleet-street/report/${relative}`, fs.readFileSync(path.join(fixture, "output", relative), "utf8"));
  } finally { fs.rmSync(fixture, { recursive: true, force: true }); }
  const metadata = { repository: "https://github.com/control-flow-project/fleet-street", revision: source.revision, version: JSON.parse(source.read("package.json")).version,
    fleetRelease: JSON.parse(source.read("package.json")).devDependencies["@ctlflow/fleet"], agentCount: 10, snippets,
    generator: sha256(fs.readFileSync(path.join(root, "scripts/fleet-street.mjs"))), inputs: Object.fromEntries(source.consumed),
    outputs: Object.fromEntries([...outputs].map(([relative, content]) => [relative, sha256(content)])) };
  const previousFile = target(root, metadataPath);
  rejectUnrecorded(root, new Set(outputs.keys()));
  if (fs.existsSync(previousFile)) {
    const previous = JSON.parse(fs.readFileSync(previousFile, "utf8"));
    for (const [relative, expected] of Object.entries(previous.outputs)) if (fs.existsSync(target(root, relative)) && sha256(fs.readFileSync(target(root, relative))) !== expected) throw new Error(`Refusing to replace edited example output: ${relative}`);
  }
  const differences = [...outputs].filter(([relative, content]) => !fs.existsSync(target(root, relative)) || fs.readFileSync(target(root, relative), "utf8") !== content).map(([relative]) => relative);
  const record = JSON.stringify(metadata, null, 2) + "\n";
  if (!fs.existsSync(previousFile) || fs.readFileSync(previousFile, "utf8") !== record) differences.push(metadataPath);
  if (check && differences.length) throw new Error(`fleet-street snapshot differs: ${differences.join(", ")}`);
  if (!check) {
    for (const [relative, content] of outputs) {
      const filename = target(root, relative);
      fs.mkdirSync(path.dirname(filename), { recursive: true });
      fs.writeFileSync(filename, content);
    }
    fs.mkdirSync(path.dirname(previousFile), { recursive: true });
    fs.writeFileSync(previousFile, record);
  }
  return { revision: source.revision, outputs: outputs.size, check };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arguments_ = process.argv.slice(2);
  if (arguments_[0] !== "--source" || !arguments_[1] || arguments_.length > 3 || arguments_[2] !== undefined && arguments_[2] !== "--check") throw new Error("Usage: node scripts/fleet-street.mjs --source /absolute/fleet-street [--check]");
  console.log(JSON.stringify(syncFleetStreet(arguments_[1], arguments_[2] === "--check")));
}
