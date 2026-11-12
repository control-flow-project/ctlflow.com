---
title: "fleetd/packages/contracts/src/execution.ts"
linkTitle: "execution"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/fleetd/packages/contracts/src/execution.ts"
generated: true
---


## Definitions

All code blocks below are TypeScript declarations copied from the server. They document validation, not JSON to send or code to paste into a chat. Clients can use any HTTP library without importing these declarations. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/packages/contracts/src/schema/validation.ts`](/docs/api/schemas/crossfire-contracts-schema-validation/)
- [`services/crossfire/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## host {#host}

```typescript
host = check.object({ kind: check.choice('host') })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## vm {#vm}

```typescript
vm = check.object({ kind: check.choice('vm'), image: check.name, profile: check.name })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`image`](/docs/api/schemas/fleetd-contracts-execution/#image)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`profile`](/docs/api/schemas/fleetd-contracts-execution/#profile)

## executionPlacement {#executionPlacement}

```typescript
export function executionPlacement(input: unknown): Result<ExecutionPlacement> {
    if (!input || typeof input !== 'object' || Array.isArray(input) || !('kind' in input))
        return failure('invalid', 'Select host or VM execution');
    return input.kind === 'host' ? host(input) : vm(input);
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`host`](/docs/api/schemas/fleetd-contracts-execution/#host)
- [`vm`](/docs/api/schemas/fleetd-contracts-execution/#vm)

## validateExecution {#validateExecution}

```typescript
export function validateExecution(placements: readonly ExecutionPlacement[], catalog: ExecutionCatalog | undefined): Result<null> {
    for (const placement of placements) {
        if (placement.kind === 'vm' && (!catalog || !Object.hasOwn(catalog.images, placement.image)
            || !Object.hasOwn(catalog.profiles, placement.profile)))
            return failure('invalid', 'VM execution must reference an image and profile in this fleet execution catalog');
    }
    return success(null);
}
```

Related definitions:

- [`catalog`](/docs/api/schemas/fleetd-contracts-execution/#catalog)
- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`image`](/docs/api/schemas/fleetd-contracts-execution/#image)
- [`profile`](/docs/api/schemas/fleetd-contracts-execution/#profile)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## absolute {#absolute}

```typescript
absolute = check.refine(check.text(4096), value => value.startsWith('/') && !value.includes('\\')
    && value.split('/').slice(1).every(segment => segment.length > 0 && segment !== '.' && segment !== '..'), 'Use an absolute normalized path')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## sha256 {#sha256}

```typescript
sha256 = check.refine(check.text(64, 64), value => /^[a-f0-9]{64}$/u.test(value), 'Use a lowercase SHA256 digest')
```

Related definitions:

- [`refine`](/docs/api/schemas/crossfire-contracts-schema-validation/#refine)
- [`text`](/docs/api/schemas/crossfire-contracts-schema-validation/#text)

## image {#image}

```typescript
image = check.object({ path: absolute, sha256 })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`absolute`](/docs/api/schemas/fleetd-contracts-execution/#absolute)
- [`sha256`](/docs/api/schemas/fleetd-contracts-execution/#sha256)

## mount {#mount}

```typescript
mount = check.object({ path: absolute, read_only: check.boolean })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`absolute`](/docs/api/schemas/fleetd-contracts-execution/#absolute)
- [`boolean`](/docs/api/schemas/crossfire-contracts-schema-validation/#boolean)

## profile {#profile}

```typescript
profile = check.object({ cpus: check.integer(1, 64), memory_mib: check.integer(256, 1048576),
    maximum_memory_mib: check.integer(256, 1048576), network: check.choice('disabled', 'outbound'), mounts: check.list(mount, 100) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)
- [`list`](/docs/api/schemas/crossfire-contracts-schema-validation/#list)
- [`mount`](/docs/api/schemas/fleetd-contracts-execution/#mount)

## named {#named}

```typescript
function named<Value>(parse: check.Parser<Value>): check.Parser<Record<string, Value>> {
    return input => {
        if (!input || typeof input !== 'object' || Array.isArray(input))
            return failure('invalid', 'Expected named execution definitions');
        const entries = Object.entries(input);
        if (entries.length < 1 || entries.length > 100)
            return failure('invalid', 'Use 1–100 named execution definitions');
        const values: [
            string,
            Value
        ][] = [];
        for (const [name, source] of entries) {
            const key = check.name(name);
            if (!key.ok)
                return key;
            const value = parse(source);
            if (!value.ok)
                return value;
            values.push([name, value.value]);
        }
        return success(Object.fromEntries(values));
    };
}
```

Related definitions:

- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`name`](/docs/api/schemas/crossfire-contracts-schema-validation/#name)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## catalog {#catalog}

```typescript
catalog = check.object({ memory_budget_mib: check.integer(512, 1048576), host_reserve_mib: check.integer(256, 1048576),
    images: named(image), profiles: named(profile) })
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)
- [`integer`](/docs/api/schemas/crossfire-contracts-schema-validation/#integer)
- [`named`](/docs/api/schemas/fleetd-contracts-execution/#named)
- [`image`](/docs/api/schemas/fleetd-contracts-execution/#image)
- [`profile`](/docs/api/schemas/fleetd-contracts-execution/#profile)

## executionCatalog {#executionCatalog}

```typescript
export function executionCatalog(input: unknown): Result<ExecutionCatalog> {
    const parsed = catalog(input);
    if (!parsed.ok)
        return parsed;
    const value = parsed.value;
    const images: Record<string, VmImage> = value.images;
    const profiles: [
        string,
        VmProfile
    ][] = [];
    for (const [name, source] of Object.entries(value.profiles)) {
        if (source.memory_mib > source.maximum_memory_mib || source.maximum_memory_mib > value.memory_budget_mib)
            return failure('invalid', 'VM target must fit its maximum and the controller memory budget');
        const paths = source.mounts.map(mount => mount.path);
        if (new Set(paths).size !== paths.length || paths.some(path => paths.some(other => other !== path && other.startsWith(path + '/'))))
            return failure('invalid', 'VM profile mounts cannot duplicate or overlap');
        const mounts: VmMount[] = source.mounts.map(mount => ({ path: mount.path, readOnly: mount.read_only }));
        profiles.push([name, { cpus: source.cpus, memoryMiB: source.memory_mib, maximumMemoryMiB: source.maximum_memory_mib,
                network: source.network, mounts }]);
    }
    return success({ memoryBudgetMiB: value.memory_budget_mib, hostReserveMiB: value.host_reserve_mib,
        images, profiles: Object.fromEntries(profiles) });
}
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)
- [`catalog`](/docs/api/schemas/fleetd-contracts-execution/#catalog)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`mount`](/docs/api/schemas/fleetd-contracts-execution/#mount)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
