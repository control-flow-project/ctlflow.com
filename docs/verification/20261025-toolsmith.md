# Toolsmith guides — 25 October 2026

The guides reference Toolsmith 0.5.0 at
`1f7d7c29ad0b6e1075c448058598a45ad60ceecf`. Edited installation, API, CLI,
capability, limit, security, architecture and behavior pages now cover the current
interfaces. The new recipes page explains explicit inputs and outputs, acquisition
buckets, feed continuation, optional PDF pages and batch search. No application
workflow or source-completeness claim is introduced.

Source synchronization and exact-source checking pass: 51 guides, 94 crossfire
operations, 20 fleetd operations, 157 Matrix operations and 43 schema modules.
The ctlflow source tree is unchanged from the previous recorded release snapshot;
its reference now identifies current main `0e7a92c2e394659c4fd2edd39623e9ebd5532d47`.

Hugo 0.168.0 build, all 44 source/content tests and all 16 browser tests pass.
Four updated pages additionally pass 16 combinations of desktop/mobile viewport
and light/dark theme without page-level overflow; recipes screenshots were
visually inspected. Verification uses an 8-GiB, zero-swap, 1024-task scope.
Initial checks caught a missing example-producer label and the old 50-guide
expectation; both were corrected while retaining the existing assertions.

These are local source/rendering checks. No hosting publication, package-registry
release, fleet activation or completed news-collection cycle is certified.
