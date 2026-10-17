---
title: "crossfire/node/packages/contracts/src/schema/plan.ts"
linkTitle: "plan"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/schema/plan.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/schema/response.ts`](/docs/api/schemas/crossfire-contracts-schema-response/)
- [`services/crossfire/node/packages/contracts/src/schema/request.ts`](/docs/api/schemas/crossfire-contracts-schema-request/)

## preview {#preview}

```typescript
preview = check.object({ digest: check.text(64, 64), snapshots: check.list(check.object({ agentId: check.identifier, revision: check.integer(),
        grants: check.list(check.object({ roomId: check.roomId, generation: check.identifier, revision: check.integer() }), 100) }), 100),
    changes: check.list(check.object({ agentId: check.identifier, roomId: check.roomId, before: check.nullable(grant),
        agentName: check.text(255), instanceKey: check.name, roomName: check.text(255), roomAlias: check.nullable(check.text(255)),
        after: check.nullable(grantIntent), changed: check.boolean, authorizerId: check.identifier,
        nativePowerLevel: check.nullable(check.integer(Number.MIN_SAFE_INTEGER)), nativeCreator: check.boolean }), 10000) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)
- [`changed`](/docs/api/schemas/crossfire-contracts-schema-plan/#changed)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## changed {#changed}

```typescript
changed = check.object({ accepted: check.boolean, agents: check.list(check.identifier, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
