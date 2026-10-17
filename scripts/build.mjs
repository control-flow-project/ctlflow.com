import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { verifyStored } from "./docs/stored.mjs";
import { siteOrigin } from "./build-options.mjs";
import { verifyFleetStreet } from "./fleet-street.mjs";
import { verifyPublishedArtwork } from "./artwork.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
verifyStored(root);
verifyFleetStreet(root);
const expectedVersion = "0.168.0";
const local = path.join(root, ".temp/tools/hugo");
const executable = process.env.HUGO_BINARY ?? (fs.existsSync(local) ? local : "hugo");
const version = spawnSync(executable, ["version"], { encoding: "utf8", cwd: root });
if (version.status !== 0 || !version.stdout.includes(`hugo v${expectedVersion}-`)) throw new Error(`Install Hugo ${expectedVersion}; selected executable did not report the pinned version`);
const baseURL = siteOrigin(process.env);
const result = spawnSync(executable, ["--gc", "--minify", "--panicOnWarning", "--cleanDestinationDir", "--cacheDir", path.join(root, ".temp/hugo-cache"), "--baseURL", baseURL], {
  cwd: root, stdio: "inherit", env: { ...process.env, HUGO_ENVIRONMENT: "production" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const artwork = verifyPublishedArtwork(root);
console.log(JSON.stringify({ hugo: expectedVersion, baseURL, output: "public", artwork }));
