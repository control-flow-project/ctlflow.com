---
title: Toolsmith · optional
linkTitle: Toolsmith · optional
description: A separate generic Python library/CLI project. Not a ctlflow constituent, service or required fleet dependency.
weight: 60
---

Toolsmith supplies **optional generic libraries and CLI tools**. It is a separate project, not a constituent of the ctlflow monorepo. It runs no service, daemon, HTTP server or persistent worker. A fleet may use it or omit it completely.

The caller owns domain policy, summaries, model interpretation, publication and fleet-specific workflows. Toolsmith does not encode financial/legal semantics or infer a deterministic interpretation of malformed HTML tables.

## Capability boundaries

| Capability | Interface | Consumer responsibility |
| --- | --- | --- |
| Bounded acquisition | Python library / CLI | Authorized sources, policy and budgets |
| Generic files and archives | Python library / CLI | Bundle meaning and recipient access |
| Text readers | Python library / CLI | Interpretation of HTML, PDF and document structure |
| Lexical indexing | SQLite library / CLI | Current text and authorized corpus scope |
| Semantic retrieval | Optional native SQLite library / CLI | Explicit offline model assets, summaries/text and scope |
| Optional local archive | Python library / CLI | Identity, ingest decisions and domain references |
| Backup and integrity | Foreground operations | Backup location, restore policy and deployment procedure |

Base installation has no third-party runtime dependencies. HTTP and semantic capabilities use explicit optional extras. Semantic retrieval uses exact native complete-corpus comparison, not an approximate-nearest-neighbor claim or a 10,000-entry prefix scan.

## Use from any controller implementation

A Node, C# or Rust fleet can choose to invoke a Toolsmith CLI command as an ordinary tool. Python callers can import the library directly. This does not create a shared process, require Python in crossfire, or change any ctlflow runtime interface.

- [Installation and optional extras](/docs/toolsmith/installation/)
- [Python API](/docs/toolsmith/library/)
- [CLI](/docs/toolsmith/cli/)
- [Toolsmith source](source:toolsmith:README.md)
