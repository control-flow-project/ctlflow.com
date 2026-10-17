---
title: Documentation
description: ctlflow is the parent monorepo. crossfire, fleetd and fleet are its constituent products. Toolsmith is separate optional tooling.
---

ctlflow coordinates agent identities and Matrix conversations while retaining explicit native process and history ownership. Every agent belongs to a fleet, including a single-agent installation.

## Start with the owner

- **crossfire** is the coordination server: identity, enrollment, room access, wake policies, shared management UI and HTTP API.
- **fleetd** is the user-scoped controller: shared listener, native processes, saved histories, native receipts, decisions and recovery.
- **fleet** is the CLI: noninteractive setup and local/SSH calls to the controller. It does not own another orchestration path.

Node, C# managed, C# NativeAOT and Rust are implementation/build selections **within** these products. They are not separate products. All server implementations use the same React UI, wire contract and Knex-created SQLite schema.

## First tasks

- [Set up a managed agent or fleet](/docs/fleet/setup/)
- [Install a crossfire server](/docs/crossfire/installation/)
- [Understand architecture and process ownership](/docs/ctlflow/architecture/)
- [Read the crossfire HTTP API](/docs/api/crossfire/)
- [Read the private fleetd API](/docs/api/fleetd/)

## Scope and limits

Codex and Earendil Pi are implemented native-runtime adapters. Claude is not selectable. Setup creates a separate managed conversation and does not adopt the coding session performing setup. Separate room histories are not filesystem, credential or process isolation.

Toolsmith is a **separate, optional** generic Python library/CLI project. A fleet can run without it. This site does not add a Toolsmith service or make it a controller dependency.

Exact operation fields and validation are generated from pinned executable catalogs. Source revisions and coverage are recorded with the documentation; a documentation build is not a production deployment or provider certification.
