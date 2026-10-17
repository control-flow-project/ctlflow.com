# Website themes, text and code examples — 2026-10-17

## Changes

Only ctlflow.com changes. No product, fleet, API or hosting configuration is
changed, and no production deployment is performed.

- Authored prose describes agents generally, including research, writing and
  review. Setup guides distinguish the agent performing installation from the
  managed sessions it creates. Current runtime support remains Codex and
  Earendil Pi; no additional adapter is implied.
- White/light is the default, including with JavaScript disabled, a dark system
  preference, invalid saved values or unavailable browser storage. An explicitly
  selected dark theme is green-based and persists across navigation and reloads.
- Smaller text increases by 2 px. Desktop documentation body text is 16 px and
  code is 13 px; mobile body text is 15 px and code is 12 px. Large headings and the
  wordmark keep their existing sizes. Navigation, tables, captions and metadata
  use the same increase. Table headings retain whole words, and copy controls do
  not cover the first code line.
- One Hugo partial renders homepage and Markdown code examples. Language labels
  are explicit. Syntax colors use the shared light/dark stylesheet; there is no
  browser highlighter, inline styling or language guessing. Directory trees and
  other plain-text examples remain explicitly marked `text`.

Exact package identifiers and verbatim generated contract source remain intact.
The native Pi package still contains `coding-agent` in its actual npm name.

## Verification

Linux amd64, Node `26.8.1`, Hugo `0.168.0`, Playwright `1.63.0`, Chrome
`155.0.8059.84`. Website build/test processes run inside an 8 GiB, zero-swap,
256-task aggregate scope. The independent unchanged-source comparison uses a
2 GiB, zero-swap, 128-task scope.

`npm run check` passes. After the final copy-control and table-heading adjustment,
the Hugo production build and all 10 browser tests pass again. Node test sources
and their exercised model/provenance implementations are unchanged by that CSS
adjustment.

| Check | Result |
| --- | --- |
| Production build; warnings treated as errors | Pass |
| Model, provenance, content and source tests | 23 passed; no failures or skips |
| Real browser tests under Netlify response headers | 10 passed; no failures or skips |
| Rendered HTML pages | 215 |
| Internal links and anchors | 33,489; no missing targets or duplicate IDs |
| Shared-renderer code blocks | 1,224 across 10 explicit language labels |
| Explicit plain-text blocks within that count | 14 |
| Homepage JavaScript, C# and Rust | Syntax colors and literal clipboard text verified in both themes |
| Body, muted, accent and syntax color contrast | At least 4.5:1 for the tested light/dark text/background pairs |
| Primary button contrast | At least 4.5:1 in both themes |
| Print from dark mode | White background and readable syntax colors |
| Responsive widths | 320, 390, 768 and 1440 px; no page-level overflow |
| Visual inspection | Light/dark desktop and mobile homepages, mobile code and architecture guide |
| Homepage errors, missing assets or external requests | None |
| Git whitespace check | Pass |

The source comparison against the preceding website commit verifies unchanged
operation metadata, source revisions and reference manifest; unchanged fenced
code in all 156 API pages (1,133 blocks); and unchanged code text in the three
homepage examples moved into assets. No product-source synchronization runs.

The existing loopback preview retains its generated `public/` output. Inactive
browser fixtures, development dependencies and verification/build caches are
removed after their final use. Concise verification records and the pinned local
Hugo executable are retained.
