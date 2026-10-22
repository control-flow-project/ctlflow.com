---
title: "Private state and histories"
description: "Controller files, native history registries, locks and current-format recovery."
weight: 30
sourceProject: "ctlflow"
sourcePath: "services/fleetd/docs/storage.md"
---

A controller root holds its descriptor, explicit fleet registry, desired intent,
resume selections, operation files, diagnostics and private `fleetd.sock`.
Registered fleets may live elsewhere. Private state is retained with its owning
directory; a workarea does not move when native cwd changes.

Startup accepts UUID operation files in `operations/` and daily diagnostic
partitions in `logs/`. Profiles and listener state use only immutable instance
keys, never a display-name lookup or automatic relocation. Readers validate
their current format; they do not inspect superseded filenames.

The OS-user authentication file is outside individual controller roots, at the
native configuration location ending in `ctlflow/fleetd.json`. fleet and fleetd
read that same private file. Back it up with the roots and native histories;
moving a root does not move or regenerate its key.

- [Authentication paths and recovery](/docs/fleetd/authentication/)

## Native registries

| Runtime | Registry |
| --- | --- |
| Codex | `.codex/crossfire-context-registry.json` |
| Pi | `.pi/crossfire-contexts.json` |

The registry maps shared, control and room contexts to native sessions.
Pi additionally binds exact native files/instruction digests.
Native conversation stores remain runtime-owned; registries do not copy or merge
them. The same adapter creates and resumes shared and per-room sessions.

Established histories cannot be silently replaced. First initialization,
an authorized new room/mode context and explicit confirmed reset are the only
creation cases. Corrupt registry, receipt, decision or observation state is
retained for diagnosis, not treated as permission for a fresh context.

## Private locks

Lock files have no application tables. Node, C# and Rust use the same exclusive SQLite
transaction and in-memory rollback-journal protocol.
A live/suspended owner retains exclusion; process exit releases it.
Do not delete the inode, use guessed PIDs or break another writer's lock.

## Native contexts

Codex and Pi each read one current context registry. Resume retains the exact
saved session identity. There is no historical metadata converter. Credentials
and native conversation files remain owned by the native runtime.

## Other retained state

Pending input, native confirmations, unfinished-work checkpoints and unacknowledged
operation outcomes remain recovery state.
Completed diagnostics/operation history use the logging age policy.
Each reader accepts one current format. Null fields represent facts that were
not observed, not accommodation of historical records.

- [Read-only operator tools](https://github.com/control-flow-project/ctlflow/blob/main/services/fleetd/node/tools/README.md)
- [Logging retention](https://github.com/control-flow-project/ctlflow/blob/main/services/crossfire/docs/logging.md)
- [Abrupt controller death](/docs/fleetd/operations/#abrupt-controller-death)
