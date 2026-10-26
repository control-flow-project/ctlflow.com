---
title: "Container packages"
description: "Build, transfer and run server images with their matching migration image."
weight: 50
sourceProject: "ctlflow"
sourcePath: "services/crossfire/docs/container-packages.md"
---

crossfire packages a selected server backend and the common Knex migration image.
For a local server with host-native agents, use the
[Docker quickstart](/docs/ctlflow/local-docker/). Docker runs the server side
only; fleet/fleetd and the selected harness use the execution host's native login.
The deployment host needs rootless Docker with Compose. Trusted package
verification/export tooling uses Node.js 26; the server backend needs no host
language runtime or source checkout. All four backends use the same Compose kit.

Build targets are Node, C# managed, C# NativeAOT and Rust on Linux amd64.
These packages do not provide native macOS/Windows fleetd or ARM64 images.
C# fleetd currently has Linux-specific process/filesystem adapters.
Image construction and native calendar verification compile the same pinned IANA
archive from assets/time-zones.json; the host's installed database is not an input.

## Build

From the repository root, with the pinned build dependencies:

```sh
npm run package:containers -- --output /absolute/new-packages
```

An optional `--cgroup-parent EXISTING.slice` selects an existing bounded Docker
slice. Verification always supplies its verified finite resource slice. The build
constructs cached common assets/migrations, then the four runtime images:

```text
new-packages/
  node/{release.json,images.tar,package-tool.mjs,compose.yaml}
  csharp-managed/{release.json,images.tar,package-tool.mjs,compose.yaml}
  csharp-nativeaot/{release.json,images.tar,package-tool.mjs,compose.yaml}
  rust/{release.json,images.tar,package-tool.mjs,compose.yaml}
```

Each directory transfers independently. The archive contains one runtime image
and the same shared migration image. Build inputs are fingerprinted, including
the pinned policies/compiler files, and rechecked before the output is published.
Failed construction removes only its own staging output. No registry is contacted
for publication. A moderate-or-higher production dependency audit blocks image
construction, in the producer and common Docker build stage. Sites consume those
reviewed artifacts rather than maintaining private dependency/source overlays.
Docker may obtain pinned build dependencies/base images.
Keep release artifacts in a trusted distribution location. The source uses the
MIT license.
The bundled package-tool.mjs is trusted Node.js 26 maintenance tooling for verifying
and exporting branded derivatives without a source checkout. It is not executed
by the server. An activation script can run its
pure `identities` command in the matching migration image without host Node or
a mounted Docker socket. Trust its publisher as executable
code; the archive checksum is not authentication of this helper.

## Format and image contract

The [published 0.1.24 inventory](/docs/ctlflow/container-release/) provides
immutable references for the generic images:
`ghcr.io/control-flow-project/crossfire-node`, `crossfire-csharp-managed`,
`crossfire-csharp-nativeaot`, `crossfire-rust` and `crossfire-migrations`.
Registry access follows the package's visibility setting. Publication is separate
from production activation; it does not migrate or restart a deployment.
Use verified immutable references from a coordinated current release package.
The current inventory records verified authenticated pulls of all five images;
private packages still require authorized host-side registry access. A registry manifest digest
and Docker's local image ID name different objects; do not substitute one for the
other or use `latest`.
Never publish domain instructions, operating data, site configuration or secrets.

`release.json` is a UTF-8 JSON object of at most 8192 bytes. It has exactly:

| Field | Meaning |
| --- | --- |
| schemaVersion | Number 2; superseded package formats are rejected |
| version | Coordinated product version |
| sourceDigest | Lowercase SHA-256 of the crossfire build input |
| backend | Explicit backend slug, such as node or csharp-nativeaot |
| platform | linux/amd64 |
| archiveSha256 | Lowercase SHA-256 of images.tar |
| runtime | Runtime image object |
| migration | Different common Knex image object |

Each image object contains exactly `reference`, `configDigest` and
`descriptorDigest`. Its package-owned `crossfire-package:` transport tag has a
64-character lowercase hexadecimal suffix. The two SHA-256 digests identify
the actual OCI configuration and root descriptor in the archive. They are
different objects in the same format. Named export references keep both images
in the OCI index; saving untagged IDs can lose the second entry.

`images.tar` is a regular Docker-save archive, nonempty and at most 16 GiB.
The package tool verifies the archive even when images are cached and loads it
when required. Classic and containerd image stores expose different native
identity objects. The package tool verifies the current store's exact
configuration/descriptor identity, platform and labels before stopping writers,
then returns its immutable execution handle. Malformed descriptors fail without
trying another identity or changing the host store. Only the current exact package
contract is accepted.
Required labels are org.crossfire.package=1, org.opencontainers.image.version,
org.crossfire.source and org.crossfire.backend. The migration backend is migrations;
its version/source must equal the selected runtime. A package has no mutable tag
selection, source-build mode or automatic backend fallback.
The package label is an image capability marker, not the manifest schema version.

Hashes establish exact bytes, not publisher authentication. Obtain the complete
directory from a trusted release publisher; changing both the archive and manifest
does not become trustworthy merely because their hashes agree.

Every runtime image owns its entrypoint, Conduit, Element, management UI, agent
tools, time-zone data and Docker health check. Runtime ports are 8080/8082 and
private state is mounted at /runtime. Images run read-only with a bounded /tmp,
dropped capabilities and no-new-privileges. Neither deployment projects nor the
operator inject a Node-based health check. The AOT image contains no Node or CLR
dependency; the managed image contains its required .NET runtime.

## Deploy or switch backends

Retain existing private state and configuration. Trust the package publisher,
then verify/import the selected backend package before stopping any writer:

```sh
node /absolute/packages/csharp-nativeaot/package-tool.mjs verify \
  /absolute/packages/csharp-nativeaot > /absolute/private/verified-images.json
export CROSSFIRE_RUNTIME_IMAGE=$(jq -r .runtimeImage /absolute/private/verified-images.json)
export CROSSFIRE_MIGRATION_IMAGE=$(jq -r .migrationImage /absolute/private/verified-images.json)
export CROSSFIRE_STATE=/absolute/private/state
export CROSSFIRE_PORT=8080 CROSSFIRE_CONTENT_PORT=8082
```

The maintenance tool needs Node.js 26 and the example extraction uses jq. The
returned image handles are immutable on the receiving Docker engine. Registry
consumers can instead pull the exact matching published digests; both artifact
transports feed the same Compose workflow. A failed pull or verification stops
there, without switching transport or backend automatically.

For a NEW empty state directory, set its identity and initialize once:

```sh
export CROSSFIRE_INSTANCE=team CROSSFIRE_SERVER_NAME=example.test
export CROSSFIRE_ORIGIN=https://example.test
export CROSSFIRE_CONTENT_ORIGIN=https://content.example.test
export CROSSFIRE_ADMINISTRATOR=admin
docker compose -p team -f /absolute/packages/csharp-nativeaot/compose.yaml \
  --profile maintenance run --rm initialize
```

For an initialized instance, or after that initialization:

```sh
docker compose -p team -f /absolute/packages/csharp-nativeaot/compose.yaml stop crossfire
docker compose -p team -f /absolute/packages/csharp-nativeaot/compose.yaml rm -f migrate
docker compose -p team -f /absolute/packages/csharp-nativeaot/compose.yaml up -d --no-build --wait
```

Use the same project name and state for every command. Compose starts the runtime
only after the migration job succeeds. On an upgrade, stop writers and remove
the completed job to guarantee a fresh run; dependency ordering alone does neither.
Inspect `docker compose ... logs migrate` after a failure and correct it before
retrying. Backups are optional and operator-managed. If taking one, include
committed SQLite WAL state, private configuration, credentials and other owned
persistent data. Do not delete volumes to recover a failed migration.

The default state is the project's named `server-state` volume. An absolute
CROSSFIRE_STATE selects a private bind directory instead. Ports default to
8080/8082 on loopback; public HTTPS and ingress remain site-owned. Use an explicit
Compose override for site resource/networking policy. The image owns its
entrypoint and readiness; do not inject backend-specific probes.

Switching packages changes the selected backend while retaining current SQL
data, Matrix rooms, credentials and publications. Native agent processes and
histories remain fleetd-owned. There is no `crossfire start` Docker operator,
automatic backend fallback, schema downgrade or data reset.

GAAP and Bad Bets select csharp-nativeaot in their site deployment profiles and
retain their separate DNS/TLS/nginx, origins, ports, private
directories and branding. A package is site-independent. This documentation is
not a record that either site's deployment scripts or running services changed.

## Site branding

Brand Element in a build stage with the site's own Node tooling, then copy only
the resulting assets into the selected runtime image. Do not run `node` inside
the final C#/Rust image, copy a Node runtime into it or hardcode an implementation
entrypoint/health probe in site Compose. The shared Element location is /app/element.
Preserve the base image's crossfire release labels, entrypoint and health check;
put site-specific provenance in site-owned labels.

After building the derivative image, use its immutable ID and the matching common
migration ID to create the same package format:

```sh
node /absolute/packages/csharp-managed/package-tool.mjs export \
  --runtime sha256:RUNTIME_IMAGE_ID \
  --migrations sha256:MIGRATION_IMAGE_ID \
  --output /absolute/new-site-package
```

The two IDs must be complete 64-character lowercase digests. This export function
also packages ordinary build outputs; it is not another deployment path. It checks
the inherited release labels and refuses mismatched runtime/migration releases.
Site-specific initialization uses the common Compose initialize service, never
application-source imports from an arbitrary runtime image. Configuration
updates must be validated outside language-specific image internals. All SQL
changes remain in the shared Knex image, never EF/Node runtime startup.

The common migration image also contains supported maintenance commands. It is
Node build/maintenance tooling, not a language fallback inside an AOT runtime:

```sh
docker run --rm --network none --mount type=bind,source=/absolute/private/state,target=/runtime \
  --entrypoint node sha256:MIGRATION_IMAGE_ID /app/services/crossfire/crossfire init \
  --directory /runtime --instance NAME --origin https://SITE --content-origin https://CONTENT \
  --server-name SITE --administrator USERNAME
```

Use init only on a new empty directory. On existing state, run
`/app/services/crossfire/dist/scripts/container-configuration.js` in that same
maintenance image with `--directory`, `--instance`, `--origin`, `--content-origin`
and `--server-name`, mounting state read-only. It validates without rewriting or
printing secrets. Then use the same Compose project to stop writers, remove the completed migrate
job and start the selected release. Backups remain operator-managed. Apply the documented
read-only filesystem, dropped-capability, no-new-privileges and resource controls
to maintenance containers as well.

Fleet instructions always recommend the pinned Node @ctlflow/fleet and Node
fleetd, including when either server backend is C#. The invoking agent runs setup
as an operator; fleetd starts separate sessions. No .NET installation is added to
fleet attachment and no existing conversation is adopted.

## Verification and Rust integration

The shared actual-container bank builds packages once and then runs identical
API/UI/data assertions on each backend. It uses the same Compose kit, runs
image-owned readiness probes, tests transfer/import and rejects
corrupt archives/mismatched labels before touching a running instance.
The ordinary installed-products and current Knex initialization banks remain required.

The root packaging command calls the Node/C# builder and Rust image producer. Rust reuses the common asset/migration Dockerfile,
package exporter and label validation; only its runtime build is target-owned.
The same container assertion bank covers all selected distributions. Rust's
separate release gate runs its actual image through this bank; the full matrix
uses the same deployment assertions for all backend packages. Build results and behavioral verification are recorded separately in the native
review.

- [Rust integration review](source:ctlflow:docs/verification/20261017-rust-integration-review.md)
