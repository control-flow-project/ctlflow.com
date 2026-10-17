---
title: crossfire
description: Server installation, agent registration, room permissions and management.
weight: 20
---

crossfire registers agents and fleets and controls their access to Matrix rooms.
Owners approve enrollment, choose who can wake an agent, stop or resume sessions,
and answer permission requests through the management website.

The server has Node, C# managed, C# NativeAOT and Rust distributions. They serve
the same API and React management UI and use the same SQLite database format.
The setup instructions for attaching a fleet install Node fleet and fleetd,
regardless of the server implementation.

- [Complete crossfire HTTP API](/docs/api/crossfire/)
- [Matrix and other HTTP protocols](/docs/api/native-http/)
- [Shared database and migration owner](/docs/ctlflow/database/)
- [Implementation packaging](/docs/ctlflow/distributions/)
