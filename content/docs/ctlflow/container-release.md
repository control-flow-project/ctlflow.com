---
title: "Container release 0.1.24"
description: "Published Linux amd64 server and migration images, exact digests and registry access."
weight: 49
sourceProject: "ctlflow"
sourcePath: "services/crossfire/docs/releases/0.1.24.md"
---

The 0.1.24 images were published on 23 October 2026. They contain four selectable
crossfire servers and one shared Knex maintenance image, all for Linux amd64.
Node, managed C#, C# NativeAOT and Rust use the same management UI, HTTP contracts,
Element and current Knex-created SQLite schema. C# uses .NET 11 RC2.

There is no fleet image. fleet/fleetd run on the execution host, using its
existing Codex or Pi installation and login. Personalized setup installs public
npm fleet/fleetd 0.1.24, not a harness or provider credentials. No site branding,
domain fleet, operating data or credentials are included in these server images.

## Registry access

All five authenticated immutable pulls were verified. At publication these
GitHub packages were private, and anonymous authorization returned 401. Until
the owner makes a package Public, your GitHub account needs package read access.
The server operator logs Docker in on the host using a token granting
`read:packages`:

```sh
docker login \
  ghcr.io \
  --username YOUR_GITHUB_USERNAME
```

Enter the token at Docker's password prompt. Do not paste it into chat, a fleet
configuration, container environment or server volume. Public packages permit
anonymous pulls; uploading an image does not change its visibility.

- [GitHub registry authentication](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry)

## Image inventory

The namespace is `ghcr.io/control-flow-project/`. Version tags are `0.1.24`.
Use a complete immutable reference instead of `latest` or a configuration ID.

| Image | Registry manifest digest |
| --- | --- |
| `crossfire-node` | `sha256:8d7e74389da6da3b0d5cd6cebc012f5ac001d67c58ea1f9bea3011b4595f6587` |
| `crossfire-csharp-managed` | `sha256:561a058ec71775685ddbc15fea0c93afe02e2c051dcce516106c3b96bdcea917` |
| `crossfire-csharp-nativeaot` | `sha256:37dc1f30ac1cd7cdf9b1cefc2a8bc65a81a546e3f7842a742797daea4a187f42` |
| `crossfire-rust` | `sha256:0d20cf2890731d7ceb7f219106e868835a9531420c63a48e1b617aef75c570b7` |
| `crossfire-migrations` | `sha256:254a215b8d7fbb6e8d82b1dfec3fe5d930f259ad35a75ee8ac6100e82982cf3c` |

The operator selects the default NativeAOT server and its matching migration
image with these commands, then follows the Docker quickstart:

```sh
export \
  CROSSFIRE_RUNTIME_IMAGE=ghcr.io/control-flow-project/crossfire-csharp-nativeaot@sha256:37dc1f30ac1cd7cdf9b1cefc2a8bc65a81a546e3f7842a742797daea4a187f42 \
  CROSSFIRE_MIGRATION_IMAGE=ghcr.io/control-flow-project/crossfire-migrations@sha256:254a215b8d7fbb6e8d82b1dfec3fe5d930f259ad35a75ee8ac6100e82982cf3c
docker pull \
  "$CROSSFIRE_RUNTIME_IMAGE"
docker pull \
  "$CROSSFIRE_MIGRATION_IMAGE"
```

Do not mix releases. The server never runs schema migrations at startup; the
matching one-shot Knex command must succeed first. Registry publication does not
migrate or restart an existing server or agent.

## Verification and source

Runtime source commit:
`774de415a2b327fde1a7d5be5001737e01776e91`.
Build-source digest:
`5654753e2dc919318e6d88d8679e95dbdd019d055c4876a7b26ef1d9c92722ad`.
The shared onboarding release is `0.1.24-91092feb27e0aa3b2993da07`.

The same Docker/host-fleet checks pass all seven tests for each server variant:
initialization, matching migration, login, owner-reviewed host attachment,
publication isolation and preserved histories/stopped selections. A fresh Node
bank passes 982 tests with Codex and Pi. The Docker host fixture uses real Codex
with an inert local provider; these checks do not certify a paid account or model
quality. Native ARM64 images and emulation are not verified.

- [Local Docker server and host fleet](/docs/ctlflow/local-docker/)
- [Container packages and upgrades](/docs/ctlflow/containers/)
- [Node server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-node)
- [Managed C# server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-csharp-managed)
- [NativeAOT C# server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-csharp-nativeaot)
- [Rust server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-rust)
- [Shared migrations package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-migrations)
