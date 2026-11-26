# Remotion to HyperFrames

> Port existing video code into HyperFrames - Remotion, Motion Canvas, Lottie, Three.js, canvas

Bring video projects from other tools into HyperFrames, verified frame-by-frame against the original.

## Import Levels

| Level | For | Editable Afterwards |
|-------|-----|---------------------|
| **Native** | Remotion, HTML/CSS/GSAP, simple Motion Canvas | Everything - variables, catalog, presets |
| **Hosted** | Canvas, p5.js, Three.js, Lottie, WebGL | Timing, position, exposed parameters |
| **Media** | Manim, After Effects, Blender, PIL, moviepy | Cut, place, layer (not pixels) |

Code with wall-clock time, live physics, or network = **media only**.

## Native Translation (Remotion)

### 1. Lint Source First

```bash
python3 <SKILL_DIR>/scripts/lint_source.py <src>
```

**Blockers (don't translate):**
- `useState`, `useReducer`
- `useEffect` with dependencies
- Async `calculateMetadata`
- UI kits (MUI, Chakra, shadcn, Radix)

**Warnings (drop and note):**
- `@remotion/lambda` config
- `delayRender`
- `useMemo`, custom hooks

### 2. Translate to HyperFrames

- One sub-composition per scene
- Times in seconds (`frame / fps`)
- Asset paths root-relative
- Add `* { box-sizing: border-box; }` to root (Remotion's render rule)

### 3. Keep It Editable

- Props → `data-composition-variables`
- `Sequence` → timed clip or sub-composition
- Reused component → one sub-composition mounted multiple times

### 4. Verify Frame-by-Frame

```bash
# Spot check without rendering
npx hyperframes diff original.mp4 . --at t,t,t

# Full render comparison
npx hyperframes render -o hf.mp4
npx hyperframes diff original.mp4 hf.mp4
```

**Render Remotion with:**
```js
Config.setVideoImageFormat("png")
Config.setColorSpace("bt709")
```

Otherwise you're measuring encoder differences (~0.05 SSIM).

### 5. Document What Changed

Write `TRANSLATION_NOTES.md`:
- Dropped volume ramps
- Approximated presentations
- Substituted fonts

## Remotion API Mapping

| Remotion | Read |
|----------|------|
| `Composition`, `defaultProps`, `calculateMetadata` | `references/parameters.md` |
| `Sequence`, `Series`, `Loop`, `Freeze` | `references/sequencing.md` |
| `useCurrentFrame`, `interpolate`, `spring` | `references/timing.md` |
| `Audio`, `Video`, `Img`, `staticFile` | `references/media.md` |
| `TransitionSeries`, `@remotion/transitions` | `references/transitions.md` |
| `@remotion/lottie` | `references/lottie.md` |
| `@remotion/google-fonts` | `references/fonts.md` |

## Hosted Integration

Keep the code, let HyperFrames own the clock:
- No `requestAnimationFrame` loop
- Seeded randomness only
- `data-duration` on root when nothing else defines length

Built-in adapters: Lottie, Three.js, anime.js, WAAPI, CSS animations.
See: `references/runtimes.md`

## Media Import

Just use `<video>` or `<video muted>`:
```html
<video
  data-start="0"
  data-duration="10"
  src="assets/blender-render.mp4"
  muted
></video>
```

## Final Report

List each imported part with:
- Level used
- What's editable in Studio
- Frame-by-frame comparison results
