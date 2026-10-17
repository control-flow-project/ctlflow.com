# fleet-street integration and homepage — 2026-10-17

## Scope

The website documents the public ten-agent London theatre example. Its walkthrough
and setup, configuration, messaging, history, session and publication sections
use the actual committed fleet-street roster, instructions and tools. Source
links select commit `a2821d64f62a2c1d477b0810849de96541672452`, using public
fleet/fleetd release `0.1.20`.

The homepage now introduces people and agents working together, with a fleet's
own roles, instructions and tools. Its crossfire description includes message
routing, identities, enrollment, room access, wake-up rules, approvals, reporting
and publication. Native delivery and process/history ownership remain with
fleetd. The component guide and architecture table use the same distinction.

No ctlflow product source, existing API reference, product-source manifest,
private operating data, production fleet or hosting configuration is changed.
The report preview uses fictional inputs; it is not a live crossfire publication.

## Example source ownership

The example synchronizer reads committed Git bytes through the existing source
snapshot helper. It records twenty source inputs, seven syntax-highlighted
snippets and five generated report files. The report tool runs offline in an
isolated disposable snapshot, not against the operator's working fleet.

Normal builds verify the source revision, generator digest, exact twelve-file
output inventory and output contents. Edited or missing files, incomplete
inventories, symlinks and unrecorded report files fail verification. Normal
builds need no sibling checkout, Python, model, Matrix account or network.

The report includes HTML, CSS, an authored SVG, calculated JSON and the MIT
notice for its assets. Its local preview is linked from the walkthrough and
publication guide. Source maintenance requires Python 3.11+; that requirement
does not apply to Netlify builds.

## Verification

Linux amd64; Node `26.8.1`; Hugo `0.168.0`; Playwright `1.63.0`; Chrome
`155.0.8059.84`. All build/test processes run inside an 8 GiB, zero-swap,
256-task aggregate scope. No GitHub CI/CD is introduced.

`npm run example:sync -- --source /absolute/fleet-street --check` and
`npm run check` pass on the integrated source.

| Check | Result |
| --- | --- |
| Committed example synchronization | Exact revision and twelve outputs match |
| Hugo production build, warnings treated as errors | Pass |
| Model, provenance, content and example tests | 27 passed; no failures or skips |
| Real browser cases under Netlify response headers | 11 passed; no failures or skips |
| Rendered HTML pages | 218 |
| Internal links, static-file links and exact anchors | 34,093; no missing targets or duplicate IDs |
| Shared syntax-renderer code blocks | 1,240 |
| Example navigation | Homepage, ten-role table, pinned source links, report and budget JSON verified |
| Responsive widths | 320, 390, 768 and 1440 px; no page-level overflow |
| Themes | White/light default; explicit green dark theme and persistence verified |
| Visual inspection | Updated homepage, theatre diagram, light/dark mobile walkthrough and report |
| Homepage errors, missing assets or external requests | None |
| Existing generated API reference and product manifests | Unchanged from main |
| Git whitespace check | Pass |

The initial phone check found a long related-project action causing overflow at
320 px. The shared card action now wraps; no overflow assertion was weakened or
hidden. A deprecated Hugo data accessor and an incorrectly named diagram
argument were corrected under the existing warnings-as-errors gate.

The sample's separate verification covers 33 Python cases, acceptance through
the official isolated fleet/fleetd loader, two browser cases and five validated
skills. It performs no model turns or enrollment. Its own
[verification record](https://github.com/control-flow-project/fleet-street/blob/a2821d64f62a2c1d477b0810849de96541672452/docs/verification.md)
states the provider and production limitations.

Inactive browser fixtures, dependency installations, Python bytecode and build
caches are removed after verification. Concise records, authored source, the
pinned Hugo executable and the active local preview's `public/` output remain.
