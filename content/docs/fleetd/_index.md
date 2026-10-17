---
title: fleetd
description: The user-scoped controller, shared listener, native sessions, histories, decisions and recovery.
weight: 30
---

fleetd owns the explicit fleet registry, desired activation, native process/history lifecycle and one shared listener host. Its independent agent bindings retain their own identities, authority, unread cursors and receipts.

Its API is **private**, carried through a user-owned Unix socket. The catalog's `auth: public` means there is no human-cookie or agent-bearer requirement inside that private transport; it does not describe Internet-public access.

Node, C# and Rust implement the same controller contract. A native controller still requires Node for the shared agent-tool client. Default generated fleet attachment selects Node fleetd regardless of the server implementation.

- [Complete private fleetd API](/docs/api/fleetd/)
- [fleet command interface](/docs/fleet/commands/)
- [History-preserving stop and resume](/docs/fleet/sessions/)
