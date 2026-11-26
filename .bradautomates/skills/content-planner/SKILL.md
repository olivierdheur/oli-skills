# Content Planner

> Full cross-platform content research and planning - aggregate insights into actionable plans

Run all platform research in parallel, aggregate findings, identify cross-platform opportunities, and generate platform-specific playbooks.

## Prerequisites

All API keys configured:
```bash
# .env
APIFY_TOKEN=your-apify-token
TUBELAB_API_KEY=your-tubelab-key
GEMINI_API_KEY=your-gemini-key
```

## Install

Part of the head-of-content skill set:
```bash
git clone https://github.com/bradautomates/head-of-content.git
```

## Usage

```
/content-planner
```

Or natural language:
```
Create a content plan for next week
```

## What It Does

1. **Runs all 4 platform research skills in parallel**
   - X/Twitter research
   - Instagram research
   - YouTube research
   - TikTok research

2. **Aggregates findings across platforms**
   - Common themes
   - Cross-platform trends
   - Engagement patterns

3. **Identifies opportunities**
   - Content gaps
   - Trending topics
   - Cross-posting potential

4. **Generates platform playbooks**
   - Platform-specific recommendations
   - Optimal posting strategies
   - Content adaptations

## Output

```
content-plans/YYYY-MM-DD_HHMMSS/
├── content-ideas.md       # Cross-platform opportunities
├── x-playbook.md          # X/Twitter specific
├── instagram-playbook.md  # Instagram specific
├── youtube-playbook.md    # YouTube specific
└── tiktok-playbook.md     # TikTok specific
```

## Playbook Contents

Each platform playbook includes:
- **Top performers** from tracked accounts
- **Engagement patterns** specific to platform
- **Content recommendations** based on data
- **Posting strategy** (timing, frequency)
- **Format suggestions** (length, style)

## Best Practices

- Run weekly for consistent insights
- Review playbooks before content creation
- Track which recommendations work
- Update tracked accounts based on results
