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
const evidence = { tests: [], checkedPages: 0, checkedLinks: 0, codeExamples: {}, palettes: [], consoleErrors: [], viewports: [], artwork: [], paperLayout: [], paperIndexes: [] };

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
  assert.equal(await page.getByRole("heading", { level: 1 }).innerText(), "Bring your own\nagent fleet to\nMatrix rooms.");
  assert.equal(await page.locator('meta[name="description"]').getAttribute("content").then(text => text.includes("agent fleet")), true);
  assert.deepEqual(await page.locator(".message-flow li strong").allTextContents(), ["Matrix room", "crossfire", "fleetd", "Agent"]);
  assert.deepEqual(await page.locator(".product-entry h3").evaluateAll(elements => elements.map(element => element.firstChild.textContent.trim())), ["crossfire", "fleetd", "fleet"]);
  const introduction = await page.locator(".hero-description").innerText();
  assert.equal(introduction.includes("People and agents work together in the same Matrix rooms."), true);
  assert.equal(introduction.includes("your own roles, instructions and tools"), true);
  assert.equal(introduction.includes("Agents run on your machine"), true);
  assert.equal(await page.locator(".message-flow li").filter({ has: page.locator("strong", { hasText: /^crossfire$/u }) }).innerText().then(text => text.includes("message routing")), true);
  const serverDescription = await page.locator(".product-entry").filter({ has: page.getByRole("heading", { name: "crossfire", exact: true }) }).innerText();
  for (const responsibility of ["routes messages", "enrollment", "identities", "room access", "wake-up rules", "permission requests", "activity and usage", "static reports"]) assert.equal(serverDescription.includes(responsibility), true, responsibility);
  const toolsmith = await page.locator(".related-project").filter({ has: page.getByRole("heading", { name: "Toolsmith", exact: true }) }).innerText();
  assert.equal(toolsmith.includes("Python libraries and command-line tools"), true);
  assert.equal(toolsmith.includes("HTTP downloads, file handling, text extraction and local search"), true);
  assert.equal(toolsmith.includes("ctlflow does not require them"), true);
  assert.equal(await page.locator(".fleet-example").innerText().then(text => text.includes("Ten Codex agents")), true);
  assert.equal(/Knex|React|SQLite|wire contract|constituent/u.test(await page.locator(".hero").innerText()), false);
  await page.screenshot({ path: path.join(artifacts, "home-desktop.png"), fullPage: true });
  assert.deepEqual(errors, []);
  assert.deepEqual(failures, []);
  assert.deepEqual(outside, []);
  evidence.consoleErrors.push(...errors);
  evidence.tests.push("home-csp-local-assets");
});

test("homepage uses typography instead of panels and keeps message arrows between the steps", async context => {
  const { page } = await pageFor(context);
  for (const width of [320, 390, 768, 999, 1000, 1440]) for (const theme of ["light", "dark"]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(preview.origin);
    if (await page.locator("html").getAttribute("data-theme") !== theme) await page.locator(".theme-toggle").click();
    const layout = await page.evaluate(() => {
      const rectangle = element => {
        const bounds = element.getBoundingClientRect();
        return { left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom };
      };
      const panels = [...document.querySelectorAll(".message-flow, .product-entry, .related-project")].map(element => {
        const styles = getComputedStyle(element);
        return { background: styles.backgroundColor, radius: styles.borderRadius, shadow: styles.boxShadow,
          sideBorders: [styles.borderRightWidth, styles.borderBottomWidth, styles.borderLeftWidth] };
      });
      const steps = [...document.querySelectorAll(".message-flow li")].map(element => {
        const connector = element.querySelector(".flow-connector");
        const rotation = connector ? new DOMMatrix(getComputedStyle(connector).transform) : undefined;
        return { bounds: rectangle(element), title: rectangle(element.querySelector("strong")), description: rectangle(element.querySelector("p")),
          connector: connector ? { ...rectangle(connector), hidden: connector.getAttribute("aria-hidden"),
            text: connector.textContent, horizontal: Math.abs(rotation.a - 1) < 0.01 && Math.abs(rotation.b) < 0.01,
            vertical: Math.abs(rotation.a) < 0.01 && Math.abs(rotation.b - 1) < 0.01 } : null };
      });
      const ornaments = [...document.querySelectorAll('.landing-art[data-artwork-placement="section"]')];
      return { panels, steps, headingSize: Number.parseFloat(getComputedStyle(document.querySelector(".message-flow h2")).fontSize),
        titleSize: Number.parseFloat(getComputedStyle(document.querySelector(".message-flow strong")).fontSize),
        bodySize: Number.parseFloat(getComputedStyle(document.querySelector(".message-flow p")).fontSize),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        pageArtworkVisible: document.querySelector('.hero .landing-art[data-artwork-placement="page"]').getClientRects().length > 0,
        ornaments: ornaments.map(element => ({ name: element.dataset.artwork, visible: element.getClientRects().length > 0 })),
        ornamentDownloads: performance.getEntriesByType("resource").filter(resource => ornaments.some(element => new URL(resource.name).pathname.startsWith(`/assets/artwork/${element.dataset.artwork}-`))).length };
    });
    assert.equal(layout.panels.length, 6);
    for (const panel of layout.panels) {
      assert.equal(panel.background, "rgba(0, 0, 0, 0)");
      assert.equal(panel.radius, "0px");
      assert.equal(panel.shadow, "none");
      assert.deepEqual(panel.sideBorders, ["0px", "0px", "0px"]);
    }
    assert.equal(layout.headingSize > layout.titleSize && layout.titleSize > layout.bodySize, true, "type sizes establish hierarchy");
    assert.equal(layout.steps.length, 4);
    assert.equal(layout.steps[3].connector, null);
    for (const [index, step] of layout.steps.slice(0, 3).entries()) {
      const next = layout.steps[index + 1];
      assert.equal(step.connector.hidden, "true");
      assert.equal(step.connector.text, "→");
      if (width >= 1000) {
        assert.equal(step.connector.horizontal, true);
        assert.equal(step.connector.left >= step.bounds.right && step.connector.right <= next.bounds.left, true, `${width}px arrow lies in the inter-step gap`);
        assert.equal(Math.abs(step.title.top - next.title.top) <= 1, true);
      } else {
        assert.equal(step.connector.vertical, true);
        assert.equal(step.connector.top > step.description.bottom && step.connector.bottom <= next.title.top, true, `${width}px downward arrow follows its description`);
        assert.equal(Math.abs(step.bounds.left - next.bounds.left) <= 1, true);
      }
    }
    assert.equal(layout.overflow <= 1, true, `${width}px ${theme}: no page overflow`);
    assert.equal(layout.pageArtworkVisible, true, "page-level decoration remains visible");
    assert.deepEqual(layout.ornaments.map(ornament => ornament.name), ["playbill", "multitool"]);
    assert.equal(layout.ornaments.every(ornament => ornament.visible === (width >= 1000)), true, "section ornaments are desktop-only");
    if (width < 1000) assert.equal(layout.ornamentDownloads, 0, "hidden section ornaments are not downloaded");
    evidence.paperLayout.push({ viewport: width, theme, ...layout });
    if ([390, 1440].includes(width)) {
      await page.locator(".message-flow").screenshot({ path: path.join(artifacts, `paper-flow-${width}-${theme}.png`) });
      for (const image of await page.locator('.related-project img[loading="lazy"]').all()) {
        if (!(await image.isVisible())) continue;
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(element => element.decode());
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(artifacts, `paper-home-${width}-${theme}.png`), fullPage: true });
    }
  }
  await page.locator(".product-entry").first().focus();
  await page.keyboard.press("Tab");
  const nextEntry = page.locator(".product-entry").nth(1);
  assert.equal(await nextEntry.evaluate(element => element === document.activeElement && element.matches(":focus-visible")), true);
  assert.notEqual(await nextEntry.evaluate(element => getComputedStyle(element).outlineStyle), "none");
  for (const width of [390, 1440]) for (const theme of ["light", "dark"]) for (const location of ["/docs/", "/docs/ctlflow/", "/docs/api/"]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${preview.origin}${location}`);
    if (await page.locator("html").getAttribute("data-theme") !== theme) await page.locator(".theme-toggle").click();
    const entries = await page.locator(".section-entry").evaluateAll(elements => elements.map(element => {
      const styles = getComputedStyle(element);
      return { background: styles.backgroundColor, radius: styles.borderRadius,
        borders: [styles.borderRightWidth, styles.borderBottomWidth, styles.borderLeftWidth],
        headingSize: Number.parseFloat(getComputedStyle(element.querySelector("h2")).fontSize),
        bodySize: Number.parseFloat(getComputedStyle(element.querySelector("p")).fontSize) };
    }));
    assert.equal(entries.length > 0, true, location);
    for (const entry of entries) {
      assert.equal(entry.background, "rgba(0, 0, 0, 0)");
      assert.equal(entry.radius, "0px");
      assert.deepEqual(entry.borders, ["0px", "0px", "0px"]);
      assert.equal(entry.headingSize > entry.bodySize, true, "index hierarchy uses type sizes");
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth <= 1), true, `${location}: paper index fits ${width}px`);
    evidence.paperIndexes.push({ location, viewport: width, theme, entries: entries.length });
    await page.locator(".section-grid").screenshot({ path: path.join(artifacts, `paper-index-${location.split("/").filter(Boolean).join("-")}-${width}-${theme}.png`) });
  }
  evidence.tests.push("paper-home-typography-unboxed-sections-four-step-arrows-six-widths-two-themes");
});

test("every generated HTML link, exact anchor and code example renders correctly", async context => {
  const { page } = await pageFor(context);
  await page.goto(preview.origin);
  const publicRoot = path.join(root, "public");
  const publicFiles = files(publicRoot);
  const records = publicFiles.filter(filename => filename.endsWith(".html")).map(filename => {
    const relative = path.relative(publicRoot, filename).replaceAll(path.sep, "/");
    return { url: `/${relative.replace(/index\.html$/u, "")}`, html: fs.readFileSync(filename, "utf8") };
  });
  const result = await page.evaluate(({ records, assets }) => {
    const pages = new Map();
    const assetPaths = new Set(assets);
    const diagnostics = [];
    const artworkPlacements = [];
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
      const illustratedPages = {
        "/": ["collaboration", "playbill", "multitool"],
        "/docs/": ["documentation"], "/docs/ctlflow/": ["ctlflow"],
        "/docs/crossfire/": ["crossfire"], "/docs/fleetd/": ["fleetd"], "/docs/fleet/": ["fleet"],
        "/docs/examples/": ["examples"], "/docs/examples/fleet-street/": ["theatre"], "/docs/toolsmith/": ["toolsmith"],
      };
      const illustrations = [...document.querySelectorAll(".landing-art")].map(element => element.dataset.artwork);
      artworkPlacements.push(...illustrations);
      if (JSON.stringify(illustrations) !== JSON.stringify(illustratedPages[record.url] ?? [])) diagnostics.push(`${record.url}: artwork outside selected landings`);
      for (const image of document.querySelectorAll(".landing-art img")) {
        if (image.getAttribute("alt") !== "" || image.closest(".landing-art").getAttribute("aria-hidden") !== "true") diagnostics.push(`${record.url}: decorative illustration semantics`);
        if (image.getAttribute("width") !== "1536" || image.getAttribute("height") !== "1024") diagnostics.push(`${record.url}: missing image geometry`);
        const placement = record.url === "/" && image.closest(".related-project") ? "section" : "page";
        if (image.closest(".landing-art").getAttribute("data-artwork-placement") !== placement) diagnostics.push(`${record.url}: incorrect decorative placement`);
        if (image.getAttribute("srcset").split(",").length !== 3 || !image.getAttribute("sizes")) diagnostics.push(`${record.url}: missing responsive variants`);
        for (const source of [image.getAttribute("src"), ...image.getAttribute("srcset").split(",").map(candidate => candidate.trim().split(" ")[0])]) {
          if (!/^\/assets\/artwork\/[a-z]+-(?:480|800|1200)\.[a-f0-9]{64}\.webp$/u.test(source) || !assetPaths.has(source)) diagnostics.push(`${record.url}: invalid or missing artwork ${source}`);
        }
      }
      pages.set(record.url, { ids: new Set(ids), links: [...document.querySelectorAll("a[href]")].map(element => element.getAttribute("href")) });
    }
    if (new Set(artworkPlacements).size !== artworkPlacements.length) diagnostics.push("Repeated illustration across rendered pages");
    for (const [source, page] of pages) for (const href of page.links) {
      const url = new URL(href, `https://ctlflow.com${source}`);
      if (url.origin !== "https://ctlflow.com") continue;
      links += 1;
      const destination = pages.get(url.pathname);
      if (!destination && (!assetPaths.has(url.pathname) || url.hash)) diagnostics.push(`${source} -> missing ${url.pathname}${url.hash}`);
      else if (url.hash && !destination.ids.has(decodeURIComponent(url.hash.slice(1)))) diagnostics.push(`${source} -> missing anchor ${url.pathname}${url.hash}`);
    }
    return { diagnostics, pages: pages.size, links, codeExamples };
  }, { records, assets: publicFiles.filter(filename => !filename.endsWith(".html")).map(filename => "/" + path.relative(publicRoot, filename).replaceAll(path.sep, "/")) });
  assert.equal(result.diagnostics.length, 0, result.diagnostics.slice(0, 35).join("\n"));
  assert.equal(result.pages > 200, true);
  evidence.checkedPages = result.pages;
  evidence.checkedLinks = result.links;
  evidence.codeExamples = result.codeExamples;
  assert.equal(Object.values(result.codeExamples).reduce((total, count) => total + count, 0) > 1200, true);
  evidence.tests.push("all-html-links-and-case-exact-anchors");
});

test("landing illustrations decode with transparent backgrounds in both themes and responsive sizes", async context => {
  const { page } = await pageFor(context);
  const failures = [];
  page.on("pageerror", error => failures.push(error.message));
  page.on("requestfailed", request => failures.push(request.url()));
  const landings = {
    "/": "collaboration", "/docs/": "documentation", "/docs/ctlflow/": "ctlflow",
    "/docs/crossfire/": "crossfire", "/docs/fleetd/": "fleetd", "/docs/fleet/": "fleet",
    "/docs/examples/": "examples", "/docs/examples/fleet-street/": "theatre", "/docs/toolsmith/": "toolsmith",
  };
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ["light", "dark"]) {
      await page.goto(preview.origin);
      if (await page.locator("html").getAttribute("data-theme") !== theme) await page.locator(".theme-toggle").click();
      for (const [location, name] of Object.entries(landings)) {
        await page.goto(`${preview.origin}${location}`);
        const illustration = page.locator(`.landing-art[data-artwork="${name}"]`).first();
        await illustration.locator("img").evaluate(image => image.decode());
        const result = await illustration.evaluate(element => {
          const image = element.querySelector("img");
          const canvas = document.createElement("canvas");
          canvas.width = 180;
          canvas.height = 120;
          const drawing = canvas.getContext("2d");
          drawing.drawImage(image, 0, 0, canvas.width, canvas.height);
          const pixels = drawing.getImageData(0, 0, canvas.width, canvas.height).data;
          let transparent = 0;
          let opaque = 0;
          for (let index = 3; index < pixels.length; index += 4) {
            if (pixels[index] === 0) transparent += 1;
            if (pixels[index] >= 240) opaque += 1;
          }
          const bounds = image.getBoundingClientRect();
          return {
            source: new URL(image.currentSrc).pathname, transparent: transparent / (pixels.length / 4), opaque: opaque / (pixels.length / 4),
            width: bounds.width, height: bounds.height, wrapperBackground: getComputedStyle(element).backgroundColor,
            pageBackground: getComputedStyle(document.body).backgroundColor, loading: image.loading,
            pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          };
        });
        assert.match(result.source, new RegExp(`^/assets/artwork/${name}-(?:480|800|1200)\\.[a-f0-9]{64}\\.webp$`, "u"));
        assert.equal(result.transparent > 0.1, true, `${location} ${theme}: transparent negative space`);
        assert.equal(result.opaque > 0.25, true, `${location} ${theme}: opaque screen-print subject`);
        assert.equal(result.wrapperBackground, "rgba(0, 0, 0, 0)");
        assert.equal(result.pageBackground, theme === "light" ? "rgb(255, 255, 255)" : "rgb(9, 18, 13)");
        assert.equal(result.width > (width === 390 ? 280 : 500), true, `${location}: large illustration`);
        assert.equal(Math.abs(result.width / result.height - 1.5) < 0.001, true, "uncropped 3:2 aspect ratio");
        assert.equal(result.pageOverflow <= 1, true, `${location}: no page-level overflow`);
        assert.equal(result.loading, "eager");
        const response = await page.request.get(`${preview.origin}${result.source}`);
        assert.equal(response.status(), 200);
        assert.equal(response.headers()["content-type"], "image/webp");
        assert.equal(response.headers()["cache-control"].includes("immutable"), true);
        const bytes = (await response.body()).length;
        assert.equal(bytes < 300 * 1024, true);
        evidence.artwork.push({ location, name, theme, viewport: width, bytes, ...result });
        if (width === 1440 || ["/", "/docs/examples/fleet-street/"].includes(location)) {
          await page.screenshot({ path: path.join(artifacts, `art-${name}-${width}-${theme}.png`) });
        }
      }
    }
  }
  await page.goto(preview.origin);
  assert.equal(await page.locator(".hero .landing-art img").getAttribute("fetchpriority"), "high");
  assert.equal(await page.locator('.related-project img[loading="lazy"]').count(), 2);
  for (const name of ["playbill", "multitool"]) {
    const card = page.locator(".related-project").filter({ has: page.locator(`.landing-art[data-artwork="${name}"]`) });
    await card.scrollIntoViewIfNeeded();
    await card.locator("img").evaluate(image => image.decode());
    assert.equal(await card.locator("img").evaluate(image => image.naturalWidth > 0), true, `${name}: below-fold artwork loads on scroll`);
    await card.screenshot({ path: path.join(artifacts, `art-card-${name}.png`) });
  }
  await page.emulateMedia({ media: "print" });
  assert.equal(await page.locator(".landing-art").first().isVisible(), false);
  assert.deepEqual(failures, []);
  evidence.tests.push("nine-illustrated-landings-two-themes-two-widths-alpha-responsive-local-assets");
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

test("fleet-street has a complete source-linked walkthrough and a working generated report", async context => {
  const { page } = await pageFor(context);
  const metadata = JSON.parse(fs.readFileSync(path.join(root, "data/fleetstreet.json"), "utf8"));
  await page.goto(preview.origin);
  await page.getByRole("link", { name: "Work through the example" }).click();
  await page.waitForURL("**/docs/examples/fleet-street/");
  assert.equal(await page.getByRole("heading", { level: 1 }).innerText(), "fleet-street: an agent fleet for theatre");
  assert.equal(await page.locator(".prose table tbody tr").count(), 10);
  assert.equal(await page.locator(`.prose a[href^="${metadata.repository}/blob/${metadata.revision}/"]`).count() >= 15, true);
  assert.equal(await page.locator("code.language-sh").first().textContent().then(text => text.includes(`git switch --detach ${metadata.revision}`)), true);
  assert.equal(await page.locator("code.language-toml").count(), 2);
  await page.screenshot({ path: path.join(artifacts, "fleet-street-desktop.png"), fullPage: true });
  await page.locator(".diagram-frame").screenshot({ path: path.join(artifacts, "fleet-street-diagram.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${preview.origin}/docs/examples/fleet-street/`);
  await page.screenshot({ path: path.join(artifacts, "fleet-street-mobile-light.png") });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.screenshot({ path: path.join(artifacts, "fleet-street-mobile-dark.png") });
  await page.getByRole("link", { name: "Open the example report" }).click();
  await page.waitForURL("**/examples/fleet-street/report/");
  assert.equal(await page.getByRole("heading", { level: 1 }).innerText(), "The River Bell");
  assert.deepEqual(await page.locator(".total strong").allTextContents(), ["GBP 4,745.25", "GBP 5,203.00", "GBP -457.75"]);
  await page.getByRole("link", { name: "Calculated budget JSON" }).click();
  const result = await page.request.get(page.url());
  assert.equal(result.status(), 200);
  assert.equal((await result.json()).break_even_paid_tickets, 297);
  evidence.tests.push("fleet-street-ten-roles-pinned-source-and-report");
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
    for (const [selector, size] of [[".primary-nav a", 15], [".product-entry p", 15], [".hero-description", 18], [".hero-terminal pre", 13], [".terminal-caption", 13]]) {
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
  const paths = ["/", "/docs/ctlflow/architecture/", "/docs/api/crossfire/create-publication/", "/docs/api/fleetd/attachment/", "/docs/api/schemas/crossfire-contracts-schema-response/", "/docs/examples/fleet-street/", "/examples/fleet-street/report/"];
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
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(preview.origin);
  assert.equal(await page.locator('.landing-art[data-artwork-placement="page"]').isVisible(), true);
  assert.equal(await page.locator('.landing-art[data-artwork-placement="section"]:visible').count(), 0);
  await page.goto(`${preview.origin}/docs/ctlflow/architecture/`);
  assert.equal(await page.locator(".diagram-frame svg").first().isVisible(), true, "informative diagrams remain visible on mobile");
  assert.equal(await page.locator("body").evaluate(element => getComputedStyle(element).backgroundColor), "rgb(255, 255, 255)");
  assert.equal(await page.locator("#docs-navigation").getAttribute("open"), "");
  assert.equal(await page.locator("h2#source-organization").isVisible(), true);
  assert.equal(await page.locator(".prose").innerText().then(text => text.includes("Domain modules do not import concrete adapters.")), true);
  await page.goto(`${preview.origin}/docs/examples/fleet-street/`);
  await page.locator('.landing-art[data-artwork="theatre"] img').evaluate(image => image.decode());
  assert.equal(await page.locator('.landing-art[data-artwork="theatre"] img').evaluate(image => image.naturalWidth > 0), true);
  await page.getByRole("link", { name: "Set up an agent fleet", exact: true }).click();
  await page.waitForURL("**/docs/fleet/setup/");
  const missing = await page.goto(`${preview.origin}/not-a-document/`);
  assert.equal(missing.status(), 404);
  assert.equal(await page.getByRole("heading", { name: "Page not found." }).isVisible(), true);
  evidence.tests.push("no-javascript-progressive-navigation-and-404");
});
