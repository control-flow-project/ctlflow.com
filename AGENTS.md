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
Introduce each example before its code block: who creates it, whether it is
input or output, and how it is used. Distinguish ordinary chat from agent-written
files, configuration, tool calls and server responses. Name supplied example
files; never imply that people must write JSON in chat or that chat is converted
into a task file automatically. Normal example setup uses clone and cd, not
revision-fetch or detached-checkout steps.
Name supported runtimes accurately and preserve exact package/API identifiers and
verbatim generated contract excerpts. The default theme is white/light; the
optional dark theme uses green. Render all code examples through the shared Hugo
code-block partial with an explicit language; use `text` only for plain text.
Create visual hierarchy with typography, weight, spacing and occasional fine
rules, not enclosing cards. Boxes remain appropriate for code and diagrams.

Landing illustrations are decorative transparent cutouts, selected explicitly by
`artwork` front matter and rendered through `landing-art.html`. Every top-level
documentation section, represented by a bold sidebar heading, has exactly one
panoramic 3:1 illustration. This includes API reference and Toolsmith. No child
page, nested section, technical guide or operation reference has ornamental art;
the fleet-street walkthrough is a child page, not an exception. The documentation
index has none. The shared page-heading template rejects missing section art and
art on any other documentation page. Homepage artwork is separately selected by
the home template and retains its existing 3:2 originals and layout.
Keep original PNGs in `assets/artwork/`; Hugo owns responsive fingerprinted WebP
output. Preserve alpha in both themes, intrinsic dimensions and local-only
loading. Regenerate section art as wide compositions, never squash or crop tall
art to meet the ratio. Record generation prompts and asset maintenance details
in `docs/artwork.md`, not reader-facing copy.
Never reuse an illustration across pages or elsewhere on the same page. Home
previews need their own artwork, distinct from the linked landing pages. The
production build rejects repeated placements and duplicate source bytes.
Every decorative illustration declares page or section placement. Below 1000 px,
retain page-level decoration but hide section ornaments without leaving empty
columns. Keep section ornaments lazy-loaded. Informative images and diagrams are
content and remain visible; never apply a blanket mobile image-hiding rule.

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
