---
title: "Container release 0.1.26"
description: "Published Linux amd64 server and migration images, exact digests, access and native archive publication status."
weight: 49
sourceProject: "ctlflow"
sourcePath: "docs/distributions/releases/0.1.26.md"
---

The four generic Linux amd64 images were published and pulled by immutable digest
on 4 November 2026. Native archive publication is blocked: the workstation's
GitHub credential can publish packages but cannot create repository releases.
The three local archives and SHA256SUMS exist; public download URLs are not yet
available. This release is not complete until those assets are published and
downloaded successfully. Deployment status is recorded separately.

Source commit: `50347261a3c4fc7e5ffd2dcf4f530b76f144acab`.

Build-source digest:
`48ca3827203b2f11e46b1c829a937876e7334eebbd413e8bad622692e9012009`.

Shared listener artifact release: `0.1.26-b7e34a99858ded6e9f76b372`.

## Registry images

Namespace: `ghcr.io/control-flow-project/`. Exact version tag: `0.1.26`.
All four packages remain private and require authorized package-read access.
Registry manifest bytes, config identities, source/version/platform labels and
actual digest pulls were verified. No site configuration, credentials, operating
data or fleet image is included. All npm workspaces are private.

| Image | Registry manifest digest |
| --- | --- |
| `crossfire-migrations` | `sha256:c543c0af875aed6865cfc8549d954514baa1adbe73d34e97040175aad10c8c47` |
| `crossfire-csharp-managed` | `sha256:dcc8bed0c9546f001be6c71394d07f3b64967e985c9b8f1e2effc9a6b6aa62dc` |
| `crossfire-csharp-nativeaot` | `sha256:721054592f99bafd21b7ec4c22154063f4d7d696b9ccf82ae8f2f2682ae51f19` |
| `crossfire-rust` | `sha256:63cb443602b3adeeb8b4f1aae95e9b6e0051f03a96fc66a6360f4d7c15db560d` |

The server operator authenticates Docker on the host with a GitHub account
allowed to read these packages and a token granting `read:packages`:

```sh
docker login ghcr.io --username YOUR_GITHUB_USERNAME
```

Enter the token at Docker's password prompt. Keep registry credentials out of
chat, fleet configuration, container environments and server volumes.

For the default NativeAOT server, select its matching immutable migration image
and then follow the [Docker quickstart](/docs/ctlflow/local-docker/):

```sh
export \
  CROSSFIRE_RUNTIME_IMAGE=ghcr.io/control-flow-project/crossfire-csharp-nativeaot@sha256:721054592f99bafd21b7ec4c22154063f4d7d696b9ccf82ae8f2f2682ae51f19 \
  CROSSFIRE_MIGRATION_IMAGE=ghcr.io/control-flow-project/crossfire-migrations@sha256:c543c0af875aed6865cfc8549d954514baa1adbe73d34e97040175aad10c8c47
docker pull "$CROSSFIRE_RUNTIME_IMAGE"
docker pull "$CROSSFIRE_MIGRATION_IMAGE"
```

Do not mix releases. A registry manifest digest is not Docker's local image ID.
Registry publication does not migrate or restart a deployment.

## Native archives

These locally built files each retain the sibling crossfire, fleetd and fleet
layout. They are candidates for ordinary GitHub release `v0.1.26`, not npm
packages or fleet containers. SHA256SUMS covers all three archives.

| File | Bytes | SHA256 |
| --- | ---: | --- |
| `ctlflow-csharp-managed-0.1.26-linux-x64.tar.gz` | 145682999 | `82c1d0edc7686b8ce283e6cb6138372b31ec47267b260c9e57234defb0f20f44` |
| `ctlflow-csharp-nativeaot-0.1.26-linux-x64.tar.gz` | 84139890 | `77374b017ad94d1a2645ae3db32b2c578365b07d2674c236b7938d05a2330161` |
| `ctlflow-rust-0.1.26-linux-x64.tar.gz` | 22574286 | `6d73adf3b6e7a4ec914d35cb481818d1ec02a0fedca116c86d8aa3ccb17231c9` |

## Verification

The actual container bank passed 33 checks per target for managed C#, NativeAOT
and Rust, with no failures or skips. It covers API/same-file data, the shared
React and Element UI, artifacts, Compose migration gating and project isolation.
The shared Knex image separately passed initialization and repeat execution.

C# managed and NativeAOT core and actual Codex/Pi runtime checks passed on the
patched .NET SDK `11.0.100-rc.3.26522.148` and EF/SQLite
`11.0.0-rc.3.26522.148`. RC2 restore attempts failed the security audit and were
not waived. Existing EF/trimming/AOT diagnostics remain visible.

There is no schema change. Standard Compose stops existing writers and runs a
fresh matching one-shot Knex job before server activation. No data reset or
runtime fallback is part of this release. Absolute latency and throughput are
reported without a comparative speed gate. Fixed-provider tests do not certify
paid-provider entitlements, model quality or untested host platforms.

- [Container packages and upgrades](/docs/ctlflow/containers/)
- [Managed C# server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-csharp-managed)
- [NativeAOT C# server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-csharp-nativeaot)
- [Rust server package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-rust)
- [Shared migrations package](https://github.com/orgs/control-flow-project/packages/container/package/crossfire-migrations)
