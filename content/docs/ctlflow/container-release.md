---
title: "Container release 0.1.25"
description: "Published Linux amd64 server and migration images, exact digests and registry access."
weight: 49
sourceProject: "ctlflow"
sourcePath: "docs/distributions/releases/0.1.25.md"
---

The 0.1.25 images were published on 3 November 2026. They contain four selectable
crossfire servers and one shared Knex maintenance image, all for Linux amd64.
Node, managed C#, C# NativeAOT and Rust use the same management UI, HTTP contracts,
Element and current Knex-created SQLite schema. C# uses .NET 11 RC2.

There is no fleet image. fleet/fleetd run on the execution host, using its
existing Codex or Pi installation and login. Personalized setup installs public
npm fleet/fleetd 0.1.25, not a harness or provider credentials. No site branding,
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

The namespace is `ghcr.io/control-flow-project/`. Version tags are `0.1.25`.
Use a complete immutable reference instead of `latest` or a configuration ID.

| Image | Registry manifest digest |
| --- | --- |
| `crossfire-node` | `sha256:59850921130e433ba4c515afa1eefdec71e4810ff841919a5a2f195bc8cf9110` |
| `crossfire-csharp-managed` | `sha256:cddc67073fd3ab7e471c601530fd4d435dbf9cf56583ede83bdef0069ef7f7ad` |
| `crossfire-csharp-nativeaot` | `sha256:35dc255c2d4f96be65c3281f62a605077e598571bab11c25d89655facdcaed2e` |
| `crossfire-rust` | `sha256:18fdb2f0cceed4099e5122005202aec5466aefde864efde7f3d6a3ee2d41f03f` |
| `crossfire-migrations` | `sha256:f544454d0fff75bfc1383add8a3cb5fdbe5bd19fca0933f0e0eb171a637cffe8` |

The operator selects the default NativeAOT server and its matching migration
image with these commands, then follows the Docker quickstart:

```sh
export \
  CROSSFIRE_RUNTIME_IMAGE=ghcr.io/control-flow-project/crossfire-csharp-nativeaot@sha256:35dc255c2d4f96be65c3281f62a605077e598571bab11c25d89655facdcaed2e \
  CROSSFIRE_MIGRATION_IMAGE=ghcr.io/control-flow-project/crossfire-migrations@sha256:f544454d0fff75bfc1383add8a3cb5fdbe5bd19fca0933f0e0eb171a637cffe8
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
`99c457ece465313565834b27f2b709f2ef1a3ad9`.
Build-source digest:
`8dfbdc5ccf486474218346117bfbcbe7ba3abd051c35d0da1085acd256d0458f`.
The shared onboarding release is `0.1.25-313654659215a5ff5bf518b9`.

The shared installed suite passes 119 tests per target and the shared container
suite passes 33 tests per target for Node, managed C#, NativeAOT and Rust, with
no failures or skips. Both Codex and Pi are exercised with controlled providers;
these results do not certify a paid account or model quality. The final fleetd
source checks pass 221 tests across 40 files. Native ARM64 images and emulation
are not verified.

- [Local Docker server and host fleet](/docs/ctlflow/local-docker/)
- [Container packages and upgrades](/docs/ctlflow/containers/)
- [Node server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-node)
- [Managed C# server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-csharp-managed)
- [NativeAOT C# server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-csharp-nativeaot)
- [Rust server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-rust)
- [Shared migrations package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-migrations)
