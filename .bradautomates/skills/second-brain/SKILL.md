# Second Brain

> AI-powered Chief of Staff - captures, organizes, and farms context while you work

A git-tracked Obsidian vault powered by Claude Code. Natural language in, organized knowledge out. Hooks auto-commit, farmers pull context from Slack and meetings, delegation forks work to specialized AI employees.

## Install

1. Use template: https://github.com/bradautomates/second-brain
2. Set visibility to **Private**
3. Clone and open in Obsidian

```bash
git clone https://github.com/YOUR-USERNAME/second-brain.git
cd second-brain
claude
/start-second-brain
```

## Commands

| Command | Purpose |
|---------|---------|
| `/new <text>` | Quick capture - classify and file |
| `/today` | Generate daily plan |
| `/daily-review` | End of day - compare planned vs actual |
| `/history` | Recent git activity (7 days) |
| `/farm <source>` | Trigger a context farmer |
| `/create-farmer` | Build new farmer |
| `/delegate <task>` | Fork terminal for autonomous work |

## What It Does

### Captures Naturally
```
/new meeting with Sarah Friday about Q2 planning
```
→ Creates linked person notes, tasks, project files

### Plans Your Day
Aggregates due tasks, overdue items, active projects into daily plan

### Farms Context
Subagents read Slack, meetings on schedule, classify into vault

### Delegates Work
Forks terminal sessions to AI employees across repos

### Tracks Everything
Every action auto-commits with `cos:` prefix

## Context Farmers

| Farmer | Source | Captures |
|--------|--------|----------|
| `slack` | Slack channels | Action items, decisions, blockers |
| `fireflies` | Meeting transcripts | Action items, decisions, contacts |

Configure in `context/watchlists.md`.

### Scheduling

- **Cloud:** `/schedule` - runs 24/7
- **Desktop:** Schedule page - machine must be on
- **Loop:** `/loop 30m /farm slack`
- **Manual:** `/farm slack`

## Delegation

```
/delegate write the quarterly report based on project notes
```

### Cross-Repo Employees

Configure in `.claude/reference/employees.json`:
```json
{
  "head-of-content": "~/Documents/GitHub/head-of-content"
}
```

Then: `/delegate head-of-content: research YouTube content`

## File Types

| Type | Folder | Key Fields |
|------|--------|------------|
| Task | `tasks/` | `due`, `status` |
| Project | `projects/` | `status` |
| Person | `people/` | `last-contact` |
| Idea | `ideas/` | - |

## Directory Structure

```
second-brain/
├── tasks/           # Items with due dates
├── projects/        # Ongoing work
├── people/          # Relationship notes
├── ideas/           # Captured thoughts
├── context/         # Watchlists, farmer state
├── daily/           # Daily plans
├── weekly/          # Weekly summaries
└── outputs/         # Deliverables
```

## Git as Audit Trail

```bash
git log --since="8am" --grep="cos:" --oneline   # Today's activity
git log --grep="farmer/"                         # Farmer activity
git diff HEAD~1                                  # What changed
```

## Design Philosophy

1. **Git is the database** - Just markdown and commits
2. **Natural language first** - Say what you mean
3. **Auto-commit everything** - Nothing is lost
4. **Farm, don't fetch** - Context comes on schedule
5. **Cross-repo awareness** - Delegation maintains context

## Resources

- GitHub: https://github.com/bradautomates/second-brain
- YouTube: https://youtube.com/@bradbonanno
