---
title: "crossfire/node/packages/contracts/src/schema/query.ts"
linkTitle: "query"
description: "Exact executable parser definitions and their imported contracts. Custom code is retained; no omitted checks are implied by field summaries."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/schema/query.ts"
generated: true
---


## How to read this page

These are the actual contract definitions at the documented source revision. They are reference text, not a distributed JavaScript SDK. All server implementations must enforce the same observable contract. `check.object` rejects unknown fields; custom functions and refinements remain part of validation.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/schema/request.ts`](/docs/api/schemas/crossfire-contracts-schema-request/)

## PageQuery {#PageQuery}

```typescript
export type PageQuery = {
    page: number;
    pageSize: number;
};
```

Related definitions:

- [`page`](/docs/api/schemas/crossfire-contracts-schema-query/#page)

## checked {#checked}

```typescript
function checked(input: unknown, allowed: readonly string[]): Result<URLSearchParams> { return listQuery(['page', 'pageSize', ...allowed])(input); }
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`listQuery`](/docs/api/schemas/crossfire-contracts-schema-request/#listQuery)

## page {#page}

```typescript
export function page(input: unknown) {
    const parsed = checked(input, []);
    return parsed.ok ? pagination(parsed.value) : parsed;
}
```

Related definitions:

- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)

## runtimeDecisions {#runtimeDecisions}

```typescript
export function runtimeDecisions(input: unknown): Result<PageQuery & {
    status: 'pending' | null;
}> {
    const parsed = checked(input, ['status']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const status = parsed.value.get('status');
    if (status === null)
        return success({ ...bounds.value, status: null });
    return status === 'pending' ? success({ ...bounds.value, status: 'pending' as const }) : failure('invalid', 'Invalid native decision status filter');
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`PageQuery`](/docs/api/schemas/crossfire-contracts-schema-query/#PageQuery)
- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## roomGrants {#roomGrants}

```typescript
export function roomGrants(input: unknown): Result<PageQuery & {
    roomIds?: string[];
}> {
    const parsed = checked(input, ['roomIds']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const source = parsed.value.get('roomIds');
    if (source === null)
        return bounds;
    if (new TextEncoder().encode(source).length > 16384)
        return failure('invalid', 'Room filter exceeds its size bound');
    let decoded: unknown;
    try {
        decoded = JSON.parse(source);
    }
    catch {
        return failure('invalid', 'roomIds must be a JSON array');
    }
    const roomIds = check.list(check.roomId, 100)(decoded);
    if (!roomIds.ok)
        return roomIds;
    if (new Set(roomIds.value).size !== roomIds.value.length)
        return failure('invalid', 'Duplicate room filter');
    return success({ ...bounds.value, roomIds: roomIds.value });
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`PageQuery`](/docs/api/schemas/crossfire-contracts-schema-query/#PageQuery)
- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## scoped {#scoped}

```typescript
export function scoped(input: unknown) {
    const parsed = checked(input, ['ownerId']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const ownerId = parsed.value.get('ownerId');
    if (ownerId === null)
        return success(bounds.value);
    const valid = check.identifier(ownerId);
    return valid.ok ? success({ ...bounds.value, ownerId }) : valid;
}
```

Related definitions:

- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## agents {#agents}

```typescript
export function agents(input: unknown) {
    const parsed = checked(input, ['ownerId', 'status', 'listener', 'search']);
    if (!parsed.ok)
        return parsed;
    const params = parsed.value;
    const bounds = pagination(params), ownerId = params.get('ownerId'), search = params.get('search') ?? '';
    if (!bounds.ok)
        return bounds;
    if (ownerId !== null) {
        const valid = check.identifier(ownerId);
        if (!valid.ok)
            return valid;
    }
    const statuses: ('active' | 'suspended' | 'revoked')[] = [];
    const selection = params.get('status') ?? 'active,suspended';
    for (const value of selection === '' ? [] : selection.split(',')) {
        const parsedStatus = check.status(value);
        if (!parsedStatus.ok)
            return parsedStatus;
        if (statuses.includes(parsedStatus.value))
            return failure('invalid', 'Duplicate account status');
        statuses.push(parsedStatus.value);
    }
    const listener = check.choice('all', 'online', 'offline', 'disconnecting')(params.get('listener') ?? 'all');
    if (!listener.ok)
        return listener;
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    return success({ ...bounds.value, statuses, search, listener: listener.value, ...(ownerId === null ? {} : { ownerId }) });
}
```

Related definitions:

- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`status`](/docs/api/schemas/crossfire-contracts-schema-validation/#status)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## fleets {#fleets}

```typescript
export function fleets(input: unknown) {
    const parsed = checked(input, ['ownerId', 'search']);
    if (!parsed.ok)
        return parsed;
    const params = new URLSearchParams(parsed.value), search = params.get('search') ?? '';
    params.delete('search');
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    const scope = scoped(params);
    return scope.ok ? success({ ...scope.value, search }) : scope;
}
```

Related definitions:

- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`scoped`](/docs/api/schemas/crossfire-contracts-schema-query/#scoped)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## principals {#principals}

```typescript
export function principals(input: unknown) {
    const parsed = checked(input, ['kind', 'search', 'excludeId']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value), kind = check.choice('all', 'human', 'agent')(parsed.value.get('kind') ?? 'all');
    if (!bounds.ok)
        return bounds;
    if (!kind.ok)
        return kind;
    const search = parsed.value.get('search') ?? '', excludeId = parsed.value.get('excludeId');
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    if (excludeId !== null) {
        const valid = check.identifier(excludeId);
        if (!valid.ok)
            return valid;
    }
    return success({ ...bounds.value, kind: kind.value, search, ...(excludeId === null ? {} : { excludeId }) });
}
```

Related definitions:

- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## rooms {#rooms}

```typescript
export function rooms(input: unknown) {
    const parsed = checked(input, ['agentId', 'search']);
    if (!parsed.ok)
        return parsed;
    const bounds = pagination(parsed.value);
    if (!bounds.ok)
        return bounds;
    const agentId = parsed.value.get('agentId'), search = parsed.value.get('search') ?? '';
    if (!check.text(200, 0)(search).ok)
        return failure('invalid', 'Invalid search');
    if (agentId !== null) {
        const valid = check.identifier(agentId);
        if (!valid.ok)
            return valid;
    }
    return success({ ...bounds.value, search, ...(agentId === null ? {} : { agentId }) });
}
```

Related definitions:

- [`checked`](/docs/api/schemas/crossfire-contracts-schema-query/#checked)
- [`pagination`](/docs/api/schemas/crossfire-contracts-schema-request/#pagination)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## roomContext {#roomContext}

```typescript
export function roomContext(input: unknown): Result<{
    agentId?: string;
}> {
    const parsed = listQuery(['agentId'])(input);
    if (!parsed.ok)
        return parsed;
    const agentId = parsed.value.get('agentId');
    if (agentId === null)
        return success({});
    const valid = check.identifier(agentId);
    return valid.ok ? success({ agentId }) : valid;
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`listQuery`](/docs/api/schemas/crossfire-contracts-schema-request/#listQuery)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)

## none {#none}

```typescript
export function none(input: unknown) {
    const parsed = listQuery([])(input);
    return parsed.ok ? success({}) : parsed;
}
```

Related definitions:

- [`listQuery`](/docs/api/schemas/crossfire-contracts-schema-request/#listQuery)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
