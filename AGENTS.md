# ctlflow.com

This repository owns the ctlflow technical documentation website. It uses
Hugo and deploys as static files to Netlify. Application contracts remain owned
by their product repositories; never invent APIs or modify those repositories
from a website task.

Use direct technical prose, Markdown content, a single shared layout and locally
served assets. Avoid stock AI phrasing and promotional language. No analytics,
external fonts, runtime servers, GitHub Actions or client-side framework is
required. ctlflow is the parent monorepo; crossfire, fleetd and fleet are its
products. Node, C# and Rust
are implementations beneath those owners. Toolsmith is a separate optional
related project, not a constituent or required fleet dependency.

The homepage explains what users can do and how the components connect. Put
framework, database and migration details in their technical guides, not hero
taglines. Use complete explanations instead of dot-separated claims or slogans.
Keep guides edited here; generate only API operations, validators and catalogs.
Do not overwrite guide prose from product-internal specifications during sync.
Describe agents generally; their roles are not restricted to software development.
Use "agent fleet" in the homepage hero, key introductions and setup entry points.
Use "fleet" as shorthand elsewhere; keep product names and API identifiers exact.
Introduce examples by the task, participants and result, not their license,
file inventory or how the website is generated. Product licensing remains
relevant; do not confuse it with incidental facts about a sample. Keep website
maintenance procedures in the README, and preserve technical prerequisites,
source references, security boundaries and legal notices.
Name supported runtimes accurately and preserve exact package/API identifiers and
verbatim generated contract excerpts. The default theme is white/light; the
optional dark theme uses green. Render all code examples through the shared Hugo
code-block partial with an explicit language; use `text` only for plain text.

fleet-street is an optional example fleet, not a ctlflow product. Its walkthrough
and section examples use the committed source snapshot in data/fleetstreet.json.
Refresh through `npm run example:sync -- --source /absolute/fleet-street`; never
import private operating state, dirty source bytes or real fleet data. Ordinary
builds verify stored examples without a sibling checkout or Python.

`npm run docs:sync -- --ctlflow /absolute/source --toolsmith /absolute/source`
updates generated API references and guide source revisions from selected sources.
`npm run docs:check` verifies that generated content matches those sources.
Ordinary site builds require only this repository and the pinned Hugo binary.

All build/test commands must run in a bounded aggregate process group. On Linux:

```sh
systemd-run --user --scope --quiet --property=MemoryMax=8G \
  --property=MemorySwapMax=0 --property=TasksMax=256 \
  --working-directory=/absolute/ctlflow.com npm run check
```

Keep local tools, caches, test output and browser artifacts in ignored `.temp/`.
Remove recreated artifacts after verification. Preserve source and recorded
evidence. Do not commit `.analysis/`. Do not publish or change hosting accounts
without authorization. Never commit/push main, force push or create PRs; the
maintainer creates PRs manually from the prepared branch.
