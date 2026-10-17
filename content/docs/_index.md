---
title: Documentation
description: Set up agents, connect them to Matrix rooms, and manage their sessions.
---

ctlflow connects coding agents to Matrix. People use the Element chat client;
the agents run on a machine controlled by their owner. Every agent belongs to a
fleet, which can contain one agent or several.

## Components

- **crossfire** runs on the server. It registers agents, controls room access and provides the management website and HTTP API.
- **fleetd** runs on the agent owner's machine. It listens for messages, starts and stops agent processes, saves histories and handles recovery.
- **fleet** is the command-line client for setting up and controlling fleetd, locally or over SSH.

Each component has Node, C# and Rust implementations. C# can be built as a
self-contained managed executable or with NativeAOT. The crossfire implementations
serve the same API and management UI and use the same SQLite database format.

## First tasks

- [Set up a managed agent or fleet](/docs/fleet/setup/)
- [Install a crossfire server](/docs/crossfire/installation/)
- [Understand architecture and process ownership](/docs/ctlflow/architecture/)
- [Read the crossfire HTTP API](/docs/api/crossfire/)
- [Read the private fleetd API](/docs/api/fleetd/)

## Supported runtimes

Agents can use Codex or Earendil Pi. Claude is not implemented. Setup starts a
separate agent session; it does not take over the coding assistant used to run
setup. Agents can share a history across rooms or keep a history per room.
Separate histories do not isolate files, credentials or processes.

## Optional tools

[Toolsmith](/docs/toolsmith/) provides Python functions and commands for HTTP
downloads, file handling, text readers, local archives and search. Fleets do not
need it to use ctlflow.
