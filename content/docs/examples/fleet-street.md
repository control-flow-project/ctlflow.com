---
title: "fleet-street: an agent fleet for theatre"
linkTitle: fleet-street
artwork: theatre
description: Set up ten Codex agents, route a fictional theatre brief, review the calculation and prepare a static report.
weight: 10
---

fleet-street has ten agents for London theatre work. A stage manager assigns
research and calculations to specialists, asks for an independent review, and
returns an answer to the person in the room.

This walkthrough follows a fictional production from its initial brief to a
cost calculation and an HTML report. The supplied prices and attendance figures
are assumptions, not current London market data. No bookings or public release
are part of the task.

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

You need a crossfire account, a working Codex installation and login, Node 26+,
npm 11.17+ and Python 3.11+. The commands below use fleet/fleetd 0.1.20 and require
a matching crossfire server. If your instance uses another release, follow its
personalized setup guide rather than these package versions.

Get the {{< fleet-street-link path="README.md" label="example" >}} to follow along:

```sh
git clone https://github.com/control-flow-project/fleet-street.git
cd fleet-street
```

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

The repository includes `fleet/runtime.toml`, which lists each agent's name,
role and workarea. The following excerpt is the first entry in that existing
file, not another file to create. The configure command copies the template and
replaces the example server, owner and names in `.local/fleet/runtime.toml`:

{{< fleet-street-code name="roster" lines="16" >}}

The repository also includes `fleet/agents/stage-manager/agent.toml`. This is
the role configuration read by fleetd; it sets effort, permissions and wake-up
rules. It is not a message sent to the stage manager:

{{< fleet-street-code name="coordinator" >}}

Only the stage manager has the invitation capability. The selected owner and
that owner's agents may wake it, including owner agents outside this example
fleet. Other humans must be added in management if they should wake a role.
Membership, applied access, wake policy, delivery and mute remain separate checks.

The role uses `danger-full-access` with `on-request`. Review these settings
before starting: the agents have the host user's file access. Separate workareas
and per-room histories do not isolate files or credentials.

## Work through the fictional brief

The person sends an ordinary message in the Matrix room, for example:

> Could three performances at a small London studio cover their costs? Use the
> figures I supplied, flag what still needs confirming, and give me a reviewed
> report. Don't contact anyone, make bookings, spend money or publish it.

The person does not need to write JSON. `examples/brief.json`, shown below, is
already included in the repository: it records that fictional request and its
constraints in a structured file. An agent can write an equivalent working file
from a real conversation when useful; setup does not convert chat into this file.

{{< fleet-street-code name="brief" >}}

The stage manager routes the arithmetic to the budget analyst and requests
independent fact-checking. Other specialists can address material venue,
production, access or rights gaps without starting an unrequested research project.

The next block is the supplied `examples/budget.json` file. Its fictional prices
and attendance assumptions are already filled in for the calculator. In a real
task, the budget analyst prepares this input from the supplied figures. The agent
asks about missing values instead of inventing them. The person need not format
those figures as JSON in the room.

{{< fleet-street-code name="budget" >}}

The analyst passes the saved file to the calculator. To run the supplied example
yourself, use these commands from the repository root. The command reads
`examples/budget.json` and writes the calculated result to `.local/budget.json`:

```sh
python3 -m tools.fleet_street budget --input examples/budget.json \
  --output .local/budget.json
```

The generated result contains GBP 4,745.25 net receipts, GBP 5,203.00 costs and a GBP 457.75 gap.
The paid break-even is 297 tickets, or 82.50% of the supplied saleable capacity.
The {{< fleet-street-link path="fleet/.agents/skills/production-budget/references/calculation.md" label="calculation basis" >}}
explains pence rounding, fees, contingency and exclusions. The analyst still
needs to assess whether the supplied demand, rates and assumptions are realistic.

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

The next block is `examples/report.json`, also supplied in the repository. It
contains the report's wording: summary, findings, open questions and source
references. In a real task the writing agent prepares these fields from the
reviewed analysis. This is input to the report renderer, not a JSON reply the
person must compose.

{{< fleet-street-code name="report" >}}

The report command combines that saved wording with the original
`examples/budget.json` inputs. It recomputes the same arithmetic and writes HTML,
assets and calculated budget data to `.local/public-report`. The earlier
`.local/budget.json` is output to inspect, not input to this renderer. The command
does not write the analysis or authorize publication:

```sh
python3 -m tools.fleet_street report --input examples/report.json \
  --budget examples/budget.json --directory .local/public-report
```

[Open the example report](/examples/fleet-street/report/) to see the cost
calculation, assumptions and unresolved questions together. The report links to
its calculated budget data. Generating these files does not publish them
through crossfire.

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
The {{< fleet-street-link path="docs/verification.md" label="test guide" >}}
explains how to check the configuration, local tools and report before enrolling.
