# Instagram Research

> Research high-performing Instagram reels and posts - identify viral content patterns

Analyze Instagram content from tracked accounts, score engagement, identify outliers, and extract replicable patterns.

## Prerequisites

- **Apify API key** - Powers Instagram scraping
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
/instagram-research
```

Or natural language:
```
Find trending content in my Instagram niche
```

## What It Does

1. Fetches recent posts/reels from tracked accounts
2. Calculates engagement scores
3. Identifies statistical outliers
4. Analyzes video content with AI (if applicable)
5. Generates insights report

## Engagement Scoring

```
engagement = likes + (3 × comments) + (0.1 × views)
```

**Outlier threshold:** `mean + (2.0 × std_dev)`

## Configure Accounts

Edit `.claude/context/instagram-accounts.md`:

```markdown
| Username | Niche | Notes |
|----------|-------|-------|
| @garyvee | marketing | high volume, reels focus |
| @hormozi | business | educational content |
```

## Output

```
instagram-research/YYYY-MM-DD_HHMMSS/
├── raw.json            # Raw API data
├── outliers.json       # Identified outliers
├── video-analysis.json # AI-extracted patterns
└── report.md           # Human-readable summary
```

## Video Analysis

For video content, AI extracts:
- Hook structure
- Content patterns
- Replicable elements
- Engagement drivers
