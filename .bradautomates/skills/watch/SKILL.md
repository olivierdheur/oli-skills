# Watch

> Give Claude the ability to watch any video - extract frames, transcripts, and analyze content

Point Claude at any video URL or local file. It downloads, extracts frames, transcribes, and hands everything to Claude for analysis with timestamps.

## Install

**Claude Code:**
```
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
```

**Codex, Cursor, other agents:**
```bash
npx skills add bradautomates/claude-video -g --skill watch
```

## Engines

### Gemini (Recommended)
Get a free [Google AI Studio key](https://aistudio.google.com/apikey). Hands the whole video (picture + sound) to Google's video model.

```bash
# Set in ~/.config/watch/.env
GEMINI_API_KEY=your-key
```

### Local
No API key needed. Extracts frames and transcript on your machine using `ffmpeg` + `yt-dlp`.

```bash
/watch example.mp4 --engine local
```

## Usage

```
/watch https://youtube.com/watch?v=...
/watch example.mp4
/watch video.mp4 --engine local
```

**First run setup options:**
- **Detail level:** balanced (default), minimal, or comprehensive
- **Transcription:** captions only, speech fallback, or none

## What It Extracts

- **Frames:** Timestamped screenshots at key moments
- **Transcript:** Native captions or speech-to-text
- **Analysis:** What's visible, who's speaking, key moments

## Transcription Options

| Method | When Used |
|--------|-----------|
| Native captions | First choice (YouTube, etc.) |
| WhisperX (local) | Local videos, no captions |
| Groq/OpenAI | Cloud fallback |

## Requirements

| Tool | Purpose |
|------|---------|
| `ffmpeg` | Frame extraction |
| `yt-dlp` | Video download |
| Python 3.8+ | Runtime |

## Example Prompts

```
/watch this video and summarize the key points with timestamps
/watch example.mp4 - what techniques does the speaker use?
/watch https://youtube.com/... and extract all action items mentioned
```

## Resources

- GitHub: https://github.com/bradautomates/claude-video
- Video tutorial: https://youtube.com/@bradbonanno
