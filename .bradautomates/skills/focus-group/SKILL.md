# Focus Group

> Clone your customers from sales calls - run a standing focus group for testing

Point Claude at your sales call transcripts. It discovers customer archetypes, builds composite personas, then convenes them as a focus group you can pitch anything to.

## Install

**Claude Code:**
```
/plugin marketplace add bradautomates/focus-group
/plugin install focus-group@focus-group
```

**Other agents:**
```bash
npx skills add bradautomates/focus-group -g
```

## Usage

```
/focus-group                              # First run: analyze + confirm panel
/focus-group "$3k tier for the workshop"  # Pitch anything
/focus-group rebuild                      # Ingest new transcripts
```

## What People Use It For

- **Price tests** - "Juno buys at $3k, Dana stalls"
- **Hook reads** - Which seats scroll past, which lean in
- **Landing page teardowns** - Objections attributed to archetypes
- **ICP correction** - "You say ops leads, but closed deals were founders"

## How It Works

### Setup (Once)

1. Claude indexes every transcript
2. Extracts decision behavior per call
3. Clusters into archetypes by *how they buy*
4. You rename, merge, or cut seats
5. Writes `business.md` and dossiers

### Panel Run (Every Time)

1. **Round 1** - Each archetype responds isolated
2. **Moderator** - Extracts sharpest splits
3. **Round 2** - Contested seats see opposing takes
4. **Readout** - Distribution, splits, top objections
5. **Live room** - Grill any clone further

## Composites, Not Real People

Panel seats are fictional blends from many calls:
- Never a named real client
- Each seat needs 3+ real people behind it
- If only 2 clean archetypes exist, you get 2

## Each Archetype Gets

- Identity and buying journey
- Objection map
- Style guide
- 20-30 line quote bank
- Coverage map (can/can't speak to)

## Disagreement Is The Product

- Nothing ranks or synthesizes a winner
- No manufactured consensus
- Splits are attributed and preserved
- Position flips are high-value events

## Memory

```
~/Documents/FocusGroup/
├── business.md              # ICP + business context
├── panel/
│   ├── juno/dossier.md      # Archetype details
│   └── juno/positions.md    # Accumulated verdicts
├── sessions/
│   └── 2026-07-06-pricing.md
└── inventory.json           # Transcript index
```

## Transcript Sources

- **Local folder (recommended)** - Download transcripts, point at folder
- **MCP** - Connect Fireflies, Granola, or Google Drive

## Resources

- GitHub: https://github.com/bradautomates/focus-group
- YouTube: https://youtube.com/@bradbonanno
