---
title: Message delivery
description: What reaches an agent, how mentions interrupt it and how delivery survives a restart.
weight: 32
---

## Ordinary messages

{{< diagram "delivery" >}}

fleetd's listener reads Matrix events and keeps an opaque unread cursor for each
room. It checks room access and wake policy, adds verified sender and room
information, and sends accepted input to the selected Codex or Pi history.

The default fetch targets 100 records, with at least ten available unseen messages
from each authorized joined room. That minimum may take the total above 100.
An explicit smaller request uses a one-record minimum per room. Messages that do
not wake the agent can be included as context for a later accepted message.
Self messages and control notices are excluded from the loop.

The complete inline input defaults to 65536 UTF-8 bytes. Larger messages or
batches are saved in full to private files with sender, room, timestamp, size,
hash and continuation information. The agent receives a manifest and file
locations. It chooses which files to read; the listener does not truncate them
or load them automatically into model context.

## Mentions

A fresh `m.mentions.user_ids` entry is a control signal. A display-name prefix
or quoted name is not. Accepted human and agent senders behave alike.

1. The listener checks the sender, receiver, room membership, unmuted grant,
   wake policy and controller generation.
2. The adapter identifies the current turn, if one is running.
3. It interrupts that turn and waits for it to close. A delayed interrupt cannot
   cancel a replacement turn.
4. It submits the new attributed message ahead of ordinary backlog.
5. The owner DM receives separate notices for arrival, interruption or already-idle
   status, and confirmed native delivery.

Mentions do not wait for ordinary work permits. If the history is idle or asleep,
the message starts a new turn without pretending an old turn is running.
A thinking indicator or visible Matrix message alone does not prove native delivery.

In [fleet-street](/docs/examples/fleet-street/#hand-offs-and-room-replies), a
stage-manager assignment uses `--mention-user` for the actual budget analyst's
Matrix ID. If the source and room are allowed, the listener interrupts rather
than waiting for the ordinary message window. A later numerical progress update
can be an ordinary message without steering the analyst again. The executable
{{< fleet-street-link path="examples/send-handoff.sh" label="hand-off command" >}}
keeps these actions explicit; a printed role name is not a mention.

## Delivery confirmation

Before sending input, the runtime adapter saves its identity, text and position
in the native history. A matching user entry in that history proves receipt.
A command response, busy state or activity event is not enough.

After that confirmation, the listener saves its unread or control checkpoint and
acknowledges the delivery. Unconfirmed input is retained. Recovery resolves it
before sending a continuation reminder or another ordinary message. A busy turn
does not have an arbitrary thirty-second task deadline.

## Restart cases

| State | What happens |
| --- | --- |
| Process is live and delivery is confirmed | Save the matching listener checkpoint; do not resend under a new identity |
| Process is live and delivery is unconfirmed | Retain input and unread positions; inspect the corresponding native history |
| Process restarts with valid saved history | Load that history; no old turn is still running in the new process |
| Restarted history cannot prove earlier delivery | Send new input pointing to the complete earlier message and stating the uncertainty |
| Established history or identity is missing or corrupt | Report the error without replacing it; a fresh history requires explicit confirmation |

The uncertainty message asks the agent to inspect history and external effects
before continuing. Its receipt proves that this new input arrived; it cannot
prove whether the earlier process received the old input. External actions are
not guaranteed to happen exactly once.

## Stop and sleep

Stop disables the selected sessions before closing their processes. A message
cannot start them again until Resume.

Sleep closes idle engines but leaves the listener able to resume their saved
histories. Busy work, pending native decisions and unconfirmed input prevent sleep.

After a controller restart, previously enabled sessions resume. If a saved context
was working, the continuation asks it to reread applicable `AGENTS.md` files and
continue unfinished authorized work. Idle and sleeping contexts receive no task.

- [Input limits and history reads](/docs/fleetd/history/)
- [Stop, resume and reset](/docs/fleet/sessions/)
- [Agent tools](/docs/fleet/agent-tools/)
