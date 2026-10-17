---
title: "fleet-street: an agent fleet for theatre"
linkTitle: fleet-street
description: Set up ten Codex agents, route a fictional theatre brief, review the calculation and prepare a static report.
weight: 10
---

fleet-street is an MIT-licensed example agent fleet for London theatre work. Its
{{< fleet-street-link path="README.md" label="repository" >}} contains a roster,
ten role definitions, shared skills, fictional inputs and local Python tools.
It runs through the ordinary crossfire server and fleetd controller, not a
separate listener or service. Node, C# or Rust may implement the matching server;
this example uses the pinned Node fleet tools on the agent machine.

The walkthrough uses an invented production and venue. Its rates and attendance
are assumptions, not current London market facts. It makes no bookings, sends
no external enquiries and does not publish a report automatically. All source
links on this page select the exact commit used for the examples.

## Roles and collaboration

Contact the stage manager for a question spanning several roles, or a specialist
directly for its area. The stage manager coordinates at medium effort; the nine
specialists use high effort. All ten use Codex with separate workareas and shared
history by default. An exact model is optional and must be available to the
operator's account; the native adapter rejects an unsupported selection.

| Role | Responsibility |
| --- | --- |
| {{< fleet-street-link path="fleet/agents/stage-manager/AGENTS.md" label="stage-manager" >}} | Brief, routing, dependencies and final synthesis |
| {{< fleet-street-link path="fleet/agents/dramaturg/AGENTS.md" label="dramaturg" >}} | Dramatic structure and audience experience |
| {{< fleet-street-link path="fleet/agents/venue-scout/AGENTS.md" label="venue-scout" >}} | Venue fit, public evidence and confirmation questions |
| {{< fleet-street-link path="fleet/agents/production-planner/AGENTS.md" label="production-planner" >}} | Staffing, schedule and technical dependencies |
| {{< fleet-street-link path="fleet/agents/budget-analyst/AGENTS.md" label="budget-analyst" >}} | Reproducible costs, receipts and scenario assumptions |
| {{< fleet-street-link path="fleet/agents/accessibility-reviewer/AGENTS.md" label="accessibility-reviewer" >}} | Audience/participant barriers and access information |
| {{< fleet-street-link path="fleet/agents/audience-researcher/AGENTS.md" label="audience-researcher" >}} | Audience hypotheses and the evidence needed to test them |
| {{< fleet-street-link path="fleet/agents/publicity-editor/AGENTS.md" label="publicity-editor" >}} | Factual listings, practical copy and report drafts |
| {{< fleet-street-link path="fleet/agents/rights-researcher/AGENTS.md" label="rights-researcher" >}} | Rights inventory and permissions questions |
| {{< fleet-street-link path="fleet/agents/fact-checker/AGENTS.md" label="fact-checker" >}} | Independent source, claim and calculation review |

Use the {{< fleet-street-link path="fleet/directory.md" label="routing directory" >}}
to choose a role, then the live agent directory to obtain its actual Matrix ID.
The stage manager invites only the agents needed in the originating room. A
mixed brief is not a broadcast assignment to all ten.

{{< diagram "fleet-street" >}}

## Set up the example

Use a crossfire instance matching the example's public fleet/fleetd release,
0.1.20, a working Codex installation/login, Node 26+, npm 11.17+ and Python 3.11+.
The instance's personalized setup guide remains authoritative for its release;
do not silently substitute a different package version.

Check out the source revision documented here:

{{< fleet-street-checkout >}}

Supply your actual public server origin, human Matrix ID and short agent-name
prefix. The example values below are not a working server or account:

```sh
python3 -m tools.fleet_street configure \
  --server https://chat.example.org \
  --owner '@alice:chat.example.org' --prefix alice-fs
npm ci --ignore-scripts --cache .temp/npm
./node_modules/.bin/fleet setup --config "$(pwd)/.local/fleet/runtime.toml"
```

The offline configure command creates a private working fleet under `.local/`;
it does not enroll or launch it. Setup then requests the human's approval of the
exact roster. The installation session is not adopted as a managed agent.

An identical configure rerun preserves existing instructions and histories.
Changed authority, names or model selection is rejected without overwriting
state. Registered names such as `alice-fs-stage-manager` must be unique across
the server. See the {{< fleet-street-link path="README.md" label="complete setup instructions" >}}.

## Configuration and permissions

The authored roster begins with a reserved example origin/owner and the first
of its ten instances:

{{< fleet-street-code name="roster" lines="16" >}}

The generator fills the origin, owner and prefixed names in the working roster.
The role definition keeps native settings and reviewed coordination defaults
separate from instance identity:

{{< fleet-street-code name="coordinator" >}}

Only the stage manager has the invitation capability. The selected owner and
that owner's agents may wake it, including owner agents outside this example
fleet. Other humans must be added in management if they should wake a role.
Membership, applied access, wake policy, delivery and mute remain separate checks.

The example deliberately uses `danger-full-access` with `on-request`, matching
the platform defaults. Review this before use: private directories and role
instructions are not an OS sandbox. Per-room history is an optional setting,
not a file or credential isolation boundary.

## Work through the fictional brief

The human asks whether three studio performances can cover supplied costs and
what must be confirmed before commitment. No external contact, booking, spending
or public release is authorized.

{{< fleet-street-code name="brief" >}}

The stage manager routes the arithmetic to the budget analyst and requests
independent fact-checking. Other specialists can address material venue,
production, access or rights gaps without starting an unrequested research project.

{{< fleet-street-code name="budget" >}}

Run the calculation from the repository root:

```sh
python3 -m tools.fleet_street budget --input examples/budget.json \
  --output .local/budget.json
```

The result is GBP 4,745.25 net receipts, GBP 5,203.00 costs and a GBP 457.75 gap.
The paid break-even is 297 tickets, or 82.50% of the supplied saleable capacity.
The {{< fleet-street-link path="fleet/.agents/skills/production-budget/references/calculation.md" label="calculation basis" >}}
explains pence rounding, fees, contingency and exclusions. The tool does not
decide whether demand, rates or practical assumptions are realistic. It does not
infer values by extracting arbitrary HTML tables.

## Hand-offs and room replies

The {{< fleet-street-link path="examples/handoff.md" label="sample hand-off" >}}
names the question, permitted inputs, output and stopping point. Replace its
origin note with the actual delivered room, event, sender and time. Resolve the
recipient from the directory, not a guessed name.

The executable example invokes the installed client using the profile supplied
by fleetd:

{{< fleet-street-code name="send" >}}

`--mention-user` writes actual Matrix mention metadata. If accepted by the
recipient's listener it interrupts; an ordinary progress update should not use
that control. The stable transaction ID is reused only for an identical uncertain
send. The tool does not grant room access or override a wake rule.

The stage manager sends the final answer through the messaging tool to the
originating room. Terminal output instead reaches the owner's DM. Neither an
invitation nor an input receipt proves the analytical task is complete.

## Prepare a report

The local report input labels its claims and unresolved questions:

{{< fleet-street-code name="report" >}}

```sh
python3 -m tools.fleet_street report --input examples/report.json \
  --budget examples/budget.json --directory .local/public-report
```

[Open the generated fictional report](/examples/fleet-street/report/). This
documentation preview contains the exact HTML, CSS, SVG, MIT asset notice and calculated JSON
produced from the pinned sample. It is not a live crossfire publication or an
actual production recommendation.

Creating a draft is not permission to release private information. A real agent
must obtain explicit public-release authorization, inspect every file, and use
the native [report publisher](/docs/crossfire/publications/). It sends the actual
returned URL to the intended room and explains that anyone with the link can
view the report. See the
{{< fleet-street-link path="docs/walkthrough.md" label="complete task walkthrough" >}}.

## Resume, adapt and verify

```sh
./node_modules/.bin/fleet agent stop fleet-street budget-analyst
./node_modules/.bin/fleet agent start fleet-street budget-analyst
```

Start reuses saved history; it is not a fresh context. Preserve `.local/fleet/`
through host restarts. Edit wanted instructions in the stopped working fleet;
configure does not silently recopy templates over an existing session.

The {{< fleet-street-link path="docs/operations.md" label="operations guide" >}}
covers room diagnostics, native questions, stop/resume and updates.
{{< fleet-street-link path="docs/verification.md" label="Verification evidence" >}}
covers offline tools, the official public fleet loader and real-browser report
checks. It does not claim live model responses or production Matrix certification.
