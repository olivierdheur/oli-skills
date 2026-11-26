# HeyGen Translate

> Translate and dub videos into 175+ languages with voice cloning and lip-sync

Take an existing video and localize it: clone the presenter's voice into the target language, re-sync lips to new audio, return a fully dubbed video.

## When to Use

- "Translate this video to Spanish"
- "Dub this into Japanese"
- "Make this in French and German"
- "Localize this for 10 markets"
- "Translate my podcast"

**NOT for creating new videos** - use `heygen-video` for that.

## Install

```bash
gh skill install heygen-com/skills heygen-translate
```

## Setup

### API Key
```bash
export HEYGEN_API_KEY=<your-key>
```

### MCP (OAuth)
```bash
claude mcp add --transport http heygen https://mcp.heygen.com/mcp/v1/
```

## What It Does

1. **Transcription** - Extract speech from source video
2. **Translation** - Translate to target language(s)
3. **Voice Cloning** - Clone speaker's voice in new language
4. **Lip-Sync** - Re-sync lips to new audio
5. **Render** - Output dubbed video

## Supported Languages

175+ languages including:
- English, Spanish, French, German, Italian, Portuguese
- Chinese, Japanese, Korean, Vietnamese, Thai
- Arabic, Hebrew, Hindi, Urdu
- Russian, Polish, Dutch, Swedish
- And many more...

## Modes

### Standard Translation
Full video dub with lip-sync.

### Audio-Only
Keep original video, replace audio track.
Good for: podcasts, voiceovers

### Proofreads Workflow
Review/edit subtitles before final render.
Good for: high-stakes translations

## Commands

```bash
# Single language
heygen video-translate create \
  --source video.mp4 \
  --target-language es \
  --output translated.mp4

# Multiple languages
heygen video-translate create \
  --source video.mp4 \
  --target-language es,fr,de,ja \
  --output "translated_{lang}.mp4"

# Check status
heygen video-translate status <translation_id>
```

## Best Practices

1. **Don't call raw API** - use CLI or MCP
2. **Poll silently** - no status spam to user
3. **One result, one message** - link + language + duration
4. **Match user language** - communicate in their language

## When to Chain

**User has source video** → Use this skill

**User wants NEW video in another language** → 
Route to `heygen-video`, write script in target language

## Output

Per target language:
- Translated video URL
- Duration
- Mode used (full dub / audio-only)

## Pricing Note

Translation uses HeyGen credits. Multi-language translations consume credits per language.

## Resources

- Translation docs: https://docs.heygen.com/reference/video-translate
- Supported languages: https://developers.heygen.com/docs/languages
- Voice cloning: https://developers.heygen.com/docs/voice-cloning
