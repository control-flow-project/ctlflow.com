# Example context review — 2026-10-17

The review covers 217 Markdown pages: 66 authored pages and 151 generated API,
schema and catalog pages. The browser check also covers all 219 rendered HTML
pages, including the homepage, search and the supplied report.

## Changes

- The theatre walkthrough starts with an ordinary room message. It identifies
  the supplied brief, budget and report files, explains what an agent would
  prepare for a real task, and distinguishes calculator input from output.
- Example setup uses clone and cd. The detached-revision shortcode is removed.
  Source links and reference synchronization still use recorded revisions.
- API pages distinguish client-supplied fields, server validation code and
  server-produced responses. A response placeholder is not presented as input
  the reader must construct.
- Agent tools, native questions, configuration and Toolsmith examples identify
  who creates each input, where it is saved and which command reads it.
  Recovery commands are separate from the normal success sequence.
- The private controller client example includes required authentication and
  passes the header through standard input rather than a process argument.
- The component introduction follows its heading with a 96 px gap on desktop.
  The Toolsmith overview has no decorative illustration; the homepage preview
  remains. Existing mobile decoration rules are unchanged.

## Verification

| Check | Result |
| --- | --- |
| Hugo production build | Pass; warnings remain errors |
| Node tests | 39 passed |
| Real Chrome browser tests | 15 passed |
| Recorded-source synchronization | No differences after regeneration |
| Generated reference code | All fenced code unchanged across 151 pages |
| Product revisions, consumed source hashes, operation catalog and example snapshot | Unchanged |
| Markdown JSON examples | 118 valid JSON blocks with an introduction before each |
| Rendered JSON examples | 121 checked, including three source-linked example files |
| Rendered pages | 219 |
| Internal links and anchors | 34,432 checked |
| Syntax-highlighted code blocks | 1,242 |
| Homepage layout | Six widths in both themes; component and image spacing checked |
| Image-free indexes | Documentation and Toolsmith at phone/desktop widths in both themes |
| Artwork | Nine distinct sources and placements; 27 responsive variants |
| Example calculator and report commands | Run offline from the recorded public example source; saved calculation and report data match |
| Example break-even | 297 paid tickets; GBP 4,745.25 net receipts and GBP 5,203.00 costs |
| Browser console errors | None |
| Git whitespace | Pass |

Builds and tests run in an 8 GiB, zero-swap, 256-task process group. The context
checks guard missing introductions; they do not establish that arbitrary prose
is correct. The authored examples and shared reference templates were reviewed
as well. No product runtime, provider call, public package or production hosting
was changed or certified by this website review.
