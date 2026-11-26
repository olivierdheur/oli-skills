# HyperFrames Registry

> 450+ ready-made blocks and components - transitions, overlays, titles, captions, charts, 3D

Before hand-building any named visual (CRT scanlines, glitch, film grain, charts), search the registry first.

## Find and Install

```bash
# Search in English (even for non-English videos)
npx hyperframes catalog --query "what it should do" --json

# Install a block
npx hyperframes add <name> --json
```

**Search tips:**
- Query in English (catalog indexed in English)
- `--on-device` enables semantic search (33 MB download, ask user first)
- Narrow with `--type block|component` and `--tag <tag>`

## What's Available

### Blocks (scenes with timelines)

| Category | Examples |
|----------|----------|
| **Transitions** | `beat-freeze-cut`, `chromatic-radial-split`, `cinematic-zoom` |
| **Overlays/Lower Thirds** | `camcorder-hud`, `editorial-flash-overlay`, `lt-clean-bar` |
| **Title Cards/Kinetic Type** | `canopy-part-title`, `code-slice-hero` |
| **Social/Chat/UI** | `ai-chat-reveal`, `chatgpt-exchange` |
| **Code/Charts/Data/Maps** | `code-diff`, `bar-chart-race`, `data-chart` |
| **3D/Shader/Backgrounds** | `app-showcase`, `aurora`, `blob` |

### Components (snippets for your scenes)

| Category | Examples |
|----------|----------|
| **Motion/Text Effects** | `agent-cursor`, `blur-in`, `bottom-up-letters` |
| **Caption Styles** | `caption-clip-wipe`, `caption-editorial-emphasis` |
| **Camera Moves** | `camera-shake`, `camera-scan-gate` |
| **Product Demo/UI** | `before-after-wipe`, `browser-device-stage` |
| **Textures/Particles** | `ascii-render-pass`, `grain-overlay` |

## Wiring

### Blocks → Mount as sub-composition

```html
<div
  data-composition-src="compositions/block-name.html"
  data-composition-id="block-name"
  data-start="2"
  data-duration="5"
></div>
```

### Components → Copy into your scene

Install to `compositions/components/<name>.html`, then:
1. Copy markup, `<style>`, and script into your scene
2. Follow the comment block for timeline hooks
3. Keep prefixed ids to avoid collisions

## Variables

Set block variables for a mount:
```html
<div
  data-composition-src="..."
  data-variable-values='{"title": "My Title", "color": "var(--brand)"}'
></div>
```

## Beat-Synced Blocks

```bash
# Get beat times
npx hyperframes beats --json

# Pass to block: beat times minus mount's data-start
```

## Nothing Fits?

Report before hand-building (unless telemetry is off):
```bash
npx hyperframes feedback --search-miss --wanted "effect description" --tier words
```

## Browse Online

Catalog: https://hyperframes.heygen.com/catalog
