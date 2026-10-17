---
title: "crossfire/node/packages/contracts/src/runtime.ts"
linkTitle: "runtime"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/runtime.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/domain/src/runtime/values.ts`](/docs/api/schemas/crossfire-domain-runtime-values/)

## implementedRuntime {#implementedRuntime}

```typescript
implementedRuntime = check.choice(...implementedRuntimes)
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`implementedRuntimes`](/docs/api/schemas/crossfire-domain-runtime-values/#implementedRuntimes)

## runtimeState {#runtimeState}

```typescript
runtimeState = check.choice('idle', 'working', 'waiting-approval', 'waiting-answer', 'failed', 'unavailable', 'sleeping', 'waking')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## nativeRuntimeSummary {#nativeRuntimeSummary}

```typescript
nativeRuntimeSummary = check.object({ state: check.choice('idle', 'working', 'waiting-approval', 'waiting-answer', 'failed', 'unavailable', 'sleeping', 'waking', 'stopped'), observedAt: check.integer(),
    lastActivityAt: check.nullable(check.integer()), historyAvailable: check.nullable(check.boolean) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## listenerOptions {#listenerOptions}

```typescript
listenerOptions = check.object({ history_mode: check.optional(check.choice('shared', 'per-room')) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## option {#option}

```typescript
option = check.object({ id: check.text(255), label: check.text(1000), description: check.plainText(4000) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)

## decisionQuestion {#decisionQuestion}

```typescript
decisionQuestion = check.object({ id: check.text(255), title: check.text(1000), prompt: check.plainText(16000),
    secret: check.boolean, allowText: check.boolean, options: check.list(option, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`option`](/docs/api/schemas/crossfire-contracts-runtime/#option)

## decisionFields {#decisionFields}

```typescript
decisionFields = { id: check.identifier, runId: check.identifier, runtime: check.name,
    sessionId: check.text(255), requestId: check.text(255), turnId: check.text(255), itemId: check.text(255),
    kind: check.choice('permission', 'question'), action: check.text(255), review: check.refine(check.plainText(MAX_REVIEW_BYTES), value => new TextEncoder().encode(value).byteLength <= MAX_REVIEW_BYTES, 'Native review exceeds the separate UTF-8 resource bound'),
    blocking: check.boolean, expiresAt: check.nullable(check.integer()), questions: check.list(decisionQuestion, 100, 1) }
```

Related definitions:

- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)
- [`MAX_REVIEW_BYTES`](/docs/api/schemas/crossfire-domain-runtime-values/#MAX_REVIEW_BYTES)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`decisionQuestion`](/docs/api/schemas/crossfire-contracts-runtime/#decisionQuestion)

## decisionCreation {#decisionCreation}

```typescript
decisionCreation = check.object({ ...decisionFields, runtime: implementedRuntime }) satisfies check.Parser<DecisionCreation>
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`decisionFields`](/docs/api/schemas/crossfire-contracts-runtime/#decisionFields)
- [`implementedRuntime`](/docs/api/schemas/crossfire-contracts-runtime/#implementedRuntime)
- [`DecisionCreation`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionCreation)

## decisionAnswer {#decisionAnswer}

```typescript
decisionAnswer = check.object({ questionId: check.text(255), optionId: check.nullable(check.text(255)), text: check.nullable(check.plainText(16000)) }) satisfies check.Parser<DecisionAnswer>
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)
- [`DecisionAnswer`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionAnswer)

## decisionSubmission {#decisionSubmission}

```typescript
decisionSubmission = check.object({ answers: check.list(decisionAnswer, 100, 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`decisionAnswer`](/docs/api/schemas/crossfire-contracts-runtime/#decisionAnswer)

## decisionStatus {#decisionStatus}

```typescript
decisionStatus = check.choice('pending', 'answered', 'responded', 'cancelled', 'expired')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## decisionView {#decisionView}

```typescript
decisionView = check.object({ ...decisionFields, agentId: check.identifier, status: decisionStatus, createdAt: check.integer() }) satisfies check.Parser<DecisionView>
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`decisionFields`](/docs/api/schemas/crossfire-contracts-runtime/#decisionFields)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`decisionStatus`](/docs/api/schemas/crossfire-contracts-runtime/#decisionStatus)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`DecisionView`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionView)

## summaryFields {#summaryFields}

```typescript
{ review: _review, questions: _questions, ...summaryFields } = decisionFields
```

Related definitions:

- [`decisionFields`](/docs/api/schemas/crossfire-contracts-runtime/#decisionFields)

## decisionSummary {#decisionSummary}

```typescript
decisionSummary = check.object({ ...summaryFields, agentId: check.identifier, status: decisionStatus, createdAt: check.integer() }) satisfies check.Parser<DecisionSummary>
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`summaryFields`](/docs/api/schemas/crossfire-contracts-runtime/#summaryFields)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`decisionStatus`](/docs/api/schemas/crossfire-contracts-runtime/#decisionStatus)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`DecisionSummary`](/docs/api/schemas/crossfire-domain-runtime-values/#DecisionSummary)

## decisionReceipt {#decisionReceipt}

```typescript
decisionReceipt = check.object({ status: check.choice('responded', 'cancelled') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## decisionPoll {#decisionPoll}

```typescript
decisionPoll = check.object({ status: decisionStatus, answers: check.list(decisionAnswer, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`decisionStatus`](/docs/api/schemas/crossfire-contracts-runtime/#decisionStatus)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`decisionAnswer`](/docs/api/schemas/crossfire-contracts-runtime/#decisionAnswer)

## setting {#setting}

```typescript
setting = check.object({ name: check.text(100), configured: check.nullable(check.text(1000)), effective: check.nullable(check.text(1000)) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)

## observationFields {#observationFields}

```typescript
observationFields = { sessionId: check.text(255), roomId: check.nullable(check.roomId), runtime: check.name, state: runtimeState,
    observedAt: check.integer(), lastActivityAt: check.nullable(check.integer()), historyAvailable: check.nullable(check.boolean),
    historyMode: check.choice('shared', 'per-room'), maxInputBytes: check.integer(1024, MAX_INPUT_BYTES),
    settings: check.list(setting, 100), errorMessage: check.nullable(check.plainText(4000)) }
```

Related definitions:

- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`roomId`](/docs/api/schemas/crossfire-contracts-schema-validation/#roomId)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`runtimeState`](/docs/api/schemas/crossfire-contracts-runtime/#runtimeState)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`MAX_INPUT_BYTES`](/docs/api/schemas/crossfire-domain-runtime-values/#MAX_INPUT_BYTES)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`setting`](/docs/api/schemas/crossfire-contracts-runtime/#setting)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)

## observation {#observation}

```typescript
observation = check.object({ ...observationFields, runtime: implementedRuntime }) satisfies check.Parser<RuntimeObservation>
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`observationFields`](/docs/api/schemas/crossfire-contracts-runtime/#observationFields)
- [`implementedRuntime`](/docs/api/schemas/crossfire-contracts-runtime/#implementedRuntime)
- [`RuntimeObservation`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeObservation)

## observationView {#observationView}

```typescript
observationView = check.object({ runId: check.identifier, ...observationFields }) satisfies check.Parser<RuntimeObservationView>
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`observationFields`](/docs/api/schemas/crossfire-contracts-runtime/#observationFields)
- [`RuntimeObservationView`](/docs/api/schemas/crossfire-domain-runtime-values/#RuntimeObservationView)

## observations {#observations}

```typescript
observations = check.list(observationView, 2002)
```

Related definitions:

- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`observationView`](/docs/api/schemas/crossfire-contracts-runtime/#observationView)

## failureReport {#failureReport}

```typescript
failureReport = check.object({ episodeId: check.identifier, agentId: check.identifier, sessionId: check.nullable(check.text(255)), message: check.plainText(4000) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`identifier`](/docs/api/schemas/crossfire-contracts-schema-validation/#identifier)
- [`nullable`](/docs/api/schemas/crossfire-contracts-schema-validation/#nullable)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)
