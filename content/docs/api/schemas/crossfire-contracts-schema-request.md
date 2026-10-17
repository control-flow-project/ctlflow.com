---
title: "crossfire/node/packages/contracts/src/schema/request.ts"
linkTitle: "request"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/schema/request.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/controller.ts`](/docs/api/schemas/crossfire-contracts-schema-controller/)
- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/policy.ts`](/docs/api/schemas/crossfire-contracts-policy/)
- [`services/crossfire/node/packages/contracts/src/statistics.ts`](/docs/api/schemas/crossfire-contracts-statistics/)
- [`services/crossfire/node/packages/contracts/src/coordination-policy.ts`](/docs/api/schemas/crossfire-contracts-coordination-policy/)

## revision {#revision}

```typescript
revision = check.integer()
```

Related definitions:

- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## accountProof {#accountProof}

```typescript
accountProof = check.object({ agentId: check.identifier, accessToken: check.text(8192) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## instance {#instance}

```typescript
instance = check.object({ instanceKey: check.name, name: check.name, identity: check.optional(accountProof), coordinationPolicy })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`accountProof`](/docs/api/schemas/crossfire-contracts-schema-request/#accountProof)
- [`coordinationPolicy`](/docs/api/schemas/crossfire-contracts-coordination-policy/#coordinationPolicy)

## roster {#roster}

```typescript
roster = { controller, controllerCredential: check.optional(check.text(200)), ownerMatrixId: check.matrixUserId, fleetKey: check.name, instances: check.list(instance, 100, 1) }
```

Related definitions:

- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`instance`](/docs/api/schemas/crossfire-contracts-schema-request/#instance)

## preflight {#preflight}

```typescript
preflight = check.object(roster)
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roster`](/docs/api/schemas/crossfire-contracts-schema-request/#roster)

## enrollment {#enrollment}

```typescript
enrollment = check.object({ ...roster, enrollmentId: check.identifier, claimSecret: check.secret })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roster`](/docs/api/schemas/crossfire-contracts-schema-request/#roster)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`secret`](/docs/api/schemas/crossfire-contracts-schema-validation/#secret)

## enrollmentDecision {#enrollmentDecision}

```typescript
enrollmentDecision = check.object({ expectedRevision: revision, decision: check.choice('approve', 'reject'), verificationCode: check.text(12, 12) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## exchange {#exchange}

```typescript
exchange = check.object({ claimSecret: check.secret })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`secret`](/docs/api/schemas/crossfire-contracts-schema-validation/#secret)

## session {#session}

```typescript
session = check.object({ nativeAccessToken: check.text(8192) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## agentChange {#agentChange}

```typescript
agentChange = check.object({ expectedRevision: revision, status: check.optional(check.status) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)

## wakeSelection {#wakeSelection}

```typescript
wakeSelection = check.object({ principalId: check.identifier, includeAgents: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## wakePolicy {#wakePolicy}

```typescript
wakePolicy = check.refine(check.object({ expectedRevision: revision, mode: check.wakeMode, senders: check.list(wakeSelection, 2000) }), policy => new Set(policy.senders.map(sender => sender.principalId)).size === policy.senders.length
    && (policy.mode !== 'everyone' || policy.senders.length === 0), 'Select unique identities; everyone requires no individual selections')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`wakeSelection`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeSelection)
- [`policy`](/docs/api/schemas/crossfire-contracts-schema-request/#policy)

## memberChange {#memberChange}

```typescript
memberChange = check.object({ expectedRevision: revision, status: check.optional(check.status), displayName: check.optional(check.text(HUMAN_SIGNUP.labelMax)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`HUMAN_SIGNUP`](/docs/api/schemas/crossfire-contracts-policy/#HUMAN_SIGNUP)

## memberRole {#memberRole}

```typescript
memberRole = check.object({ expectedRevision: revision, roleCode: check.choice('member', 'administrator') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## memberInvitation {#memberInvitation}

```typescript
memberInvitation = check.object({ roleCode: check.choice('member', 'administrator'), expiresSeconds: check.integer(60, 604800) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## invitationClaim {#invitationClaim}

```typescript
invitationClaim = check.object({ claimSecret: check.secret })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`secret`](/docs/api/schemas/crossfire-contracts-schema-validation/#secret)

## grantIntent {#grantIntent}

```typescript
grantIntent = check.object({ roomId: check.roomId, accessMode: check.choice('read', 'reply', 'custom'), powerLevel: check.nullable(check.integer(Number.MIN_SAFE_INTEGER)), muted: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## roomGrant {#roomGrant}

```typescript
roomGrant = check.object({ expectedRevision: revision, expectedGeneration: check.nullable(check.identifier), accessMode: check.choice('read', 'reply', 'custom'), powerLevel: check.nullable(check.integer(Number.MIN_SAFE_INTEGER)), muted: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## removeGrant {#removeGrant}

```typescript
removeGrant = check.object({ expectedRevision: revision, expectedGeneration: check.nullable(check.identifier) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## roomPermissions {#roomPermissions}

```typescript
roomPermissions = check.object({ expectedRevision: revision, expectedGeneration: check.identifier, permissions: check.list(check.choice('room.agent.invite'), 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## heartbeat {#heartbeat}

```typescript
heartbeat = check.object({ release: check.text(200), messagesDelivered: check.integer(), stopped: check.boolean,
    controller: check.object({ fleetId: check.identifier, connectionId: check.identifier, credential: check.text(200) }), statistics: check.nullable(statisticsBatch) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`statisticsBatch`](/docs/api/schemas/crossfire-contracts-statistics/#statisticsBatch)

## wakeNotice {#wakeNotice}

```typescript
wakeNotice = check.object({ roomId: check.roomId })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## principalResolution {#principalResolution}

```typescript
principalResolution = check.object({ matrixUserIds: check.refine(check.list(check.matrixUserId, 100, 1), ids => new Set(ids).size === ids.length, 'Resolve unique Matrix identities') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)

## plan {#plan}

```typescript
plan = check.object({ fleetId: check.identifier, agents: check.list(check.object({ instanceKey: check.name, grants: check.list(grantIntent, 100) }), 100, 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`grantIntent`](/docs/api/schemas/crossfire-contracts-schema-request/#grantIntent)

## planPreview {#planPreview}

```typescript
planPreview = check.object({ plan })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`plan`](/docs/api/schemas/crossfire-contracts-schema-request/#plan)

## planChange {#planChange}

```typescript
planChange = check.object({ plan, digest: check.text(64, 64), snapshots: check.list(check.object({ agentId: check.identifier, revision,
        grants: check.list(check.object({ roomId: check.roomId, generation: check.identifier, revision }), 100) }), 100, 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`plan`](/docs/api/schemas/crossfire-contracts-schema-request/#plan)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)

## policy {#policy}

```typescript
policy = check.object({ expectedRevision: revision, maxOwnerAgents: check.integer(1, 100), maxAgents: check.integer(1, 1000), maxPending: check.integer(1, 1000),
    maxMessageBytes: check.integer(4096, 4194304),
    fleetIdleTimeoutSeconds: check.integer(0, 604800),
    enrollmentSeconds: check.integer(60, 3600), reconcileSeconds: check.integer(30, 3600), agentInstructions: check.multiline,
    signupMode: check.choice('invitation', 'open'), invitationIssuers: check.choice('administrators', 'members') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`multiline`](/docs/api/schemas/crossfire-contracts-schema-validation/#multiline)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## ListQuery {#ListQuery}

```typescript
export type ListQuery = {
    page: number;
    pageSize: number;
    search: string;
    status: ('active' | 'suspended' | 'revoked')[];
    kind: 'all' | 'human' | 'agent';
    listener: 'all' | 'online' | 'offline' | 'disconnecting';
    agentId?: string;
};
```

## listQuery {#listQuery}

```typescript
export function listQuery(allowed: readonly string[]): Parser<URLSearchParams> {
    return input => {
        if (!(input instanceof URLSearchParams) || [...input.keys()].some(key => !allowed.includes(key) || input.getAll(key).length !== 1))
            return failure('invalid', 'Unknown or duplicated query parameters');
        return success(input);
    };
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## pagination {#pagination}

```typescript
export function pagination(input: URLSearchParams) {
    const pageText = input.get('page') ?? '1', sizeText = input.get('pageSize') ?? '20';
    const page = Number(pageText), pageSize = Number(sizeText);
    return /^[1-9][0-9]*$/u.test(pageText) && /^[1-9][0-9]*$/u.test(sizeText)
        && Number.isSafeInteger(page) && page <= 100000 && Number.isSafeInteger(pageSize) && pageSize <= 100
        ? success({ page, pageSize }) : failure('invalid', 'Use page ≥ 1 and pageSize 1–100');
}
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## fleetChange {#fleetChange}

```typescript
fleetChange = check.object({ expectedRevision: revision, label: check.text(100), controller })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)

## fleetArchive {#fleetArchive}

```typescript
fleetArchive = check.object({ expectedRevision: revision })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)

## fleetAgentRemoval {#fleetAgentRemoval}

```typescript
fleetAgentRemoval = check.object({ expectedRevision: revision, instanceKey: check.name })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`revision`](/docs/api/schemas/crossfire-contracts-schema-request/#revision)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
