# Website copy review — 2026-10-17

## Scope

Only ctlflow.com changes. The review covers the homepage, navigation, search,
footer, diagrams, product indexes, 45 product guides, shared HTTP documentation
and generated API-reference prose. Product runtime code is unchanged.

The homepage describes messaging and where components run. Framework and database
details remain in the relevant guides. Toolsmith is introduced through downloads,
readers, files and search, with examples and its optional archive explained.
Internal rollout notes and private deployment-project references are removed.

Guides are now edited in this repository. Source synchronization records their
references without replacing their prose. Operations, validation definitions and
the Matrix catalog remain generated from product source.

## Sources and contract checks

- ctlflow: `52bf027974521695c3b058afcc0b5191bd42587b`, version `0.1.20`.
- Toolsmith: `0a0a22af630834f24b3cb176d1f12cf64bbde8a0`, version `0.3.0`.
- All 111 operation metadata records match the previous website version.
- All 157 Matrix operation/parameter records match the previous version.
- All 1,120 fenced code blocks across 151 API pages/indexes are unchanged.
- All 100 source-file hashes match their recorded Git revisions.
- The manifest records 153 generated outputs and 45 edited guide references.

The ctlflow source revision includes the merged MIT license change. Toolsmith's
uncommitted working-tree changes are not imported.

## Verification

Linux amd64, Node `26.8.1`, Hugo `0.168.0`, Playwright `1.63.0`, Chrome
`155.0.8059.84`. Build and browser commands run under an 8 GiB, zero-swap,
256-task aggregate scope. The independent contract/hash comparison uses a
2 GiB, zero-swap, 128-task scope.

| Check | Result |
| --- | --- |
| Source synchronization check | No differences |
| Hugo production build, warnings treated as errors | Pass |
| Model, provenance, site and content tests | 21 passed; no failures or skips |
| Browser tests under the Netlify security headers | 7 passed; no failures or skips |
| HTML pages checked | 215 |
| Internal links and anchors | 33,489; no missing targets or duplicate IDs |
| Homepage console errors or external requests | None |
| Responsive widths | 320, 390, 768 and 1440 pixels; no page-level overflow |
| Additional mobile checks | Toolsmith, message delivery and system behavior; no overflow |
| Desktop/mobile visual inspection | Homepage and Toolsmith overview inspected |
| Git whitespace check | Pass |

Existing assertions tied to edited wording were updated to the current copy.
The no-JavaScript test still checks visible architecture content and navigation.
New tests verify that source synchronization preserves authored guide edits and
that the homepage explains components without framework/database taglines.

The loopback preview remains available for review. Its generated `public/`
directory is retained; inactive test fixtures and dependency caches are removed.
No Netlify or product deployment is performed. These checks concern the website,
not product runtime, migration or provider certification.
