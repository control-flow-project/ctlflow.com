---
title: "Controller operations"
description: "Start the controller, manage sleeping agents and recover after a restart."
weight: 10
sourceProject: "ctlflow"
sourcePath: "services/fleetd/docs/operations.md"
---

The operator can start the controller through fleet or run the installed daemon
directly. Choose one of these alternatives, with the same private controller
root; do not start both against that root:

```sh
fleet daemon start --name workstation --root /absolute/private/controller
fleetd --name workstation --root /absolute/private/controller
```

The controller root contains its descriptor, registry and Unix socket.
No public controller port or boot service is installed.
Closing the CLI/SSH connection does not cancel accepted operations.

## Private API and locks

Local and SSH clients use the same private HTTP resources:
status/setup/diagnostics, fleet registration, instance configuration, readiness,
delivery/messages, contexts/attachment and idempotent operations.
Unknown routes, methods, fields and duplicated queries are rejected.
Pagination is canonical positive decimal, page up to 100000, size up to 100.

Every endpoint requires the persistent key in the OS-native `ctlflow/fleetd.json`.
fleetd initializes it; fleet reads that same private file and sends the bearer
header. Inspection does not start the daemon or create a key. All controller
roots under the same OS user share that authority.

- [Authentication paths and recovery](/docs/fleetd/authentication/)
- [Read-only diagnostics](/docs/fleetd/diagnostics/)

Exclusive SQLite locks prevent concurrent controllers, fleet writers and receivers.
They survive process suspension and release on exit. Do not delete lock inodes
or substitute an expiring PID lease. Directories must be private, owned and
canonical, with no symlink traversal.
An unavailable socket does not prove the previous daemon released its root.
The CLI observes the same ownership lock, with a finite cancellable deadline,
before starting a replacement. Unsafe-state/authentication errors are not treated
as an absent controller.

UUID operation IDs and revisions reject conflicting reuse.
Per-instance outcomes distinguish approval, running, succeeded and failed.
Accepted work continues if its CLI disconnects.
Native processes are not created inside management database transactions.

## Sleep and work budgets

fleetd embeds the shared listener; no listener subprocess is required.
Per-agent credentials, cursors, permissions and receipts remain independent.
With every native history asleep, one fleetd application process remains.

Ordinary acquisition has sixteen permits, publication eight and native startup
four. Queues are bounded to 10000 and abortable.
Idle long polls do not occupy ordinary permits.
Accepted mentions preempt ordinary collection; unavailable immediate cold-start
capacity fails visibly without consuming unread input.

crossfire's idle policy defaults to 1800 seconds; zero disables sleep.
Every opened/initializing/retained history must be confirmed idle.
Pending input, decisions, receipts, cleanup or unknown activity prevents sleep.
Eligible room/DM/scheduled/fleet input resumes the exact retained history.
Metadata and attachment GETs never wake engines.

## Stop and restart

`desired-intent.json` records activation before startup and removes it before
explicit Stop. Normal controller shutdown preserves intent.
`resume-selections.json` retains the exact enabled selection saved by Fleet Stop.
Repeated Stop does not erase it; an empty selection resumes nobody.

After reboot, start the same controller root. Desired bindings restore with
bounded concurrency, current provider login and exact histories.
Manually stopped targets remain stopped. No filesystem discovery or native
conversation import is performed.

`resume-work.json` retains working/waiting contexts and exact continuation
receipts. On resume, older publication settles first. The next continuation asks
the agent to reread current AGENTS.md and inspect completed effects before
continuing. Idle contexts receive no synthetic task.

## Failure and recovery

Transient native/listener failures close their exact generation before retry,
with one-to-sixty-second exponential backoff. Permanent configuration,
authorization, filesystem or protocol conflicts require action.
Explicit Stop cancels recovery. Unconfirmed cleanup blocks replacement.

Controller lease loss closes local delivery immediately when detected; request
deadlines bound undetected loss. Old reporting failures cannot cancel a new run.
A stop result records the agent, process, controller generation and credential
that performed it.

crossfire owns durable incident notification to the member's private crossfire DM.
Intentional Stop, ordinary idle and decision waits are not crashes.
A dead controller cannot report itself; server contact monitoring reports unknown
execution, not a proven process exit.

## Abrupt controller death

Every implementation guards its owned native engine group against controller
death, including SIGKILL. Node observes its private parent IPC connection, C# an
exact parent process handle and Rust an exact parent pidfd. Each guard retains
the private native-group lock while stopping its owned group. A replacement
cannot bypass an existing writer lock. Tools that escape the owned group are
outside this protection.
No implementation uses process-name scanning, orphan adoption or copied history.

A full host restart removes old processes, but retained bindings still require
successful native resume and available provider/native services.
This is not a guarantee of arbitrary subprocess containment or exactly-once
external actions.

## Update and retention

Use explicit installed-release update through fleet, then restart the controller.
Only prior desired-active targets resume. Changed instructions use native
receipt-confirmed publication; software is not downloaded during recovery.

Optional private `config.json` contains `loggingRetentionDays`, default seven.
Completed operation/diagnostic history expires by age; pending/unacknowledged
work, credentials, histories and stop selections remain protected.

- [Storage and conversions](/docs/fleetd/storage/)
- [Logging policy](https://github.com/control-flow-project/ctlflow/blob/main/services/crossfire/docs/logging.md)
- [Fleet session controls](https://github.com/control-flow-project/ctlflow/blob/main/services/fleet/docs/sessions.md)
