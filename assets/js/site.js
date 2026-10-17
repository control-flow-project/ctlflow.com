const themeButton = document.querySelector(".theme-toggle");
function updateThemeControls() {
  themeButton?.setAttribute("aria-label", document.documentElement.dataset.theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--bg").trim());
}
updateThemeControls();
themeButton?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("ctlflow-theme", theme); } catch {}
  updateThemeControls();
});

const navigation = document.querySelector(".mobile-nav");
const wideNavigation = matchMedia("(min-width: 1000px)");
function updateNavigation() { if (navigation) navigation.open = wideNavigation.matches; }
updateNavigation();
wideNavigation.addEventListener("change", updateNavigation);

for (const pre of document.querySelectorAll(".prose pre, .hero-terminal pre")) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-code";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy code to clipboard");
  button.addEventListener("click", async () => {
    const content = pre.querySelector("code")?.textContent ?? pre.textContent;
    try {
      await navigator.clipboard.writeText(content);
      button.textContent = "Copied";
      button.setAttribute("aria-label", "Code copied to clipboard");
    } catch {
      button.textContent = "Select code";
      const range = document.createRange();
      range.selectNodeContents(pre.querySelector("code") ?? pre);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  pre.parentElement.classList.add("code-container");
  pre.parentElement.append(button);
}

for (const tab of document.querySelectorAll("[data-code-tab]")) {
  tab.addEventListener("click", () => {
    for (const peer of document.querySelectorAll("[data-code-tab]")) {
      peer.setAttribute("aria-selected", String(peer === tab));
      peer.tabIndex = peer === tab ? 0 : -1;
    }
    for (const panel of document.querySelectorAll("[data-code-panel]")) panel.hidden = panel.dataset.codePanel !== tab.dataset.codeTab;
  });
  tab.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll("[data-code-tab]")];
    const position = tabs.indexOf(tab);
    const target = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (position + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[target].focus();
    tabs[target].click();
  });
}

document.addEventListener("keydown", event => {
  if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName ?? "") || document.activeElement?.isContentEditable) return;
  event.preventDefault();
  const input = document.querySelector("#search-query");
  if (input) input.focus(); else location.assign("/search/");
});

const searchForm = document.querySelector("#search-form");
if (searchForm) {
  const input = document.querySelector("#search-query");
  const status = document.querySelector("#search-status");
  const results = document.querySelector("#search-results");
  let indexPromise;
  let generation = 0;
  async function search(value) {
    const current = ++generation;
    const query = value.trim().slice(0, 500);
    results.replaceChildren();
    if (!query) { status.textContent = "Enter a word, phrase, operation name or path."; return; }
    status.textContent = "Searching documentation…";
    try {
      indexPromise ??= fetch("/index.json").then(response => { if (!response.ok) throw new Error("Search index unavailable"); return response.json(); });
      const records = await indexPromise;
      if (current !== generation) return;
      const terms = query.toLowerCase().split(/\s+/u);
      const ranked = records.map(record => {
        const title = record.title.toLowerCase();
        const text = record.text.toLowerCase();
        const url = record.url.toLowerCase();
        if (!terms.every(term => title.includes(term) || text.includes(term) || url.includes(term))) return null;
        const score = terms.reduce((total, term) => total + (title.includes(term) ? 20 : 0) + (url.includes(term) ? 8 : 0), 0);
        return { record, score };
      }).filter(Boolean).sort((first, second) => second.score - first.score || first.record.title.localeCompare(second.record.title));
      status.textContent = ranked.length === 0 ? `No results for “${query}”. Try a shorter term or an operation name.` : `${ranked.length} matching pages${ranked.length > 50 ? "; showing the first 50" : ""}.`;
      for (const { record } of ranked.slice(0, 50)) {
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = record.url;
        const section = document.createElement("span");
        section.className = "eyebrow";
        section.textContent = record.section;
        const heading = document.createElement("h2");
        heading.textContent = record.title;
        const description = document.createElement("p");
        const match = record.text.toLowerCase().indexOf(terms[0]);
        const start = Math.max(0, match - 75);
        description.textContent = record.description || `${start ? "…" : ""}${record.text.slice(start, start + 260)}…`;
        link.append(section, heading, description);
        results.append(link);
      }
    } catch {
      if (current === generation) status.textContent = "Search could not load. Use the documentation index or try again.";
      indexPromise = undefined;
    }
  }
  input.value = new URLSearchParams(location.search).get("q") ?? "";
  if (input.value) search(input.value);
  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const parameters = new URLSearchParams();
    if (input.value.trim()) parameters.set("q", input.value.trim());
    history.replaceState(null, "", `/search/${parameters.size ? `?${parameters}` : ""}`);
    search(input.value);
  });
}
