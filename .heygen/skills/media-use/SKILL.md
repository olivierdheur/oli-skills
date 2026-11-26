# Media Use

> Get or make any media for HyperFrames videos - music, images, voice, avatars, grades

Handle all media acquisition: music, sound effects, images, icons, logos, voiceover, avatars, generated video, transcripts, cutouts, and color grades.

## Quick Command

```bash
npx hyperframes media-use resolve \
  --type <type> \
  --intent "what you need" \
  --project <dir>
```

Returns: `resolved → <path> (<source>, <credits>)`

## Media Sources

| Need | Free | Credits | Local (on request) |
|------|------|---------|-------------------|
| **Music** | HeyGen catalog 10k+ tracks | Generated track | Local MusicGen |
| **Sound Effects** | HeyGen, Openverse (CC BY), bundled | - | - |
| **Images/Icons** | HeyGen asset search 75k+ | Generated images | Local FLUX |
| **Logos** | theSVG, GitHub avatar, favicon | - | Never redraw |
| **Voiceover** | Voice Turbo (3 min/mo free) | HeyGen voices, cloning | Kokoro TTS |
| **Presenter** | - | Avatar video | Local LTX |
| **Transcripts** | Parakeet/Whisper | - | - |
| **Cutouts** | - | HeyGen cutout | `remove-background` |
| **Grades/LUTs** | `media-treatment` | - | - |

## Sign-In Required

Before using HeyGen catalog/models:
```bash
npx hyperframes auth status
```

**Not signed in?** Tell user: "Sign-in is free and gives music catalog, asset search, and 3 min Voice Turbo/month. Type `!npx hyperframes auth login`"

## Commands

### Music & Audio
```bash
npx hyperframes beats --json              # Detect beat times
npx hyperframes tts "text" -o voice.wav   # Local TTS (Kokoro)
npx hyperframes transcribe video.mp4      # Transcript
npx hyperframes normalize-audio audio.wav # Loudness normalize
```

### Visual Treatments
```bash
# Color grade footage (dark, flat, dull → cinematic)
npx hyperframes media-treatment apply \
  --input footage.mp4 \
  --intent "warm cinematic" \
  --output graded.mp4

# Compare grades
npx hyperframes grade-compare
```

### Cutouts
```bash
npx hyperframes remove-background input.png -o cutout.png
```

## Credit Limits

Set a budget:
```json
// .hyperframes/credit-limit.json
{ "credits": 100 }
```

Use `--plan` to preview cost before running. If a step won't fit, ask before dropping.

## Best Practices

1. **Plan for best result** - no cheaper swaps unless asked
2. **Don't volunteer prices** - `--plan` is for you, not user
3. **Scan for gaps once** - offer fixes in one ask (missing voice, placeholder images, silent cuts)
4. **Respect "leave it"** - no suggestions if no signal

## Footage Treatments

For dark, flat, or dull footage, or needs retro/printed look:
1. Inspect the real `<video>`/`<img>`
2. Pick one intent
3. Use `npx hyperframes media-treatment` (never CSS/SVG filters)

## Resources

- HeyGen asset library: https://app.heygen.com
- Voice models: https://developers.heygen.com/docs/voices
