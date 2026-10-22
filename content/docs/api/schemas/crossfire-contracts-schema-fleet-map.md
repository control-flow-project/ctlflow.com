---
title: "crossfire/node/packages/contracts/src/schema/fleet-map.ts"
linkTitle: "fleet-map"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/schema/fleet-map.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/fleet-map.ts`](/docs/api/schemas/crossfire-kernel-fleet-map/)
- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/contracts/src/schema/response.ts`](/docs/api/schemas/crossfire-contracts-schema-response/)
- [`services/crossfire/node/packages/contracts/src/schema/request.ts`](/docs/api/schemas/crossfire-contracts-schema-request/)

## mapAgent {#mapAgent}

```typescript
mapAgent = check.object({ agentId: check.identifier, backendUserId: check.backendUserId, instanceKey: check.name,
    displayName: check.text(255), status: check.status, owner, sourceId: check.text(64, 64),
    listener: check.choice('online', 'offline', 'disconnecting'), lastSeenAt: check.nullable(check.integer()) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`backendUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#backendUserId)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)

## mapRoom {#mapRoom}

```typescript
mapRoom = check.object({ roomId: check.roomId, name: check.nullable(check.text(255)), alias: check.nullable(check.text(255)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## mapConnection {#mapConnection}

```typescript
mapConnection = check.object({ agentId: check.identifier, roomId: check.roomId, grant: check.nullable(grant), application: check.nullable(grantApplication) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`grantApplication`](/docs/api/schemas/crossfire-contracts-schema-response/#grantApplication)

## mapSource {#mapSource}

```typescript
mapSource = check.object({ sourceId: check.text(64, 64), mode: check.wakeMode,
    senders: check.list(wakeSelection, FLEET_MAP_LIMITS.principals), eligiblePrincipalIds: check.list(check.identifier, FLEET_MAP_LIMITS.principals) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`wakeSelection`](/docs/api/schemas/crossfire-contracts-schema-request/#wakeSelection)
- [`FLEET_MAP_LIMITS`](/docs/api/schemas/crossfire-kernel-fleet-map/#FLEET_MAP_LIMITS)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## fleetMap {#fleetMap}

```typescript
fleetMap = check.refine(check.object({ fleet, capturedAt: check.integer(), agents: check.list(mapAgent, FLEET_MAP_LIMITS.agents),
    rooms: check.list(mapRoom, FLEET_MAP_LIMITS.rooms), connections: check.list(mapConnection, FLEET_MAP_LIMITS.connections),
    sources: check.list(mapSource, FLEET_MAP_LIMITS.agents), principals: check.list(principal, FLEET_MAP_LIMITS.principals) }), value => {
    const agents = new Set(value.agents.map(agent => agent.agentId)), rooms = new Set(value.rooms.map(room => room.roomId));
    const sources = new Set(value.sources.map(source => source.sourceId)), principals = new Set(value.principals.map(identity => identity.principalId));
    return agents.size === value.agents.length && rooms.size === value.rooms.length && sources.size === value.sources.length && principals.size === value.principals.length
        && value.agents.every(agent => sources.has(agent.sourceId) && agent.owner.memberId === value.fleet.owner.principalId)
        && value.sources.every(source => [...source.senders.map(sender => sender.principalId), ...source.eligiblePrincipalIds].every(id => principals.has(id))
            && new Set(source.senders.map(sender => sender.principalId)).size === source.senders.length && new Set(source.eligiblePrincipalIds).size === source.eligiblePrincipalIds.length
            && source.senders.every(sender => !sender.includeAgents || value.principals.some(identity => identity.principalId === sender.principalId && identity.kind === 'human'))
            && (source.mode !== 'everyone' || source.senders.length === 0)
            && value.agents.some(agent => agent.sourceId === source.sourceId))
        && new Set(value.connections.map(connection => connection.agentId + '\0' + connection.roomId)).size === value.connections.length
        && value.connections.every(connection => agents.has(connection.agentId) && rooms.has(connection.roomId)
            && (connection.grant !== null || connection.application !== null)
            && (connection.grant === null || connection.grant.agentId === connection.agentId && connection.grant.roomId === connection.roomId))
        && value.rooms.every(room => value.connections.some(connection => connection.roomId === room.roomId));
}, 'Fleet map contains duplicate or disconnected identities')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`fleet`](/docs/api/schemas/crossfire-contracts-schema-response/#fleet)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`mapAgent`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapAgent)
- [`FLEET_MAP_LIMITS`](/docs/api/schemas/crossfire-kernel-fleet-map/#FLEET_MAP_LIMITS)
- [`mapRoom`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapRoom)
- [`mapConnection`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapConnection)
- [`mapSource`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapSource)
- [`principal`](/docs/api/schemas/crossfire-contracts-schema-response/#principal)
- [`owner`](/docs/api/schemas/crossfire-contracts-schema-response/#owner)
- [`grant`](/docs/api/schemas/crossfire-contracts-schema-response/#grant)

## FleetMapView {#FleetMapView}

```typescript
export type FleetMapView = Parsed<typeof fleetMap>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`fleetMap`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#fleetMap)

## MapAgent {#MapAgent}

```typescript
export type MapAgent = Parsed<typeof mapAgent>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`mapAgent`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapAgent)

## MapConnection {#MapConnection}

```typescript
export type MapConnection = Parsed<typeof mapConnection>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`mapConnection`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapConnection)

## MapSource {#MapSource}

```typescript
export type MapSource = Parsed<typeof mapSource>;
```

Related definitions:

- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)
- [`mapSource`](/docs/api/schemas/crossfire-contracts-schema-fleet-map/#mapSource)
