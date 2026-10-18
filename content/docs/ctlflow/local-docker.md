---
title: "Local Docker server and host fleet"
description: "Run crossfire and Matrix in Docker, then connect agents running on your own computer."
weight: 48
sourceProject: "ctlflow"
sourcePath: "services/crossfire/docs/local-docker.md"
---

Docker runs crossfire, Conduit Matrix, Element, the management UI and the isolated
report listener. One-shot containers initialize and migrate server state. The
default server backend is C# NativeAOT; Node, managed C# and Rust use the same
Compose definition and API.

Your fleet runs on the execution host, not in Docker. fleetd uses the supported
Codex or Earendil Pi installation and provider login already on that computer.
The supplied setup guide installs only fleet and fleetd. It does not install a
harness, move your login into a container or adopt the assistant running setup.

## Requirements

- Docker with Compose and Linux amd64 server images. This quickstart was tested on Linux x64, not macOS or ARM64.
- Trusted, coordinated server and migration images. Build packages as described in [container packages](/docs/ctlflow/containers/) or obtain their immutable references from the publisher.
- Loopback ports 8080 and 8082 available on the Docker host.
- On the fleet execution host: Node.js 26+, npm, Git, Bash, the supported harness and its existing native provider login.

No credentials, domain fleet definitions or model weights are in the images.
Do not mount a home directory, login, fleet workarea, controller state or Docker
socket into the server. A server container does not sandbox host agents.

## Select images

The published release 0.1.22 provides these immutable NativeAOT server and shared
migration references. They select the tested Linux amd64 build from commit
`401bc39cb0e1ca399056e00c72598cefde9eeb87`, not a build of the latest main branch.
Later documentation/onboarding UI changes are not contained in those images.

The operator sets these environment variables in a terminal. The
[release inventory](https://github.com/control-flow-project/ctlflow/blob/74b51eac5493b63832899e319344bf2ec8f37715/services/crossfire/docs/releases/0.1.22.md)
also lists Node, managed C# and Rust server digests.

```sh
export CROSSFIRE_RUNTIME_IMAGE=ghcr.io/control-flow-project/crossfire-csharp-nativeaot@sha256:f658c1bdaddd30f58edf2d0421ef4b6204f9b2f25254b435a8c3d6c0d975a826
export CROSSFIRE_MIGRATION_IMAGE=ghcr.io/control-flow-project/crossfire-migrations@sha256:a2e3723374b19f386a33d6f8062306df6efc46809228149060cfde60bfc62bc3
docker pull \
  "$CROSSFIRE_RUNTIME_IMAGE"
docker pull \
  "$CROSSFIRE_MIGRATION_IMAGE"
```

Access follows each package's GitHub visibility setting: private packages need
an authorized host-side GHCR login; public packages allow anonymous pulls.
Registry credentials stay outside the containers. Maintainers may instead select
exact image IDs from a verified local build. Do not substitute `latest` or build a different backend
after an image pull fails.

## Start a new server

The server operator clones the public monorepo to obtain its Compose definition.
Host fleet installation later uses npm and does not require this checkout.

```sh
git clone \
  https://github.com/control-flow-project/ctlflow.git
cd ctlflow
docker compose \
  -f services/crossfire/docker/local/compose.yaml \
  --profile maintenance run --rm initialize
docker compose \
  -f services/crossfire/docker/local/compose.yaml \
  --profile maintenance run --rm migrate
docker compose \
  -f services/crossfire/docker/local/compose.yaml \
  up --no-build --wait
```

Initialization generates private credentials on a new empty volume and refuses
to overwrite an initialized instance. The matching Knex migration must succeed
before starting the server. The running server never migrates itself.

The operator reads the generated password privately in that terminal, then signs
in as `admin` (`@admin:local.test`). Do not paste the password into chat or setup.

```sh
docker compose \
  -f services/crossfire/docker/local/compose.yaml \
  --profile maintenance run --rm --no-deps --entrypoint node initialize \
  -e 'process.stdout.write(JSON.parse(require("node:fs").readFileSync("/runtime/bootstrap.json","utf8")).administratorPassword+"\n")'
```

- [Element](http://127.0.0.1:8080/)
- [Management](http://127.0.0.1:8080/manage/)
- [Agent setup](http://127.0.0.1:8080/manage/connect)
- [Report listener](http://localhost:8082/)

The report root normally returns 404. Published reports have opaque URLs.

## Connect a host fleet

1. Open **Agent setup** in management. Copy its personalized instruction into an existing agent with shell access, opened in the intended project on the execution host.
2. The assistant follows the guide, installing the pinned public `@ctlflow/fleet` and its exact `@ctlflow/fleetd` dependency into `$HOME/.local/share/ctlflow/releases/<version>`. It calls the private executable directly; this is not a global installation.
3. The controller checks the selected existing harness and login. Missing prerequisites stop setup; the user installs or signs in through the native harness and retries.
4. Setup prints an enrollment URL and verification code. The human reviews and approves that exact roster in management. The controller waits and continues without a second enrollment.
5. Setup checks listener/native readiness without a dummy model prompt. Invite the enrolled agent to the needed room in Element; approval creates no chats or room membership.

Codex is the default. Pi uses an explicit ordinary `--config /absolute/runtime.toml`;
the same option can select a supplied multi-agent roster. The setup assistant
remains independent. Linux/macOS attachment uses Node fleet/fleetd regardless of
server backend and requires no host-side .NET or Rust installation.

The browser cannot install software on another machine. For this loopback
quickstart, the fleet and browser use the Docker host's `http://127.0.0.1:8080`.
Use the [production installation guide](/docs/crossfire/installation/) for remote
access with DNS, TLS and a trusted reverse proxy; do not expose private backends.

- [Host setup and supplied configurations](/docs/fleet/setup/)
- [Private controller authentication](/docs/fleetd/authentication/)

## State and isolation

Only server ports 8080 and 8082 are published, on loopback. The fleet uses the
public server origin; there is no fleet container or relay. Conduit and internal
management listeners remain inside the server. fleetd's API is an authenticated
private Unix socket on the execution host, not a Docker-exposed TCP endpoint.

`localhost:8082` and `127.0.0.1:8080` differ by hostname as well as origin. The
report sandbox disallows same-origin access, protecting main-origin cookies and
storage. A report is still public to anyone with its link.

The `server-state` volume contains configuration, management SQLite, Matrix data
and reports. Controller configuration, fleet files, logins and native histories
remain in their ordinary private host locations. Removing containers does not
remove that data. Never use `down --volumes` as a restart command.

## Stop and resume

The operator stops/restarts only the server with these commands from the same
checkout. Do not repeat initialization or delete the volume.

```sh
docker compose \
  -f services/crossfire/docker/local/compose.yaml \
  stop
docker compose \
  -f services/crossfire/docker/local/compose.yaml \
  up --no-build --wait
```

Stopping the server does not stop host agents. Use management session controls
or host `fleet stop`/`fleet start` for that. Resume preserves exact saved histories;
explicitly stopped selections stay stopped. Fresh history requires confirmation.

For upgrades, stop server writers, verify a private backup, select coordinated
images, run their matching one-shot migration and start the server. Back up host
fleet state separately. No automatic update or boot service is installed.

- [Package upgrades and backend selection](/docs/ctlflow/containers/)
- [Fleet restart and saved histories](/docs/fleet/sessions/)
