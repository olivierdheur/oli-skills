---
name: AI SDK Patterns
description: Essential patterns for building AI apps - guardrails, message types, tokens, tools, and common mistakes
---

# AI SDK Patterns

Essential patterns for building AI-powered applications with the Vercel AI SDK.

**Source**: [mattpocock/ai-sdk-tips](https://github.com/mattpocock/ai-sdk-tips)

## Message Types

Understanding LLM conversation structure:

### User & Assistant Messages

```typescript
// User message: from you
{ role: "user", content: "What is 2 + 2?" }

// Assistant message: from the LLM
{ role: "assistant", content: "2 + 2 equals 4." }
```

### System Prompts

Messages at conversation start, visible to LLM but not user:

```typescript
const result = await generateText({
  model: openai("gpt-4"),
  system: "You are a helpful math tutor. Always show your work.",
  messages: [
    { role: "user", content: "What is 2 + 2?" }
  ],
});
```

System prompts take priority over user messages in conflicts.

### Reasoning Tokens

Some models "think" before responding:

```typescript
const result = await generateText({
  model: anthropic("claude-3-opus"),
  messages: [{ role: "user", content: "Solve this logic puzzle..." }],
});

// result includes reasoning tokens in thinking models
```

### Multi-part Messages

Messages can contain multiple parts (text, files, tool calls):

```typescript
{
  role: "user",
  content: [
    { type: "text", text: "Summarize this PDF" },
    { type: "file", data: pdfBuffer, mimeType: "application/pdf" }
  ]
}
```

## Tools

Extend LLM capabilities with callable functions:

### Tool Definition

```typescript
const tools = {
  writeFile: {
    description: "Write content to a file",
    parameters: z.object({
      path: z.string().describe("File path"),
      content: z.string().describe("File content"),
    }),
    execute: async ({ path, content }) => {
      await fs.writeFile(path, content);
      return `Wrote ${content.length} bytes to ${path}`;
    },
  },
};
```

### Tool Call Flow

1. LLM receives tool definitions in system prompt
2. User asks: "Write a todo.md file"
3. LLM returns tool call: `{ tool: "writeFile", args: { path: "todo.md", content: "..." } }`
4. You execute the tool
5. Send tool result back to LLM
6. LLM summarizes what happened

```typescript
const result = await generateText({
  model: openai("gpt-4"),
  tools,
  messages: [{ role: "user", content: "Write a todo.md file" }],
});

// result.toolCalls contains the calls to execute
```

## Guardrails Pattern

Validate requests before expensive LLM calls:

```typescript
const checkIsRequestSafe = async (messages: ModelMessage[]) => {
  // Use a FAST model for validation
  const result = await generateText({
    model: google("gemini-2.0-flash-lite"),
    system: `You are a safety checker. Respond with only:
1 - if the request is safe
0 - if the request is unsafe`,
    messages,
  });

  return result.text.trim() === "1";
};

// In your API route:
const isSafe = await checkIsRequestSafe(messages);
if (!isSafe) {
  return new Response("Request rejected", { status: 400 });
}

// Continue with main LLM call...
```

**Key insight**: Single-token responses are extremely fast. Use them for routing and validation.

### Applications

- **Safety checks**: Block harmful requests
- **Smart routing**: Route complex queries to powerful models, simple ones to fast models
- **Cost optimization**: Filter before expensive inference

## Token Optimization

### Understanding Tokens

- ~4 characters or ~0.75 words per token
- Input tokens: what you send (cheaper)
- Output tokens: what LLM generates (more expensive)

### Efficient Data Formatting

```typescript
// Bad: Verbose JSON (many tokens)
const data = JSON.stringify(users, null, 2);

// Good: Compact format (fewer tokens)
const data = users.map(u => `${u.id}|${u.name}|${u.email}`).join("\n");

// Better: Only include needed fields
const data = users.map(u => u.name).join(", ");
```

### Streaming for UX

```typescript
const streamTextToWriter = (writer: UIMessageStreamWriter, message: string) => {
  const id = crypto.randomUUID();
  writer.write({ type: "text-start", id });
  writer.write({ type: "text-delta", id, delta: message });
  writer.write({ type: "text-end", id });
};
```

## Common Mistakes

### 1. Too Many Tools

**Problem**: LLMs perform worse with many tool definitions.

**Why**: Tool definitions consume context window space. More tools = more "lost in the middle" issues.

**Solution**:
```typescript
// Bad: 50 tools always available
const tools = { ...allTools };

// Good: Only relevant tools per request
const tools = selectToolsForContext(userRequest);
```

**Rule of thumb**: 6-8 tools max per request.

### 2. Unwrapped Data in System Prompt

**Problem**: Injecting user data directly into prompts.

```typescript
// Bad: Injection risk
const system = `Help the user with this data: ${userData}`;

// Good: Wrap external data
const system = `Help the user with this data:
<user_data>
${userData}
</user_data>`;
```

### 3. Ignoring Context Window Limits

**Problem**: Stuffing too much into context.

```typescript
// Bad: Dump entire codebase
const context = await readEntireRepo();

// Good: Relevant snippets only
const context = await searchRelevantFiles(query);
```

### 4. No Idle Timeouts

**Problem**: Runaway agents consuming resources.

```typescript
// Always set timeouts
const result = await generateText({
  model: openai("gpt-4"),
  messages,
  maxTokens: 4096,
  // Add application-level timeouts too
});
```

## Agents vs Workflows

### Workflows

Fixed sequence of LLM calls:

```typescript
// Step 1: Extract info
const extracted = await generateObject({ ... });

// Step 2: Validate
const validated = await generateObject({ ... });

// Step 3: Format output
const output = await generateText({ ... });
```

Predictable, easier to debug, lower cost.

### Agents

LLM decides what to do next:

```typescript
while (!done) {
  const result = await generateText({
    model,
    tools,
    messages,
  });
  
  if (result.toolCalls.length === 0) {
    done = true;
  } else {
    // Execute tools, add results to messages
  }
}
```

Flexible, powerful, but harder to predict and control.

**Choose workflows when**: Steps are known, predictability matters.
**Choose agents when**: Problem requires exploration, steps aren't predetermined.

## Best Practices Summary

1. **Validate fast** — Use cheap models for guardrails
2. **Limit tools** — 6-8 max per request
3. **Wrap external data** — Prevent prompt injection
4. **Stream responses** — Better UX for long outputs
5. **Optimize tokens** — Compact data formats
6. **Set timeouts** — Prevent runaway costs
7. **Prefer workflows** — When steps are predictable
