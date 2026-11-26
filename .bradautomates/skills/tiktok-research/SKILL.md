# TikTok Research

> Research TikTok videos - identify viral content and engagement patterns

Analyze TikTok content from tracked accounts, score engagement across multiple signals, and identify what's working.

## Prerequisites

- **Apify API key** - Powers TikTok scraping
- Get at: https://console.apify.com

```bash
# .env
APIFY_TOKEN=your-apify-token
```

## Install

Part of the head-of-content skill set:
```bash
git clone https://github.com/bradautomates/head-of-content.git
```

## Usage

```
/tiktok-research
```

Or natural language:
```
What videos are going viral on TikTok?
```

## What It Does

1. Fetches recent videos from tracked accounts
2. Calculates multi-signal engagement scores
3. Identifies statistical outliers
4. Analyzes video content with AI
5. Generates insights report

## Engagement Scoring

```
engagement = likes + (3 × comments) + (2 × shares) + (2 × saves) + (0.05 × views)
```

**Outlier threshold:** `mean + (2.0 × std_dev)`

## Configure Accounts

Edit `.claude/context/tiktok-accounts.md`:

```markdown
| Username | Niche | Notes |
|----------|-------|-------|
| @garyvee | marketing | cross-platform content |
| @tiktokcreators | meta/tips | platform trends |
```

## Output

```
tiktok-research/YYYY-MM-DD_HHMMSS/
├── raw.json            # Raw API data
├── outliers.json       # Identified outliers
├── video-analysis.json # AI-extracted patterns
└── report.md           # Human-readable summary
```

## Video Analysis

For each video, AI extracts:
- Hook (first 3 seconds)
- Content structure
- Audio/music usage
- Trend alignment
- Replicable patterns
