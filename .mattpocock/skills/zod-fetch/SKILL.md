---
name: Zod Fetch
description: Type-safe API fetching with Zod schema validation at runtime
---

# Zod Fetch

A simple API for building type and runtime-safe fetcher functions using Zod schemas.

**Source**: [mattpocock/zod-fetch](https://github.com/mattpocock/zod-fetch) (694 stars)

## The Problem

Fetching data without validation is dangerous:

```typescript
// Dangerous: No validation
const res = await fetch("/api/user");
const user = await res.json(); // any!
user.name.toUpperCase(); // Runtime error if name is missing
```

## The Solution

Validate responses with Zod schemas:

```typescript
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetchWithZod = createZodFetcher();

const user = await fetchWithZod(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  }),
  "/api/user"
);

// user is fully typed: { id: number; name: string; email: string }
user.name.toUpperCase(); // Safe!
```

## Installation

```bash
npm install zod-fetch zod
```

## Basic Usage

### Default Fetcher

```typescript
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetchWithZod = createZodFetcher();

// Schema first, then fetch arguments
const result = await fetchWithZod(
  z.object({
    hello: z.literal("world"),
  }),
  "/my-api"
);

console.log(result.hello); // "world"
```

### Custom Fetcher (Axios)

```typescript
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";
import axios from "axios";

const fetchWithZod = createZodFetcher(axios.get);

const result = await fetchWithZod(
  z.object({
    data: z.object({
      name: z.string(),
    }),
  }),
  "/user",
  { params: { id: 12345 } }
);

console.log(result.data.name);
```

## Common Patterns

### API Response Wrapper

```typescript
const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().optional(),
  });

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const result = await fetchWithZod(
  apiResponseSchema(userSchema),
  "/api/user/123"
);

if (result.success) {
  console.log(result.data.name);
}
```

### Array Responses

```typescript
const usersSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

const users = await fetchWithZod(usersSchema, "/api/users");
users.forEach(user => console.log(user.name));
```

### Optional Fields

```typescript
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().url().nullable(),
});

const user = await fetchWithZod(userSchema, "/api/user/123");
// user.bio is string | undefined
// user.avatar is string | null
```

### Transformations

```typescript
const userSchema = z.object({
  id: z.number(),
  created_at: z.string().transform(s => new Date(s)),
  name: z.string().transform(s => s.trim()),
});

const user = await fetchWithZod(userSchema, "/api/user/123");
// user.created_at is Date
// user.name is trimmed
```

## Error Handling

```typescript
try {
  const user = await fetchWithZod(userSchema, "/api/user/123");
} catch (error) {
  if (error instanceof z.ZodError) {
    // Validation failed
    console.error("Invalid response:", error.errors);
  } else {
    // Network or other error
    console.error("Fetch failed:", error);
  }
}
```

## Building Your Own

The core pattern is simple:

```typescript
import { z } from "zod";

async function fetchWithValidation<T extends z.ZodType>(
  schema: T,
  url: string,
  options?: RequestInit
): Promise<z.infer<T>> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const data = await response.json();
  return schema.parse(data);
}
```

## Why Use This Pattern?

1. **Type safety** — Compiler catches misuse
2. **Runtime safety** — Zod validates actual data
3. **Self-documenting** — Schemas describe your API
4. **Fail fast** — Errors at fetch time, not deep in app
5. **Composable** — Works with any fetcher

## Best Practices

1. **Define schemas in a central location** — Reuse across fetchers
2. **Use `.strict()` in development** — Catch extra fields
3. **Transform dates and IDs** — Parse at the boundary
4. **Handle errors properly** — Distinguish validation vs network errors
5. **Consider using with ts-reset** — For even better type safety

## Related

- [Zod Documentation](https://zod.dev)
- [ts-reset](https://github.com/mattpocock/ts-reset) — Better TypeScript defaults
- [tRPC](https://trpc.io) — Full-stack type safety
