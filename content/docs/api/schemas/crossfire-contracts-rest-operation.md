---
title: "crossfire/node/packages/contracts/src/rest/operation.ts"
linkTitle: "operation"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/rest/operation.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)

## Operation {#Operation}

```typescript
export type Operation<Params, Query, Input, Output> = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    auth: 'public' | 'human' | 'agent' | 'either' | 'fleet' | 'controller';
    params: Parser<Params>;
    query: Parser<Query>;
    input: Parser<Input>;
    output: Parser<Output>;
    status: 200 | 201 | 202;
    collection: boolean;
    permissions: readonly string[];
    description: string;
    requestBytes?: number;
    requestFormat?: 'binary';
};
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)

## operation {#operation}

```typescript
export function operation<Params, Query, Input, Output>(definition: Operation<Params, Query, Input, Output>): Operation<Params, Query, Input, Output> { return definition; }
```

Related definitions:

- [`Operation`](/docs/api/schemas/crossfire-contracts-rest-operation/#Operation)

## ParamsOf {#ParamsOf}

```typescript
export type ParamsOf<Value extends {
    params: Parser<unknown>;
}> = Parsed<Value['params']>;
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)

## QueryOf {#QueryOf}

```typescript
export type QueryOf<Value extends {
    query: Parser<unknown>;
}> = Parsed<Value['query']>;
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)

## InputOf {#InputOf}

```typescript
export type InputOf<Value extends {
    input: Parser<unknown>;
}> = Parsed<Value['input']>;
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)

## OutputOf {#OutputOf}

```typescript
export type OutputOf<Value extends {
    output: Parser<unknown>;
}> = Parsed<Value['output']>;
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)

## operationPath {#operationPath}

```typescript
export function operationPath(path: string, params: Record<string, string>): string {
    return path.replace(/\{([A-Za-z]+)\}/gu, (_match: string, key: string) => {
        const value = params[key];
        if (value === undefined)
            throw new Error('Missing route parameter: ' + key);
        return encodeURIComponent(value);
    });
}
```
