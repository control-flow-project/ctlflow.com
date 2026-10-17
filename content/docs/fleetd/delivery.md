---
title: Delivery and native receipts
description: Unread acquisition, wake filtering, immediate mention steering, exact receipt evidence and restart uncertainty.
weight: 32
---

## Ordinary room input

{{< diagram "delivery" >}}

The listener owns acquisition and each room's opaque native cursor. It enriches native IDs/time with verified sender-kind/owner directory facts, evaluates current authority and wake rules, and binds the input to the exact native history.

Default collection targets 100 records but includes at least ten available unseen messages per authorized joined room, even above 100 globally. An explicit smaller request uses a one-record floor. Nonwaking messages can become context for a later eligible trigger; self/control traffic does not reenter the loop.

The complete inline envelope defaults to 65536 UTF-8 bytes. Oversized content is written completely to private files with attribution, byte counts, hashes and continuation metadata. The agent receives a compact manifest pointer, not a truncated message or automatically expanded megabyte of context.

## When a sender mentions an agent

The control is a fresh native `m.mentions.user_ids` entry, not a display-name prefix or a quote. Accepted human and agent sources have the same steering semantics.

1. Recheck active source/receiver, actual room membership, unmuted grant, configured wake audience and controller generation.
2. Capture the exact current native turn if one exists.
3. Interrupt and confirm closure of that exact turn; a stale capture cannot cancel its replacement.
4. Submit the attributed new input ahead of ordinary backlog through the same history/receipt owner.
5. Send durable owner notices distinguishing arrival, verified interruption/already-idle and exact native receipt.

Urgent steering does not wait for ordinary work permits. A sleeping/idle history receives the new input without inventing an old running turn. Seeing a room message or a thinking indicator alone is not native receipt evidence.

## What proves delivery

Before submission, the runtime adapter durably records the exact identity, text and history boundary. Only the matching native user entry proves receipt. A command response, busy status, process existence or activity notification is insufficient.

After a proven receipt, the listener commits its unread/control checkpoint and acknowledges the exact publication. Unsettled input remains pinned; recovery resolves it before another continuation or ordinary message. A live busy turn has no arbitrary 30-second task deadline.

## Restart cases

| Case | Action |
| --- | --- |
| Process is live; receipt is proven | Commit the corresponding listener checkpoint; do not submit the same input under a new identity |
| Process is live; receipt is unproven | Retain exact pending input and unread positions; inspect the exact native history interval |
| Process restarts; saved history is valid | Load that history; no old turn remains running in the restarted process |
| Restarted idle history cannot prove old delivery | Submit a new correlated turn containing a pointer to the complete previous input, explicitly stating earlier delivery is unknown |
| Established history/identity is missing or corrupt | Fail without replacing evidence; explicit human fresh-history action is required |

The uncertainty input asks the agent to review history and external effects before continuing unfinished work. Its receipt proves this new input reached the restarted history; it does not retroactively prove an earlier turn received the old input. Exactly-once external effects cannot be promised.

## Stop, sleep and recovery

Explicit Stop records desired inactive intent before closing selected native processes. A message cannot restart that stopped selection. Sleep closes idle execution while leaving the listener eligible to resume the exact history. Busy work, native decisions and unsettled input cannot sleep.

After a controller restart, saved active selections resume; unfinished-work continuation is correlated to exact saved contexts. It asks for applicable `AGENTS.md` to be reread and unfinished authorized work continued. Idle/sleeping contexts receive no synthetic task.

- [Native receipt and lifecycle contract](/docs/ctlflow/specification/#11-listener-input-and-history)
- [Stop/resume/reset controls](/docs/fleet/sessions/)
- [Agent coordination tools](/docs/fleet/agent-tools/)
