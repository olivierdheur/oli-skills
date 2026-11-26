---
name: TypeScript Reset
description: A CSS reset for TypeScript - fix built-in type issues with JSON.parse, fetch, filter, includes
---

# TypeScript Reset

A "CSS reset" for TypeScript that improves types for common JavaScript APIs.

**Source**: [mattpocock/ts-reset](https://github.com/mattpocock/ts-reset) (8.6K stars)

## The Problem

TypeScript's built-in types have sharp edges:

| Issue | Without ts-reset | With ts-reset |
|-------|------------------|---------------|
| `JSON.parse()` | Returns `any` | Returns `unknown` |
| `fetch().json()` | Returns `any` | Returns `unknown` |
| `.filter(Boolean)` | Keeps nullish types | Removes nullish types |
| `array.includes()` | Breaks on readonly | Works ergonomically |

## Installation

```bash
npm install -D @total-typescript/ts-reset
```

Then create a `reset.d.ts` file (or add to existing):

```typescript
// reset.d.ts
import "@total-typescript/ts-reset";
```

Or import specific rules:

```typescript
// Only JSON.parse fix
import "@total-typescript/ts-reset/json-parse";

// Only filter(Boolean) fix
import "@total-typescript/ts-reset/filter-boolean";
```

## What It Fixes

### 1. JSON.parse Returns `unknown`

**Before:**
```typescript
const data = JSON.parse(input);
// data: any — no type safety!

data.foo.bar.baz; // No error, disaster waiting
```

**After:**
```typescript
const data = JSON.parse(input);
// data: unknown — must validate!

if (isMyType(data)) {
  data.foo; // Safe access
}
```

### 2. fetch().json() Returns `unknown`

**Before:**
```typescript
const res = await fetch("/api/user");
const user = await res.json();
// user: any

user.name.toUpperCase(); // Runtime error if no name
```

**After:**
```typescript
const res = await fetch("/api/user");
const user = await res.json();
// user: unknown

// Must validate first
const parsed = userSchema.parse(user);
parsed.name.toUpperCase(); // Safe!
```

### 3. filter(Boolean) Removes Nullish

**Before:**
```typescript
const arr = [1, null, 2, undefined, 3];
const filtered = arr.filter(Boolean);
// filtered: (number | null | undefined)[]
// Still includes nullish in type!
```

**After:**
```typescript
const arr = [1, null, 2, undefined, 3];
const filtered = arr.filter(Boolean);
// filtered: number[]
// Correctly narrows the type!
```

### 4. array.includes() Works With Readonly

**Before:**
```typescript
const arr = ["a", "b", "c"] as const;
const input: string = getInput();

arr.includes(input);
// Error: Argument of type 'string' is not assignable to
// parameter of type '"a" | "b" | "c"'
```

**After:**
```typescript
const arr = ["a", "b", "c"] as const;
const input: string = getInput();

arr.includes(input); // Works!
// Returns boolean, properly typed
```

### 5. Set.has() Works Ergonomically

**Before:**
```typescript
const set = new Set(["a", "b", "c"]);
const input: string = getInput();

set.has(input);
// Error with strict types
```

**After:**
```typescript
const set = new Set(["a", "b", "c"]);
const input: string = getInput();

set.has(input); // Works!
```

### 6. Map.has() Returns Type Guard

**Before:**
```typescript
const map = new Map<string, number>();
const key = "foo";

if (map.has(key)) {
  map.get(key); // number | undefined — still needs check!
}
```

**After:**
```typescript
const map = new Map<string, number>();
const key = "foo";

if (map.has(key)) {
  map.get(key); // number — properly narrowed!
}
```

## Available Rules

Import all or pick specific ones:

```typescript
// All rules
import "@total-typescript/ts-reset";

// Individual rules
import "@total-typescript/ts-reset/json-parse";
import "@total-typescript/ts-reset/fetch";
import "@total-typescript/ts-reset/filter-boolean";
import "@total-typescript/ts-reset/array-includes";
import "@total-typescript/ts-reset/set-has";
import "@total-typescript/ts-reset/map-has";
import "@total-typescript/ts-reset/array-index-of";
import "@total-typescript/ts-reset/is-array";
```

## Best Practices

1. **Add to every TypeScript project** — It's a devDependency, no runtime cost
2. **Use with Zod or similar** — `unknown` return types pair perfectly with schema validation
3. **Import in a `.d.ts` file** — Keeps types clean, no bundled code
4. **Use specific imports if needed** — Some teams prefer granular control

## Why This Matters

TypeScript's `any` return types are a major source of runtime errors. By returning `unknown`, ts-reset forces you to validate data before using it, catching bugs at compile time instead of runtime.

```typescript
// The ts-reset philosophy:
// "If I don't know the shape, I shouldn't pretend I do"

const data = JSON.parse(input);

// Without ts-reset: data.user.name (pray it exists)
// With ts-reset: validate first, then access safely
```
