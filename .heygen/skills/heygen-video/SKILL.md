# HeyGen Video

> Generate presenter videos via HeyGen's v3 Video Agent pipeline

Create HeyGen avatar videos with proper prompt engineering, aspect ratio correction, and voice selection. The definitive skill for HeyGen video generation.

## When to Use

- "Make a video of me saying..."
- "Send a video to my leads"
- "Record an update for my team"
- "Create a video pitch"
- "Make a talking head video"
- Any HeyGen presenter video

## Install

```bash
gh skill install heygen-com/skills heygen-video
```

## Prerequisites

- Avatar (from `heygen-avatar`) OR use stock presenter
- HeyGen API key or MCP connection
- v3 API only (never v1/v2)

## Setup

### API Key
```bash
export HEYGEN_API_KEY=<your-key>
```

### MCP (OAuth)
```bash
claude mcp add --transport http heygen https://mcp.heygen.com/mcp/v1/
```

## Pipeline

1. **Frame Check** - Correct aspect ratio (9:16, 16:9, 1:1)
2. **Avatar Resolution** - Load from AVATAR-*.md or use stock
3. **Prompt Engineering** - Optimize script for video
4. **Voice Selection** - Match language and tone
5. **Submit & Poll** - Generate and wait for completion
6. **Delivery** - Return video URL

## Reading Avatar Files

```markdown
# AVATAR-*.md structure
avatar_id: abc123
voice_id: xyz789
group_id: group123
```

## Aspect Ratios

| Platform | Ratio | Dimensions |
|----------|-------|------------|
| YouTube/Landscape | 16:9 | 1920×1080 |
| TikTok/Reels | 9:16 | 1080×1920 |
| Square | 1:1 | 1080×1080 |

## Best Practices

1. **Never call raw API** - use MCP, plugin, or CLI
2. **v3 only** - v1/v2 are deprecated
3. **Poll silently** - no "Checking status..." spam
4. **Deliver clean** - video link + 1-line summary
5. **Language aware** - generate in user's language

## Chain Signal

If user wants avatar AND video:
1. Run `heygen-avatar` first
2. Wait for avatar creation
3. Then run `heygen-video`

**Never batch-ask** - run sequentially.

## Polling

```bash
# Check video status (silent, background)
heygen video status <video_id>
```

Only speak when:
- Video ready (deliver it)
- >5 minutes (single "Taking longer" update)
- Hard failure

## Output

Returns:
- Video share URL
- HeyGen session URL (for iteration)
- Thumbnail (if available)

## Example Prompts

| Request | Action |
|---------|--------|
| "Make intro video" | Load avatar, write script, generate |
| "Pitch to investors" | Guide message, approve script, deliver |
| "Team update" | Interview about content, then generate |
| "Explain this article" | Fetch, extract key points, script, generate |

## Resources

- HeyGen API: https://developers.heygen.com/docs/quick-start
- Video generation: https://developers.heygen.com/docs/video-generation
- Styles: https://developers.heygen.com/docs/video-styles
