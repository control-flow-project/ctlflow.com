# Server Docker and host fleet documentation

Date: 2026-10-18. Source snapshots: ctlflow
`482dbe4a07d9f864437161016769745527a24aa6` (0.1.22) and Toolsmith
`9fb2183fd6c6ff9b7c270314965f83d1ea838abe` (0.4.1).

## Reviewed changes

- Added the local Docker server walkthrough: image selection, one-shot init/Knex,
  loopback URLs, server-only storage, host fleet attachment and saved-history restart.
- Clarified private npm installation location and required existing harness/login.
  No fleet image, relay, automatic harness install or login mount is documented.
- Updated package schema 2, exact OCI identities and the unchanged image capability
  label 1. Image publication remains separate; no available GHCR digest is invented.
- Updated RC2 pins, schema 18/index migration, managed EF/JIT behavior, native
  parent-lifetime guards, rejected obsolete state and authenticated socket recovery.
- Refreshed immutable API/source references and Toolsmith's optional 0.4.1
  installation/HTML inspection guidance. Authored guides were edited, not regenerated.

## Verification

| Check | Result |
| --- | --- |
| `docs:sync` followed by `docs:check` against both exact source snapshots | Passed; check changed 0 files |
| Hugo 0.168.0 production build, stored-reference/example/artwork checks | Passed |
| Static/unit tests | 41 passed, 0 failed |
| Real Chrome browser tests | 16 passed, 0 failed; 17.4 seconds |
| Reference inventory | 92 crossfire, 19 fleetd and 157 Matrix operations; 37 schema modules; 47 guides |
| New walkthrough desktop/mobile checks | 1440/390 px; command content, host prerequisites, auth recovery, no overflow/page errors |

Browser checks also cover generated links/anchors, Netlify CSP, search, keyboard
interaction, both themes, examples, JavaScript-disabled reading and responsive
navigation. The new mobile walkthrough screenshot was manually inspected.

Initial static failures exposed obsolete expected source/version/guide counts;
the exact expectations were updated to the reviewed inputs without loosening
assertions. The first new browser fixture exceeded Linux's Unix-socket path
limit; it now uses the existing short OS-temp pattern and reverse-order cleanup.
The final complete check passes. Build/browser commands used an aggregate finite
8 GiB, zero-swap process group. Recreated output was cleaned after verification.

This verifies website source/build behavior, not production activation. No hosting
configuration, production account, fleet, database, npm release or registry image
was changed or published. The coordinated ctlflow branch must be merged before
these source references are treated as the current main-branch documentation.
