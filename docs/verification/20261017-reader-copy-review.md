# Documentation copy review — 2026-10-17

## Editorial changes

The theatre example now introduces its agents, their task and the resulting
calculation and report. It no longer leads with its license, repository contents
or how the website reproduces the example. Setup, calculation, messaging and
publication sections explain what the reader does with the supplied material.

The review covers introductions and headings on all 65 authored pages, shared
homepage/navigation copy, and contextual searches for incidental example and
site-maintenance prose. Other edits clarify the management and Matrix guides,
describe components through their responsibilities, and replace site-generation
commentary with a link to the maintainer README.

Product licensing is unchanged. The licensing page, product installation guides,
license files and report asset notices are retained. Security boundaries,
prerequisites, permissions, matching releases, source links, commands, numerical
results and generated API/schema references are preserved.

## Verification

Linux amd64; Node 26.8.1; Hugo 0.168.0; Playwright 1.63.0; Chrome 155.0.8059.84.
Builds and browser checks run within an 8 GiB, zero-swap, 256-task scope. The
independent fenced-example comparison uses a 2 GiB, zero-swap, 128-task scope.

| Check | Result |
| --- | --- |
| Production build, warnings treated as errors | Pass |
| Content, model, reference and provenance tests | 29 passed |
| Real browser tests under Netlify headers | 11 passed |
| Final copy clarification | Fresh build and two affected browser cases pass |
| HTML pages | 218 |
| Internal links and anchors | No missing targets or duplicate IDs |
| Syntax-rendered code blocks | 1,240 |
| Fenced code in the nine edited guide pages | All 11 blocks byte-identical to main |
| Responsive widths | 320, 390, 768 and 1440 px; no page-level overflow |
| Visual review | Updated home and mobile example introduction in light/dark themes |
| API/generated data, examples, dependencies, CSS and legal files | Unchanged |
| Git whitespace | Pass |

No product code, live fleet, model session or hosting configuration changes.
Disposable dependencies and browser/build caches are removed after verification;
the active local preview retains its generated output.
