---
name: apify-ultimate-scraper
description: Universal AI-powered web scraper for any platform. Scrape data from Instagram, Facebook, TikTok, YouTube, LinkedIn, X/Twitter, Google Maps, Google Search, Google Trends, Reddit, Airbnb, Yelp, and 15+ more platforms. Use for lead generation, brand monitoring, competitor analysis, influencer discovery, trend research, content analytics, audience analysis, review analysis, SEO intelligence, recruitment, or any data extraction task.
---

# Universal web scraper

AI-driven data extraction from ~100 Actors across 15+ platforms via the Apify CLI.

**Rules for every `apify` command:**
1. Pass `--json` for machine-readable output
2. Pass `--user-agent apify-agent-skills/apify-ultimate-scraper` for telemetry
3. Redirect stderr with `2>/dev/null`

## Prerequisites

- Apify CLI v1.5.0+ (`npm install -g apify-cli`)
- Authenticated session (`apify login` or `export APIFY_TOKEN=...`)

## Workflow

### Step 1: Select Actor

Search for the right Actor:

```bash
apify actors search "KEYWORDS" --user-agent apify-agent-skills/apify-ultimate-scraper --json --limit 10 2>/dev/null
```

### Step 2: Fetch schema

```bash
apify actors info "ACTOR_ID" --user-agent apify-agent-skills/apify-ultimate-scraper --input --json 2>/dev/null
```

### Step 3: Run

```bash
apify actors call "ACTOR_ID" --input-file input.json --user-agent apify-agent-skills/apify-ultimate-scraper --json 2>/dev/null
```

### Step 4: Fetch results

```bash
apify datasets get-items DATASET_ID --user-agent apify-agent-skills/apify-ultimate-scraper --format json
```

## Use Cases

| Task | Workflow |
|------|----------|
| Leads, contacts, B2B | Lead generation |
| Competitor, ads, pricing | Competitive intel |
| Influencer, creator | Influencer vetting |
| Brand, mentions, sentiment | Brand monitoring |
| Reviews, ratings | Review analysis |
| SEO, SERP, content | Content and SEO |
| Trends, keywords | Trend research |
| Jobs, recruiting | Job market |
| Real estate, hotels | Hospitality |
| Price monitoring | E-commerce |

## Supported Platforms

Instagram, Facebook, TikTok, YouTube, LinkedIn, X/Twitter, Google Maps, Google Search, Google Trends, Reddit, Airbnb, Yelp, Amazon, eBay, Booking.com, Tripadvisor, and more.

## Resources

- GitHub: https://github.com/apify/agent-skills
