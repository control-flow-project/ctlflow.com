import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

export const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

export function createSnapshot(root) {
  const git = args => new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(execFileSync("git", ["-C", root, ...args], { maxBuffer: 16 * 1024 * 1024 }));
  const revision = git(["rev-parse", "HEAD"]).trim();
  if (!/^[a-f0-9]{40}$/u.test(revision)) throw new Error("Source revision is not an exact Git commit");
  const files = new Set(git(["ls-tree", "-r", "--name-only", "-z", revision]).split("\0").filter(Boolean));
  const consumed = new Map();
  const cache = new Map();
  function read(relative) {
    if (!files.has(relative)) throw new Error(`Missing source at ${revision}: ${relative}`);
    if (!cache.has(relative)) cache.set(relative, git(["show", `${revision}:${relative}`]));
    const value = cache.get(relative);
    consumed.set(relative, sha256(value));
    return value;
  }
  return { revision, read, exists: relative => files.has(relative), consumed };
}
