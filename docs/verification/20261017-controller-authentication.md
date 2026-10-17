# Controller authentication documentation — 2026-10-17

Sources are ctlflow `243553f70c8b573ff4f7b6e89fe12f4b42ade2d4` and Toolsmith
`5984e888a6cd24a9963de546c504e49480af5ee2`. Source snapshots contain committed
public files only. These revisions identify documentation inputs, not production
deployment or package-registry receipts.

## Changes

- Document the mandatory OS-user credential on every private fleetd operation,
  its Linux/macOS paths, automatic initialization, ownership/permission checks,
  strict SSH retrieval, rotation and history-preserving upgrade procedure.
- Keep management-generated attachment instructions npm-based for every server
  implementation. The setup agent does not need .NET or Rust.
- Regenerate all 19 fleetd operation pages with the `controller` authentication
  audience and common header/error requirements. Record the canonical auth source
  files in the source manifest; retain authored guide prose.
- Align Toolsmith installation and library/security guides with public 0.4 APIs,
  including descriptor-relative paths, configured quotas and database-resident
  readiness/matching relations. No optional toolkit becomes a fleet dependency.
- Preserve the merged landing-page work. The browser fixture now owns a short
  OS-temporary runtime directory instead of assigning the long checkout path to
  global TMPDIR; this avoids Chrome's native Unix-socket pathname failure.
  Evidence and screenshots remain repository-local, and runtime resources are
  disposed on successful completion and launch failure.

## Verification

The source check reports zero stale generated files: 92 crossfire operations,
19 fleetd operations, 157 Matrix operations, 37 schema modules and 46 authored
guides. The complete Hugo build, 37 Node tests and 14 real Chrome tests pass in
an aggregate process group limited to 8 GiB, no swap and 256 tasks.

Browser checks inspect 219 rendered HTML files, 34,429 internal links and exact
anchors, local-only assets, both themes, code copying, JavaScript-disabled
navigation and widths from 320 to 1440 pixels. The authentication guide is also
checked at 390 pixels, with its required header rendered on the status page.
No console errors were observed. The external npm lockfile is unchanged.

An earlier browser launch failed because the checkout-local temporary pathname
exceeded Chrome's Unix socket limit. The fixture owner was corrected; no assertion,
deadline or selected test was removed. Final checks use the integrated source.
No website publication, hosting-account change or production operation is performed.
