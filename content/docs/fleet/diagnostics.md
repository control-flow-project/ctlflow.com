---
title: "Diagnostic reports"
description: "Inspect controller, fleet and agent state without waking or repairing it."
weight: 35
sourceProject: "ctlflow"
sourcePath: "services/fleet/docs/diagnostics.md"
---

The operator runs these commands in a terminal using the same authenticated
local or SSH profile as other fleet commands:

```sh
fleet --root /absolute/private/controller diagnose
fleet --root /absolute/private/controller diagnose research
fleet --root /absolute/private/controller agent diagnose research analyst-west
fleet --remote office diagnose research
```

A fleet key or UUID selects a registered fleet; agent scope also requires its
immutable instance key. Node, managed C#, NativeAOT C# and Rust expose the same
report. No model turn is submitted.

## Findings

Stdout contains one JSON report with a start timestamp and checks. Every check
has a stable ID, scope, observation timestamp, explanation and optional action.
Its status is `pass`, `fail`, `unknown` or `not-applicable`. Null observation time
means none is available. A failed check or invalid scope produces exit code 1;
unknown observations remain explicit and do not certify readiness.

Controller checks cover authenticated access, shutdown and logging. Fleet checks
cover configuration, connection and confirmed delivery intent. Agent checks
cover activation, listener/native observations, provider metadata, pending input
and owner decisions. A retained history binding is not a fresh audit of every
native file. A connection observation is not a new messaging-backend health probe.

Working, sleeping, deliberately stopped, paused and waiting for an owner decision
are distinct states, not automatic crash reports. Pending input is not resubmitted
or acknowledged. Open the owner DM for an actual pending decision.

## Bounds and side effects

fleetd allows 20 seconds, four concurrent native probes and five seconds per probe.
The CLI allows 30 seconds for transport and inspection. Unavailable or timed-out
observations are unknown, never successful checks.

Provider inspection uses existing owned native connections only. Codex calls
`account/read` with `refreshToken: false`; Pi reads selected/available model
metadata. Neither proves a successful inference. Sleeping or stopped engines are
not awakened to inspect credentials.

An unreachable controller yields a partial report. Diagnosis does not initialize
configuration, read daemon files as alternate authority, trust a new SSH host,
start fleetd, resume agents, refresh credentials or change histories.
`fleet test FLEET` remains a separate fail-fast readiness assertion.

- [Controller diagnostic API](/docs/fleetd/diagnostics/)
- [Operations and updates](/docs/fleet/updates/)
