---
title: "crossfire/node/packages/contracts/src/schema/validation.ts"
linkTitle: "validation"
description: "Validation functions, types and constants from the recorded source revision."
sourceProject: "ctlflow"
sourcePath: "services/crossfire/node/packages/contracts/src/schema/validation.ts"
generated: true
---


## Definitions

These TypeScript definitions document server validation. `check.object` rejects unknown fields. Custom functions and refinements specify additional checks.

### Imported definitions

- [`services/crossfire/node/packages/kernel/src/result.ts`](/docs/api/schemas/crossfire-kernel-result/)

## Parser {#Parser}

```typescript
export type Parser<T> = (input: unknown) => Result<T>;
```

Related definitions:

- [`Result`](/docs/api/schemas/crossfire-kernel-result/#Result)

## Parsed {#Parsed}

```typescript
export type Parsed<Check> = Check extends Parser<infer Value> ? Value : never;
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)

## refine {#refine}

```typescript
export function refine<Value>(parse: Parser<Value>, accepts: (value: Value) => boolean, message: string): Parser<Value> {
    return input => { const parsed = parse(input); return !parsed.ok || accepts(parsed.value) ? parsed : failure('invalid', message); };
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## text {#text}

```typescript
export function text(maximum = 255, minimum = 1): Parser<string> {
    return input => typeof input === 'string' && input.length >= minimum && input.length <= maximum && input.isWellFormed() && !/[\u0000-\u001f\u007f]/u.test(input)
        ? success(input) : failure('invalid', 'Expected text of ' + minimum + '–' + maximum + ' characters');
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## integer {#integer}

```typescript
export function integer(minimum = 0, maximum = Number.MAX_SAFE_INTEGER): Parser<number> {
    return input => typeof input === 'number' && Number.isSafeInteger(input) && input >= minimum && input <= maximum ? success(input) : failure('invalid', 'Expected a bounded integer');
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## boolean {#boolean}

```typescript
boolean: Parser<boolean> = input => typeof input === 'boolean' ? success(input) : failure('invalid', 'Expected a boolean')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## choice {#choice}

```typescript
export function choice<const Values extends readonly string[]>(...values: Values): Parser<Values[number]> {
    return input => typeof input === 'string' && values.includes(input) ? success(input) : failure('invalid', 'Choose one of: ' + values.join(', '));
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## nullable {#nullable}

```typescript
export function nullable<Value>(parse: Parser<Value>): Parser<Value | null> { return input => input === null ? success(null) : parse(input); }
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## optional {#optional}

```typescript
export function optional<Value>(parse: Parser<Value>): Parser<Value | undefined> { return input => input === undefined ? success(undefined) : parse(input); }
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## list {#list}

```typescript
export function list<Value>(parse: Parser<Value>, maximum = 100, minimum = 0): Parser<Value[]> {
    return input => {
        if (!Array.isArray(input) || input.length < minimum || input.length > maximum)
            return failure('invalid', 'Expected a bounded list');
        const values: Value[] = [];
        for (const item of input) {
            const result = parse(item);
            if (!result.ok)
                return result;
            values.push(result.value);
        }
        return success(values);
    };
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## Shape {#Shape}

```typescript
type Shape = Record<string, Parser<unknown>>;
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)

## OptionalKeys {#OptionalKeys}

```typescript
type OptionalKeys<Fields extends Shape> = {
    [Key in keyof Fields]: undefined extends Parsed<Fields[Key]> ? Key : never;
}[keyof Fields];
```

Related definitions:

- [`Shape`](/docs/api/schemas/crossfire-contracts-schema-validation/#Shape)
- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)

## ObjectValue {#ObjectValue}

```typescript
type ObjectValue<Fields extends Shape> = {
    [Key in Exclude<keyof Fields, OptionalKeys<Fields>>]: Parsed<Fields[Key]>;
} & {
    [Key in OptionalKeys<Fields>]?: Exclude<Parsed<Fields[Key]>, undefined>;
};
```

Related definitions:

- [`Shape`](/docs/api/schemas/crossfire-contracts-schema-validation/#Shape)
- [`OptionalKeys`](/docs/api/schemas/crossfire-contracts-schema-validation/#OptionalKeys)
- [`Parsed`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parsed)

## object {#object}

```typescript
export function object<const Fields extends Shape>(fields: Fields): Parser<ObjectValue<Fields>> {
    return input => {
        if (!input || typeof input !== 'object' || Array.isArray(input))
            return failure('invalid', 'Expected an object');
        const record = input as Record<string, unknown>;
        if (Object.keys(record).some(key => !Object.hasOwn(fields, key)))
            return failure('invalid', 'Unknown request fields');
        const output: Record<string, unknown> = {};
        for (const [key, parse] of Object.entries(fields)) {
            const parsed = parse(record[key]);
            if (!parsed.ok)
                return { ok: false, error: { code: parsed.error.code, message: key + ': ' + parsed.error.message, fieldErrors: { [key]: parsed.error.message } } };
            if (parsed.value !== undefined)
                output[key] = parsed.value;
        }
        return success(output as ObjectValue<Fields>);
    };
}
```

Related definitions:

- [`Shape`](/docs/api/schemas/crossfire-contracts-schema-validation/#Shape)
- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`ObjectValue`](/docs/api/schemas/crossfire-contracts-schema-validation/#ObjectValue)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)

## identifier {#identifier}

```typescript
identifier: Parser<string> = input => typeof input === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u.test(input)
    ? success(input) : failure('invalid', 'Expected an opaque UUID')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## name {#name}

```typescript
name: Parser<string> = input => typeof input === 'string' && /^[a-z][a-z0-9-]{0,39}$/u.test(input) ? success(input) : failure('invalid', 'Expected a lowercase name of 1–40 characters')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## matrixUserId {#matrixUserId}

```typescript
matrixUserId: Parser<string> = input => typeof input === 'string' && input.length <= 255 && input.isWellFormed() && /^@[^:\s]+:[^\s]+$/u.test(input) ? success(input) : failure('invalid', 'Expected a Matrix user ID')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## roomId {#roomId}

```typescript
roomId: Parser<string> = input => typeof input === 'string' && input.length <= 255 && input.isWellFormed() && /^!\S+$/u.test(input) ? success(input) : failure('invalid', 'Expected an immutable Matrix room ID')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## eventId {#eventId}

```typescript
eventId: Parser<string> = input => typeof input === 'string' && input.length <= 255 && input.isWellFormed() && /^\$\S+$/u.test(input) ? success(input) : failure('invalid', 'Expected a Matrix event ID')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## secret {#secret}

```typescript
secret: Parser<string> = input => typeof input === 'string' && /^[A-Za-z0-9_-]{43}$/u.test(input) ? success(input) : failure('invalid', 'Expected a private 32-byte claim')
```

Related definitions:

- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## empty {#empty}

```typescript
empty = object({})
```

Related definitions:

- [`object`](/docs/api/schemas/crossfire-contracts-schema-validation/#object)

## status {#status}

```typescript
status = choice('active', 'suspended', 'revoked')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## wakeMode {#wakeMode}

```typescript
wakeMode = choice('selected', 'humans', 'everyone')
```

Related definitions:

- [`choice`](/docs/api/schemas/crossfire-contracts-schema-validation/#choice)

## plainText {#plainText}

```typescript
export function plainText(maximumBytes: number): Parser<string> {
    return input => typeof input === 'string' && input.isWellFormed() && new TextEncoder().encode(input).length <= maximumBytes && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(input)
        ? success(input) : failure('invalid', 'Expected plain text up to ' + maximumBytes + ' UTF-8 bytes');
}
```

Related definitions:

- [`Parser`](/docs/api/schemas/crossfire-contracts-schema-validation/#Parser)
- [`success`](/docs/api/schemas/crossfire-kernel-result/#success)
- [`failure`](/docs/api/schemas/crossfire-kernel-result/#failure)

## multiline {#multiline}

```typescript
multiline = plainText(8192)
```

Related definitions:

- [`plainText`](/docs/api/schemas/crossfire-contracts-schema-validation/#plainText)
