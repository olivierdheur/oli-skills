# YouTube Research

> Find YouTube outliers in your niche - detect viral videos with engagement scoring

Use TubeLab's outlier detection to find videos performing above their channel's baseline, then analyze what makes them work.

## Prerequisites

- **TubeLab API key** - Powers YouTube outlier detection
- Get at: https://tubelab.net (free tier available)

```bash
# .env
TUBELAB_API_KEY=your-tubelab-key
```

## Install

Part of the head-of-content skill set:
```bash
git clone https://github.com/bradautomates/head-of-content.git
```

## Usage

```
/youtube-research
```

Or natural language:
```
Find viral videos in my YouTube niche
```

## What It Does

1. Searches for outliers using TubeLab's API
2. Fetches video transcripts
3. Analyzes with AI for patterns
4. Generates actionable report

## Engagement Scoring

```
score = zScore × recency_boost
```

- **zScore:** How many standard deviations above channel average
- **recency_boost:** 5% daily decay

## Configure Your Channel

Edit `.claude/context/youtube-channel.md`:

```markdown
## Channel Information
- **Channel Name:** Your Channel Name
- **Channel Handle:** @yourhandle
- **Primary Niche:** Your niche

## Content Strategy
- **Typical Video Length:** 10-20mins
- **Upload Frequency:** Weekly
- **Best Performing Topics:** Your best topics
```

## Output

```
youtube-research/YYYY-MM-DD_HHMMSS/
├── raw.json            # Raw API data
├── outliers.json       # Identified outliers
├── video-analysis.json # AI-extracted patterns
└── report.md           # Human-readable summary
```

## TubeLab APIs Used

- **Outliers API** - Find viral videos in any niche
- **Transcripts API** - Get video transcripts for analysis
