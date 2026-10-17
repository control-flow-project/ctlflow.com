---
title: "crossfire/node/packages/domain/src/runtime/values.ts"
linkTitle: "values"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/domain/src/runtime/values.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

This module has no local contract dependencies.

## INPUT_BYTES {#INPUT_BYTES}

```typescript
INPUT_BYTES = 65536
```

## MAX_INPUT_BYTES {#MAX_INPUT_BYTES}

```typescript
MAX_INPUT_BYTES = 4 * 1024 * 1024
```

## MAX_REVIEW_BYTES {#MAX_REVIEW_BYTES}

```typescript
MAX_REVIEW_BYTES = 8 * 1024 * 1024
```

## implementedRuntimes {#implementedRuntimes}

```typescript
implementedRuntimes = ['codex', 'pi'] as const
```

## DecisionOption {#DecisionOption}

```typescript
export type DecisionOption = {
    id: string;
    label: string;
    description: string;
};
```

## DecisionQuestion {#DecisionQuestion}

```typescript
export type DecisionQuestion = {
    id: string;
    title: string;
    prompt: string;
    secret: boolean;
    allowText: boolean;
    options: DecisionOption[];
};
```

Related definitions:

- [`DecisionOption`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionOption)

## DecisionCreation {#DecisionCreation}

```typescript
export type DecisionCreation = {
    id: string;
    runId: string;
    runtime: string;
    sessionId: string;
    requestId: string;
    turnId: string;
    itemId: string;
    kind: 'permission' | 'question';
    action: string;
    review: string;
    blocking: boolean;
    expiresAt: number | null;
    questions: DecisionQuestion[];
};
```

Related definitions:

- [`DecisionQuestion`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionQuestion)

## DecisionStatus {#DecisionStatus}

```typescript
export type DecisionStatus = 'pending' | 'answered' | 'responded' | 'cancelled' | 'expired';
```

## DecisionView {#DecisionView}

```typescript
export type DecisionView = DecisionCreation & {
    agentId: string;
    status: DecisionStatus;
    createdAt: number;
};
```

Related definitions:

- [`DecisionCreation`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionCreation)
- [`DecisionStatus`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionStatus)

## DecisionSummary {#DecisionSummary}

```typescript
export type DecisionSummary = Omit<DecisionView, 'review' | 'questions'>;
```

Related definitions:

- [`DecisionView`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionView)

## DecisionAnswer {#DecisionAnswer}

```typescript
export type DecisionAnswer = {
    questionId: string;
    optionId: string | null;
    text: string | null;
};
```

## RuntimeState {#RuntimeState}

```typescript
export type RuntimeState = 'idle' | 'working' | 'waiting-approval' | 'waiting-answer' | 'failed' | 'unavailable' | 'sleeping' | 'waking';
```

## RuntimeSetting {#RuntimeSetting}

```typescript
export type RuntimeSetting = {
    name: string;
    configured: string | null;
    effective: string | null;
};
```

## RuntimeObservation {#RuntimeObservation}

```typescript
export type RuntimeObservation = {
    sessionId: string;
    roomId: string | null;
    runtime: string;
    state: RuntimeState;
    observedAt: number;
    lastActivityAt: number | null;
    historyAvailable: boolean | null;
    historyMode: 'shared' | 'per-room';
    maxInputBytes: number;
    settings: RuntimeSetting[];
    errorMessage: string | null;
};
```

Related definitions:

- [`RuntimeState`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeState)
- [`RuntimeSetting`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeSetting)

## NativeRuntimeSummary {#NativeRuntimeSummary}

```typescript
export type NativeRuntimeSummary = Pick<RuntimeObservation, 'observedAt' | 'lastActivityAt' | 'historyAvailable'> & {
    state: RuntimeState | 'stopped';
};
```

Related definitions:

- [`RuntimeObservation`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeObservation)
- [`RuntimeState`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeState)

## RuntimeObservationView {#RuntimeObservationView}

```typescript
export type RuntimeObservationView = RuntimeObservation & {
    runId: string;
};
```

Related definitions:

- [`RuntimeObservation`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeObservation)
