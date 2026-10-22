---
title: "Node, C# and Rust"
description: "Implementation differences, dependencies and supported platforms."
weight: 20
sourceProject: "ctlflow"
sourcePath: "docs/architecture/native-implementations.md"
---

The repository has Node, C# and Rust implementations of crossfire, fleetd and fleet.
C# targets .NET 11 and produces managed and NativeAOT distributions from the same
source. Rust distributions are built with Cargo. Shared tests run against
explicitly selected distributions.

## Source layout

```text
services/
  crossfire/
    node/{apps/server,packages,tests,scripts,tools,Dockerfile}
    csharp/{apps/Crossfire.Server,packages,tests,build,scripts,Dockerfile}
    rust/{apps/server,packages,tests,scripts,Dockerfile}
    apps/web/
    database/management/sqlite/
    knexfile.management.mjs
    tests/contracts/
    scripts/
    docs/
  fleetd/
    node/{apps/daemon,packages,tests,scripts,tools}
    csharp/{apps/Fleetd.Daemon,packages,tests}
    rust/{apps/daemon,packages}
    tests/contracts/
  fleet/
    node/{apps/cli,packages,tests,scripts}
    csharp/{apps/Fleet.Cli,packages}
    rust/{apps/cli,packages}
    tests/contracts/
scripts/
```

The web application, database migrations and contract tests are shared.
Language-specific code is inside each product's implementation directory.

| Concern | Shared contract | Implementation difference |
| --- | --- | --- |
| API | Same routes, input validation, errors and response fields | Node HTTP / ASP.NET / Axum |
| Domain | Functional operations, explicit ports, expected failure values | TypeScript modules / C# static modules and records / Rust modules and values |
| Data | Same SQLite file and normalized schema | Tinqer / EF / Diesel |
| Migrations | One service-owned Knex image | No runtime or EF migrations |
| UI | One React project and built assets | None |
| Native sessions | fleetd-owned Codex/Pi adapters | Native process and transport libraries |
| Execution composition | fleetd execution adapter, not daemon-domain code | Language-local adapter projects |
| Distribution | Standalone products and shared tool bytes | npm archives / managed or NativeAOT trees / native Cargo trees |
| Server deployment | One Docker package format, shared migration image and image-owned readiness | Backend-specific runtime image, never language-specific site activation |
| Verification | One external scenario bank | Separate internal unit/compiler tests |

The selected implementation never invokes another backend as a fallback.
The shared JavaScript agent tool and Pi extension are declared runtime assets;
the common Knex image is an explicit migration dependency.

## Server operator

All three implementations reject repeated options, including identical values, and
accept explicit ports only as canonical ASCII decimal integers in 1024..65535.
Argument rejection precedes state-lock creation and native engine operations.
Operator failures use a standard-error diagnostic and normal exit code 1, not a
native abort or crash dump.
The same external operator scenarios exercise all three boundaries.

One cross-language private SQLite lock owns an instance's entire operator
lifetime. A competing live start fails before touching containers or data.
All three operator implementations consume --package. The package selects the runtime
independently of the operator language. Source compilation is a build step, not
another deployment path. Exact archive/image/source identities and release labels
are verified before stopping writers. Current packages target Linux amd64 only.
After launcher death, the next owner inspects both deterministic container names,
validates their directory labels, then stops and removes their exact IDs.
Foreign ownership or unconfirmed cleanup blocks migration and replacement.

Backup, migration and runtime startup are ordered phases. Docker automatic
removal is not used. The instance lock is retained through runtime cleanup.
A native agent's process/history ownership is a separate controller concern.

- [Docker package format and site integration](/docs/ctlflow/containers/)

## HTTP boundaries

Public mutation limits distinguish the actual client from a configured trusted
ingress. Only an immediate peer listed in `trustedProxyAddresses` may supply
one overwritten `X-Forwarded-For` IP. Untrusted headers cannot select a bucket.
Node dispatches management requests to the same HTTP handler without another
loopback proxy.
Outbound Node Matrix/coordination requests use a pinned published Undici
dispatcher with HTTP/2 disabled explicitly. This avoids the observed HTTP/2
stream-error path without patching Node, changing its global dispatcher or
retrying a failed protocol with another one. TLS verification, authentication,
body bounds, cancellation and deadlines remain enforced. HTTP/1.1 does not
provide HTTP/2 multiplexing.

Pagination uses canonical positive decimal strings. Both public and private APIs
reject signs, leading zeros, exponents, fractions, whitespace, duplicate fields
and out-of-range values. Empty collections have one logical page.

## Database

Management SQLite uses application ID `1129465426`, current schema 1 and the sole
initial Knex migration. Current metadata describes 57 application tables.
Knex's own bookkeeping tables are separate. File state and Conduit's externally
owned RocksDB are not management SQL databases.

There is no historical schema converter or alternate runtime reader.
Applications validate the current database and completed Knex initialization.
No import/export is needed when changing between verified implementations.

## .NET dependencies

The SDK is pinned to `11.0.100-rc.2.26504.105`; EF/SQLite packages are pinned
to `11.0.0-rc.2.26504.105`. Managed initial deployment is permitted.
There is no automatic managed fallback inside a NativeAOT executable.

Managed and NativeAOT publication precompile the same fixed EF models and
queries. Managed publication does not compile query expressions on the request
path or maintain a second query implementation/cache. Managed products disable
tiered compilation, producing optimized JIT code at first compilation rather
than waiting for traffic-driven promotion. This adds first-call compilation work;
the performance bank measures installed defaults, not test-only tuning.

NativeAOT builds emit trimming and dynamic-code diagnostics from EF and BCL
reflection paths. Supported fixed queries use generated model and query metadata.
Tests execute the AOT binaries with dynamic code and reflection-based JSON disabled.
The pooled SQLite EF options constructor also emits IL2026/IL3050 at compilation.
Warnings remain visible under the existing linker policy. Managed and NativeAOT
acceptance exercise independent leases, reset, rollback, connection release and
privacy revalidation. Passing fixed queries does not certify arbitrary EF models.

| Family | Relevant dependency surface |
| --- | --- |
| IL2026 | Trimming annotations on EF/query entrypoints |
| IL3050, IL3051 | Dynamic generic/expression paths |
| IL2046, IL2092, IL2093 | Interface and implementation annotation mismatches |
| IL2055–IL2111 families | Generic reflection and metadata requirements |
| IL3002 | Spatialite assembly-file discovery; no product Spatialite capability |

Passing owned queries does not certify arbitrary EF queries, plugin models,
dynamic extensions or a future dependency version. Query/model/pin changes require
new native verification. Build-time compiler changes belong to the compiler
owner, with its upstream notices retained; they are not runtime query fallbacks.

## Evidence

- [Rust implementation review and verification boundaries](source:ctlflow:docs/architecture/rust-review.md)

- [Current correction record and issue IDs](source:ctlflow:docs/verification/20261015-outside-review-fixes.md)
- [Shared contract execution](source:ctlflow:docs/verification/shared-contracts.md)
- [Development gates](/docs/ctlflow/development/)

Verification records identify the tested Linux x64 host and Codex, Pi and Conduit
versions. Inert-provider tests exercise integration, not paid-model quality.
macOS, Windows, sustained load and arbitrary tool-process containment are not
covered by those results.
