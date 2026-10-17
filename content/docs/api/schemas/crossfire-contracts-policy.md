---
title: "crossfire/node/packages/contracts/src/policy.ts"
linkTitle: "policy"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/policy.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

This module has no local contract dependencies.

## DEFAULT_AGENT_INSTRUCTIONS {#DEFAULT_AGENT_INSTRUCTIONS}

```typescript
DEFAULT_AGENT_INSTRUCTIONS = ''
```

## AGENT_INSTRUCTIONS_MAX_BYTES {#AGENT_INSTRUCTIONS_MAX_BYTES}

```typescript
AGENT_INSTRUCTIONS_MAX_BYTES = 8192
```

## POLICY_LIMITS {#POLICY_LIMITS}

```typescript
POLICY_LIMITS = {
    maxOwnerAgents: { min: 1, max: 100 }, maxAgents: { min: 1, max: 1000 }, maxPending: { min: 1, max: 1000 },
    enrollmentSeconds: { min: 60, max: 3600 }, reconcileSeconds: { min: 30, max: 3600 },
    maxMessageBytes: { min: 4096, max: 4194304 },
    fleetIdleTimeoutSeconds: { min: 0, max: 604800 },
} as const
```

## HUMAN_SIGNUP {#HUMAN_SIGNUP}

```typescript
HUMAN_SIGNUP = { usernameMax: 100, usernamePattern: '[a-z0-9][a-z0-9._=\\-]*', passwordMin: 12, passwordMax: 1024, labelMax: 100 } as const
```
