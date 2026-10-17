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
const evidence = { tests: [], checkedPages: 0, checkedLinks: 0, codeExamples: {}, palettes: [], consoleErrors: [], viewports: [] };

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

function contrastRatio(foreground, background) {
  function luminance(hex) {
    assert.match(hex, /^#[\da-f]{6}$/iu);
    const channels = hex.slice(1).match(/../gu).map(channel => Number.parseInt(channel, 16) / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
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
  assert.equal(await page.getByRole("heading", { level: 1 }).innerText(), "Agents working\ntogether in\nMatrix rooms.");
  assert.deepEqual(await page.locator(".message-flow li strong").allTextContents(), ["Matrix room", "crossfire", "fleetd", "Agent"]);
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

test("every generated HTML link, exact anchor and code example renders correctly", async context => {
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
    const codeExamples = {};
    let links = 0;
    const parser = new DOMParser();
    for (const record of records) {
      const document = parser.parseFromString(record.html, "text/html");
      const ids = [...document.querySelectorAll("[id]")].map(element => element.id);
      if (new Set(ids).size !== ids.length) diagnostics.push(`${record.url}: duplicate IDs`);
      for (const code of document.querySelectorAll("pre code")) {
        const language = code.getAttribute("data-lang");
        if (!language || !code.classList.contains(`language-${language}`) || !code.closest(".highlight") || !code.closest("pre.chroma")) diagnostics.push(`${record.url}: code missing shared syntax renderer`);
        if (code.closest("[style]") || code.querySelector("[style]")) diagnostics.push(`${record.url}: inline code styles violate CSP`);
        codeExamples[language] = (codeExamples[language] ?? 0) + 1;
      }
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
    return { diagnostics, pages: pages.size, links, codeExamples };
  }, records);
  assert.equal(result.diagnostics.length, 0, result.diagnostics.slice(0, 35).join("\n"));
  assert.equal(result.pages > 200, true);
  evidence.checkedPages = result.pages;
  evidence.checkedLinks = result.links;
  evidence.codeExamples = result.codeExamples;
  assert.equal(Object.values(result.codeExamples).reduce((total, count) => total + count, 0) > 1200, true);
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
  await page.goto(`${preview.origin}/docs/fleet/setup/`);
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  evidence.tests.push("persistent-light-dark-and-keyboard-code-tabs");
});

test("light is the default regardless of system theme or unavailable stored preferences", async context => {
  const { page, browserContext } = await pageFor(context, { colorScheme: "dark" });
  await page.goto(preview.origin);
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  assert.equal(await page.locator("body").evaluate(element => getComputedStyle(element).backgroundColor), "rgb(255, 255, 255)");
  await page.evaluate(() => localStorage.setItem("ctlflow-theme", "invalid"));
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await browserContext.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage unavailable", "SecurityError"); } }));
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  evidence.tests.push("explicit-light-default-storage-unavailable");
});

test("both palettes keep body and syntax colors readable, with larger small text", async context => {
  const { page } = await pageFor(context);
  await page.goto(preview.origin);
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "Switch to dark theme" }).click();
    const palette = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const names = ["bg", "raised", "panel", "text", "secondary", "muted", "accent", "code", "syntax-string", "syntax-number", "syntax-function", "syntax-type"];
      return Object.fromEntries(names.map(name => [name, styles.getPropertyValue(`--${name}`).trim()]));
    });
    assert.equal(await page.locator('meta[name="theme-color"]').getAttribute("content"), palette.bg);
    for (const background of ["bg", "raised", "panel", "code"]) {
      for (const foreground of ["text", "secondary", "muted", "accent"]) {
        assert.equal(contrastRatio(palette[foreground], palette[background]) >= 4.5, true, `${theme} ${foreground}/${background} contrast`);
      }
    }
    for (const foreground of ["syntax-string", "syntax-number", "syntax-function", "syntax-type"]) {
      assert.equal(contrastRatio(palette[foreground], palette.code) >= 4.5, true, `${theme} ${foreground}/code contrast`);
    }
    assert.equal(contrastRatio(palette.bg, palette.accent) >= 4.5, true, `${theme} primary button contrast`);
    const accent = palette.accent.slice(1).match(/../gu).map(channel => Number.parseInt(channel, 16));
    assert.equal(accent[1] > accent[0] && accent[1] > accent[2], true, `${theme} green accent`);
    for (const [selector, size] of [[".primary-nav a", 15], [".product-card p", 15], [".hero-description", 18], [".hero-terminal pre", 13], [".terminal-caption", 13]]) {
      assert.equal(await page.locator(selector).first().evaluate(element => getComputedStyle(element).fontSize), `${size}px`, `${selector} text size`);
    }
    await page.screenshot({ path: path.join(artifacts, `home-${theme}.png`), fullPage: true });
    evidence.palettes.push({ theme, colors: palette });
  }
  await page.goto(`${preview.origin}/docs/fleet/configuration/`);
  for (const [selector, size] of [[".prose", 16], [".prose pre", 13], [".nav-item", 14]]) {
    assert.equal(await page.locator(selector).first().evaluate(element => getComputedStyle(element).fontSize), `${size}px`, `${selector} documentation text size`);
  }
  await page.emulateMedia({ media: "print" });
  assert.equal(await page.locator("body").evaluate(element => getComputedStyle(element).backgroundColor), "rgb(255, 255, 255)");
  const printColors = await page.locator("html").evaluate(element => {
    const styles = getComputedStyle(element);
    return { code: styles.getPropertyValue("--code").trim(), string: styles.getPropertyValue("--syntax-string").trim() };
  });
  assert.equal(contrastRatio(printColors.string, printColors.code) >= 4.5, true, "printed syntax contrast from dark mode");
  evidence.tests.push("green-palettes-contrast-readable-type-print");
});

test("homepage examples use syntax colors and copy their original source in both themes", async context => {
  const { page, browserContext } = await pageFor(context);
  await browserContext.grantPermissions(["clipboard-read", "clipboard-write"], { origin: preview.origin });
  await page.goto(preview.origin);
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "Switch to dark theme" }).click();
    for (const [label, panel, language, extension] of [["JavaScript", "js", "javascript", "js"], ["C#", "cs", "csharp", "cs"], ["Rust", "rs", "rust", "rs"]]) {
      await page.getByRole("tab", { name: label, exact: true }).click();
      const code = page.locator(`#panel-${panel} pre.chroma code.language-${language}`);
      assert.equal(await code.isVisible(), true);
      const expected = fs.readFileSync(path.join(root, `assets/examples/http-client.${extension}`), "utf8").trimEnd();
      assert.equal((await code.textContent()).trimEnd(), expected);
      const colors = await code.locator("span").evaluateAll(elements => [...new Set(elements.map(element => getComputedStyle(element).color))]);
      assert.equal(colors.length >= 3, true, `${label} ${theme} syntax colors`);
      const block = page.locator(`#panel-${panel} .code-container`);
      await block.hover();
      const firstLine = await code.locator(".line").first().boundingBox();
      const copyButton = await block.getByRole("button", { name: "Copy code to clipboard", exact: true }).boundingBox();
      assert.equal(copyButton.y + copyButton.height <= firstLine.y, true, `${label} copy control does not cover code`);
      await block.getByRole("button", { name: "Copy code to clipboard", exact: true }).click();
      await block.getByRole("button", { name: "Code copied to clipboard" }).waitFor();
      assert.equal((await page.evaluate(() => navigator.clipboard.readText())).trimEnd(), expected);
      await page.reload();
    }
  }
  evidence.tests.push("home-three-languages-highlight-copy-both-themes");
});

test("code copying preserves actual code text", async context => {
  const { page, browserContext } = await pageFor(context);
  await browserContext.grantPermissions(["clipboard-read", "clipboard-write"], { origin: preview.origin });
  await page.goto(`${preview.origin}/docs/fleet/configuration/`);
  const block = page.locator(".code-container").first();
  await block.hover();
  const firstLine = await block.locator("code .line").first().boundingBox();
  const copyButton = await block.getByRole("button", { name: "Copy code to clipboard" }).boundingBox();
  assert.equal(copyButton.y + copyButton.height <= firstLine.y, true, "documentation copy control does not cover code");
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
  await page.goto(preview.origin);
  await page.screenshot({ path: path.join(artifacts, "home-mobile-light.png") });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth <= 1), true, "mobile dark theme page width");
  await page.screenshot({ path: path.join(artifacts, "home-mobile-dark.png") });
  await page.locator(".hero-terminal").screenshot({ path: path.join(artifacts, "code-mobile-dark.png") });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.goto(`${preview.origin}/docs/api/crossfire/create-publication/`);
  const navigation = page.locator("#docs-navigation");
  assert.equal(await navigation.getAttribute("open"), null);
  await navigation.locator("summary").click();
  assert.equal(await navigation.getAttribute("open"), "");
  await navigation.locator(".nav-item", { hasText: /^Fleet configuration$/u }).click();
  await page.waitForURL("**/docs/fleet/configuration/");
  assert.equal(await page.locator(".prose").evaluate(element => getComputedStyle(element).fontSize), "15px");
  assert.equal(await page.locator(".prose pre").first().evaluate(element => getComputedStyle(element).fontSize), "12px");
  await page.screenshot({ path: path.join(artifacts, "fleet-mobile.png"), fullPage: true });
  evidence.tests.push("320-390-768-1440-responsive-and-mobile-navigation");
});

test("navigation and documents remain readable with JavaScript disabled; missing paths return404", async context => {
  const { page } = await pageFor(context, { javaScriptEnabled: false });
  await page.goto(`${preview.origin}/docs/ctlflow/architecture/`);
  assert.equal(await page.locator("body").evaluate(element => getComputedStyle(element).backgroundColor), "rgb(255, 255, 255)");
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
