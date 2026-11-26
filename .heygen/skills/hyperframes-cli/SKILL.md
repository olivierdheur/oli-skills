# HyperFrames CLI

> Scaffold, check, preview, render, share and manage HyperFrames video projects

The HyperFrames CLI for all project operations - from scaffolding to delivery.

## Requirements

- Node.js 22+
- FFmpeg

## Commands by Job

| Job | Commands |
|-----|----------|
| **Start** | `init --skip-skills`, `capture <url>` |
| **Read** | `info`, `compositions`, `timeline --json`, `docs <topic>` |
| **Check** | `lint` (while writing), `check --json` (gate: lint, runtime, layout, contrast) |
| **Look** | `snapshot` (`--at`, `--range`, `--composition`, `--zoom`), `keyframes`, `compare` |
| **Edit Timeline** | `timeline move\|trim\|split\|set\|duplicate\|delete`, `apply`, `undo` |
| **Reuse** | `catalog`, `add` (registry blocks) |
| **Media** | `media-treatment`, `tts`, `transcribe`, `beats`, `normalize-audio` |
| **Ship** | `preview`, `render`, `share`, `cloud render`, `lambda render` |
| **Upkeep** | `doctor`, `browser`, `upgrade`, `usage`, `clean` |

## The Work Loop

```bash
# 1. Write, then lint
npx hyperframes lint

# 2. Check everything (lint + runtime + layout + contrast)
npx hyperframes check --json
# Fix every error, weigh every warning

# 3. Visual verification
npx hyperframes snapshot
# Read the PNGs in .hyperframes/artifacts/snapshots/

# 4. Preview for user approval
npx hyperframes preview --background
# Give the URL, wait for approval

# 5. Render when approved
npx hyperframes render --quality looks -o out.mp4
# draft (iterating), looks (review), delivery (final)
```

## Timeline Editing

```bash
# View timeline
npx hyperframes timeline --json

# Preview an edit
npx hyperframes timeline move --ref "#outro" --time 9 --plan --json

# Apply edit (remove --plan)
npx hyperframes timeline move --ref "#outro" --time 9 --json

# Batch edits from JSON file
npx hyperframes timeline apply plan.json --json

# Undo with receipt
npx hyperframes timeline undo receipt.json
```

## Render Options

| Need | Command |
|------|---------|
| Local | `render --quality looks -o out.mp4` |
| Reproducible | `render --docker --strict -o out.mp4` |
| Batch | `render --batch rows.json -o "renders/{name}.mp4"` |
| Cloud (no local deps) | `cloud render` |
| AWS Lambda | `lambda render` |

## Project History

```bash
# Start a turn
npx hyperframes history begin --who <agent> --label "description"

# See user changes since your last turn
npx hyperframes history --since mine --who <agent>

# Undo your changes
npx hyperframes history undo --who <agent>

# End turn
npx hyperframes history end
```

## Common Failures

| Symptom | Fix |
|---------|-----|
| Chrome missing | `npx hyperframes browser ensure` |
| Heavy page timeout | Raise `--timeout` on check/snapshot |
| Render slow on Linux | Check if using software GPU |
| Disk tight | `clean --dry-run`, then `clean` |

## Resources

- Full CLI docs: https://hyperframes.heygen.com/packages/cli
- Cloud rendering: https://hyperframes.heygen.com/deploy/aws-lambda
