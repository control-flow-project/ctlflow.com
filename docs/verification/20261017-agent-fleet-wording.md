# Agent fleet terminology — 2026-10-17

The homepage hero reads "Bring your own agent fleet to Matrix rooms."
Component introductions, setup and example headings, documentation entry points
and page/site descriptions use the same term. Ordinary explanations retain
"fleet" as shorthand. Product names, URLs, commands and wire contracts do not
change. The documentation overview defines a fleet as one or more agents with
roles, instructions and tools, run by an owner-controlled fleetd controller.

This change affects website prose and its assertions only. Verification uses
Linux amd64, Node 26.8.1, Hugo 0.168.0 and Chrome 155.0.8059.84 inside an 8 GiB,
zero-swap, 256-task aggregate scope.

| Check | Result |
| --- | --- |
| Production build with warnings treated as errors | Pass |
| Affected content tests | 2 passed |
| Affected real-browser cases | 4 passed |
| Browser coverage | Hero and metadata, example navigation/report, responsive layouts and no-JavaScript navigation |
| Responsive widths | 320, 390, 768 and 1440 px; no page-level overflow |
| Visual review | Updated mobile homepage in white/light and green/dark themes |
| Existing API references, source manifests, examples, dependencies and CSS | Unchanged |
| Whitespace check | Pass |

The full website and product suites are not rerun for this isolated wording
change. No hosting settings, product source or operating fleets are modified.
Disposable dependencies, fixtures and caches are removed after verification;
the existing local preview and its generated output remain available.
