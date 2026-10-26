# Compose migration guide review — 26 October 2026

The coordinated documentation change follows ctlflow implementation revision
`cf3dd0c87f68213d6a8995548108cf8d5faa9aa8` (source version 0.1.24).
It updates the twelve affected installation, operations, container, database,
implementation, source-layout, specification and distribution guides. Node,
managed C#, NativeAOT and Rust prescribe the same Compose lifecycle: stop the
writer, remove the completed migration job, and bring up the release with its
successful-migration dependency. Backups remain optional and operator-managed.
The operations guide now states the actual initial schema version, 1.

Generated references were synchronized and checked against the selected ctlflow
source and Toolsmith revision `621d5cd046896fc7a11663073846131e24ee32b0`
(version 0.5.0). All twelve recorded Toolsmith inputs were unchanged from the
previously recorded source tree. The fleet-street source snapshot was refreshed
to `c0a5e2fd089a3d7c888829048820a3d3a50d2efa`; its selected fleet version
remains 0.1.23. Its recorded example bytes were unchanged. Four stale repository
source links and the messaging-license asset name were corrected.

Verification completed on 26 October:

- Generated-reference synchronization/check: passed, with no remaining drift.
- Hugo 0.168.0 build and 44 source tests: passed.
- All 16 real Chromium browser tests: passed, with no skips or failures.
- All twelve changed guide routes at widths 1440 and 390, explicitly asserting
  both light and dark themes: 48 successful responses, no page overflow or
  JavaScript exceptions. Representative full-page screenshots were inspected.

Checks ran with bounded aggregate memory and task limits. Earlier checks exposed
obsolete documentation assertions; these were updated to the approved Compose
contract and the complete website gate passed again. This is source and local
browser verification, not hosting publication or product-release certification.
Existing published image inventory remains the 0.1.24 release inventory; no new
registry artifact or website deployment is claimed by this documentation change.
