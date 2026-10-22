# Current-contract documentation — 2026-10-22

The website source now documents ctlflow 0.1.23 and Toolsmith 0.4.2. It is not
published or deployed by this change. Exact source commits and input/output
hashes are recorded in `data/sources.json` and `data/reference-manifest.json`.

## Changes

Hand-edited guides now describe neutral backend identities, adapter-owned Matrix
configuration, current setup query fields, the sole initial Knex schema and
current native registries. Removed archive/index/context converters are no
longer advertised. Diagnostic CLI/API guides cover existing read-only behavior.
The public fleet-street snapshot uses its current committed wake policy and
fleet release without importing operating state.

The generator reads Matrix web schemas from their actual adapter owner, not
removed server/contract locations. Scalar descriptions use neutral backend IDs.
It regenerates 94 crossfire operations, 20 fleetd operations, 43 schema modules
and the 157-entry Matrix catalog. Forty-nine guides retain their separately
authored prose and current source references.

Current Docker setup requires matching verified current images. Historical
0.1.22 publication records are retained as dated evidence, not presented as a
current-contract quickstart. No new registry publication or digest is claimed.

## Verification

- `docs:sync` followed by `docs:check` reports no generated drift.
- Pinned Hugo 0.168.0 production build passes, including link/anchor validation,
  shared code blocks and artwork placement checks. The disposable binary was
  downloaded from the official release and checked against its published hash.
- All 42 source/provenance tests and 16 real Chrome browser tests pass, with no
  failures or skips. Browser checks include desktop/mobile Docker/setup and
  authentication guides, generated API pages, exact links, code copying, CSP,
  keyboard navigation, themes, search and no-JavaScript rendering.
- Processes run under an 8 GiB memory limit, zero swap and 1,024 tasks.

The first run stopped because Hugo was absent; no version check was weakened.
After installing the pinned disposable tool, tests exposed four old expected
release/catalog values. Those expectations now match the current committed
contracts. Full build, source and browser gates were rerun after correction.

No live website, server, controller, provider login or deployment state changed.
