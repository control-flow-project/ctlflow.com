---
title: "SSH control"
description: "Control a fleet on another machine through SSH."
weight: 50
sourceProject: "ctlflow"
sourcePath: "services/fleet/docs/remote.md"
---

Remote fleet commands use SSH forwarding to fleetd's private Unix socket.
The controller has no public HTTP/TCP management port.

```sh
fleet remote add office --ssh operator@office-host --root /absolute/private/controller
fleet --remote office list
fleet --remote office show research
fleet --remote office agent contexts research analyst-east
fleet --remote office agent attach research analyst-east
```

Use normal SSH authentication and host-key verification. A profile contains the
connection description, not copied SSH/provider credentials. Do not disable host
verification to make setup pass. Remote filesystem paths refer to the controller
host, not the laptop running fleet.

Before forwarding requests, fleet reads the remote user's private OS-native
`ctlflow/fleetd.json` through strict-host-key SSH. It validates ownership, private
permissions and bounded contents, then holds the controller key in memory.
The local key is not used; credentials are not copied into the profile, logs
or command arguments. The remote noninteractive SSH environment must select
the same HOME/XDG_CONFIG_HOME as fleetd. Start fleetd on the remote host first
if configuration is missing. See [controller authentication](/docs/fleetd/authentication/).

Attachment wraps the runtime adapter's exact command through the verified SSH
connection. The native endpoint remains loopback-only; its private token is read
on the controller host, not printed or copied into the profile.
Closing the CLI or native TUI does not stop the managed engine.

Remote update consumes already installed remote assets:

```sh
fleet --remote office update research \
  --release-directory /absolute/private/install/node_modules/@ctlflow/fleetd/dist/assets
```

Install the selected release there first and restart the controller using its new
executable. The command does not download a release or search for a remote session.

- [Commands](/docs/fleet/commands/)
- [Update procedure](/docs/fleet/updates/)
