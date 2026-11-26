# Figma to HyperFrames

> Bring Figma designs into video - assets, tokens, components, storyboards, motion

Import Figma designs into HyperFrames videos. Use when asked to use a Figma design, frame, logo, or brand in a video.

## Access Setup

Need `FIGMA_TOKEN` in shell or `.env`:
1. figma.com → Settings → Security → Personal access tokens
2. Scopes: **File content**, **File metadata** (+ **Library content** for tokens on non-Enterprise)

**Never ask user to paste token in chat.**

## Commands

### Assets (Layers, Logos, Images)

```bash
npx hyperframes figma asset '<node-ref>' \
  --format svg|png \
  --scale 2 \
  --description "what it is" \
  [--entity "brand name"]
```

- SVG for vectors/logos
- PNG at 2x for raster
- Multiple nodes from same file in one call = single request

### Brand Tokens (Colors, Typography)

```bash
npx hyperframes figma tokens <file-key>
```

Run before `component`. Paste output into `data-composition-variables`.

### Components (Frames as Editable HTML)

```bash
npx hyperframes figma component '<node-ref>'
```

Installs to `compositions/components/<name>/`:
- Exact geometry preserved
- Variables bound: `var(--slug, #literal)`
- Unknown tokens marked `data-figma-unresolved`

## Storyboards: Frames Are KEYFRAMES

**Two frames with same element = animate between states, not play as slides.**

### Rules

1. **Scenes**: Every frame-sized node in section. Order by `absoluteBoundingBox.x`
2. **Match children** across frames by name, then size/position
3. **Tween** geometry between states; crossfade when pixels changed
4. **Text below strip** = motion notes, not on-screen copy
5. **Export batches**: ~4 scene frames per call (12+ times out)
6. **Product UI states**: Rebuild as live DOM, not tweens
7. **Stills**: Only for frames with no shared elements

### Motion Notes

A note like "lines reveal one after another" means:
- Import that frame as component
- Animate it per the note

## Motion (Connector Required)

1. Fetch motion context for parent frame
2. Normalize with `motionContextToDocs()` from `@hyperframes/core/figma`
3. Convert: `motionToGsap()` → `emitTimelineScript()`
4. Verify against Figma's export:

```bash
node <SKILL_DIR>/scripts/verify-motion.mjs \
  --reference export.mp4 \
  --render render.mp4 \
  --crop WxH+X+Y
```

Pass: ≈20+ dB. Fail: <15 dB.

## Shaders

Figma export flattens shaders. Ask user for native export (PNG/MP4) and place as asset/clip.

## Error Handling

| Error | Meaning |
|-------|---------|
| `BAD_TOKEN` (401) | Expired/revoked - make new one |
| `FORBIDDEN` (403) | Missing scope or file not visible |
| `REQUIRES_ENTERPRISE` | Fallback to published styles already ran |
| `RATE_LIMITED` (429) | Wait a minute or fewer nodes per call |

## Best Practices

- Never leave Figma URL in composition
- Check hero components against Figma pixels
- Report drift you can't fix
- Ask once which file a library is; never match by hex
