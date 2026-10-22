---
title: "crossfire/node/packages/kernel/src/history-context.ts"
linkTitle: "history-context"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/kernel/src/history-context.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/identifier.ts`](/docs/api/schemas/crossfire-kernel-identifier/)

## MAX_HISTORY_CONTEXT {#MAX_HISTORY_CONTEXT}

```typescript
MAX_HISTORY_CONTEXT = 260
```

## roomContext {#roomContext}

```typescript
export function roomContext(room: string): string { return 'room/' + room; }
```

## contextRoom {#contextRoom}

```typescript
export function contextRoom(context: string): string | null { return context.startsWith('room/') ? context.slice(5) : null; }
```

## validHistoryContext {#validHistoryContext}

```typescript
export function validHistoryContext(context: string): boolean {
    const room = contextRoom(context);
    return context === 'shared' || context === 'control' || room !== null && opaqueIdentifier(room);
}
```

Related definitions:

- [`contextRoom`](/docs/api/schemas/crossfire-kernel-history-context/#contextRoom)
- [`opaqueIdentifier`](/docs/api/schemas/crossfire-kernel-identifier/#opaqueIdentifier)
