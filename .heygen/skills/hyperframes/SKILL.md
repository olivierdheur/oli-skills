# HyperFrames

> AI Video Editor - Create, edit, animate and render videos with HTML rendered to MP4

HyperFrames is HeyGen's open-source AI video editor (90K+ stars). Write HTML, CSS, and JavaScript, render deterministic MP4 videos. Works with Claude Code, Codex, Cursor, and other coding agents.

## When to Use

- Making, editing, animating, or rendering any video
- Launch films, explainers, music videos, charts, maps
- Vertical clips, title cards, captions, overlays
- Motion graphics with code instead of After Effects

## Install

```bash
npx skills add heygen-com/hyperframes     # pick "Core Skills"
# or without picker:
npx hyperframes skills update
```

## Core Concepts

### Project Structure
- `index.html` - Root composition declaring video variables
- `compositions/` - Sub-compositions (one scene per file)
- `assets/` - Media and fonts

### Contract Rules

1. Every timed element has `class="clip"`, `data-start`, `data-duration` (seconds)
2. Video length = root's `data-duration`
3. Each composition builds one paused GSAP timeline: `window.__timelines["id"] = tl`
4. No `Date.now()`, unseeded random, network fetches, timers, or `repeat: -1`
5. Never tween `display`/`visibility` on `.clip`; animate a child
6. No CSS `transform` on elements GSAP transforms
7. Never `play()`/`pause()` media - let HyperFrames control it
8. Asset paths: `assets/...` (no leading `/`)

### Keep It Editable

- One scene per sub-composition with readable ids
- Timed elements in HTML (not script-generated)
- Use variables: `data-var-text`, `data-var-src`, `var(--id)`
- Content in 90% action-safe, captions in 80% title-safe

## Work Loop

1. New project: `npx hyperframes init --skip-skills`
2. Write, then `npx hyperframes lint`
3. `npx hyperframes check --json` - fix every error
4. `npx hyperframes snapshot` - visually verify
5. `npx hyperframes preview --background` - give user preview URL
6. Render when approved: `npx hyperframes render --quality looks -o out.mp4`

## Related Skills

| Skill | Use When |
|-------|----------|
| `/hyperframes-cli` | CLI operations, build/render failures |
| `/hyperframes-registry` | 450+ ready-made blocks before hand-building |
| `/media-use` | Any media (music, voice, images, avatars) |
| `/reverse-any-video` | Rebuilding existing video as editable project |
| `/style-sampling` | Episode in proven style (Collage, Finance, 3D) |
| `/figma` | Figma designs to video |
| `/slideshow` | Presentations/pitch decks |
| `/remotion-to-hyperframes` | Port Remotion/Lottie/Three.js projects |

## Video Types

- **Launch/promo**: `references/types/launch.md`
- **Explainer/tutorial**: `references/types/explainer.md`
- **Music video**: `references/types/music.md`
- **Charts/data**: `references/types/data.md`
- **Vertical/social**: `references/types/vertical.md`
- **3D/generative**: `references/types/3d.md`

## Resources

- Docs: https://hyperframes.heygen.com/introduction
- Catalog: https://hyperframes.heygen.com/catalog
- Discord: https://discord.gg/fzbdWyjphr
- GitHub: https://github.com/heygen-com/hyperframes
