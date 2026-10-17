---
title: "fleetd/node/packages/contracts/src/configuration.ts"
linkTitle: "configuration"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/fleetd/node/packages/contracts/src/configuration.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)
- [`services/crossfire/node/packages/contracts/src/runtime.ts`](/docs/api/schemas/crossfire-contracts-runtime/)
- [`services/crossfire/node/packages/contracts/src/coordination-policy.ts`](/docs/api/schemas/crossfire-contracts-coordination-policy/)

## runtimeOptions {#runtimeOptions}

```typescript
runtimeOptions = (input: unknown): Result<Record<string, unknown>> => input && typeof input === 'object' && !Array.isArray(input) ? success(input as Record<string, unknown>) : failure('invalid', 'Expected runtime options')
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## instance {#instance}

```typescript
instance = check.object({ key: check.name, name: check.name, definition: check.name, workarea: check.text(1024),
    workspace: check.optional(check.refine(check.text(4096), value => value.startsWith('/') && !value.includes('\\')
        && value.split('/').slice(1).every(segment => segment && segment !== '.' && segment !== '..'), 'Workspace must be an absolute normalized directory')),
    listener_options: check.optional(listenerOptions), runtime_options: check.optional(runtimeOptions) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`definition`](/docs/api/schemas/fleetd-contracts-configuration/#definition)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`listenerOptions`](/docs/api/schemas/crossfire-contracts-runtime/#listenerOptions)
- [`runtimeOptions`](/docs/api/schemas/fleetd-contracts-configuration/#runtimeOptions)

## coordination {#coordination}

```typescript
coordination = check.object({ adapter: check.choice('crossfire'), server: check.text(2048), owner: check.matrixUserId })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)

## roster {#roster}

```typescript
roster = check.object({ fleet: check.name, coordination, instances: check.list(instance, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`coordination`](/docs/api/schemas/fleetd-contracts-configuration/#coordination)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`instance`](/docs/api/schemas/fleetd-contracts-configuration/#instance)

## coordinationOptions {#coordinationOptions}

```typescript
coordinationOptions = check.object({ wake_mode: check.wakeMode,
    wake_senders: check.list(check.object({ matrix_user_id: check.matrixUserId, include_agents: check.boolean }), 2000),
    permissions: check.list(check.choice('room.agent.invite'), 1) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`wakeMode`](/docs/api/schemas/crossfire-contracts-schema-validation/#wakeMode)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`matrixUserId`](/docs/api/schemas/crossfire-contracts-schema-validation/#matrixUserId)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## definition {#definition}

```typescript
definition = check.object({ name: check.text(100), runtime: implementedRuntime, coordination_options: check.optional(input => {
        const parsed = coordinationOptions(input);
        if (!parsed.ok)
            return parsed;
        const valid = coordinationPolicy({ wakeMode: parsed.value.wake_mode,
            senders: parsed.value.wake_senders.map(sender => ({ matrixUserId: sender.matrix_user_id, includeAgents: sender.include_agents })), permissions: parsed.value.permissions });
        return valid.ok ? parsed : valid;
    }), runtime_options: runtimeOptions })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)
- [`implementedRuntime`](/docs/api/schemas/crossfire-contracts-runtime/#implementedRuntime)
- [`optional`](/docs/api/schemas/crossfire-contracts-schema-validation/#optional)
- [`coordinationOptions`](/docs/api/schemas/fleetd-contracts-configuration/#coordinationOptions)
- [`coordinationPolicy`](/docs/api/schemas/crossfire-contracts-coordination-policy/#coordinationPolicy)
- [`runtimeOptions`](/docs/api/schemas/fleetd-contracts-configuration/#runtimeOptions)

## Instance {#Instance}

```typescript
export type Instance = check.Parsed<typeof instance>;
```

Related definitions:

- [`instance`](/docs/api/schemas/fleetd-contracts-configuration/#instance)

## Roster {#Roster}

```typescript
export type Roster = check.Parsed<typeof roster>;
```

Related definitions:

- [`roster`](/docs/api/schemas/fleetd-contracts-configuration/#roster)

## Definition {#Definition}

```typescript
export type Definition = check.Parsed<typeof definition>;
```

Related definitions:

- [`definition`](/docs/api/schemas/fleetd-contracts-configuration/#definition)

## parseToml {#parseToml}

```typescript
export function parseToml<Value>(source: string, parser: check.Parser<Value>): Result<Value> {
    if (Buffer.byteLength(source) > 1024 * 1024)
        return failure('limit', 'TOML exceeds 1 MiB');
    try {
        return parser(parse(source, { integersAsBigInt: 'asNeeded' }));
    }
    catch {
        return failure('invalid', 'Invalid TOML');
    }
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## relativePath {#relativePath}

```typescript
export function relativePath(value: string): boolean {
    return value.length > 0 && !value.startsWith('/') && !value.includes('\\') && value.split('/').every(segment => segment && segment !== '.' && segment !== '..' && !segment.startsWith('.'));
}
```

## validateRoster {#validateRoster}

```typescript
export function validateRoster(input: unknown): Result<Roster> {
    const result = roster(input);
    if (!result.ok)
        return result;
    const value = result.value;
    for (const key of ['key', 'name', 'workarea'] as const)
        if (new Set(value.instances.map(instance => instance[key])).size !== value.instances.length)
            return failure('invalid', 'Duplicate instance ' + key);
    for (const current of value.instances) {
        const segments = current.workarea.split('/');
        if (!relativePath(current.workarea) || segments[0] !== 'agents' || !check.name(segments[1]).ok || segments[2] !== 'workarea' || segments.length < 4)
            return failure('invalid', 'Work areas must be relative children of agents/<definition>/workarea');
        if (value.instances.some(other => other !== current && other.workarea.startsWith(current.workarea + '/')))
            return failure('invalid', 'Instance work areas cannot overlap');
    }
    let server: URL;
    try {
        server = new URL(value.coordination.server);
    }
    catch {
        return failure('invalid', 'Invalid Crossfire origin');
    }
    if (server.pathname !== '/' || server.username || server.password || server.search || server.hash ||
        server.protocol !== 'https:' && !(server.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(server.hostname)))
        return failure('invalid', 'Use an HTTPS origin or loopback HTTP');
    return success(value);
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`Roster`](/docs/api/schemas/fleetd-contracts-configuration/#Roster)
- [`roster`](/docs/api/schemas/fleetd-contracts-configuration/#roster)
- [`instance`](/docs/api/schemas/fleetd-contracts-configuration/#instance)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`relativePath`](/docs/api/schemas/fleetd-contracts-configuration/#relativePath)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`coordination`](/docs/api/schemas/fleetd-contracts-configuration/#coordination)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
