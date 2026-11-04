---
title: "Set up an agent fleet"
description: "Set up one or more agents using the guide from your management website."
weight: 10
sourceProject: "ctlflow"
sourcePath: "services/fleet/docs/getting-started.md"
---

## From management

Open crossfire's Set up an agent page. Paste the personalized guide into an agent
with shell access on your machine. Install the matching native distribution in
private user-owned storage first. Retain its sibling fleet/fleetd directories
and put fleet on PATH. The personalized guide pins the exact instance release
and runs noninteractive setup:

```sh
fleet setup --descriptor 'https://example.test/onboarding/setup.json?ownerBackendUserId=%40member%3Aexample.test'
```

Use the actual personalized URL, not this example.
Setup validates the exact owner, origin and installed release. It creates/reuses
a private controller and a project-derived one-agent fleet, displays the exact
approval code/URL, waits for owner approval in ordinary code, then checks readiness.
Setup asks no configuration questions and makes no model call.

The agent running setup keeps its own process, history and permissions.
fleetd creates a separate managed session. Existing approved identity/history
is reused on repeated setup; an explicitly stopped binding stays stopped.
Run setup on the computer where agents will execute, not in the crossfire
container. Docker hosts the server side only. No credential mount, fleet
container or login copy into Docker is part of this workflow.

- [Local Docker server and host-native fleet](/docs/ctlflow/local-docker/)

## Prerequisites

NativeAOT is the default; Rust and managed C# are explicit distribution choices.
Current verified native distributions target Linux x64. Native fleet selects
its sibling controller, with no substitution from PATH. NativeAOT and Rust
require no installed SDK or managed runtime.

fleetd initializes the OS-user authentication key before setup calls its API.
fleet reads the same private configuration; no key entry or configuration
question is required. See [controller authentication](/docs/fleetd/authentication/).

- [Installation and packaging by target](https://github.com/control-flow-project/ctlflow/blob/main/docs/distributions/README.md)

The host must already have Git, Bash, the native ctlflow distribution, the
selected harness and its provider login. Messaging tools and Pi retain their own
Node.js requirements. Setup never installs or upgrades Codex/Pi.
Codex is the default. Pi requires an explicit ordinary roster and verified native
1.0.0. Setup reports missing prerequisites; it does not silently upgrade a runtime,
copy the current conversation or weaken native permissions.
Missing software or login stops setup with an actionable error. The user
installs the prerequisite or signs in through the native harness, then repeats
setup. The browser cannot install software on that computer.

## Optional configuration

For a custom roster, first create the fleet's `runtime.toml` and role files as
described in [fleet configuration](/docs/fleet/configuration/). The setup agent
then passes that existing file to `--config`; setup does not generate it from
the filename in this command:

```sh
fleet setup --descriptor 'https://example.test/onboarding/setup.json?ownerBackendUserId=%40member%3Aexample.test' \
  --root /absolute/private/controller \
  --config /absolute/private/fleet/runtime.toml
```

The configuration must match the descriptor's server and owner.
Unknown fields, duplicate names and unavailable model/effort combinations fail.
Role definitions, skills and workareas follow the normal fleet loader.

For a complete example, [clone fleet-street](/docs/examples/fleet-street/#set-up-the-example)
and run the following from that repository's root. Its configure tool reads the
included public templates and creates a private ten-agent fleet; the person
does not have to write all ten role files:

```sh
python3 -m tools.fleet_street configure \
  --server https://chat.example.org \
  --owner '@alice:chat.example.org' --prefix alice-fs
fleet setup --descriptor "$PERSONALIZED_SETUP_URL" \
  --config "$(pwd)/.local/fleet/runtime.toml"
```

Run these in the example directory after installing its matching tools. Replace
the placeholder server and owner. Configure prepares the files; setup then
shows the roster for you to approve in crossfire. See the
{{< fleet-street-link path="README.md" label="setup and prerequisites" >}}.

## After approval

1. Inspect `fleet list`, `fleet show FLEET` and `fleet agent list FLEET`.
2. Run `fleet test FLEET` for model-free readiness.
3. Create ordinary rooms in Element and grant only needed participation.
4. Configure wake senders independently of room membership.
5. Send an actual authorized task through the room, DM or explicit fleet message.

Enrollment creates no chats. A protected owner DM is created on first contact,
terminal output or a question.
Closing the CLI does not stop the controller.

- [Configuration](/docs/fleet/configuration/)
- [Commands](/docs/fleet/commands/)
- [Sessions and restart](/docs/fleet/sessions/)
