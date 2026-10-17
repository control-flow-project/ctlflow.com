---
title: Source revisions and coverage
description: Exact source commits, generated operation coverage, contract provenance and documentation verification boundaries.
weight: 90
---

## Recorded source revisions

{{< source-records >}}

The website reads source documents and executable contract declarations from the exact recorded Git revisions, not arbitrary working-tree bytes. A dirty unrelated checkout does not redefine a pinned source link. Ordinary Hugo builds use the checked-in Markdown and recorded output hashes; they do not need a sibling checkout.

## API coverage

The crossfire reference accounts for every declared HTTP operation, including method, path, authentication audience, success status, permissions, request format/limit and collection semantics. The private fleetd catalog is documented separately even where its paths overlap the server catalog.

Nested field tables resolve imported object shapes, spreads, arrays, optional/null fields, choices and scalar constants. Full custom query parsers, discriminated branches and refinement predicates remain visible, linked to their exact definitions. TypeScript parsers are **not** falsely represented as introspectable JSON Schema.

Schema definition anchors preserve exact identifier case, so a value such as `fleetView` does not target the distinct type `FleetView`.

The Matrix catalog includes denied/unsupported classifications as well as admitted agent entries. It is a native HTTP catalog, not a promise that every endpoint is available on the selected homeserver. Signup fallback, onboarding assets, static routing and report-origin reads are documented separately from REST envelopes.

## Maintenance

The website repository owns templates, prose, rendering and source synchronization. Runtime behavior remains owned by ctlflow and Toolsmith. A new source revision is a deliberate update, not a live import of an unreviewed branch.

`docs:sync` generates all recorded outputs. `docs:check` detects changed, missing, removed and unrecorded generated pages. Build verification checks output and generator hashes. Removed operations/modules cannot remain as stale pages after a successful synchronization.

## Verification boundaries

Website verification checks source reproducibility, complete operation coverage, nested/custom contracts, static links/anchors, production/preview builds and actual browser behavior under the Netlify security headers. It does not rerun or certify the source products' native runtimes, database migrations, provider calls, published packages or production instances.

Native product documentation states the tested host/CPU limits, pinned preview dependencies and visible NativeAOT limitations. Node/C#/Rust parity is a product contract with product-owned verification, not a claim inferred from this static site.

Source licensing is independent of package visibility and API documentation. Follow the canonical product license; an unmerged licensing branch is not a change to the documented runtime source.

- [ctlflow source](https://github.com/control-flow-project/ctlflow)
- [Toolsmith source](https://github.com/control-flow-project/toolsmith)
- [Website source](https://github.com/control-flow-project/ctlflow.com)
