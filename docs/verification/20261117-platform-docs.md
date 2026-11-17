# Platform documentation — 17 November 2026

The website covers ctlflow and its crossfire, fleetd and fleet products, plus
its optional fleet-street example. Unrelated toolkit pages, links, artwork,
source snapshots and synchronization inputs have been removed. Source
synchronization accepts one explicit `--ctlflow` checkout; the removed source
option is rejected before reading any checkout.

The recorded ctlflow source is `41af21243dddc5b26380d44183737c9bfe308ba8`.
All 161 other generated output hashes are unchanged: 94 crossfire operations,
20 private fleetd operations, 157 Matrix entries and 43 validation modules.
There are 40 authored guide references. Neither API contracts nor product runtime
behavior changed.

Dated verification records retain their original counts, measurements and
verdicts. Entries covering only withdrawn pages are omitted; historical aggregate
counts are not recalculated or presented as current verification.

| Check | Result |
| --- | --- |
| Exact-source synchronization | Pass; zero drift with the selected committed ctlflow checkout |
| Hugo 0.168.0 production build | Pass; 223 pages, eight distinct artwork placements and 24 responsive images |
| Source/content tests | 46 pass; zero failures, skips or cancellations; 980 ms |
| Real-browser tests | 17 pass; zero failures, skips or cancellations; 17,859 ms |
| Rendered document crawl | 221 HTML pages and 34,367 internal links/anchors checked |
| Desktop/mobile and both themes | Pass; navigation, source links, diagrams, artwork, spacing, search and code controls checked |
| Visual inspection | Desktop homepage, mobile homepage and message flow, documentation landing inspected |
| Generated API preservation | All API pages and operation data unchanged |
| Repository/output text scan | No references to the withdrawn toolkit or artwork keys |
| Process limits | Four GiB memory, zero swap, 512 tasks; build/test CPU quota 200% |
| Git whitespace | Pass |

The first browser run caught a stale expected element count that included the
removed homepage section. The expected count now matches the five retained
layout elements; all existing theme, spacing and responsive assertions remain.
The complete build/test sequence then passed.

Verification used Node 26.8.1, Playwright 1.63.0 and the official pinned Hugo
archive after matching SHA-256
`fada83ad56bb27ed4cb7dd81590303bdac16140f944ac4e66fc248117e2d5594`.
These are local source and rendering checks. No hosting publication, repository
visibility change, product release or runtime deployment was performed.
