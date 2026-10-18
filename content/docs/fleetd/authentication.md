---
title: "Controller authentication"
description: "The shared private configuration used by fleet and fleetd, locally and over SSH."
weight: 20
sourceProject: "ctlflow"
sourcePath: "services/fleetd/docs/authentication.md"
---

Every fleetd HTTP operation requires exactly one
`Authorization: Bearer <authenticationKey>` header, including status and inspection.
Missing, incorrect, duplicate or malformed credentials return 401. Browser Origin
and Cookie headers, even empty ones, and a Host other than `localhost` return 403.
The API remains on a private Unix socket; authentication adds no TCP endpoint.

## One configuration per OS user

| Host | Configuration file |
| --- | --- |
| Linux | `$XDG_CONFIG_HOME/ctlflow/fleetd.json`, or `$HOME/.config/ctlflow/fleetd.json` when XDG_CONFIG_HOME is unset |
| macOS | `$HOME/Library/Application Support/ctlflow/fleetd.json`; XDG_CONFIG_HOME is ignored |

Paths must be absolute and normalized. An empty or relative Linux
XDG_CONFIG_HOME is an error. The directory must be private, owned and free of
symlink traversal. The file must be private, owned, regular and single-link.
New directory/file modes are 0700/0600. Unsafe existing state is rejected, not
silently repaired or replaced.

On its first normal start, fleetd creates this file and generates a random
256-bit key represented by 64 lowercase hexadecimal characters. Initialization
is atomic and serialized across controllers. Restarts preserve the key.

The following is a minimal existing `ctlflow/fleetd.json` configuration, not an
API request. If this file exists without a key, fleetd adds the generated key
on startup. Normal setup creates the file for you; you do not need to create it
or paste this JSON anywhere:

```json
{"schemaVersion": 1}
```

The initialized object contains only `schemaVersion: 1` and `authenticationKey`.
Malformed JSON, unknown or duplicate fields, invalid keys and files over 4096
bytes fail without overwriting the original. Do not print the completed file,
paste its key into an agent prompt, commit it or copy it into a fleet roster.

All controller roots under this OS user share the key. Anyone able to read it
is trusted with full controller authority. It does not isolate fleets or
applications running as that user. crossfire's enrollment credentials remain
separate.

## Local and remote clients

fleet reads this exact file for local requests. It never creates or replaces a
key. Inspection commands do not start a controller or initialize configuration.
`fleet setup` and controller start may launch fleetd, which initializes its key
before accepting requests. Installing the packages starts no process.

For SSH commands, fleet reads the **remote** user's configuration through
strict-host-key SSH, validates its ownership, permissions and bounded contents,
then holds the key in memory while forwarding the same API. It does not use
the local key, store a remote copy or put credentials in command arguments,
connection profiles or error messages. The noninteractive SSH environment must
select the same HOME/XDG_CONFIG_HOME as the remote controller. A missing remote
configuration is an error; start fleetd on that host first.

Node controllers support Linux and macOS. Current C#/Rust native distributions
and filesystem adapters are verified on Linux x64 only. Matching macOS path
rules do not establish native macOS runtime support. Windows is not supported.
Management-generated setup continues to use pinned npm fleet and Node fleetd,
regardless of the crossfire server implementation.

## Upgrade and recovery

Back up this private file alongside controller roots, fleet state, credentials
and native histories. Keep its location and environment unchanged on restart.
Moving a controller root does not move or regenerate its key.

When upgrading from a release without controller authentication, stop the old
daemon with its matching old CLI. Install coordinated new fleet/fleetd and
start the original controller root. If an old socket remains and this OS user
has no authentication configuration, run `fleetd --root /absolute/controller/root`
directly for the first start. fleetd generates the key and checks exclusive
ownership before replacing a stale socket. The new fleet CLI correctly refuses
an endpoint without its required key. Do not delete the socket or bypass
authentication. The new CLI cannot control an old anonymous daemon; there is
no compatibility path.

For rotation, stop every controller sharing the key. Update the private file,
or remove only `authenticationKey` and let the next start initialize it. Restart
the controllers and reconnect remote clients. Do not rotate under live
controllers or delete controller/native state to fix authentication failures.
Restore a verified key backup when that is the intended recovery.

- [Controller operation](/docs/fleetd/operations/)
- [Private state and histories](/docs/fleetd/storage/)
- [SSH control](/docs/fleet/remote/)
- [Private API reference](/docs/api/fleetd/)
