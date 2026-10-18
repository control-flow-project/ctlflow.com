# Published container references

Date: 2026-10-18. Website source: ctlflow commit
`74b51eac5493b63832899e319344bf2ec8f37715` (0.1.22), Toolsmith commit
`9fb2183fd6c6ff9b7c270314965f83d1ea838abe` (0.4.1).

Replaced the local Docker guide's placeholder digests with the published
NativeAOT and matching Knex image references. Linked the complete five-image
release inventory. The guides distinguish registry manifest digests from local
image IDs, frozen release bytes from current source, registry visibility from
authenticated access, and image publication from production activation.
There is no fleet image or provider-credential mount.

Documentation synchronization/checks passed: 47 authored guide sources, 92
crossfire operations, 19 fleetd operations, 157 Matrix operations and 37 schema
modules. Only source revision/input metadata changed; generated API contents and
Toolsmith's source revision are unchanged.

The pinned Hugo 0.168.0 build passed, followed by 41 static tests and all 16
browser tests. The Docker guide was checked at 1440- and 390-pixel widths,
including actual immutable references, shell commands, release link and absence
of page-level horizontal overflow. The mobile screenshot was visually reviewed.
No hosting settings or running application were changed.

An earlier run passed all 41 static tests but two browser tests failed while
opening pages with Chromium's `Target crashed` error, before page assertions.
The repeat ran unchanged assertions with a finite 8 GiB / zero-swap / 1024-task
aggregate scope: all 57 tests passed. It used approximately 988 MiB peak memory
and 305 tasks, with no memory/task limit events. The original 256-task scope's
peak counters were unavailable after disposal; the repeat's measured task peak
exceeds that cap. README and agent instructions now document the verified
1024-task bound rather than the insufficient 256-task example. After the final
documentation-only edits, source checks, the build, 41 static tests and the focused
desktop/mobile Docker browser test passed again.

Build output, browser artifacts and regenerated caches were removed after their
last use. Registry visibility requires the GitHub package owner's setting;
this website verification does not establish anonymous image access or activate
a server deployment.
