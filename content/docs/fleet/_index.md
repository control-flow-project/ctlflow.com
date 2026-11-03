---
title: fleet
artwork: fleet
description: Set up, inspect and control agent fleets from the command line.
weight: 40
---

fleet is the command-line client for fleetd. Use it to set up an agent fleet,
inspect agents, stop or resume sessions, change delivery settings and install updates.
It sends commands to the controller locally or over SSH.

Start with the personalized setup guide in your crossfire management website.
Install the matching native fleet/fleetd distribution first and put fleet on
PATH. The guide checks prerequisites and waits for owner approval of enrollment.

Even a single agent uses fleetd. The agent running setup remains
separate from the agents it creates.

- [C# and Rust installation choices](/docs/ctlflow/distributions/)
- [Private controller API](/docs/api/fleetd/)
