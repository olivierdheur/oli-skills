# 21st AI

> Generate and iterate UI with 21st AI - sketch, preview variants, refine, grab code

Fast UI drafting from the terminal. Sketch variants from a prompt, preview them, refine with plain-English edits, and pull the code into your repo.

## Prerequisites

- 21st account with AI enabled (check `21st usage`)
- Auth via `21st login` or API key

## Check AI Access

```bash
21st usage
# Look for "21st AI generation: enabled"
# Or: 21st usage --json | jq .aiGenerationEnabled
```

**If AI is not enabled:** Use `21st search` → `21st get` and adapt code with your own agent instead.

## The Loop

### 1. Generate (Sketch)

```bash
21st generate "a pricing section with 3 tiers and monthly/annual toggle"
```

Opens preview in browser, prints `projectId`.

### 2. List Takes

```bash
21st generation <projectId>
```

Shows 1-based take numbers and render status.

### 3. Iterate (Refine)

```bash
21st iterate <projectId> "make it enterprise-flavored, add FAQ" --take 3
```

Edits take in place (new version appended). **Uses AI credits.**

### 4. Grab Code

```bash
# Copy-prompt (recommended - adapt to your stack)
21st take <projectId> --take 3

# Raw HTML
21st take <projectId> --take 3 --code
```

**Free and unlimited.**

## When to Use Which

| Command | Purpose |
|---------|---------|
| `generate` | Start fresh from a prompt |
| `generation` | List takes (which `--take N` to act on) |
| `iterate` | Refine existing take (not start over) |
| `take` | Pull code (default: copy-prompt spec) |

## Metering

| Command | Cost |
|---------|------|
| `generate` | AI credits (requires AI enabled) |
| `iterate` | AI credits per edit |
| `generation` | **Free** |
| `take` | **Free** |

**Tip:** Batch changes into one clear instruction rather than many tiny `iterate` calls.

## MCP Tools

Same loop via MCP:
- `generate` (with `mode: "sketch"`)
- `get_generation`
- `iterate_generation`
- `get_take`

Tools only listed when AI is enabled on account.

## Best Practices

1. **Sketch is a draft, not production code** - use copy-prompt as a design spec
2. **Refer to takes by number** from `generation` output
3. **Only sketch what you created** - can't edit others' generations
4. **Check AI status first** - don't retry if `ai_subscription_required`

## Output Modes

**Copy-prompt (default):** A specification telling you to rebuild the design in your project's real stack. Don't paste HTML as-is.

**Raw code (`--code`):** Self-contained HTML + Tailwind. Quick but needs adaptation for real projects.
