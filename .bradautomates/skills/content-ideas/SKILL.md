# Content Ideas

> AI content idea generator - daily "For You" feed across X, Instagram, TikTok, and YouTube

Does your morning research for you: reads what's working across platforms, then hands you content ideas framed against your own brand.

**Used to grow a channel from 700 to 10,000 subscribers in 3 months.**

## Install

**Claude Code:**
```
/plugin marketplace add bradautomates/content-ideas
/plugin install content-ideas@content-ideas
```

**Other agents:**
```bash
npx skills add bradautomates/content-ideas -g
```

## Prerequisites

- **ScrapeCreators API key** - One key covers all 4 platforms
- Get at: https://scrapecreators.com (100 free calls, no card)

## Usage

```
/content-ideas                    # Full daily feed
/content-ideas ai video tools     # Bias toward a topic
```

## What It Does

1. **Pulls recent posts** from tracked creators (default 7 days)
2. **Scores by engagement** normalized across platforms
3. **Flags overperformers** against each creator's baseline
4. **Generates ideas** checked against your content history
5. **Renders HTML feed** with Posts + Ideas tabs

## First Run Setup

1. API key configuration
2. Your own handles → learns your niche, pillars, voice
3. Tracked competitors per platform

## The Feed

| Tab | Contents |
|-----|----------|
| **Posts** | Merged feed of all tracked + discovered outliers, sortable |
| **Ideas** | Up to 10 actionable briefs with angle, hook, funnel, CTA |

## What Makes It Different

- **Knows your brand** - learns from your own content first
- **Reads comments** - finds questions, requests, arguments
- **Self-improving** - upvote/downvote sharpens future runs
- **Checks history** - won't suggest what you already made

## Data Location

```
$CONTENT_HOME/ (default ~/Documents/Content)
├── brand/
│   ├── profile.md              # Your niche, pillars, voice
│   ├── my-content.md           # Your content history
│   └── tracked-accounts/       # Competitors per platform
└── research/{YYYY-MM-DD}/
    ├── feed-data.json          # Feed data
    ├── for-you.html            # Rendered feed
    └── feedback.json           # Your reactions
```

## Platform Notes

- **X/Twitter:** Returns popular tweets (not latest) filtered by recency
- **X has no comments/transcripts** - text only
- **Instagram, TikTok, YouTube:** Newest-first with full comment analysis

## Resources

- GitHub: https://github.com/bradautomates/content-ideas
- YouTube: https://youtube.com/@bradbonanno
