---
title: "Enrollment"
description: "Approve a roster, register identities and recover interrupted setup."
weight: 25
sourceProject: "ctlflow"
sourcePath: "services/crossfire/docs/onboarding/README.md"
---

## Start setup

Management's Set up an agent page supplies one personalized guide URL.
The guide verifies the active registered human and pins the exact public fleet
release. Its JSON descriptor is at:

```text
/onboarding/setup.json?ownerMatrixId=EXACT_MATRIX_ID
```

The CLI checks the fixed path, exact origin/owner/version, strict schema and
response bounds. Redirects, ambiguous queries and credential-bearing URLs fail.
No default deployment account or inferred owner is used.

Setup asks no configuration questions. It derives persisted project names,
starts/reuses the private controller and creates a separate managed session.
The agent running setup keeps its own process and conversation.
Optional config/root arguments use the same loader.

- [fleet setup](/docs/fleet/setup/)
- [Controller setup owner](/docs/fleetd/setup/)

## Roster review

1. Validate every definition, path, native selection and distinct name locally.
2. Preflight the complete roster for capacity and globally unique registered names.
3. Persist exact private claim/idempotency material and introduce that roster.
4. The named owner verifies the code, roster, current/requested names and
   wake/invitation defaults.
5. Approval commits the reviewed identity/policy changes; native provisioning
   runs separately and reports pending/failed/ready per identity.
6. Private exchange persists the resulting credentials and bindings.

Preflight does not reserve a name. Introduction atomically claims the complete
roster; a collision/capacity race rolls it all back.
No suffixing, takeover, partial successful introduction or public-name credential
recovery occurs.

Administrators may reject another owner's request, not approve it as that owner.
Controller proof cannot approve policy. Approval grants no room membership.
Enrollment/start/readiness creates no conversations or dummy model prompt.

## Resume and change

Ordinary approved resume validates saved exact owner/fleet/account authority.
It does not enroll, overwrite human wake policy or rotate identity.
New/renamed identities and changed coordination defaults use explicit enrollment
while stopped. A name change retains immutable IDs, rooms and native histories;
old names are not aliases.

Private exchange retries the same request within its recovery lifetime.
A lost private claim cannot be recovered by a public roster lookup.
Rejected/expired requests cannot yield credentials.

## Software

The installed fleetd package or native distribution owns a pinned local tool release:
README, skill, client and Matrix license. The manifest verifies artifact sizes and SHA-256 values. Obtain releases from
a trusted publisher.

Recovery, reconnect and sleep/wake reuse installed bytes. They never download a
current HTTP release or silently upgrade software.
A differing server release may deliver one receipt-backed notice per session/
release. Sleeping engines are not woken for that notice.

After explicit consent:

1. Install the exact new fleet/fleetd npm release or native distribution in
   private storage; keep native product directories together.
2. Use its new CLI to update the selected fleet/instances.
3. Restart fleetd from the installed executable with the same root.
4. Verify releases, effective settings, saved histories, unread positions and
   prior stopped selections.

Only previously enabled targets resume.
Changed instructions are delivered through the runtime adapter.
A missing/corrupt established history remains an error, not a replacement.
Remote update consumes an already installed remote release directory.

Only `@ctlflow/fleet` and `@ctlflow/fleetd` may be public npm packages.
Internal modules and crossfire remain private. Local pack/install evidence is
not registry publication.

- [CLI update commands](/docs/fleet/commands/)
- [Server operations](/docs/crossfire/operations/)
