---
title: "crossfire/node/packages/contracts/src/policy.ts"
linkTitle: "policy"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/policy.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

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
