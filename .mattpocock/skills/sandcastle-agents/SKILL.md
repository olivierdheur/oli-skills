---
name: Sandcastle Agent Orchestration
description: Orchestrate AI coding agents in isolated sandboxes with configurable branch strategies
---

# Sandcastle Agent Orchestration

A TypeScript library for orchestrating AI coding agents in isolated sandboxes.

**Source**: [mattpocock/sandcastle](https://github.com/mattpocock/sandcastle) (9.3K stars)

## What is Sandcastle?

Sandcastle runs AI coding agents (Claude Code, Codex, etc.) in isolated sandboxes:

1. Invoke agents with `sandcastle.run()`
2. Sandcastle handles sandboxing with configurable branch strategies
3. Commits get merged back automatically

## Quick Start

```typescript
import { run, claudeCode } from "@ai-hero/sandcastle";
import { bwrap } from "@ai-hero/sandcastle/sandboxes/bwrap";

await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: bwrap(), // or docker(), seatbelt(), vercel()
  promptFile: ".sandcastle/prompt.md",
});
```

## Core Concepts

### Agent Providers

Functions that know how to start specific agents:

```typescript
claudeCode("claude-opus-4-8")  // Claude Code
codex("codex-mini-latest")      // Codex
```

### Sandbox Providers

Control where and how agents run:

| Provider | Platform | Description |
|----------|----------|-------------|
| `bwrap()` | Linux/WSL2 | Native Bubblewrap sandbox |
| `seatbelt()` | macOS 14+ | Native macOS sandbox |
| `docker()` | Any | Docker container |
| `podman()` | Any | Podman container |
| `vercel()` | Cloud | Firecracker microVMs |

### Branch Strategies

Control where agent commits land:

```typescript
// Direct write to current branch (default for bind-mount)
{ type: "head" }

// Temp branch, auto-merge back (safe for automation)
{ type: "merge-to-head" }

// Explicit named branch (for PRs)
{ type: "branch", branch: "agent/fix-42" }
```

## Working with Branches

```typescript
const result = await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  branchStrategy: { type: "branch", branch: "agent/fix-42" },
  prompt: "Fix issue #42 in this repo.",
});

console.log(result.commits);  // [{ sha: "abc123" }]
console.log(result.branch);   // "agent/fix-42"
```

## Independent Worktrees

Use `createWorktree()` for advanced workflows:

```typescript
import { createWorktree } from "@ai-hero/sandcastle";

await using wt = await createWorktree({
  branchStrategy: { type: "branch", branch: "agent/fix-42" },
  copyToWorktree: ["node_modules"],
});

// Interactive exploration first
await wt.interactive({
  agent: claudeCode("claude-opus-4-8"),
  prompt: "Explore the codebase and understand the bug.",
});

// Then AFK agent run
const result = await wt.run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Fix issue #42.",
  maxIterations: 3,
});
```

## Iterations

One pass of the agent is an **iteration**. Control with:

```typescript
await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Fix the bug",
  maxIterations: 3,              // Max passes
  completionSignal: "DONE",      // Stop early on this output
  idleTimeoutSeconds: 600,       // 10min idle timeout
});
```

## Prompts

### From String
```typescript
await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Fix issue #42 in this repo.",
});
```

### From File with Variables
```typescript
await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  promptFile: ".sandcastle/prompt.md",
  promptArgs: {
    ISSUE_NUMBER: "42",
    PRIORITY: "high",
  },
});
```

Built-in variables: `{{SOURCE_BRANCH}}`, `{{TARGET_BRANCH}}`

## Hooks

Run commands at lifecycle points:

```typescript
await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Fix the bug",
  hooks: {
    host: {
      onWorktreeReady: [{ command: "npm install" }],
    },
    sandbox: {
      onSandboxReady: [{ command: "npm test" }],
    },
  },
});
```

## Sessions

Resume or fork agent sessions:

```typescript
// Save session
const result = await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Start fixing the bug",
});
const sessionId = result.iterations[0].sessionId;

// Resume later
await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Continue where you left off",
  resumeSession: sessionId,
});
```

## Structured Output

Get typed results from agents:

```typescript
import { z } from "zod";

const result = await run({
  agent: claudeCode("claude-opus-4-8"),
  sandbox: docker(),
  prompt: "Analyze the codebase",
  outputSchema: z.object({
    summary: z.string(),
    issues: z.array(z.object({
      file: z.string(),
      severity: z.enum(["low", "medium", "high"]),
      description: z.string(),
    })),
  }),
});

console.log(result.output.summary);
console.log(result.output.issues);
```

## Best Practices

1. **Use merge-to-head for automation** — Keeps HEAD safe if something fails
2. **Use branch strategy for PRs** — Named branches make review easy
3. **Copy node_modules** — Faster than npm install in sandbox
4. **Set idle timeouts** — Prevent runaway agents
5. **Use completion signals** — Stop early when done

## When to Use Sandcastle

- Parallelizing multiple AFK agents
- Creating review pipelines
- Running agents safely in CI
- Orchestrating your own agent workflows
