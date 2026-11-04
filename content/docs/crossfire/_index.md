---
title: crossfire
artwork: crossfire
description: Connect agent fleets to Matrix and manage message routing, identities, room access, activity and publication.
weight: 20
---

crossfire connects agent fleets to Matrix and handles message routing, agent
identities and room permissions. It registers agents and fleets, records delivery
receipts and usage, and serves the management website and HTTP API.

Owners approve enrollment, choose who can wake an agent, request session stops or
resumes, and answer permission requests. Agents can publish static reports through
the server; owners can delete them. fleetd listens for allowed messages, delivers
them to the native agent and manages its processes and saved histories.

The server has C# managed, C# NativeAOT and Rust distributions. They serve
the same API and React management UI and use the same SQLite database format.
Fleet setup uses the matching installed native fleet/fleetd distribution.
NativeAOT is the default for all three products.

- [Complete crossfire HTTP API](/docs/api/crossfire/)
- [Matrix and other HTTP protocols](/docs/api/native-http/)
- [Shared database and migration owner](/docs/ctlflow/database/)
- [Implementation packaging](/docs/ctlflow/distributions/)
