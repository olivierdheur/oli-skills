# Video Content Analyzer

> AI-powered video analysis - extract hooks, structure, and replicable patterns

Analyze video content using Gemini AI to extract what makes content work: hooks, structure, pacing, and patterns you can replicate.

## Prerequisites

- **Google Gemini API key** - Powers video analysis
- Get at: https://aistudio.google.com/apikey

```bash
# .env
GEMINI_API_KEY=your-gemini-key
```

## Install

Part of the head-of-content skill set:
```bash
git clone https://github.com/bradautomates/head-of-content.git
```

## What It Extracts

### Hook Analysis
- Opening line/visual
- Attention mechanism
- Promise/curiosity gap
- First 3-5 seconds breakdown

### Structure
- Content sections
- Pacing and rhythm
- Transition patterns
- Call-to-action placement

### Replicable Patterns
- Format templates
- Editing techniques
- Audio/music usage
- Visual style elements

## Usage

Called automatically by platform research skills when analyzing video content.

Can also be used directly on specific videos:
```
Analyze this video for hooks and structure: [URL]
```

## Output

```json
{
  "hook": {
    "type": "curiosity_gap",
    "opening_line": "...",
    "visual_hook": "..."
  },
  "structure": {
    "intro": "0:00-0:15",
    "body": [...],
    "cta": "..."
  },
  "patterns": [...]
}
```

## Best Practices

- Analyze multiple videos from same creator to find patterns
- Compare outliers vs average performers
- Look for consistent elements across viral content
- Note platform-specific conventions
