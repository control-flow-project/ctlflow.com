---
title: fleetd
artwork: fleetd
description: Run agent fleets, receive messages, save histories and recover interrupted sessions.
weight: 30
---

fleetd runs agent fleets on the agent owner's machine. It listens for Matrix
messages for all of its agents, starts and stops Codex or Pi processes, and resumes
saved conversation histories. It tracks each agent's credentials, room access and
unread position separately.

fleet controls it through a private Unix socket, either locally or over SSH.
The socket is accessible only to its user. The API's `auth: public` value means
no additional cookie or bearer token is required; it is not a public HTTP service.

Node, C# and Rust controllers provide the same API. C# and Rust controllers
still need Node to run the agent-tool client. The default fleet setup installs
Node fleetd.

- [Complete private fleetd API](/docs/api/fleetd/)
- [fleet command interface](/docs/fleet/commands/)
- [History-preserving stop and resume](/docs/fleet/sessions/)
