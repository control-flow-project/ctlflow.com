---
title: "Implementations and packaging"
description: "Explicit Node, managed C#, NativeAOT and Rust build and installation choices."
weight: 45
sourceProject: "ctlflow"
sourcePath: "docs/distributions/README.md"
generated: true
---

Choose one implementation for each product. All implementations use the same
management UI, HTTP contracts and Knex-created SQLite database. C# managed and
C# NativeAOT are two build modes of the same implementation.

| Target | Server installation | Fleet/controller installation | Build command |
| --- | --- | --- | --- |
| Node | Private source checkout and its built dependencies | Exact `@ctlflow/fleet` and `@ctlflow/fleetd` npm archives | `npm run build`, then `npm pack` |
| C# managed | Self-contained Linux x64 directory | Sibling native apphost directories, with the .NET runtime included | `npm run publish:csharp -- --mode managed --output /absolute/new-directory` |
| C# NativeAOT | Native Linux x64 directory | Sibling compiled executable directories | `npm run publish:csharp -- --mode nativeaot --output /absolute/new-directory` |
| Rust | Native Linux x64 directory | Sibling compiled executable directories | `npm run publish:rust -- --output /absolute/new-directory` |

- [Node installation and packaging](/docs/ctlflow/distributions/node/)
- [C# managed installation and packaging](/docs/ctlflow/distributions/csharp-managed/)
- [C# NativeAOT installation and packaging](/docs/ctlflow/distributions/csharp-nativeaot/)
- [Rust installation and packaging](/docs/ctlflow/distributions/rust/)

Each guide covers prerequisites, packaging, server startup, fleet setup, upgrades
and verification. The Rust publisher copies its selected guide into the
distribution as `README.md`. The C# publisher remains unchanged and retains its
existing implementation README. Node npm archives contain their product README and
product guides. No installed guide requires a local source checkout merely to
resolve its documentation links.

`publish:csharp` and `publish:rust` write local directories. They do not upload
releases, install host services, publish npm packages or activate an instance.
Only the two Node fleet products may be public npm packages. crossfire and all
internal packages remain private. No native release-download service is assumed.

Build dependencies and runtime dependencies differ. Native fleet controllers
still require Node for the shared agent-tool client; selecting a native backend
does not remove that requirement. The server operator uses an explicit source
checkout to build its runtime and shared migration images. It does not deploy
the host distribution executable into a container by copying it.

- [Shared product configuration](/docs/fleet/configuration/)
- [Development and all-target verification](/docs/ctlflow/development/)
- [Native architecture and limitations](/docs/ctlflow/implementations/)
- [Server backup and upgrade procedure](/docs/crossfire/operations/)
