# Slideshow

> Build presentations with HyperFrames - slides, fragments, branching, presenter mode

Create live presentations (not rendered videos) with discrete slides, fragment reveals, hotspot navigation, and presenter mode.

## When to Use

- Presentations / pitch decks
- Interactive decks with branching
- Slides with speaker notes
- Presenter mode needed

**Output is a running deck, NOT an MP4.**

## Structure

Each slide is a top-level scene with its own JSON island:

```html
<script type="application/hyperframes-slideshow+json">
{
  "slides": [
    { "sceneId": "hook", "notes": "Pause on the number." },
    {
      "sceneId": "problem",
      "fragments": [11.0, 15.0],
      "hotspots": [
        {
          "id": "h1",
          "label": "Where does $40B come from?",
          "target": "market-detail",
          "region": { "x": 55, "y": 60, "w": 40, "h": 20 }
        }
      ]
    }
  ],
  "slideSequences": [
    { "id": "market-detail", "slides": [{ "sceneId": "mkt-math" }] }
  ]
}
</script>
```

## Key Concepts

### Fragments
- **Absolute timeline times** (same clock as `data-start`)
- Navigation **seeks**, never plays
- Each hold state must look right when seeked to directly

### Hotspots
- `target` = sequence `id`
- `region` = percentage box (omit for full-slide button)
- Back returns to hotspot source slide

### Branch Slides
- Listed only in `slideSequences`, not main `slides` array
- Ordinary scenes, just not in main flow

## Rules

1. Text audience must read: **40px minimum** at 1920×1080
2. Search registry before hand-building: `npx hyperframes catalog --query "..." --json`
3. Hidden stacked slides need: `opacity: 0`, `visibility: hidden`, `pointer-events: none`

## Porting Existing Pages

When converting an existing page to slides:
- Keep source's look, motion, interactions
- Scroll/wheel → camera moves between focal points (no visible scrolling)
- Screenshots/posts/charts: preserve aspect (`object-fit: contain`), check all edges
- Media needs `data-start`, `data-duration`, `data-has-audio="true"` if sound plays

## Present and Share

```bash
# Check the deck
npx hyperframes check --json

# Serve it
npx hyperframes present <project>
```

User gets URL with:
- Present mode (P key)
- Prev/Next navigation
- Slide counter
- Global mute
- Fullscreen
- Swipe support
- Hotspots
- Presenter notes (editable, saved per deck)

## Screen Sharing Tips

| App | Method |
|-----|--------|
| Google Meet | Share the audience **tab** |
| Zoom | Drag audience tab to own window, share that |

Covered windows freeze - keep audience visible.

## Never Render to MP4

`render` keeps only first scene. For stills, use:
```bash
npx hyperframes snapshot --at <each-slide-time>
```
