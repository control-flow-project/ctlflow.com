import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { before, after, test } from "node:test";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { startServer } from "../../scripts/serve.mjs";

const root = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const artifacts = path.join(root, ".temp/browser-test");
let preview;
let browser;
const evidence = { tests: [], checkedPages: 0, checkedLinks: 0, consoleErrors: [], viewports: [] };

before(async () => {
  fs.mkdirSync(artifacts, { recursive: true });
  process.env.TMPDIR = path.join(root, ".temp");
  fs.mkdirSync(process.env.TMPDIR, { recursive: true });
  preview = await startServer(0);
  try {
    browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE ?? "/usr/bin/google-chrome", headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-breakpad", "--disable-crash-reporter"],
      env: { ...process.env, XDG_CACHE_HOME: path.join(artifacts, "cache"), XDG_CONFIG_HOME: path.join(artifacts, "config") } });
  } catch (error) { await preview.close(); preview = undefined; throw error; }
});

after(async () => {
  if (browser) await browser.close();
  if (preview) await preview.close();
  fs.writeFileSync(path.join(artifacts, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
});

async function pageFor(context, options = {}) {
  const browserContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
  const page = await browserContext.newPage();
  context.after(() => browserContext.close());
  return { page, browserContext };
}

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}

test("home loads under Netlify CSP without external resources, errors or missing assets", async context => {
  const { page } = await pageFor(context);
  const errors = [];
  const failures = [];
  const outside = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("requestfailed", request => failures.push(request.url()));
  page.on("request", request => { if (!request.url().startsWith(preview.origin)) outside.push(request.url()); });
  const response = await page.goto(preview.origin, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  assert.equal(response.headers()["content-security-policy"].includes("script-src 'self'"), true);
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.equal(await page.title(), "ctlflow");
  assert.equal(await page.getByRole("link", { name: "ctlflow home" }).count(), 1);
  assert.deepEqual(await page.locator(".message-flow li strong").allTextContents(), ["Matrix room", "crossfire", "fleetd", "Codex or Earendil Pi"]);
  assert.deepEqual(await page.locator(".product-card h3").allTextContents(), ["crossfire", "fleetd", "fleet"]);
  assert.equal(await page.locator(".hero-description").textContent().then(text => text.includes("Agents run on your machine")), true);
  const toolsmith = await page.locator(".related-project").innerText();
  assert.equal(toolsmith.includes("Python libraries and command-line tools"), true);
  assert.equal(toolsmith.includes("HTTP downloads, file handling, text extraction and local search"), true);
  assert.equal(toolsmith.includes("ctlflow does not require them"), true);
  assert.equal(/Knex|React|SQLite|wire contract|constituent/u.test(await page.locator(".hero").innerText()), false);
  await page.screenshot({ path: path.join(artifacts, "home-desktop.png"), fullPage: true });
  assert.deepEqual(errors, []);
  assert.deepEqual(failures, []);
  assert.deepEqual(outside, []);
  evidence.consoleErrors.push(...errors);
  evidence.tests.push("home-csp-local-assets");
});

test("every generated HTML link and exact anchor resolves", async context => {
  const { page } = await pageFor(context);
  await page.goto(preview.origin);
  const publicRoot = path.join(root, "public");
  const records = files(publicRoot).filter(filename => filename.endsWith(".html")).map(filename => {
    const relative = path.relative(publicRoot, filename).replaceAll(path.sep, "/");
    return { url: `/${relative.replace(/index\.html$/u, "")}`, html: fs.readFileSync(filename, "utf8") };
  });
  const result = await page.evaluate(records => {
    const pages = new Map();
    const diagnostics = [];
    let links = 0;
    const parser = new DOMParser();
    for (const record of records) {
      const document = parser.parseFromString(record.html, "text/html");
      const ids = [...document.querySelectorAll("[id]")].map(element => element.id);
      if (new Set(ids).size !== ids.length) diagnostics.push(`${record.url}: duplicate IDs`);
      pages.set(record.url, { ids: new Set(ids), links: [...document.querySelectorAll("a[href]")].map(element => element.getAttribute("href")) });
    }
    for (const [source, page] of pages) for (const href of page.links) {
      const url = new URL(href, `https://ctlflow.com${source}`);
      if (url.origin !== "https://ctlflow.com") continue;
      links += 1;
      const destination = pages.get(url.pathname);
      if (!destination) diagnostics.push(`${source} -> missing ${url.pathname}`);
      else if (url.hash && !destination.ids.has(decodeURIComponent(url.hash.slice(1)))) diagnostics.push(`${source} -> missing anchor ${url.pathname}${url.hash}`);
    }
    return { diagnostics, pages: pages.size, links };
  }, records);
  assert.equal(result.diagnostics.length, 0, result.diagnostics.slice(0, 35).join("\n"));
  assert.equal(result.pages > 200, true);
  evidence.checkedPages = result.pages;
  evidence.checkedLinks = result.links;
  evidence.tests.push("all-html-links-and-case-exact-anchors");
});

test("search is URL-addressable, escapes input and supports the keyboard shortcut", async context => {
  const { page } = await pageFor(context);
  await page.goto(`${preview.origin}/docs/`);
  await page.keyboard.press("/");
  await page.waitForURL("**/search/");
  const query = page.getByRole("searchbox", { name: "Search documentation", exact: true });
  await query.fill("maxMessageBytes");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page.locator("#search-results .search-result").first().waitFor();
  assert.equal(page.url().includes("q=maxMessageBytes"), true);
  assert.equal((await page.locator("#search-status").innerText()).includes("matching pages"), true);
  await page.reload();
  await page.locator("#search-results .search-result").first().waitFor();
  assert.equal(await query.inputValue(), "maxMessageBytes");
  await query.fill('<img src=x onerror="alert(1)">');
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page.waitForFunction(() => document.querySelector("#search-status").textContent.startsWith("No results"));
  assert.equal(await page.locator("#search-status img").count(), 0);
  await query.fill("");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  assert.equal((await page.locator("#search-status").innerText()).includes("Enter a word"), true);
  evidence.tests.push("search-query-url-reload-keyboard-escaping");
});

test("theme persists across navigation and code language tabs work by keyboard", async context => {
  const { page } = await pageFor(context);
  await page.goto(preview.origin);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page.getByRole("tab", { name: "C#", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.getByRole("tab", { name: "Rust", exact: true }).getAttribute("aria-selected"), "true");
  assert.equal(await page.locator("#panel-rs").isVisible(), true);
  assert.equal(await page.locator("#panel-js").isVisible(), false);
  await page.goto(`${preview.origin}/docs/ctlflow/architecture/`);
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page.screenshot({ path: path.join(artifacts, "architecture-light.png"), fullPage: true });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  evidence.tests.push("persistent-light-dark-and-keyboard-code-tabs");
});

test("code copying preserves actual code text", async context => {
  const { page, browserContext } = await pageFor(context);
  await browserContext.grantPermissions(["clipboard-read", "clipboard-write"], { origin: preview.origin });
  await page.goto(`${preview.origin}/docs/fleet/configuration/`);
  const block = page.locator(".code-container").first();
  await block.hover();
  await block.getByRole("button", { name: "Copy code to clipboard" }).click();
  await block.getByRole("button", { name: "Code copied to clipboard" }).waitFor();
  const actual = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(actual, await block.locator("code").innerText());
  evidence.tests.push("literal-code-copy");
});

test("mobile navigation and long API tables do not cause page-level overflow", async context => {
  const { page } = await pageFor(context);
  const paths = ["/", "/docs/ctlflow/architecture/", "/docs/api/crossfire/create-publication/", "/docs/api/fleetd/attachment/", "/docs/api/schemas/crossfire-contracts-schema-response/"];
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const location of paths) {
      await page.goto(`${preview.origin}${location}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.equal(overflow <= 1, true, `${width}px ${location}: ${overflow}px page overflow`);
      assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
    }
    evidence.viewports.push(width);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${preview.origin}/docs/api/crossfire/create-publication/`);
  const navigation = page.locator("#docs-navigation");
  assert.equal(await navigation.getAttribute("open"), null);
  await navigation.locator("summary").click();
  assert.equal(await navigation.getAttribute("open"), "");
  await navigation.locator(".nav-item", { hasText: /^Fleet configuration$/u }).click();
  await page.waitForURL("**/docs/fleet/configuration/");
  await page.screenshot({ path: path.join(artifacts, "fleet-mobile.png"), fullPage: true });
  evidence.tests.push("320-390-768-1440-responsive-and-mobile-navigation");
});

test("navigation and documents remain readable with JavaScript disabled; missing paths return404", async context => {
  const { page } = await pageFor(context, { javaScriptEnabled: false });
  await page.goto(`${preview.origin}/docs/ctlflow/architecture/`);
  assert.equal(await page.locator("#docs-navigation").getAttribute("open"), "");
  assert.equal(await page.locator("h2#source-organization").isVisible(), true);
  assert.equal(await page.locator(".prose").innerText().then(text => text.includes("Domain modules do not import concrete adapters.")), true);
  await page.getByRole("link", { name: "Set up a fleet", exact: true }).click();
  await page.waitForURL("**/docs/fleet/setup/");
  const missing = await page.goto(`${preview.origin}/not-a-document/`);
  assert.equal(missing.status(), 404);
  assert.equal(await page.getByRole("heading", { name: "Page not found." }).isVisible(), true);
  evidence.tests.push("no-javascript-progressive-navigation-and-404");
});
