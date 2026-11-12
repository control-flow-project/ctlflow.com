---
title: "Implementations and packaging"
description: "Build and install C# managed, C# NativeAOT or Rust products."
weight: 45
sourceProject: "ctlflow"
sourcePath: "docs/distributions/README.md"
---

Choose one implementation for each product. All implementations use the same
management UI, HTTP contracts and Knex-created SQLite database. C# managed and
C# NativeAOT are two build modes of the same implementation.

Docker runs only the server side. Install the matching native fleet/fleetd
on the execution host first, retain sibling product directories and put fleet
on PATH. Personalized setup uses the existing supported Codex/Pi installation
and native login. It does not install a harness or copy credentials into Docker.
NativeAOT is the default; managed C# and Rust are explicit choices.

Selective VM execution is available in source builds of all three targets, not
the published 0.1.26 archives. Source publishers include `vm/README.md`, the host
prerequisite helper and Packer recipe. The
[VM guide](/docs/fleetd/vm-execution/) defines the supported host, images,
configuration and security limits. Server Docker deployment is unchanged.

- [Local Docker server and host-native fleet](/docs/ctlflow/local-docker/)
- [0.1.26 server and migration release inventory](/docs/ctlflow/container-release/)

| Target | Server installation | Fleet/controller installation | Build command |
| --- | --- | --- | --- |
| C# managed | Self-contained Linux x64 directory | Sibling native apphost directories, with the .NET runtime included | `npm run publish:csharp -- --mode managed --output /absolute/new-directory` |
| C# NativeAOT | Native Linux x64 directory | Sibling compiled executable directories | `npm run publish:csharp -- --mode nativeaot --output /absolute/new-directory` |
| Rust | Native Linux x64 directory | Sibling compiled executable directories | `npm run publish:rust -- --output /absolute/new-directory` |

- [C# managed installation and packaging](/docs/ctlflow/distributions/csharp-managed/)
- [C# NativeAOT installation and packaging](/docs/ctlflow/distributions/csharp-nativeaot/)
- [Rust installation and packaging](/docs/ctlflow/distributions/rust/)

Each guide covers prerequisites, packaging, server startup, fleet setup, upgrades
and verification. Each native publisher includes its selected target/mode guide
as `README.md`. No installed guide requires a local source checkout merely to
resolve its documentation links.

`publish:csharp` and `publish:rust` write local directories. They do not upload
releases, install host services, publish npm packages or activate an instance.
The source repository and the four listed 0.1.26 server/migration images are
public. Private npm workspaces are build, UI, test and maintenance dependencies;
they do not make the native products or server images private. The
[release inventory](/docs/ctlflow/container-release/) records actual native archive
availability. The target guides distinguish pending downloads from local builds.

Build dependencies and runtime dependencies differ. Native fleet controllers
still require Node for the shared agent-tool client; selecting a native backend
does not remove that requirement. Building server images requires a source checkout. Deployment uses a completed
container package and does not compile source on the host.

- [Shared product configuration](/docs/fleet/configuration/)
- [Development and all-target verification](/docs/ctlflow/development/)
- [Native architecture and limitations](/docs/ctlflow/implementations/)
- [Server backup and upgrade procedure](/docs/crossfire/operations/)
