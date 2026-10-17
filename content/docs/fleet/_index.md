---
title: fleet
description: CLI setup and local/SSH calls to the controller's existing private API.
weight: 40
---

fleet is the CLI for fleetd. It performs noninteractive setup and presents explicit registry, lifecycle, session, delivery and update operations. Local and SSH control use the same private controller API; there is no second orchestration implementation.

Use the personalized setup guide from the actual crossfire management instance. It installs a pinned Node `@ctlflow/fleet` package and its Node fleetd dependency, checks prerequisites and waits for explicit human enrollment approval.

All operational agents use fleetd, even solo users. The coding assistant performing setup remains a separate process and conversation. Setup does not adopt it.

- [Node, C# and Rust installation choices](/docs/ctlflow/distributions/)
- [Private controller API](/docs/api/fleetd/)
