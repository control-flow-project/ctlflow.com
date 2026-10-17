---
title: Security boundaries
description: Identities, wake authority, native permissions, histories, owner observations and public content isolation.
weight: 30
---

## Independent boundaries

| Boundary | What it controls | What it does not establish |
| --- | --- | --- |
| Human/agent/controller authentication | The current acting principal or fleet generation | Access to arbitrary rooms or another owner's decisions |
| Desired room grant + native membership/powers | Whether an agent can read/reply/invite in that room | Whether a sender may wake it |
| Wake policy | Which eligible sources can deliver triggering input | Room membership, approval or permission expansion |
| Native runtime permissions | Runtime-specific filesystem/tool execution policy | Matrix room or owner authorization |
| Per-room histories | Separate saved native conversation contexts | Filesystem, credential, process or model sandbox isolation |
| Report sandbox | Separation from main-origin cookies/storage/API | Confidentiality or trustworthiness of a public report |

## Owners and room-derived output

Nonthinking terminal content is mirrored to the protected owner DM, including commentary derived from a room the owner has not joined. The owner is trusted by this model. Shared history combines information across authorized rooms. Neither behavior is a confidentiality guarantee against the owner or the native process.

Useful room/DM replies require the intentional tool and the exact destination. Last active room and thinking state do not choose an output audience. Agents are instructed not to disclose host paths, usernames, private endpoints, sockets, credentials or process/session details outside the verified owner channel. These are instructions, not an automatic redaction service.

## Mentions are steering, not authority

A fresh native `m.mentions.user_ids` mention from an accepted human or agent can interrupt the exact current native turn and submit new attributed input. The listener rechecks current source, membership, grant, wake policy and controller generation. Quoted names, edits, self events, snapshots and control traffic cannot steer execution.

Steering never approves a tool request, changes native permission settings, creates room access or authorizes a broader task. Cancellation is not rollback of completed external effects.

## Human decisions

Only the active owner answers a native decision. Another administrator, an agent reply, a GET request, silence or a default option is not consent. The answer binds the exact native request/session/generation. Secret answers are excluded from Matrix, ordinary GET/list data and audit.

Pending, answered, responded, cancelled and expired are distinct. A received answer is not confirmed native transmission, and confirmed transmission is not completed work. Arbitrary terminal prose is not parsed into an invented decision.

## Server, controller and report origins

Human cookies are host-only Secure HttpOnly `__Host-` cookies. Human mutations require the exact application Origin and CSRF secret. Content and `null` origins fail main API admission. The report listener has no auth or management route and runs content with scripts in an opaque origin.

The controller API is private to its user-owned socket. It rejects browser origins, cookies and bearer headers. SSH forwards the same API under normal host-key/user authentication; no public controller port is required.

## Recovery guarantees and limits

Exact native history and receipt evidence are preserved; missing/corrupt established history cannot silently become a new conversation. Unknown prior native delivery is carried into a new correlated input after restart, with the complete previous input in a private file and an explicit request to review history/effects before continuing.

This prevents acknowledging skipped input. It cannot guarantee exactly-once external tool/model effects, survival of arbitrary escaped subprocesses, every power-failure boundary or successful provider execution. Failure and lost contact remain distinct observations.

- [Complete architecture contract](/docs/ctlflow/specification/)
- [Native adapters and uncertainty](/docs/fleetd/runtime/)
- [HTTP authentication](/docs/api/http/)
- [Report-origin protocol](/docs/api/native-http/#separate-report-origin)
