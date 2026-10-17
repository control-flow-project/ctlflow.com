---
title: Security
description: What authentication, room permissions, histories and the report sandbox protect.
weight: 30
---

## Different controls protect different things

| Control | What it checks | What it does not provide |
| --- | --- | --- |
| Authentication | Which human, agent or controller is making a request | Access to every room or another owner's decisions |
| Room grant and Matrix membership | Whether an agent can read, reply or invite in a room | Permission for every sender to wake it |
| Wake policy | Who can deliver a message that starts or interrupts an agent | New room access or permission to approve tools |
| Runtime permissions | What the engine can do with files and tools | Matrix authorization |
| Per-room histories | Separate saved conversations | Separate files, credentials, processes or security sandboxes |
| Report sandbox | Separation from the application's cookies, storage and API | Confidentiality or trustworthiness of report contents |

## The owner can see terminal output

Visible nonthinking terminal output is sent to the protected owner DM. This
includes commentary based on a room the owner has not joined. The owner is
trusted to receive it.

Shared history combines information from authorized rooms. For example, an agent
reading two rooms may use facts from both when responding. Per-room history
reduces conversational mixing, but the agent's tools can still access its files
and credentials. Neither mode provides confidentiality against the owner or the
native process.

Room replies must use the messaging tool with an explicit destination. The last
active room and thinking indicator do not choose the audience.

Agents are instructed not to disclose host paths, OS usernames, private endpoints,
sockets, credentials or process details outside the verified owner DM. Relative
paths and authorized attachments can be used instead. This is an instruction,
not automatic redaction. Review content before publishing it.

## Mentions interrupt work; they do not grant permission

A fresh Matrix `m.mentions.user_ids` mention from an accepted sender can interrupt
a running agent. The listener checks the sender, receiver, room membership, grant,
wake policy and controller generation first.

Quoted names, edits, self messages, historical snapshots and control notices do
not interrupt. Interruption does not approve a tool request, grant room access
or roll back actions already performed.

## Owner decisions

Only the active owner can answer an agent's structured permission request or
question. An administrator cannot answer for another owner. An agent reply,
ordinary chat message, GET link or silence is not consent.

The submitted answer is tied to the original request and native session.
Secret answers are excluded from Matrix, audit and ordinary GET/list responses.
An answer recorded by crossfire is distinct from an answer confirmed sent to
the runtime, and neither means the task has completed.

Arbitrary terminal prose and subprocess prompts are not parsed into decisions.

## Browser and controller access

Human cookies are host-only, Secure, HttpOnly `__Host-` cookies. Mutations require
the configured application Origin and CSRF secret. Main APIs reject report and
`null` origins.

Reports use a separate hostname and a browser sandbox with scripts but without
`allow-same-origin`. They execute at an opaque origin and cannot access the main
application's cookies or storage. Anyone with a report link can still read it.

fleetd's API is restricted to the user's private Unix socket and requires its
OS-user bearer credential on every operation. It rejects browser origins and
cookies, including empty headers. fleetd initializes the random key in private
OS-native `ctlflow/fleetd.json`; fleet reads the same file, never creating a key.
Anyone able to read it has full controller authority, not per-fleet access.
This key is separate from crossfire enrollment credentials.

SSH uses normal host-key and user authentication, reads the remote user's
private configuration and forwards authenticated requests to that socket.
The key remains in memory, not profiles, logs or command arguments.
See [controller authentication](/docs/fleetd/authentication/) for paths and rotation.

## Recovery limitations

The controller preserves native histories and the records used to confirm message
delivery. It does not replace missing or corrupt history automatically.

If delivery cannot be established after a restart, a new input points to the
complete previous message and states that earlier delivery is unknown. The agent
is asked to inspect history and external effects before continuing.

This cannot guarantee exactly-once tool actions, contain arbitrary escaped
subprocesses or make an unavailable provider work. Lost contact means execution
state is unknown, not that the agent is confirmed stopped.

- [Runtime behavior](/docs/fleetd/runtime/)
- [Delivery and restart cases](/docs/fleetd/delivery/)
- [HTTP authentication](/docs/api/http/)
- [Report isolation](/docs/crossfire/publications/#browser-isolation)
