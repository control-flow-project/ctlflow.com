---
title: "crossfire/node/packages/contracts/src/schema/response.ts"
linkTitle: "response"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/schema/response.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/controller.ts`](/docs/api/schemas/crossfire-contracts-schema-controller/)
- [`services/crossfire/node/packages/contracts/src/policy.ts`](/docs/api/schemas/crossfire-contracts-policy/)
- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/fleet-control.ts`](/docs/api/schemas/crossfire-contracts-fleet-control/)
- [`services/crossfire/node/packages/contracts/src/coordination-policy.ts`](/docs/api/schemas/crossfire-contracts-coordination-policy/)
- [`services/crossfire/node/packages/contracts/src/runtime.ts`](/docs/api/schemas/crossfire-contracts-runtime/)
- [`services/crossfire/node/packages/contracts/src/client.ts`](/docs/api/schemas/crossfire-contracts-client/)

## backendLink {#backendLink}

```typescript
backendLink = check.refine(check.text(2048), value => {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password && value === value.trim() && !/[\u0000-\u0020\u007f]/u.test(value);
    }
    catch {
        return false;
    }
}, 'Expected an absolute HTTP(S) backend link without credentials')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## messagingBackend {#messagingBackend}

```typescript
messagingBackend = check.object({ type: check.name, label: check.text(100), chatUrl: backendLink, signupUrl: backendLink,
    signupInstructions: check.list(check.text(2000), 20), configuration: backendConfiguration })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`backendLink`](/docs/api/schemas/crossfire-contracts-schema-response/#backendLink)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`backendConfiguration`](/docs/api/schemas/crossfire-contracts-client/#backendConfiguration)

## principal {#principal}

```typescript
principal = check.object({ principalId: check.identifier, backendUserId: check.backendUserId, kind: check.choice('human', 'agent'),
    displayName: check.text(255), ownerId: check.identifier, ownerBackendUserId: check.backendUserId })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## principalIdentity {#principalIdentity}

```typescript
principalIdentity = check.refine(check.object({ backendUserId: check.backendUserId, kind: check.choice('human', 'agent', 'unknown'),
    ownerBackendUserId: check.nullable(check.backendUserId), displayName: check.nullable(check.text(255)), ownerDisplayName: check.nullable(check.text(255)) }), identity => (identity.kind === 'agent') === (identity.ownerBackendUserId !== null), 'Only registered agents have an owner')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## principalIdentities {#principalIdentities}

```typescript
principalIdentities = check.refine(check.list(principalIdentity, 100, 1), identities => new Set(identities.map(identity => identity.backendUserId)).size === identities.length, 'Resolved identities must be unique')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`principalIdentity`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentity)

## role {#role}

```typescript
role = check.object({ code: check.text(100), principalKind: check.choice('human', 'agent'), label: check.text(100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## permission {#permission}

```typescript
permission = check.object({ code: check.text(100), grantScope: check.choice('role', 'agent_room'), description: check.text(300) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## application {#application}

```typescript
application = check.object({ appliedRevision: check.nullable(check.integer()), appliedStatus: check.nullable(check.status),
    nativeDisplayName: check.nullable(check.text(255)), lastAttemptAt: check.nullable(check.integer()), lastSuccessAt: check.nullable(check.integer()),
    errorCode: check.nullable(check.text(100)), errorMessage: check.nullable(check.text(4096)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## member {#member}

```typescript
member = check.object({ memberId: check.identifier, backendUserId: check.backendUserId, displayName: check.text(HUMAN_SIGNUP.labelMax),
    roleCode: check.choice('member', 'administrator'), status: check.status, revision: check.integer(), createdAt: check.integer(), application })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`HUMAN_SIGNUP`](/docs/api/schemas/crossfire-contracts-policy/#HUMAN_SIGNUP)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)

## session {#session}

```typescript
session = check.object({ member, csrfSecret: check.secret, permissions: check.list(check.text(100), 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member)
- [`secret`](/docs/api/schemas/crossfire-contracts-schema-validation/#secret)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## listenerRun {#listenerRun}

```typescript
listenerRun = check.object({ runId: check.identifier, agentId: check.identifier, release: check.text(200),
    controller: check.object({ fleetId: check.identifier, connectionId: check.identifier, credentialId: check.identifier }),
    startedAt: check.integer(), lastSeenAt: check.integer(), activeMs: check.integer(), messagesDelivered: check.integer(),
    stoppedAt: check.nullable(check.integer()), disconnectRequestedAt: check.nullable(check.integer()) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## activity {#activity}

```typescript
activity = check.object({ status: check.choice('online', 'offline', 'disconnecting'), activeMs: check.integer(),
    messagesDelivered: check.integer(), lastSeenAt: check.nullable(check.integer()), activeRuns: check.list(listenerRun, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)

## owner {#owner}

```typescript
owner = check.object({ memberId: check.identifier, backendUserId: check.backendUserId, displayName: check.text(HUMAN_SIGNUP.labelMax), status: check.status })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`HUMAN_SIGNUP`](/docs/api/schemas/crossfire-contracts-policy/#HUMAN_SIGNUP)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)

## agent {#agent}

```typescript
agent = check.object({ agentId: check.identifier, backendUserId: check.backendUserId, name: check.name, displayName: check.text(255),
    owner, status: check.status, revision: check.integer(), createdAt: check.integer(), application, activity, nativeRuntime: check.nullable(nativeRuntimeSummary),
    deployment: check.object({ fleetId: check.identifier, fleetKey: check.name, label: check.text(100), controllerName: check.text(100), reportedAt: check.integer(), instanceKey: check.name }),
    canRetire: check.boolean, allowedActions: check.list(check.choice('configure', 'room-grant.manage', 'retire'), 3) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)
- [`activity`](/docs/api/schemas/crossfire-contracts-schema-response/#activity)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`nativeRuntimeSummary`](/docs/api/schemas/crossfire-contracts-runtime/#nativeRuntimeSummary)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## wakeSender {#wakeSender}

```typescript
wakeSender = check.refine(check.object({ identity: principal, includeAgents: check.boolean }), sender => !sender.includeAgents || sender.identity.kind === 'human', 'Only people can include their agents')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## wakePolicy {#wakePolicy}

```typescript
wakePolicy = check.refine(check.object({ agentId: check.identifier, revision: check.integer(), mode: check.wakeMode, senders: check.list(wakeSender, 2000) }), policy => new Set(policy.senders.map(sender => sender.identity.principalId)).size === policy.senders.length
    && policy.senders.every(sender => sender.identity.principalId !== policy.agentId)
    && (policy.mode !== 'everyone' || policy.senders.length === 0), 'Invalid selected wake authority')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`wakeSender`](/docs/api/schemas/crossfire-contracts-schema-response/#wakeSender)
- [`policy`](/docs/api/schemas/crossfire-contracts-schema-response/#policy)

## grant {#grant}

```typescript
grant = check.object({ agentId: check.identifier, roomId: check.roomId, generation: check.identifier, authorizerId: check.identifier,
    addedById: check.identifier, accessMode: check.choice('none', 'read', 'reply', 'custom'), nativeAccess: check.nullable(check.backendParameters),
    muted: check.boolean, revision: check.integer(), accessRevision: check.integer(), updatedAt: check.integer() })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## grantApplication {#grantApplication}

```typescript
grantApplication = check.object({ observedGeneration: check.nullable(check.identifier), appliedRevision: check.nullable(check.integer()),
    appliedAccessRevision: check.nullable(check.integer()), membership: check.nullable(check.choice('join', 'invite', 'leave', 'ban')),
    nativeAccess: check.nullable(check.backendParameters), lastAttemptAt: check.nullable(check.integer()), lastSuccessAt: check.nullable(check.integer()),
    errorCode: check.nullable(check.text(100)), errorMessage: check.nullable(check.text(4096)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## grantView {#grantView}

```typescript
grantView = check.object({ agentId: check.identifier, revision: check.integer(), grant: check.nullable(grant),
    ownerConversation: check.boolean,
    application: check.nullable(grantApplication), permissions: check.list(check.choice('room.agent.invite'), 1),
    allowedActions: check.list(check.choice('set', 'remove', 'permissions.set'), 3) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`application`](/docs/api/schemas/crossfire-contracts-schema-response/#application)
- [`grantApplication`](/docs/api/schemas/crossfire-contracts-schema-response/#grantApplication)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## deliveryGrant {#deliveryGrant}

```typescript
deliveryGrant = check.object({ roomId: check.roomId, accessMode: check.choice('read', 'reply', 'custom'),
    nativeAccess: check.nullable(check.backendParameters), muted: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## deliveryPolicy {#deliveryPolicy}

```typescript
deliveryPolicy = check.refine(check.object({ agentId: check.identifier, backendUserId: check.backendUserId, ownerBackendUserId: check.backendUserId,
    maxMessageBytes: check.integer(4096, 4194304),
    fleetIdleTimeoutSeconds: check.integer(0, 604800),
    status: check.status, ownerStatus: check.status, ownerConversation: check.nullable(check.roomId), roomGrants: check.list(deliveryGrant, 101), wakeMode: check.wakeMode,
    senderBackendUserIds: check.list(check.backendUserId, 2000) }), policy => new Set(policy.senderBackendUserIds).size === policy.senderBackendUserIds.length && !policy.senderBackendUserIds.includes(policy.backendUserId)
    && new Set(policy.roomGrants.map(grant => grant.roomId)).size === policy.roomGrants.length
    && policy.roomGrants.every(grant => (grant.accessMode === 'custom') === (grant.nativeAccess !== null))
    && (policy.ownerConversation === null || policy.roomGrants.some(grant => grant.roomId === policy.ownerConversation && grant.accessMode === 'reply' && !grant.muted))
    && (policy.status === 'active' && policy.ownerStatus === 'active' || policy.senderBackendUserIds.length === 0), 'Invalid resolved delivery authority')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`deliveryGrant`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryGrant)
- [`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)
- [`policy`](/docs/api/schemas/crossfire-contracts-schema-response/#policy)
- [`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)

## roomAuthority {#roomAuthority}

```typescript
roomAuthority = check.object({ backendUserId: check.backendUserId, canInvite: check.boolean, authorityRevision: check.text(255),
    accessModes: check.list(check.choice('read', 'reply', 'custom'), 3),
    accessFields: check.list(check.object({ key: check.text(100), label: check.text(255), minimum: check.integer(Number.MIN_SAFE_INTEGER), maximum: check.integer(Number.MIN_SAFE_INTEGER), defaultValue: check.integer(Number.MIN_SAFE_INTEGER) }), 64),
    permissions: check.list(check.object({ action: check.text(255), label: check.text(1000), allowed: check.boolean }), 1000) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## room {#room}

```typescript
room = check.object({ roomId: check.roomId, name: check.text(255), topic: check.text(4096, 0), alias: check.nullable(check.text(255)),
    authority: check.nullable(roomAuthority) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`roomAuthority`](/docs/api/schemas/crossfire-contracts-schema-response/#roomAuthority)

## enrollmentItem {#enrollmentItem}

```typescript
enrollmentItem = check.object({ instanceKey: check.name, requestedName: check.name, currentName: check.nullable(check.name), outcome: check.choice('claimed', 'existing'),
    agentId: check.nullable(check.identifier), coordinationPolicy })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`coordinationPolicy`](/docs/api/schemas/crossfire-contracts-coordination-policy/#coordinationPolicy)

## enrollment {#enrollment}

```typescript
enrollment = check.object({ owner: principal, controllerName: check.text(100), enrollmentId: check.identifier, ownerId: check.identifier, fleetKey: check.name,
    verificationCode: check.text(12, 12), status: check.choice('pending', 'approved', 'rejected', 'expired'), revision: check.integer(),
    createdAt: check.integer(), expiresAt: check.integer(), decidedByMemberId: check.nullable(check.identifier), decidedAt: check.nullable(check.integer()) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## enrollmentDetails {#enrollmentDetails}

```typescript
enrollmentDetails = check.object({ enrollment, instances: check.list(enrollmentItem, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`enrollment`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollment)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`enrollmentItem`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentItem)

## enrollmentIntroduction {#enrollmentIntroduction}

```typescript
enrollmentIntroduction = check.object({ enrollment: enrollmentDetails, approvalUrl: check.text(2048) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`enrollment`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollment)
- [`enrollmentDetails`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDetails)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## enrollmentDecision {#enrollmentDecision}

```typescript
enrollmentDecision = check.object({ enrollmentId: check.identifier, status: check.choice('approved', 'rejected'), revision: check.integer() })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## preflight {#preflight}

```typescript
preflight = check.object({ available: check.boolean, instances: check.integer(1, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## enrollmentExchange {#enrollmentExchange}

```typescript
enrollmentExchange = check.object({ status: check.choice('pending', 'rejected', 'expired', 'provisioning', 'ready'),
    fleet: check.nullable(check.object({ fleetId: check.identifier, controllerCredential: check.nullable(check.text(200)) })),
    ownerBackendUserId: check.backendUserId, instances: check.list(check.object({ instanceKey: check.name, name: check.name, agentId: check.nullable(check.identifier),
        status: check.choice('ready', 'provisioning'), errorCode: check.nullable(check.text(100)), account: check.nullable(check.object({
            userId: check.backendUserId, accessToken: check.text(8192), native: check.backendParameters
        })) }), 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`backendParameters`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendParameters)

## fleet {#fleet}

```typescript
fleet = check.object({ fleetId: check.identifier, owner: principal, fleetKey: check.name, label: check.text(100), controller,
    revision: check.integer(), createdAt: check.integer(), updatedAt: check.integer(), delivery: fleetControl,
    canArchive: check.boolean, allowedActions: check.list(check.choice('configure', 'archive'), 2) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`controller`](/docs/api/schemas/crossfire-contracts-schema-controller/#controller)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`fleetControl`](/docs/api/schemas/crossfire-contracts-fleet-control/#fleetControl)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## fleetAgent {#fleetAgent}

```typescript
fleetAgent = check.object({ instanceKey: check.name, agent })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent)

## invitation {#invitation}

```typescript
invitation = check.object({ invitationId: check.identifier, createdByMemberId: check.identifier, roleCode: check.choice('member', 'administrator'),
    createdAt: check.integer(), expiresAt: check.integer(), consumedByMemberId: check.nullable(check.identifier), revokedAt: check.nullable(check.integer()) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## invitationCreated {#invitationCreated}

```typescript
invitationCreated = check.object({ invitationId: check.identifier, claimSecret: check.secret, expiresAt: check.integer(), signupUrl: check.text(2048) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`secret`](/docs/api/schemas/crossfire-contracts-schema-validation/#secret)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## policy {#policy}

```typescript
policy = check.object({ revision: check.integer(), maxOwnerAgents: check.integer(1, 100), maxAgents: check.integer(1, 1000),
    maxMessageBytes: check.integer(4096, 4194304),
    fleetIdleTimeoutSeconds: check.integer(0, 604800),
    maxPending: check.integer(1, 1000), enrollmentSeconds: check.integer(60, 3600), reconcileSeconds: check.integer(30, 3600), agentInstructions: check.multiline,
    signupMode: check.choice('invitation', 'open'), invitationIssuers: check.choice('administrators', 'members') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`multiline`](/docs/api/schemas/crossfire-contracts-schema-validation/#multiline)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## audit {#audit}

```typescript
audit = check.object({ auditId: check.identifier, requestId: check.text(255), actorCredentialId: check.nullable(check.identifier), actorKind: check.choice('human', 'agent', 'controller', 'system', 'anonymous'),
    actor: check.nullable(principal), target: check.nullable(principal),
    actorPrincipalId: check.nullable(check.identifier), ownerId: check.nullable(check.identifier), targetKind: check.text(100), targetId: check.text(255),
    roomId: check.nullable(check.roomId), membershipGeneration: check.nullable(check.identifier), authorizerId: check.nullable(check.identifier),
    addedById: check.nullable(check.identifier), permissionCode: check.nullable(check.text(100)), action: check.text(100),
    outcome: check.text(100), message: check.text(4096, 0), createdAt: check.integer() })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## acknowledged {#acknowledged}

```typescript
acknowledged = check.object({ accepted: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## recorded {#recorded}

```typescript
recorded = check.object({ recorded: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## report {#report}

```typescript
report = check.object({ disconnect: check.boolean, currentRelease: check.text(200), statisticsAccepted: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## notice {#notice}

```typescript
notice = check.object({ outcome: check.choice('pending', 'sent', 'denied', 'not-applicable', 'not-permitted', 'rate-limited') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## AgentView {#AgentView}

```typescript
export type AgentView = Parsed<typeof agent>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`agent`](/docs/api/schemas/crossfire-contracts-schema-response/#agent)

## PrincipalIdentity {#PrincipalIdentity}

```typescript
export type PrincipalIdentity = Parsed<typeof principalIdentity>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`principalIdentity`](/docs/api/schemas/crossfire-contracts-schema-response/#principalIdentity)

## MemberView {#MemberView}

```typescript
export type MemberView = Parsed<typeof member>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`member`](/docs/api/schemas/crossfire-contracts-schema-response/#member)

## SessionView {#SessionView}

```typescript
export type SessionView = Parsed<typeof session>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`session`](/docs/api/schemas/crossfire-contracts-schema-response/#session)

## RoomView {#RoomView}

```typescript
export type RoomView = Parsed<typeof room>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`room`](/docs/api/schemas/crossfire-contracts-schema-response/#room)

## RoomGrantView {#RoomGrantView}

```typescript
export type RoomGrantView = Parsed<typeof grantView>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`grantView`](/docs/api/schemas/crossfire-contracts-schema-response/#grantView)

## EnrollmentView {#EnrollmentView}

```typescript
export type EnrollmentView = Parsed<typeof enrollmentDetails>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`enrollmentDetails`](/docs/api/schemas/crossfire-contracts-schema-response/#enrollmentDetails)

## FleetView {#FleetView}

```typescript
export type FleetView = Parsed<typeof fleet>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)

## DeliveryPolicy {#DeliveryPolicy}

```typescript
export type DeliveryPolicy = Parsed<typeof deliveryPolicy>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`deliveryPolicy`](/docs/api/schemas/crossfire-contracts-schema-response/#deliveryPolicy)

## ActivityView {#ActivityView}

```typescript
export type ActivityView = Parsed<typeof activity>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`activity`](/docs/api/schemas/crossfire-contracts-schema-response/#activity)

## ListenerRunView {#ListenerRunView}

```typescript
export type ListenerRunView = Parsed<typeof listenerRun>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`listenerRun`](/docs/api/schemas/crossfire-contracts-schema-response/#listenerRun)

## PolicyView {#PolicyView}

```typescript
export type PolicyView = Parsed<typeof policy>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`policy`](/docs/api/schemas/crossfire-contracts-schema-response/#policy)
