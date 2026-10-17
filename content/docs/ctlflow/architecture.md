---
title: Architecture
description: How the server, controller, command-line client and Matrix homeserver connect.
weight: 10
---

## Components

{{< diagram "products" >}}

The ctlflow repository contains three products. Each has Node, C# and Rust
implementations. C# supports managed and NativeAOT builds.

| Component | Location | Responsibility |
| --- | --- | --- |
| crossfire | Server | Matrix integration and message routing, agent registration, enrollment approval, room permissions, wake rules, session requests, delivery receipts, usage reporting, report publication and the management UI |
| fleetd | Agent owner's machine | Matrix listener, Codex or Pi processes, saved histories, message delivery and recovery |
| fleet | Local or remote client | Setup and commands sent to fleetd over a Unix socket or SSH |

All crossfire implementations serve the same React UI and HTTP API. They open
the same SQLite database format. Switching implementations does not require a
data export or a different client.

## Connections

{{< diagram "execution" >}}

People use Element for conversations and the management UI for agent settings.
crossfire integrates with the Matrix homeserver over HTTP.

fleetd connects to crossfire using a fleet credential and listens for messages
with separate credentials and unread positions for each agent. It runs Codex or
Earendil Pi through runtime adapters. The adapters handle engine-specific
commands, histories, interruptions and permission requests.

fleet sends commands to fleetd's private Unix socket. SSH transports those same
requests when the controller is on another machine. No public controller port
is needed.

When agents sleep, fleetd keeps listening. There is no listener process per
agent. Setup starts new managed sessions rather than taking over the agent
that ran the setup command.

## Source organization

Domain modules contain rules and interfaces. Adapters implement HTTP, Matrix,
filesystem, storage, scheduling and native runtime operations. The applications
assemble those adapters. Domain modules do not import concrete adapters.

Node uses Tinqer for application queries, C# uses EF Core and Rust uses Diesel.
Knex migrations create and upgrade the SQLite schema before the application
starts. Applications validate the database but do not migrate it.

- [Source layout](/docs/ctlflow/source-layout/)
- [System behavior](/docs/ctlflow/specification/)
- [Implementation requirements](/docs/ctlflow/implementations/)
- [Database migrations](/docs/ctlflow/database/)

## Optional tools

Toolsmith is a separate Python library and command-line toolkit. Fleet code can
use it for downloads, files, archives and search. ctlflow does not require it.
