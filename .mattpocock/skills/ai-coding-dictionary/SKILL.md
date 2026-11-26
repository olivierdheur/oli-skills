---
name: AI Coding Dictionary
description: 72 AI coding terms explained in plain English - agents, context, tokens, tools, and more
---

# AI Coding Dictionary

AI coding jargon, explained in plain English. By Matt Pocock.

**Source**: [mattpocock/dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding) (5.6K stars)

## Core Concepts

### Agent
A model harnessed with tools, a system prompt, and a context window, that takes turns with a user. The model in motion. Claude Code is an agent. Cursor is an agent.

### Model
The file of parameters that powers an agent. Claude Sonnet, GPT-4, Gemini are models. The model is the brain; the agent is the brain in motion.

### Context Window
The model's working memory — everything it can "see" at once. Measured in tokens. Larger windows allow more context but cost more.

### Token
The atomic unit of text for LLMs. Roughly 4 characters or 0.75 words. Everything is counted in tokens — input, output, context.

### Turn
One back-and-forth: user message → model response. Each turn consumes context and costs tokens.

### Tool
A function the model can call to interact with the world: read files, search, run code, call APIs. Tools extend the model's capabilities beyond text generation.

### Tool Call
The model deciding to invoke a tool. Returns a tool result that becomes part of context.

### System Prompt
The initial instructions that shape the agent's behavior. Sets personality, capabilities, constraints. Consumes context but stays cached.

## Context & Memory

### Context
Everything the model can see in a single request: system prompt, conversation history, file contents, tool results.

### Attention Budget
The finite context window you must spend wisely. Front-load important info; trim what doesn't serve the current task.

### Attention Degradation
The model's decreasing ability to attend to context as it fills up. Early context gets more attention than later content.

### Context Pointer
A reference to external content (file path, URL) rather than the content itself. Saves tokens until the content is needed.

### Contextual Knowledge
Information in the current context window. Contrasts with parametric knowledge (what the model learned during training).

### Parametric Knowledge
What the model learned during training, baked into its parameters. May be outdated or incomplete.

### Knowledge Cutoff
The date after which the model has no training data. Its parametric knowledge stops there.

## Sessions & State

### Session
One continuous conversation with an agent, from start to clear. Maintains context across turns.

### Clearing
Starting fresh by wiping the context window. Sometimes necessary when context is polluted or task changes completely.

### Compaction
Summarizing context to fit more in the window. Loses detail but preserves core information.

### Autocompact
Automatic compaction when context approaches the limit. Can lose important details if not managed.

### Handoff
Transferring work between sessions or agents. Requires explicit context passing since agents don't share memory.

### Handoff Artifact
A document summarizing the current state for another session to continue. Contains decisions, progress, and next steps.

### Stateful vs Stateless
Stateful: maintains context across interactions. Stateless: each request is independent. Most chat agents are stateful within a session.

## Agents & Automation

### Agent Mode
When the agent operates autonomously with tool access, making decisions and taking actions without approval at each step.

### Permission Mode
How much autonomy the agent has: ask for everything, ask for risky operations, or full autonomy.

### Permission Request
Agent asking for approval before an action. Interrupts flow but adds safety.

### Human-in-the-loop (HITL)
A human reviewing and approving agent actions. Slower but safer for critical operations.

### Subagent
An agent spawned by another agent to handle a subtask. Runs with its own context but reports back.

### Software Factory
Agents generating code at scale with minimal human intervention. The end goal of fully automated development.

### Dark Factory
A software factory that runs entirely without humans. Full autonomy.

## Code & Workflow

### Skill
A reusable instruction set that teaches an agent a capability. This file is a skill.

### Spec
A specification document that defines what to build. Clear specs lead to better agent output.

### Ticket
A unit of work for an agent to complete. Well-scoped tickets work best.

### Harness
The software surrounding a model that gives it tools, context, and interface. The agent is a model in a harness.

### Environment
The runtime context: filesystem, tools, APIs, secrets. What the agent can access and modify.

### Sandbox
An isolated environment where agents can safely experiment without affecting production.

### Automated Check
Programmatic verification of agent output: tests, linting, type checking. Catches errors before human review.

### Automated Review
AI reviewing AI output. Second opinion without human involvement.

### Human Review
Human examining agent output before it goes live. Final check in the approval pipeline.

## Communication Patterns

### Grilling
Questioning an agent to extract better answers or test its reasoning. Push back on assumptions.

### Vibe Coding
Giving the agent a rough idea and letting it fill in details. Works for exploration; dangerous for production.

### Progressive Disclosure
Revealing information incrementally rather than all at once. Manages attention budget.

### Design Concept
A high-level idea before implementation details. Agents work better with clear concepts.

### Primary Source
Authoritative documentation: official docs, source code, type definitions. Prefer over secondary sources.

### Secondary Source
Tutorials, blog posts, Stack Overflow. May be outdated or wrong; use with caution.

## Costs & Performance

### Input Tokens
Tokens you send to the model: prompt, context, files. You pay for these.

### Output Tokens
Tokens the model generates. Usually cost more than input tokens.

### Cache Tokens
Tokens that hit a cache and cost less. Reusing context prefixes saves money.

### Prefix Cache
Cached context that can be reused across requests. Same system prompt across requests often hits cache.

### Inference
The model generating a response. The computational work you're paying for.

### Model Provider
The company running the model: Anthropic, OpenAI, Google. You pay them for inference.

### Model Provider Request
One API call to a model provider. Contains context, returns response, consumes quota.

### Effort
How hard the model "thinks" on a response. Higher effort = more tokens = higher cost = often better results.

## Common Anti-patterns

### Hallucination
The model confidently stating something false. More likely with parametric knowledge, less with grounded context.

### Sycophancy
The model agreeing with you even when you're wrong. Push back to test claims.

### Non-determinism
Same input producing different outputs. Models are stochastic; don't expect identical results.

## Acronyms

| Term | Meaning |
|------|---------|
| **AI** | Artificial Intelligence |
| **AFK** | Away From Keyboard — human stepping back |
| **AX** | Agent Experience — UX but for agents |
| **DX** | Developer Experience |
| **HITL** | Human-in-the-loop |
| **MCP** | Model Context Protocol — standard for tools |

## Related Files

This skill includes 72 term definitions. For detailed explanations of any term, read the corresponding `.md` file in this directory.
