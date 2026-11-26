# X Research

> Research high-performing X/Twitter content - identify outliers and viral patterns

Analyze X/Twitter content from tracked accounts, calculate engagement scores, identify statistical outliers, and generate actionable insights.

## Prerequisites

- **Apify API key** - Powers X/Twitter scraping
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
/x-research
```

Or natural language:
```
Research what's performing on X right now
```

## What It Does

1. Fetches recent content from tracked accounts
2. Calculates engagement scores
3. Identifies outliers (> mean + 2σ)
4. Generates report with patterns

## Engagement Scoring

| Signal | Weight | Why |
|--------|--------|-----|
| Bookmarks | 4x | Strongest intent signal |
| Replies | 3x | Conversation starter |
| Retweets | 2x | Amplification |
| Quotes | 2x | Commentary |
| Likes | 1x | Passive approval |

**Outlier threshold:** `mean + (2.0 × std_dev)`

## Configure Accounts

Edit `.claude/context/x-accounts.md`:

```markdown
| Username | Niche | Notes |
|----------|-------|-------|
| @levelsio | indie hacking | bootstrapped founder |
| @naval | philosophy | high engagement threads |
```

## Output

```
x-research/YYYY-MM-DD_HHMMSS/
├── raw.json            # Raw API data
├── outliers.json       # Identified outliers
└── report.md           # Human-readable summary
```

## Note

X endpoint returns most *popular* tweets (not latest), filtered by recency window. Expect sparser results skewed toward hits.
