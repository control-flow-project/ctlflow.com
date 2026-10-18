import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { chromium } from "playwright";
import { startServer } from "../../scripts/serve.mjs";

const root = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));

test("server-only Docker and host setup are readable on desktop and mobile", async context => {
  const artifacts = path.join(root, ".temp/host-fleets-browser");
  fs.mkdirSync(artifacts, { recursive: true });
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "ctlflow-web-"));
  let preview;
  let browser;
  context.after(async () => {
    try { await browser?.close(); }
    finally {
      try { await preview?.close(); }
      finally { fs.rmSync(temporary, { recursive: true }); }
    }
  });
  preview = await startServer(0);
  browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE ?? "/usr/bin/google-chrome", headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-breakpad", "--disable-crash-reporter"],
    env: { ...process.env, TMPDIR: temporary, XDG_CACHE_HOME: path.join(temporary, "cache"), XDG_CONFIG_HOME: path.join(temporary, "config") } });
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 960 } });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      const response = await page.goto(preview.origin + "/docs/ctlflow/local-docker/");
      assert.equal(response.status(), 200);
      await page.getByRole("heading", { level: 1, name: "Local Docker server and host fleet", exact: true }).waitFor();
      const text = await page.locator("main").innerText();
      for (const expected of ["Your fleet runs on the execution host, not in Docker.", "published release 0.1.22",
        "server-state", "Stopping the server does not stop host agents.", "native provider login"])
        assert.equal(text.includes(expected), true, expected);
      const commands = await page.locator("main pre").allTextContents();
      assert.equal(commands.some(command => /crossfire-csharp-nativeaot@sha256:[a-f0-9]{64}/u.test(command)), true);
      assert.equal(commands.some(command => /crossfire-migrations@sha256:[a-f0-9]{64}/u.test(command)), true);
      assert.equal(commands.some(command => command.includes("MANIFEST_DIGEST")), false);
      assert.equal(await page.getByRole("link", { name: "release inventory", exact: true }).count(), 1);
      assert.equal(commands.some(command => command.includes("--profile maintenance run --rm migrate")), true);
      assert.equal(commands.some(command => command.includes("down --volumes")), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
      await page.screenshot({ path: path.join(artifacts, "docker-" + width + ".png"), fullPage: true });
      await page.goto(preview.origin + "/docs/fleet/setup/");
      const setup = await page.locator("main").innerText();
      assert.equal(setup.includes("not Codex/Pi"), true);
      assert.equal(setup.includes("node_modules/.bin/fleet"), true);
      assert.equal(await page.getByRole("link", { name: "Local Docker server and host-native fleet", exact: true }).count(), 1);
      await page.goto(preview.origin + "/docs/fleetd/authentication/");
      assert.equal((await page.locator("main").innerText()).includes("Do not delete the socket or bypass authentication"), true);
      assert.deepEqual(errors, []);
    } finally { await page.close(); }
  }
});
