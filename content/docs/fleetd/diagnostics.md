---
title: "Diagnostic API"
description: "Authenticated, bounded projection of controller and native observations."
weight: 15
sourceProject: "ctlflow"
sourcePath: "services/fleetd/docs/diagnostics.md"
---

`GET /api/diagnostics` uses the private controller socket and mandatory OS-user
credential. Optional `fleetId` and `instanceKey` select an existing fleet or agent;
an instance requires its fleet. Unknown or duplicate fields and missing targets
fail validation. There is no anonymous or browser exception.

The response uses the ordinary controller envelope. Its data contains `checkedAt`,
a scope and an array of checks. Each check supplies `id`, scope, status,
`observedAt`, a safe message and optional remediation. Status is `pass`, `fail`,
`unknown` or `not-applicable`; missing observation times remain null. The start
time does not imply every observation is fresh.

## Ownership

fleet owns transport and presentation. fleetd projects registry, activation,
connection and native-lifecycle observations. The existing crossfire connection
supplies connection and delivery state; there is no added server collector,
database, scheduler or background diagnostic process. Runtime adapters own
provider-specific inspection through the same runtime ports.

The operation is limited to 20 seconds, four concurrent native probes and five
seconds per probe. Existing native frames complete atomically rather than being
truncated. Timeout and unavailable data stay unknown. Reports are not persisted
by the controller; callers may retain the bounded JSON output.

Diagnostics neither wake engines nor perform recovery, credential refresh,
history replacement or model work. All supported implementations use the same
contract and assertion bank.

- [Generated API contract](/docs/api/fleetd/diagnostics/)
- [CLI use and interpretation](/docs/fleet/diagnostics/)
