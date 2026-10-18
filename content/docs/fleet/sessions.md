---
title: "Stop, resume and reset"
description: "Stop or resume agents, refresh provider login and start a new history."
weight: 40
sourceProject: "ctlflow"
sourcePath: "services/fleet/docs/sessions.md"
---

## Session controls

| Control | Effect |
| --- | --- |
| Stop sessions | Saves enabled selection, removes desired activation, closes listeners/native engines |
| Resume sessions | Restores saved selection and exact histories |
| Pause delivery | Stops new input; retains controller/native sessions and unread state |
| Idle sleep | Stops idle native engines; listener remains ready for eligible input |
| Fresh history | Explicit controller reset after verified history/config export |
| Account suspension | Removes account authority; not a native process receipt |
| Fleet archive/agent retirement | Decommissions operational authority after settled stop evidence |

Fleet Stop remembers exactly which instances were enabled. Resume restores that
selection plus currently enabled instances, not every enrolled account.
Repeated Stop retains the original selection; an empty selection resumes nobody.
Per-agent Stop removes that instance from the saved selection.

## Default resume

UI and CLI ordinary start resumes full saved history with the same identity and
configured native parameters. Current provider authentication is recopied on
activation. Unread positions and pending receipts are retained.

When unfinished-work evidence exists, the adapter first settles older input.
It then sends a restart reminder to reread AGENTS.md, inspect prior effects and
continue unfinished authorized work.
Idle/sleeping contexts receive no dummy task.

The native process does not resurrect an old operating-system command or active
turn. Uncertain earlier delivery is explicitly supplied as restart context, not
reported as a receipt from the previous process.

For example, the theatre fleet can stop and resume only its budget analyst:

```sh
./node_modules/.bin/fleet agent stop fleet-street budget-analyst
./node_modules/.bin/fleet agent start fleet-street budget-analyst
```

Those commands reuse the saved context; they do not start over. Its
{{< fleet-street-link path="docs/operations.md" label="operations guide" >}}
explains preserving `.local/fleet/`, editing stopped working instructions and
distinguishing idle sleep from an explicit stop.

## Fresh history

Management requires explicit confirmation. In the terminal, choose one of the
following commands: reset the entire fleet or reset only the named agent. These
are alternatives, not two steps to run in sequence:

```sh
fleet start research --fresh-history
fleet agent start research analyst-east --fresh-history
```

Only fleetd performs reset. It stops selected execution, verifies available
authorized Matrix history and nonsecret configuration exports, archives old
bindings/checkpoints and starts fresh contexts with the same identity/settings.
Interrupted phases retain their operation identity. Failed exports cannot replace
a context. Chats, media, credentials and archived histories are not erased.

## Native activity and attachment

The operator can inspect the fleet and the agent's retained histories with these
read-only commands. They do not assign the agent a new task:

```sh
fleet show research
fleet agent contexts research analyst-east
fleet agent attach research analyst-east
```

Working, waiting, idle, sleeping, stopped and unknown are different states.
A heartbeat is not evidence of progress. Context listing is read-only.
Attach returns the exact running native command; it does not create another
engine or history. Pi live attachment is unsupported.

## Host/controller restart

Start the original controller root after reboot. Durable desired intent restores
enabled bindings; explicit stopped selections remain stopped.
No boot service is installed automatically.

Every implementation binds its owned native engine group to the controller
lifetime through a packaged guard. Private native-group/history locks prevent
competing ownership during cleanup. Failed cleanup blocks replacement; never
bypass a retained lock. Tools that escape the group are outside this protection.
Retained data alone does not guarantee a provider/native service is available.

- [Controller operations](https://github.com/control-flow-project/ctlflow/blob/main/services/fleetd/docs/operations.md)
- [History and uncertainty](https://github.com/control-flow-project/ctlflow/blob/main/services/crossfire/docs/history.md)
