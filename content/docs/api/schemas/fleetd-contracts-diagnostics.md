---
title: "fleetd/node/packages/contracts/src/diagnostics.ts"
linkTitle: "diagnostics"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/diagnostics.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## scope {#scope}

```typescript
scope = check.object({ fleetId: check.nullable(check.identifier), instanceKey: check.nullable(check.name) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)

## diagnosticReport {#diagnosticReport}

```typescript
diagnosticReport = check.object({ checkedAt: check.integer(), scope,
    checks: check.list(check.object({ id: check.text(100), scope, status: check.choice('pass', 'fail', 'unknown', 'not-applicable'),
        observedAt: check.nullable(check.integer()), message: check.text(1024), remediation: check.nullable(check.text(1024)) }), 1000) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`scope`](/docs/api/schemas/fleetd-contracts-diagnostics/#scope)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## diagnosticQuery {#diagnosticQuery}

```typescript
export function diagnosticQuery(input: unknown) {
    if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => !['fleetId', 'instanceKey'].includes(key))
        || input.getAll('fleetId').length > 1 || input.getAll('instanceKey').length > 1)
        return failure('invalid', 'Use one exact diagnostic scope');
    const parsed = scope({ fleetId: input.get('fleetId'), instanceKey: input.get('instanceKey') });
    return parsed.ok && parsed.value.instanceKey !== null && parsed.value.fleetId === null ? failure('invalid', 'An instance requires a fleet') : parsed;
}
```

Related definitions:

- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`scope`](/docs/api/schemas/fleetd-contracts-diagnostics/#scope)
