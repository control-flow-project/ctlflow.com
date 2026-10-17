---
title: crossfire
description: The coordination server, shared management UI, Matrix integration and public HTTP API.
weight: 20
---

crossfire owns identity, human enrollment approval, authorization, desired room access, wake policies and coordination records. Its server serves the common management UI, integrates with Matrix over HTTP and exposes the public product API.

The server can be Node, C# managed, C# NativeAOT or Rust. This choice does not change API paths, the React UI, SQLite data or the Node-based default fleet attachment instructions.

- [Complete crossfire HTTP API](/docs/api/crossfire/)
- [Matrix and other HTTP protocols](/docs/api/native-http/)
- [Shared database and migration owner](/docs/ctlflow/database/)
- [Implementation packaging](/docs/ctlflow/distributions/)
