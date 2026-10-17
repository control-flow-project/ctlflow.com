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

`npm run docs:sync -- --ctlflow /absolute/source --toolsmith /absolute/source`
updates checked-in reference material from explicitly selected source revisions.
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
