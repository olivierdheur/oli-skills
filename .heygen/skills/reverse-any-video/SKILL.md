# Reverse Any Video

> Rebuild any video file as an editable HyperFrames project - frame-by-frame accurate

Reverse, recreate, remake, replicate, or copy any video into an editable HyperFrames project that matches the original frame for frame.

## When to Use

- "Remake this video"
- "Copy this style"
- "Rebuild this as editable"
- "复刻这个视频" / "照着这个视频做一个"

## Requirements

- HyperFrames Pro subscription
- Video the user has rights to use

## Start

```bash
npx hyperframes reverse start --dir <project>
```

If refused (not Pro): give upgrade link, let user run `fix` command themselves.

## The Original Decides Everything

1. **Exact dimensions**: Root composition matches video's size exactly
2. **Exact framerate**: `data-fps` matches (NTSC stays fraction: `30000/1001`)
3. **Exact duration**: frames ÷ fps, not audio length
4. **Cut detection**: `npx hyperframes measure cuts <video>` - every cut including jump cuts

### Time Precision

Write times as `frame ÷ fps` rounded down:
- Frame 83 at 30 fps = `2.766666`
- `2.767` lands a frame late

## Layer Types

| Layer Type | How to Handle |
|------------|---------------|
| **Components** (text, captions, UI, charts) | Rebuild in HTML |
| **Sub-assets** (photos, clips, logos) | Cut from original on its own box |
| **Logos** | Cut where largest, or find real mark via `media-use` |
| **Person on screen** | Re-shoot with HeyGen |
| **Animated/painted** | See `references/animated.md` |

**Never play the original's whole frame.**

## Reading Frames

```bash
# Read frames around changes
npx hyperframes measure frames --range a,b --roi x,y,w,h
```

Read consecutive frames at:
- Each cut
- Entrances and exits
- Transitions
- A few frames either side

Sheets 1 second apart miss: 1-3 frame timing, motion direction, blurs, dissolves, flashes.

## Verification

```bash
# While building - spot check without rendering
npx hyperframes diff . --at t,t,t

# After all shots have content
npx hyperframes check
npx hyperframes cloud render --fps <fps> --quality high -o render.mp4
npx hyperframes diff original.mp4 render.mp4
```

The diff reports:
- Missing/extra cuts
- Duration mismatch
- Sound offset
- Missing content stretches
- Worst moments with failing cells

## Fix What You Can See

- Missing cut or element
- Wrong time, size, weight, or color

Render and diff once more, then stop.

## Output

Write `REVERSE.md`:
- What is rebuilt, cut, re-shot
- What is approximate (substituted fonts)
- Last diff's numbers
- No prices or credit numbers

## Best Practice

Work alone - one agent holding the whole film beats subagents re-watching it.
